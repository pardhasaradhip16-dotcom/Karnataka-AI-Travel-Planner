import React, { useState, useEffect, useMemo } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  Polyline, 
  useMap 
} from 'react-leaflet';
import L from 'leaflet';
import { 
  Navigation, 
  Maximize2, 
  Minimize2, 
  Crosshair, 
  Eye, 
  Info, 
  Car,
  ArrowRight,
  Mic
} from 'lucide-react';
import { RoutePlanningService } from '../../services/routePlanningService';
import type { RoadRouteSummary, RoutePoint } from '../../services/routePlanningService';
import { DESTINATIONS } from '../../data/destinations';
import type { GeneratedItinerary, Destination } from '../../types';

interface InteractiveLeafletMapProps {
  itinerary: GeneratedItinerary;
  selectedDestinationId?: string | null;
  onSelectDestination: (dest: Destination) => void;
  onOpenVoiceGuide?: (dest: Destination) => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  className?: string;
}

// Custom Leaflet DivIcon Generators to avoid broken image asset paths
const createOriginIcon = () => {
  return L.divIcon({
    className: 'custom-leaflet-origin-pin',
    html: `
      <div style="
        width: 38px;
        height: 38px;
        background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
        border: 3px solid #FFFFFF;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #062A20;
        font-weight: 900;
        font-size: 14px;
        box-shadow: 0 4px 14px rgba(217, 119, 6, 0.6);
        transform: translate(-50%, -50%);
      ">
        ★
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 19]
  });
};

const createDestinationIcon = (order: number, isSelected: boolean) => {
  const bg = isSelected
    ? 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)'
    : 'linear-gradient(135deg, #0B3B2C 0%, #062A20 100%)';
  const textColor = isSelected ? '#062A20' : '#FBBF24';
  const border = isSelected ? '3px solid #FFFFFF' : '2px solid #FBBF24';
  const size = isSelected ? 42 : 36;
  const shadow = isSelected 
    ? '0 0 0 6px rgba(251, 191, 36, 0.4), 0 8px 20px rgba(0,0,0,0.5)'
    : '0 4px 12px rgba(11, 59, 44, 0.4)';

  return L.divIcon({
    className: 'custom-leaflet-dest-pin',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${bg};
        border: ${border};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${textColor};
        font-weight: 800;
        font-size: ${isSelected ? 16 : 14}px;
        font-family: 'Cinzel', serif, sans-serif;
        box-shadow: ${shadow};
        transition: all 0.3s ease;
        transform: translate(-50%, -50%);
      ">
        ${order}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
};

const createNearbyIcon = () => {
  return L.divIcon({
    className: 'custom-leaflet-nearby-pin',
    html: `
      <div style="
        width: 18px;
        height: 18px;
        background: #10B981;
        border: 2px solid #FFFFFF;
        border-radius: 50%;
        opacity: 0.75;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        transform: translate(-50%, -50%);
      "></div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });
};

// Internal Map Controller for fitBounds and flyTo
const MapController: React.FC<{
  points: [number, number][];
  focusCoord?: [number, number] | null;
  fitTrigger: number;
}> = ({ points, focusCoord, fitTrigger }) => {
  const map = useMap();

  useEffect(() => {
    // Invalidate size once map mounts to ensure correct canvas geometry
    map.invalidateSize();
    const timer = setTimeout(() => {
      map.invalidateSize();
      if (points.length >= 2) {
        try {
          const bounds = L.latLngBounds(points.map(p => L.latLng(p[0], p[1])));
          map.fitBounds(bounds, { padding: [45, 45], maxZoom: 12 });
        } catch {
          // Fallback
        }
      } else if (points.length === 1) {
        map.setView(points[0], 9);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [points, map, fitTrigger]);

  useEffect(() => {
    if (focusCoord && !isNaN(focusCoord[0]) && !isNaN(focusCoord[1])) {
      map.flyTo(focusCoord, Math.max(map.getZoom(), 11), { duration: 1.2 });
    }
  }, [focusCoord, map]);

  return null;
};

export const InteractiveLeafletMap: React.FC<InteractiveLeafletMapProps> = ({
  itinerary,
  selectedDestinationId,
  onSelectDestination,
  onOpenVoiceGuide,
  isExpanded = false,
  onToggleExpand,
  className = ''
}) => {
  const [routeSummary, setRouteSummary] = useState<RoadRouteSummary | null>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(true);
  const [showNearby, setShowNearby] = useState(false);
  const [fitTrigger, setFitTrigger] = useState(0);

  // Convert itinerary to RoutePoints
  const routePoints: RoutePoint[] = useMemo(() => {
    const pts: RoutePoint[] = [
      {
        id: 'origin',
        name: itinerary.startingLocation,
        kannadaName: itinerary.startingLocation,
        coordinates: itinerary.startingCoordinates || { lat: 12.9716, lng: 77.5946 },
        isOrigin: true
      }
    ];

    itinerary.destinationsCovered.forEach(d => {
      if (d.coordinates && !isNaN(d.coordinates.lat) && !isNaN(d.coordinates.lng)) {
        pts.push({
          id: d.id,
          name: d.name,
          kannadaName: d.kannadaName,
          coordinates: d.coordinates
        });
      }
    });

    return pts;
  }, [itinerary]);

  // Fetch real road route or fallback
  useEffect(() => {
    let isMounted = true;
    setIsLoadingRoute(true);

    RoutePlanningService.fetchRoadRoute(routePoints).then(summary => {
      if (isMounted) {
        setRouteSummary(summary);
        setIsLoadingRoute(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [routePoints]);

  // Bounding points for Leaflet
  const allLatLngs: [number, number][] = useMemo(() => {
    return routePoints.map(p => [p.coordinates.lat, p.coordinates.lng]);
  }, [routePoints]);

  // Find currently highlighted destination coordinate
  const focusedCoordinate: [number, number] | null = useMemo(() => {
    if (!selectedDestinationId) return null;
    const dest = itinerary.destinationsCovered.find(d => d.id === selectedDestinationId);
    return dest && dest.coordinates ? [dest.coordinates.lat, dest.coordinates.lng] : null;
  }, [selectedDestinationId, itinerary]);

  // Nearby non-itinerary destinations for exploration
  const nearbyDestinations = useMemo(() => {
    const coveredIds = new Set(itinerary.destinationsCovered.map(d => d.id));
    return DESTINATIONS.filter(d => !coveredIds.has(d.id));
  }, [itinerary]);

  // Default Center based on departure or Karnataka center
  const initialCenter: [number, number] = useMemo(() => {
    if (itinerary.startingCoordinates && !isNaN(itinerary.startingCoordinates.lat)) {
      return [itinerary.startingCoordinates.lat, itinerary.startingCoordinates.lng];
    }
    return [13.2, 76.5];
  }, [itinerary.startingCoordinates]);

  return (
    <div className={`relative bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md flex flex-col ${className}`}>
      
      {/* Top Map Control Bar */}
      <div className="p-3.5 sm:p-4 bg-[#062A20] text-white flex flex-wrap items-center justify-between gap-3 z-10 border-b border-amber-400/30">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-royal text-white flex items-center space-x-2">
              <span>Interactive Karnataka Road Map</span>
              {routeSummary?.isRealRoadRouting ? (
                <span className="bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  OSRM Road Geometry
                </span>
              ) : (
                <span className="bg-amber-400/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/30">
                  Corridor Baseline
                </span>
              )}
            </h4>
            <p className="text-[11px] text-emerald-200/80">
              OpenStreetMap driving corridors across {itinerary.destinationsCovered.length} regions
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Fit Route */}
          <button
            onClick={() => setFitTrigger(prev => prev + 1)}
            className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center space-x-1 transition-colors"
            title="Fit zoom to entire trip route"
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fit Route</span>
          </button>

          {/* Toggle Nearby Sights */}
          <button
            onClick={() => setShowNearby(!showNearby)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors ${
              showNearby
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title="Toggle nearby Karnataka destination pins"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{showNearby ? 'Hide Nearby' : 'Show Nearby'}</span>
          </button>

          {/* Expand / Minimize toggle if handler provided */}
          {onToggleExpand && (
            <button
              onClick={onToggleExpand}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title={isExpanded ? 'Restore side view' : 'Expand full width'}
              aria-label="Toggle map size"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Main Map Canvas */}
      <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] bg-slate-100">
        
        {/* Loading Overlay */}
        {isLoadingRoute && (
          <div className="absolute inset-0 z-[1000] bg-[#062A20]/40 backdrop-blur-xs flex items-center justify-center text-white pointer-events-none">
            <div className="bg-[#062A20] px-4 py-2.5 rounded-2xl border border-amber-400/40 shadow-xl flex items-center space-x-2.5 text-xs font-bold text-amber-300">
              <Car className="w-4 h-4 animate-bounce" />
              <span>Calculating highway corridor road distances...</span>
            </div>
          </div>
        )}

        <MapContainer
          center={initialCenter}
          zoom={7}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%' }}
        >
          {/* OpenStreetMap Standard Tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={18}
          />

          {/* Auto-controller for bounds and focal animations */}
          <MapController
            points={allLatLngs}
            focusCoord={focusedCoordinate}
            fitTrigger={fitTrigger}
          />

          {/* Road Route Polyline */}
          {routeSummary && routeSummary.fullCoordinates.length > 1 && (
            <>
              {/* Outer Glow Line */}
              <Polyline
                positions={routeSummary.fullCoordinates}
                pathOptions={{
                  color: '#062A20',
                  weight: 7,
                  opacity: 0.6,
                  lineCap: 'round',
                  lineJoin: 'round'
                }}
              />

              {/* Inner Glowing Amber Line */}
              <Polyline
                positions={routeSummary.fullCoordinates}
                pathOptions={{
                  color: '#F59E0B',
                  weight: 4,
                  opacity: 0.95,
                  dashArray: routeSummary.isRealRoadRouting ? undefined : '6, 8',
                  lineCap: 'round',
                  lineJoin: 'round'
                }}
              />
            </>
          )}

          {/* Starting Origin Marker */}
          {itinerary.startingCoordinates && (
            <Marker
              position={[itinerary.startingCoordinates.lat, itinerary.startingCoordinates.lng]}
              icon={createOriginIcon()}
            >
              <Popup className="custom-leaflet-popup">
                <div className="p-1 text-slate-800">
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full uppercase">
                    Trip Departure Point
                  </span>
                  <h4 className="font-bold text-sm text-[#062A20] mt-1 font-royal">
                    {itinerary.startingLocation}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Your journey departs from this Karnataka transit hub.
                  </p>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Ordered Itinerary Destination Markers */}
          {itinerary.destinationsCovered.map((dest, idx) => {
            if (!dest.coordinates) return null;
            const isSelected = selectedDestinationId === dest.id;

            return (
              <Marker
                key={dest.id}
                position={[dest.coordinates.lat, dest.coordinates.lng]}
                icon={createDestinationIcon(idx + 1, isSelected)}
                eventHandlers={{
                  click: () => onSelectDestination(dest)
                }}
              >
                <Popup className="custom-leaflet-popup">
                  <div className="p-1 max-w-[220px] text-slate-800">
                    <img
                      src={dest.heroImage}
                      alt={dest.name}
                      className="w-full h-24 rounded-lg object-cover mb-2"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = dest.fallbackImage;
                      }}
                    />
                    <div className="flex items-baseline space-x-1.5">
                      <h4 className="font-bold text-sm text-[#062A20] font-royal">
                        {idx + 1}. {dest.name}
                      </h4>
                      <span className="text-xs text-amber-700 font-semibold">{dest.kannadaName}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                      {dest.tagline}
                    </p>

                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                      <span className="font-bold text-emerald-800">{dest.estimatedBudget}</span>
                      <span className="text-slate-400">Ideal: {dest.idealDays}</span>
                    </div>

                    <div className="mt-2 flex items-center space-x-1.5">
                      <button
                        onClick={() => onSelectDestination(dest)}
                        className="flex-1 py-1.5 bg-[#062A20] hover:bg-[#0B3B2C] text-amber-300 rounded-lg text-xs font-bold text-center block"
                      >
                        Guide
                      </button>
                      {onOpenVoiceGuide && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenVoiceGuide(dest);
                          }}
                          className="py-1.5 px-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-bold flex items-center space-x-1 shadow-sm"
                          title={`Listen to Voice Guide for ${dest.name}`}
                        >
                          <Mic className="w-3.5 h-3.5" />
                          <span>Voice</span>
                        </button>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* Nearby Destinations Layer (Requirement 9) */}
          {showNearby && nearbyDestinations.map(nearby => {
            if (!nearby.coordinates) return null;

            return (
              <Marker
                key={`nearby-${nearby.id}`}
                position={[nearby.coordinates.lat, nearby.coordinates.lng]}
                icon={createNearbyIcon()}
              >
                <Popup className="custom-leaflet-popup">
                  <div className="p-1 max-w-[200px] text-slate-800">
                    <span className="text-[9px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded">
                      Nearby Sights
                    </span>
                    <h5 className="font-bold text-xs text-[#062A20] mt-1">
                      {nearby.name} ({nearby.kannadaName})
                    </h5>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{nearby.tagline}</p>
                    <button
                      onClick={() => onSelectDestination(nearby)}
                      className="mt-2 text-[10px] text-emerald-800 font-bold underline"
                    >
                      Explore Destination Details →
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Live Distance & Duration Floating Pill (Requirement 5) */}
        {routeSummary && (
          <div className="absolute top-3 left-3 z-[999] bg-[#041D16]/95 backdrop-blur-md p-3 rounded-2xl border border-emerald-500/40 text-white shadow-xl max-w-xs text-xs space-y-1">
            <div className="flex items-center space-x-2 text-amber-400 font-bold">
              <Car className="w-4 h-4" />
              <span>Route Road Analytics</span>
            </div>

            {routeSummary.totalRoadDistanceKm !== undefined ? (
              <div className="flex items-baseline space-x-1.5">
                <span className="text-sm font-extrabold text-white">
                  {routeSummary.totalRoadDistanceKm} km
                </span>
                <span className="text-[10px] text-emerald-300">
                  Total Road Distance
                </span>
              </div>
            ) : null}

            {routeSummary.totalEstimatedDurationText && (
              <div className="text-[11px] text-emerald-200">
                <span className="text-slate-400">Drive Time: </span>
                <span className="font-bold text-amber-300">{routeSummary.totalEstimatedDurationText}</span>
              </div>
            )}

            {/* Clearly distinguish straight-line from road distance */}
            <div className="text-[10px] text-slate-400 pt-1 border-t border-emerald-900/60">
              Straight-line span: <span className="text-slate-300">{routeSummary.totalStraightLineKm} km</span> (Ghat road curvature factored)
            </div>
          </div>
        )}

      </div>

      {/* Segments Corridor Breakdown Footer */}
      {routeSummary && routeSummary.segments.length > 0 && (
        <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-700">
          <div className="flex items-center space-x-2 mb-2 font-bold text-slate-900">
            <Info className="w-3.5 h-3.5 text-emerald-700" />
            <span>Transit Leg Breakdown:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {routeSummary.segments.map((seg, idx) => (
              <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200 text-[11px]">
                <div className="font-bold text-slate-800 flex items-center space-x-1">
                  <span>{seg.fromName.split(' ')[0]}</span>
                  <ArrowRight className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                  <span>{seg.toName.split(' ')[0]}</span>
                </div>
                <div className="text-slate-500 mt-0.5 flex items-center justify-between">
                  <span>
                    {seg.roadDistanceKm ? `${seg.roadDistanceKm} km road` : `~${seg.straightLineDistanceKm} km line`}
                  </span>
                  {seg.durationText && (
                    <span className="font-semibold text-emerald-800">{seg.durationText}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
