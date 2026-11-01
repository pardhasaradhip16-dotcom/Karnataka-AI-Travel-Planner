export type Region = 'All' | 'South Karnataka' | 'Malnad & Ghats' | 'Coastal Karavali' | 'North Karnataka';

export type Category = 
  | 'All'
  | 'Heritage'
  | 'Nature'
  | 'Beaches'
  | 'Hill Stations'
  | 'Waterfalls'
  | 'Wildlife'
  | 'Temples'
  | 'Adventure'
  | 'Food'
  | 'Culture';

export interface DestinationCoordinates {
  lat: number;
  lng: number;
}

export interface Destination {
  id: string;
  name: string;
  kannadaName: string;
  district: string;
  region: 'South Karnataka' | 'Malnad & Ghats' | 'Coastal Karavali' | 'North Karnataka';
  tagline: string;
  category: ('Heritage' | 'Nature' | 'Beaches' | 'Hill Stations' | 'Waterfalls' | 'Wildlife' | 'Temples' | 'Adventure' | 'Food' | 'Culture')[];
  rating: number;
  reviewsCount: number;
  idealDays: string;
  estimatedBudget: string;
  budgetLevel: 'Budget' | 'Moderate' | 'Luxury';
  bestTimeToVisit: string;
  heroImage: string;
  fallbackImage: string;
  description: string;
  significance: string;
  topAttractions: {
    name: string;
    description: string;
    timing?: string;
  }[];
  localDelicacies: string[];
  travelTips: string[];
  accessibilityRating: 'Easy' | 'Moderate' | 'Challenging';
  coordinatesNote: string;
  coordinates: DestinationCoordinates;
  isLesserKnownGem?: boolean;
  crowdLevel?: 'Low & Tranquil' | 'Moderate' | 'Popular & Lively';
  travellerSuitability?: string[];
  verifiedAuthority?: string;
  seasonalNotice?: string;
  culturalEtiquette?: string[];
  whyVisitSummary?: string;
}

export interface InterestCategory {
  id: Category;
  title: string;
  kannadaTitle: string;
  description: string;
  iconName: string;
  accentColor: string;
  gradient: string;
  image: string;
  count: number;
}

/* SMART TRIP BUILDER WIZARD TYPES */

export type InterestId = 
  | 'nature'
  | 'waterfalls'
  | 'beaches'
  | 'heritage'
  | 'temples'
  | 'adventure'
  | 'wildlife'
  | 'food'
  | 'relaxation'
  | 'culture';

export interface WizardInterestOption {
  id: InterestId;
  title: string;
  kannadaTitle: string;
  description: string;
  image: string;
  iconName: string;
  tag: string;
}

export type DurationOptionId = '1-day' | '2-3-days' | '4-5-days' | '6-7-days' | 'custom';

export type BudgetTierId = 'budget' | 'comfortable' | 'premium' | 'custom';

export type BudgetBasis = 'per_person' | 'entire_group';

export type TravelerGroupId = 'solo' | 'couple' | 'friends' | 'family' | 'seniors' | 'group';

export type TransportPreference = 'public_transit' | 'self_drive' | 'cab_chauffeur' | 'two_wheeler';

export type TravelPace = 'relaxed' | 'balanced' | 'fast_paced';

export type AccommodationTier = 'budget_homestay' | 'standard_hotel' | 'heritage_resort' | 'luxury_villa';

export interface TripBuilderPreferences {
  interests: InterestId[];
  duration: DurationOptionId;
  customDays: number;
  budgetTier: BudgetTierId;
  customBudgetAmount: number;
  budgetBasis: BudgetBasis;
  travelerType: TravelerGroupId;
  groupSize: number;
  startingCity: string;
  isCustomCity: boolean;
  customCityName: string;
  startDate: string;
  endDate: string;
  transportPreference: TransportPreference;
  accommodationPreference?: AccommodationTier;
  accessibilityNeeds: string[];
  pace: TravelPace;
}

/* DETAILED TRAVEL BUDGET & EXPENSE TYPES */

export interface ExpenseItemDetail {
  id: string;
  name: string;
  amount: number;
  unit: string;
  isPerPerson: boolean;
  isVerifiedStatutory: boolean;
  sourceAuthority?: string;
  estimationNote?: string;
  category: 'transport' | 'stay' | 'food' | 'entry' | 'activities' | 'misc';
}

export interface DayCostBreakdown {
  dayNumber: number;
  destinationName: string;
  transport: number;
  stay: number;
  food: number;
  entryFees: number;
  activities: number;
  misc: number;
  dayTotal: number;
  items: ExpenseItemDetail[];
}

export interface ExpenseCategorySummary {
  key: 'transport' | 'stay' | 'food' | 'entry' | 'activities' | 'misc';
  label: string;
  amount: number;
  percentage: number;
  isVerified: boolean;
  verifiedAmount: number;
  estimatedAmount: number;
  estimationRule: string;
  verifiedSource?: string;
  items: ExpenseItemDetail[];
}

export interface DetailedExpenseBreakdown {
  stay: number;
  transport: number;
  food: number;
  entryFees: number;
  activities: number;
  misc: number;
  total: number;
  perPersonTotal: number;
  stayPercent: number;
  transportPercent: number;
  foodPercent: number;
  entryFeesPercent: number;
  activitiesPercent: number;
  miscPercent: number;
  verifiedTotal: number;
  estimatedTotal: number;
  verifiedPercentage: number;
  categories: ExpenseCategorySummary[];
  dayByDayCosts: DayCostBreakdown[];
  estimationAssumptions: string[];
  verifiedStatutoryHighlights: string[];
}

export interface BudgetSavingRecommendation {
  id: string;
  title: string;
  description: string;
  potentialSavings: number;
  actionType: 'switch_transport' | 'switch_stay' | 'switch_activities' | 'swap_destination';
  actionLabel: string;
  targetValue?: string;
}

export interface BudgetEvaluationResult {
  targetBudget: number;
  budgetBasis: BudgetBasis;
  totalEstimatedCost: number;
  perPersonEstimatedCost: number;
  variance: number; // positive = under budget, negative = over budget
  status: 'under_budget' | 'balanced' | 'over_budget';
  statusLabel: string;
  percentageUsed: number;
  shortfallAmount?: number;
  shortfallExplanation?: string;
  savingsRecommendations: BudgetSavingRecommendation[];
}

/* AI GENERATED ITINERARY TYPES */

export interface FeasibilityWarning {
  type: 'duration_tight' | 'budget_tight' | 'geographic_distance' | 'accessibility_notice';
  title: string;
  message: string;
  suggestion: string;
}

export interface DestinationRecommendation {
  destinationId: string;
  name: string;
  kannadaName: string;
  district: string;
  region: string;
  whyRecommended: string;
  matchScore: number; // 0 - 100
  travelCorridorFromPrevious?: string;
  estimatedTransitHours?: string;
}

export interface DestinationAlternative {
  destination: Destination;
  matchScore: number;
  reason: string;
  budgetDifference: string;
}

export interface ExpenseBreakdown {
  stay: number;
  transport: number;
  food: number;
  activities: number;
  entryFees?: number;
  misc?: number;
  total: number;
  stayPercent: number;
  transportPercent: number;
  foodPercent: number;
  activitiesPercent: number;
  entryFeesPercent?: number;
  miscPercent?: number;
}

export interface ItineraryActivity {
  title: string;
  description: string;
  timing: string;
  location: string;
  icon: string;
  visitDuration?: string;
  travelTimeToNext?: string;
  accessibilityTag?: string;
  recommendedMealSpot?: string;
  practicalNotes?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  dayTitle: string;
  kannadaDayTitle: string;
  destinationName: string;
  destinationId: string;
  heroImage: string;
  morning: ItineraryActivity;
  afternoon: ItineraryActivity;
  evening: ItineraryActivity;
  transportAdvice: string;
  accessibilityNote: string;
  estimatedDayCost: number;
}

export interface GeneratedItinerary {
  id: string;
  generatedAt: string;
  title: string;
  kannadaTitle: string;
  subtitle: string;
  summary: string;
  destinationsCovered: Destination[];
  destinationRecommendations: DestinationRecommendation[];
  alternatives: DestinationAlternative[];
  feasibilityWarnings: FeasibilityWarning[];
  expenseBreakdown: ExpenseBreakdown;
  totalDays: number;
  estimatedCostTotal: string;
  costPerPerson: string;
  budgetBasis: BudgetBasis;
  travelerLabel: string;
  groupSize: number;
  paceLabel: string;
  transportLabel: string;
  startingLocation: string;
  startingCoordinates: DestinationCoordinates;
  accessibilityHighlights: string[];
  seasonalAdvice: string;
  packingList: string[];
  days: ItineraryDay[];
  preferencesSnapshot: TripBuilderPreferences;
  detailedExpenseBreakdown?: DetailedExpenseBreakdown;
  budgetEvaluation?: BudgetEvaluationResult;
  accommodationPreference?: AccommodationTier;
}

/* YATRA VOICE GUIDE AI TYPES */

export type VoiceGuideLanguage = 'en' | 'kn' | 'te' | 'hi' | 'ta' | 'ml';

export interface SupportedLanguageInfo {
  code: VoiceGuideLanguage;
  nativeName: string;
  englishLabel: string;
  speechTag: string;
  secondarySpeechTag?: string;
  sampleGreeting: string;
}

export type NarrationMode = 'quick' | 'standard' | 'deep_history';

export interface NarrationSection {
  title: string;
  text: string;
  startPercent: number;
}

export interface NarrationScript {
  language: VoiceGuideLanguage;
  languageNativeName: string;
  estimatedDuration: string;
  fullText: string;
  sections: NarrationSection[];
}

export interface HistoricalMilestone {
  yearOrEra: string;
  event: string;
  rulerOrDynasty: string;
  details: string;
  isDocumentedHistory: boolean;
}

export interface ArchitectureHighlight {
  feature: string;
  description: string;
  periodOrStyle: string;
}

export interface HistoricalSourceReference {
  title: string;
  authority: string;
  description: string;
  url?: string;
  verifiedInscriptions?: string;
}

export interface VoiceGuideFAQItem {
  id: string;
  question: Record<VoiceGuideLanguage, string>;
  answer: Record<VoiceGuideLanguage, string>;
  category: 'founder' | 'history' | 'architecture' | 'legend_vs_fact' | 'tips';
}

export interface DestinationVoiceGuideData {
  destinationId: string;
  historicalTimeline: HistoricalMilestone[];
  architectureHighlights: ArchitectureHighlight[];
  documentedHistoryFacts: string[];
  folkloreAndLegends: string[];
  sourcesAndReferences: HistoricalSourceReference[];
  narrations: Record<VoiceGuideLanguage, Record<NarrationMode, NarrationScript>>;
  faqList: VoiceGuideFAQItem[];
}

/* YATRA BUDDY ASSISTANT TYPES */

export type YatraBuddyLanguage = 'en' | 'kn' | 'hi' | 'te' | 'ta' | 'ml';

export interface YatraBuddyAction {
  id: string;
  type: 
    | 'make_cheaper' 
    | 'plan_family' 
    | 'plan_one_day' 
    | 'add_destination' 
    | 'replace_destination' 
    | 'view_destination' 
    | 'view_map' 
    | 'open_voice_guide'
    | 'navigate_planner';
  label: string;
  payload?: any;
}

export interface YatraBuddyMessage {
  id: string;
  sender: 'user' | 'buddy';
  text: string;
  timestamp: string;
  suggestedDestinations?: Destination[];
  actions?: YatraBuddyAction[];
  isDemoFallback?: boolean;
}

export interface YatraBuddyContext {
  currentLanguage: YatraBuddyLanguage;
  itinerary: GeneratedItinerary | null;
  selectedDestination: Destination | null;
  savedDestinationIds: string[];
  destinations: Destination[];
}


