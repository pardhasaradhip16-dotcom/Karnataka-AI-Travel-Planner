import type { DestinationCoordinates, Destination, GeneratedItinerary } from '../types';
import { getEstimatedCorridor } from '../data/routesData';

export interface RoutePoint {
  id: string;
  name: string;
  kannadaName: string;
  coordinates: DestinationCoordinates;
  isOrigin?: boolean;
}

export interface RouteSegment {
  fromId: string;
  fromName: string;
  toId: string;
  toName: string;
  roadDistanceKm?: number;
  straightLineDistanceKm: number;
  durationText?: string;
  highway?: string;
  isRealRoadData: boolean;
  geometry?: [number, number][]; // [lat, lng] array
}

export interface RoadRouteSummary {
  totalRoadDistanceKm?: number;
  totalStraightLineKm: number;
  totalEstimatedDurationText?: string;
  isRealRoadRouting: boolean;
  routingProvider: 'OSRM OpenStreetMap' | 'Karnataka Corridor Baseline' | 'Direct Coordinate Link';
  segments: RouteSegment[];
  fullCoordinates: [number, number][]; // [lat, lng] for Leaflet Polyline
  statusMessage: string;
}

export class RoutePlanningService {

  /**
   * Calculate Haversine straight-line distance between two coordinates in kilometers.
   * Explicitly labeled as straight-line distance.
   */
  public static calculateStraightLineKm(
    coord1: DestinationCoordinates,
    coord2: DestinationCoordinates
  ): number {
    const R = 6371; // Earth's mean radius in km
    const dLat = this.toRadians(coord2.lat - coord1.lat);
    const dLng = this.toRadians(coord2.lng - coord1.lng);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(coord1.lat)) * Math.cos(this.toRadians(coord2.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  }

  private static toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  /**
   * Fetch driving road geometry & distance via OSRM public routing API.
   * Gracefully falls back when service is unreachable or rate-limited.
   */
  public static async fetchRoadRoute(points: RoutePoint[]): Promise<RoadRouteSummary> {
    if (points.length < 2) {
      return {
        totalStraightLineKm: 0,
        isRealRoadRouting: false,
        routingProvider: 'Direct Coordinate Link',
        segments: [],
        fullCoordinates: points.map(p => [p.coordinates.lat, p.coordinates.lng]),
        statusMessage: 'Single location selected; no transit corridor required.'
      };
    }

    // Prepare coordinate query for OSRM: format is lng,lat;lng,lat
    const coordString = points
      .map(p => `${p.coordinates.lng.toFixed(6)},${p.coordinates.lat.toFixed(6)}`)
      .join(';');

    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${coordString}?overview=full&geometries=geojson&steps=false`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

      const response = await fetch(osrmUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
          const primaryRoute = data.routes[0];
          const totalRoadDistanceKm = Math.round((primaryRoute.distance / 1000) * 10) / 10;
          
          // Duration in seconds -> format into hours and minutes
          const durationSeconds = primaryRoute.duration;
          const hours = Math.floor(durationSeconds / 3600);
          const mins = Math.round((durationSeconds % 3600) / 60);
          const totalEstimatedDurationText = hours > 0 
            ? `${hours} hr ${mins} min (Standard Speed Estimate)`
            : `${mins} min (Standard Speed Estimate)`;

          // GeoJSON coordinates are [lng, lat], Leaflet polyline expects [lat, lng]
          const fullCoordinates: [number, number][] = primaryRoute.geometry.coordinates.map(
            (c: [number, number]) => [c[1], c[0]]
          );

          // Build individual segments
          const segments: RouteSegment[] = [];
          for (let i = 0; i < points.length - 1; i++) {
            const p1 = points[i];
            const p2 = points[i + 1];
            const straightLine = this.calculateStraightLineKm(p1.coordinates, p2.coordinates);
            const leg = primaryRoute.legs && primaryRoute.legs[i];
            
            const legRoadDist = leg ? Math.round((leg.distance / 1000) * 10) / 10 : undefined;
            const legHours = leg ? Math.floor(leg.duration / 3600) : 0;
            const legMins = leg ? Math.round((leg.duration % 3600) / 60) : 0;
            const legDurationText = leg 
              ? (legHours > 0 ? `${legHours}h ${legMins}m` : `${legMins}m`)
              : undefined;

            segments.push({
              fromId: p1.id,
              fromName: p1.name,
              toId: p2.id,
              toName: p2.name,
              roadDistanceKm: legRoadDist,
              straightLineDistanceKm: straightLine,
              durationText: legDurationText,
              isRealRoadData: true
            });
          }

          let totalStraightLineKm = 0;
          segments.forEach(s => totalStraightLineKm += s.straightLineDistanceKm);

          return {
            totalRoadDistanceKm,
            totalStraightLineKm: Math.round(totalStraightLineKm * 10) / 10,
            totalEstimatedDurationText,
            isRealRoadRouting: true,
            routingProvider: 'OSRM OpenStreetMap',
            segments,
            fullCoordinates,
            statusMessage: 'Real road routing calculated via OpenStreetMap highway network.'
          };
        }
      }
    } catch {
      // Graceful network or timeout fallback
    }

    // FALLBACK: Use pre-calculated Karnataka highway corridors and Haversine data
    return this.buildFallbackCorridorRoute(points);
  }

  /**
   * Deterministic fallback using known Karnataka road corridors from routesData.
   */
  private static buildFallbackCorridorRoute(points: RoutePoint[]): RoadRouteSummary {
    const segments: RouteSegment[] = [];
    const fullCoordinates: [number, number][] = points.map(p => [p.coordinates.lat, p.coordinates.lng]);
    let totalRoadDist = 0;
    let totalStraightLine = 0;
    let totalMinutes = 0;

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const straightLine = this.calculateStraightLineKm(p1.coordinates, p2.coordinates);
      totalStraightLine += straightLine;

      const corridor = getEstimatedCorridor(p1.id, p2.id);
      if (corridor) {
        totalRoadDist += corridor.distanceKm;
        segments.push({
          fromId: p1.id,
          fromName: p1.name,
          toId: p2.id,
          toName: p2.name,
          roadDistanceKm: corridor.distanceKm,
          straightLineDistanceKm: straightLine,
          durationText: corridor.typicalTime,
          highway: corridor.highway,
          isRealRoadData: false
        });
      } else {
        // Estimate road distance as 1.28x straight line for Karnataka's Ghat topography
        const estimatedGhatRoadKm = Math.round(straightLine * 1.28);
        totalRoadDist += estimatedGhatRoadKm;
        const estMins = Math.round((estimatedGhatRoadKm / 55) * 60); // ~55 km/h avg state highway
        totalMinutes += estMins;

        segments.push({
          fromId: p1.id,
          fromName: p1.name,
          toId: p2.id,
          toName: p2.name,
          roadDistanceKm: estimatedGhatRoadKm,
          straightLineDistanceKm: straightLine,
          durationText: `~${Math.floor(estMins / 60)}h ${estMins % 60}m (Corridor Estimate)`,
          isRealRoadData: false
        });
      }
    }

    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const durationText = hrs > 0 ? `~${hrs} hr ${mins} min (State Highway Average)` : `~${mins} min`;

    return {
      totalRoadDistanceKm: Math.round(totalRoadDist),
      totalStraightLineKm: Math.round(totalStraightLine * 10) / 10,
      totalEstimatedDurationText: durationText,
      isRealRoadRouting: false,
      routingProvider: 'Karnataka Corridor Baseline',
      segments,
      fullCoordinates,
      statusMessage: 'Displaying verified Karnataka highway corridors (OSRM live routing currently offline).'
    };
  }

  /**
   * Route Optimization Algorithm:
   * Keeps starting origin point fixed at index 0.
   * Uses Nearest-Neighbour followed by 2-opt pairwise improvement to eliminate route criss-crossing.
   */
  public static optimizeStopOrder(
    origin: RoutePoint,
    destinations: Destination[]
  ): {
    optimizedDestinations: Destination[];
    distanceSavedKm: number;
    wasReordered: boolean;
  } {
    if (destinations.length <= 1) {
      return {
        optimizedDestinations: destinations,
        distanceSavedKm: 0,
        wasReordered: false
      };
    }

    // Calculate initial tour straight-line distance
    const initialRoute: DestinationCoordinates[] = [origin.coordinates, ...destinations.map(d => d.coordinates)];
    const initialDist = this.calculateTotalStraightLine(initialRoute);

    // 1. Nearest Neighbour Construction
    const unvisited = [...destinations];
    const ordered: Destination[] = [];
    let currentCoord = origin.coordinates;

    while (unvisited.length > 0) {
      let nearestIdx = 0;
      let minDistance = Infinity;

      for (let i = 0; i < unvisited.length; i++) {
        const dist = this.calculateStraightLineKm(currentCoord, unvisited[i].coordinates);
        if (dist < minDistance) {
          minDistance = dist;
          nearestIdx = i;
        }
      }

      const nextDest = unvisited.splice(nearestIdx, 1)[0];
      ordered.push(nextDest);
      currentCoord = nextDest.coordinates;
    }

    // 2. 2-Opt Improvement for 3+ destinations
    if (ordered.length >= 3) {
      let improved = true;
      let iterations = 0;

      while (improved && iterations < 20) {
        improved = false;
        iterations++;

        for (let i = 0; i < ordered.length - 1; i++) {
          for (let k = i + 1; k < ordered.length; k++) {
            const currentDist = this.calculateTourSegmentDist(origin.coordinates, ordered);
            
            // Try 2-opt swap (reverse sub-sequence between i and k)
            const swapped = [
              ...ordered.slice(0, i),
              ...ordered.slice(i, k + 1).reverse(),
              ...ordered.slice(k + 1)
            ];

            const newDist = this.calculateTourSegmentDist(origin.coordinates, swapped);
            if (newDist < currentDist - 0.5) { // Meaningful improvement
              ordered.splice(0, ordered.length, ...swapped);
              improved = true;
              break;
            }
          }
          if (improved) break;
        }
      }
    }

    // Calculate final optimized distance
    const finalRoute: DestinationCoordinates[] = [origin.coordinates, ...ordered.map(d => d.coordinates)];
    const finalDist = this.calculateTotalStraightLine(finalRoute);
    const distanceSavedKm = Math.max(0, Math.round((initialDist - finalDist) * 1.3)); // Estimating real road savings
    const wasReordered = ordered.some((d, idx) => d.id !== destinations[idx].id);

    return {
      optimizedDestinations: ordered,
      distanceSavedKm,
      wasReordered
    };
  }

  private static calculateTotalStraightLine(coords: DestinationCoordinates[]): number {
    let sum = 0;
    for (let i = 0; i < coords.length - 1; i++) {
      sum += this.calculateStraightLineKm(coords[i], coords[i + 1]);
    }
    return sum;
  }

  private static calculateTourSegmentDist(origin: DestinationCoordinates, tour: Destination[]): number {
    const coords = [origin, ...tour.map(d => d.coordinates)];
    return this.calculateTotalStraightLine(coords);
  }

  /**
   * Optimize full itinerary and re-assign day sequence
   */
  public static optimizeItinerary(
    itinerary: GeneratedItinerary,
    reSynthesizeFn: (prefs: any, dests: Destination[]) => GeneratedItinerary
  ): {
    updatedItinerary: GeneratedItinerary;
    savingsMessage: string;
    wasReordered: boolean;
  } {
    const originPoint: RoutePoint = {
      id: 'origin',
      name: itinerary.startingLocation,
      kannadaName: itinerary.startingLocation,
      coordinates: itinerary.startingCoordinates,
      isOrigin: true
    };

    const { optimizedDestinations, distanceSavedKm, wasReordered } = this.optimizeStopOrder(
      originPoint,
      itinerary.destinationsCovered
    );

    if (!wasReordered) {
      return {
        updatedItinerary: itinerary,
        savingsMessage: 'Your itinerary is already sequenced in optimal geographic corridor order.',
        wasReordered: false
      };
    }

    const updated = reSynthesizeFn(itinerary.preferencesSnapshot, optimizedDestinations);

    return {
      updatedItinerary: updated,
      savingsMessage: `Route optimized! Saved an estimated ~${distanceSavedKm} km of driving across Karnataka.`,
      wasReordered: true
    };
  }
}
