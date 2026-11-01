import type { Destination, Category, Region } from '../types';
import { DESTINATIONS } from '../data/destinations';

export interface DiscoveryFilterOptions {
  searchQuery?: string;
  category?: Category;
  region?: Region;
  budgetLevel?: 'all' | 'Budget' | 'Moderate' | 'Luxury';
  duration?: 'all' | '1-day' | '2-days' | '3-days-plus';
  onlyHiddenGems?: boolean;
  userInterests?: string[];
  maxDailyBudget?: number;
  sortBy?: 'relevance' | 'rating' | 'popular' | 'budget_asc' | 'budget_desc' | 'duration';
}

export interface ScoredDestination {
  destination: Destination;
  relevanceScore: number; // 0 - 100
  relevanceExplanation: string;
  distanceFromAnchorKm?: number;
  isNearby?: boolean;
}

export class DiscoveryService {

  /**
   * Calculate Haversine distance between two coordinates in kilometers.
   */
  public static calculateDistanceKm(
    lat1: number, 
    lng1: number, 
    lat2: number, 
    lng2: number
  ): number {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  }

  /**
   * Find verified nearby attractions within a given radius (e.g. 120 km) for a destination.
   */
  public static getNearbyDestinations(
    targetDestinationId: string,
    maxRadiusKm: number = 140
  ): { destination: Destination; distanceKm: number }[] {
    const target = DESTINATIONS.find(d => d.id === targetDestinationId);
    if (!target || !target.coordinates) return [];

    const nearby: { destination: Destination; distanceKm: number }[] = [];

    DESTINATIONS.forEach(dest => {
      if (dest.id === targetDestinationId) return;
      if (dest.coordinates && !isNaN(dest.coordinates.lat) && !isNaN(dest.coordinates.lng)) {
        const dist = this.calculateDistanceKm(
          target.coordinates.lat,
          target.coordinates.lng,
          dest.coordinates.lat,
          dest.coordinates.lng
        );

        if (dist <= maxRadiusKm) {
          nearby.push({ destination: dest, distanceKm: dist });
        }
      }
    });

    return nearby.sort((a, b) => a.distanceKm - b.distanceKm);
  }

  /**
   * Compute relevance score (0 - 100) and generate clear explanation of why recommended.
   */
  public static computeScoreAndExplanation(
    destination: Destination,
    filters: DiscoveryFilterOptions
  ): { score: number; explanation: string } {
    let score = 70; // baseline
    const matchedReasons: string[] = [];

    // 1. Interest match (up to +20)
    if (filters.category && filters.category !== 'All') {
      if (destination.category.includes(filters.category as any)) {
        score += 15;
        matchedReasons.push(`aligns directly with your interest in ${filters.category}`);
      }
    }

    if (filters.userInterests && filters.userInterests.length > 0) {
      const matchCount = destination.category.filter(c => 
        filters.userInterests?.some(ui => ui.toLowerCase() === c.toLowerCase())
      ).length;
      if (matchCount > 0) {
        score += Math.min(15, matchCount * 8);
        matchedReasons.push(`matches ${matchCount} of your preferred themes (${destination.category.slice(0, 2).join(', ')})`);
      }
    }

    // 2. Rating & Review Trust (up to +10)
    if (destination.rating >= 4.8) {
      score += 8;
      matchedReasons.push(`consistently rated ${destination.rating.toFixed(1)}/5.0 by travelers`);
    } else if (destination.rating >= 4.6) {
      score += 4;
    }

    // 3. Hidden Gem bonus if user seeks uncrowded destinations
    if (destination.isLesserKnownGem) {
      if (filters.onlyHiddenGems) {
        score += 20;
        matchedReasons.push(`curated tranquil spot free from mass commercial crowding`);
      } else {
        score += 6;
      }
    }

    // 4. Region alignment
    if (filters.region && filters.region !== 'All' && destination.region === filters.region) {
      score += 10;
      matchedReasons.push(`located directly in ${destination.region}`);
    }

    // 5. Budget suitability
    if (filters.budgetLevel && filters.budgetLevel !== 'all') {
      if (destination.budgetLevel === filters.budgetLevel) {
        score += 10;
        matchedReasons.push(`fits your ${destination.budgetLevel} budget range (${destination.estimatedBudget})`);
      }
    }

    // Normalized 0 - 99
    const finalScore = Math.min(99, Math.max(65, Math.round(score)));

    // Formulate compelling explanation
    let explanation = '';
    if (matchedReasons.length > 0) {
      explanation = `Recommended because it ${matchedReasons.join(', and ')}.`;
    } else {
      explanation = destination.whyVisitSummary || 
        `Top cultural highlight in ${destination.district} district with an ideal ${destination.idealDays} exploration timeline.`;
    }

    return { score: finalScore, explanation };
  }

  /**
   * Main search, filter, and scoring pipeline.
   */
  public static filterAndScoreDestinations(
    filters: DiscoveryFilterOptions,
    customDataset: Destination[] = DESTINATIONS
  ): ScoredDestination[] {
    const {
      searchQuery = '',
      category = 'All',
      region = 'All',
      budgetLevel = 'all',
      duration = 'all',
      onlyHiddenGems = false,
      sortBy = 'relevance'
    } = filters;

    const query = searchQuery.toLowerCase().trim();

    const filtered = customDataset.filter(dest => {
      // 1. Search Query
      if (query) {
        const matchesName = dest.name.toLowerCase().includes(query);
        const matchesKannada = dest.kannadaName.includes(query);
        const matchesDistrict = dest.district.toLowerCase().includes(query);
        const matchesTagline = dest.tagline.toLowerCase().includes(query);
        const matchesDescription = dest.description.toLowerCase().includes(query);
        const matchesAttractions = dest.topAttractions.some(a => 
          a.name.toLowerCase().includes(query) || a.description.toLowerCase().includes(query)
        );
        const matchesDelicacies = dest.localDelicacies.some(d => d.toLowerCase().includes(query));

        if (!matchesName && !matchesKannada && !matchesDistrict && !matchesTagline && !matchesDescription && !matchesAttractions && !matchesDelicacies) {
          return false;
        }
      }

      // 2. Category / Interest Filter
      if (category !== 'All') {
        const matchesCat = dest.category.some(c => c.toLowerCase() === category.toLowerCase());
        if (!matchesCat) return false;
      }

      // 3. Region Filter
      if (region !== 'All' && dest.region !== region) {
        return false;
      }

      // 4. Budget Filter
      if (budgetLevel !== 'all' && dest.budgetLevel !== budgetLevel) {
        return false;
      }

      // 5. Duration Filter
      if (duration !== 'all') {
        const ideal = dest.idealDays.toLowerCase();
        if (duration === '1-day' && !ideal.includes('1')) return false;
        if (duration === '2-days' && !ideal.includes('2')) return false;
        if (duration === '3-days-plus' && !ideal.includes('3') && !ideal.includes('4')) return false;
      }

      // 6. Only Hidden Gems Toggle
      if (onlyHiddenGems && !dest.isLesserKnownGem) {
        return false;
      }

      return true;
    });

    // Score each remaining destination
    const scoredList: ScoredDestination[] = filtered.map(dest => {
      const { score, explanation } = this.computeScoreAndExplanation(dest, filters);
      return {
        destination: dest,
        relevanceScore: score,
        relevanceExplanation: explanation
      };
    });

    // Sort according to user preference
    scoredList.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.destination.rating - a.destination.rating;
        case 'popular':
          return b.destination.reviewsCount - a.destination.reviewsCount;
        case 'budget_asc': {
          const numA = parseInt(a.destination.estimatedBudget.replace(/\D/g, '')) || 0;
          const numB = parseInt(b.destination.estimatedBudget.replace(/\D/g, '')) || 0;
          return numA - numB;
        }
        case 'budget_desc': {
          const numA = parseInt(a.destination.estimatedBudget.replace(/\D/g, '')) || 0;
          const numB = parseInt(b.destination.estimatedBudget.replace(/\D/g, '')) || 0;
          return numB - numA;
        }
        case 'duration':
          return a.destination.idealDays.localeCompare(b.destination.idealDays);
        case 'relevance':
        default:
          return b.relevanceScore - a.relevanceScore;
      }
    });

    return scoredList;
  }

  /**
   * Curate the "Beyond the Famous Places" section specifically.
   */
  public static getHiddenGems(
    userPreferences?: { interests?: string[]; region?: Region },
    limit: number = 6
  ): ScoredDestination[] {
    const gems = DESTINATIONS.filter(d => d.isLesserKnownGem);

    return gems.map(dest => {
      const { score, explanation } = this.computeScoreAndExplanation(dest, {
        userInterests: userPreferences?.interests,
        region: userPreferences?.region,
        onlyHiddenGems: true
      });

      return {
        destination: dest,
        relevanceScore: score,
        relevanceExplanation: explanation
      };
    }).sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, limit);
  }
}
