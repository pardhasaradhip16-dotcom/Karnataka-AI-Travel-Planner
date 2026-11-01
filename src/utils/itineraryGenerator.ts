import { RecommendationEngine } from '../services/recommendationEngine';
import type { TripBuilderPreferences, GeneratedItinerary } from '../types';

export function generateSmartItinerary(prefs: TripBuilderPreferences): GeneratedItinerary {
  return RecommendationEngine.synthesizeItinerary(prefs);
}
