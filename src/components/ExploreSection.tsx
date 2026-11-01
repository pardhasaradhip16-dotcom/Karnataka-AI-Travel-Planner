import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  RotateCcw, 
  Compass, 
  Clock, 
  SlidersHorizontal,
  Flame,
  TreePine,
  ShieldCheck
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { DestinationCard } from './DestinationCard';
import { DiscoveryService, type DiscoveryFilterOptions } from '../services/discoveryService';
import type { Destination, Category, Region } from '../types';
import { t, formatLocalizedCategory } from '../i18n/translations';

interface ExploreSectionProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  onSelectDestination: (destination: Destination) => void;
  savedDestinationIds: string[];
  onToggleSave: (id: string) => void;
  onPlanTripTo: (destination: Destination) => void;
  onViewOnMap?: (destination: Destination) => void;
  onAddToItinerary?: (destination: Destination) => void;
  onOpenVoiceGuide?: (destination: Destination) => void;
  currentItineraryDestIds?: string[];
  currentLanguage?: string;
}

const REGIONS: Region[] = [
  'All',
  'South Karnataka',
  'Malnad & Ghats',
  'Coastal Karavali',
  'North Karnataka'
];

const BUDGET_LEVELS = [
  { id: 'all', label: 'All Budgets' },
  { id: 'Budget', label: 'Budget (< ₹2,500/day)' },
  { id: 'Moderate', label: 'Comfort (₹2,500 - ₹3,500)' },
  { id: 'Luxury', label: 'Luxury (₹4,000+)' }
];

const DURATION_OPTIONS = [
  { id: 'all', label: 'Any Duration' },
  { id: '1-day', label: '1 Day Excursion' },
  { id: '2-days', label: '2 Days Weekend' },
  { id: '3-days-plus', label: '3+ Days Circuit' }
];

const CATEGORIES: Category[] = [
  'All',
  'Heritage',
  'Beaches',
  'Hill Stations',
  'Waterfalls',
  'Wildlife',
  'Temples',
  'Adventure',
  'Food',
  'Culture'
];

export const ExploreSection: React.FC<ExploreSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  onSelectDestination,
  savedDestinationIds,
  onToggleSave,
  onPlanTripTo,
  onViewOnMap,
  onAddToItinerary,
  onOpenVoiceGuide,
  currentItineraryDestIds = [],
  currentLanguage = 'en'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region>('All');
  const [selectedBudget, setSelectedBudget] = useState<'all' | 'Budget' | 'Moderate' | 'Luxury'>('all');
  const [selectedDuration, setSelectedDuration] = useState<'all' | '1-day' | '2-days' | '3-days-plus'>('all');
  const [onlyHiddenGems, setOnlyHiddenGems] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'popular' | 'budget_asc' | 'budget_desc' | 'duration'>('relevance');

  // Filter and score destinations using DiscoveryService
  const scoredDestinations = useMemo(() => {
    const filterOptions: DiscoveryFilterOptions = {
      searchQuery,
      category: selectedCategory,
      region: selectedRegion,
      budgetLevel: selectedBudget,
      duration: selectedDuration,
      onlyHiddenGems,
      sortBy
    };

    return DiscoveryService.filterAndScoreDestinations(filterOptions, DESTINATIONS);
  }, [searchQuery, selectedCategory, selectedRegion, selectedBudget, selectedDuration, onlyHiddenGems, sortBy]);

  // Curate "Beyond the Famous Places" section specifically
  const hiddenGems = useMemo(() => {
    return DiscoveryService.getHiddenGems({
      interests: selectedCategory !== 'All' ? [selectedCategory] : undefined,
      region: selectedRegion !== 'All' ? selectedRegion : undefined
    }, 6);
  }, [selectedCategory, selectedRegion]);

  const resetFilters = () => {
    setSearchQuery('');
    onSelectCategory('All');
    setSelectedRegion('All');
    setSelectedBudget('all');
    setSelectedDuration('all');
    setOnlyHiddenGems(false);
    setSortBy('relevance');
  };

  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    selectedCategory !== 'All' || 
    selectedRegion !== 'All' || 
    selectedBudget !== 'all' ||
    selectedDuration !== 'all' ||
    onlyHiddenGems ||
    sortBy !== 'relevance';

  return (
    <section id="explore-karnataka" className="py-16 sm:py-24 bg-[#FCFBF7] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-950 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>AI Discovery & Recommendations</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#062A20] font-royal tracking-tight">
            {t('explore_title', currentLanguage)}
          </h2>

          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            {t('explore_subtitle', currentLanguage)}
          </p>
        </div>

        {/* =========================================================================
            SEARCH & MULTI-FILTER CONTROL DASHBOARD
           ========================================================================= */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-md border border-slate-200/90 mb-12">
          
          {/* Top Row: Search Input + Sorting */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-emerald-700 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search_placeholder', currentLanguage)}
                className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 rounded-md text-xs"
                  aria-label="Clear search text"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Actions & Sorting Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Only Hidden Gems Toggle */}
              <button
                type="button"
                onClick={() => setOnlyHiddenGems(!onlyHiddenGems)}
                className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 transition-all border ${
                  onlyHiddenGems
                    ? 'bg-emerald-700 text-amber-300 border-emerald-800 shadow-sm'
                    : 'bg-emerald-50/80 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                }`}
                title="Filter solely uncrowded, lesser-known verified attractions"
              >
                <TreePine className="w-4 h-4 text-emerald-500" />
                <span>{t('hidden_gems_toggle', currentLanguage)}</span>
              </button>

              {/* Sorting Selector */}
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap hidden sm:inline">{t('sort_by', currentLanguage)}</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
                >
                  <option value="relevance">{t('ai_relevance_match', currentLanguage)}</option>
                  <option value="rating">{t('top_rated_stars', currentLanguage)}</option>
                  <option value="popular">{t('most_popular_reviews', currentLanguage)}</option>
                  <option value="budget_asc">{t('budget_low_high', currentLanguage)}</option>
                  <option value="budget_desc">{t('budget_high_low', currentLanguage)}</option>
                  <option value="duration">{t('ideal_duration_sort', currentLanguage)}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category / Interest Filter Chips */}
          <div className="pt-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>{t('interest_themes_heading', currentLanguage)}</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onSelectCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-800 text-amber-300 shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'All' ? t('all_interests_label', currentLanguage) : formatLocalizedCategory(cat, currentLanguage)}
                </button>
              ))}
            </div>
          </div>

          {/* Region and Duration Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 mt-4">
            {/* Regions */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>Geographic Region</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {REGIONS.map((region) => {
                  const regionLabel = 
                    region === 'All' ? t('region_all', currentLanguage) :
                    region === 'South Karnataka' ? t('region_south', currentLanguage) :
                    region === 'Malnad & Ghats' ? t('region_malnad', currentLanguage) :
                    region === 'Coastal Karavali' ? t('region_coastal', currentLanguage) :
                    region === 'North Karnataka' ? t('region_north', currentLanguage) : region;

                  return (
                    <button
                      key={region}
                      type="button"
                      onClick={() => setSelectedRegion(region)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedRegion === region
                          ? 'bg-[#062A20] text-amber-300 shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {regionLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Durations */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t('trip_duration_heading', currentLanguage)}</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {DURATION_OPTIONS.map((dur) => {
                  const durLabel = 
                    dur.id === 'all' ? t('duration_all_label', currentLanguage) :
                    dur.id === '1-day' ? t('duration_1day_label', currentLanguage) :
                    dur.id === '2-days' ? t('duration_2days_label', currentLanguage) :
                    dur.id === '3-days-plus' ? t('duration_3days_label', currentLanguage) : dur.label;

                  return (
                    <button
                      key={dur.id}
                      type="button"
                      onClick={() => setSelectedDuration(dur.id as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedDuration === dur.id
                          ? 'bg-amber-400 text-slate-950 font-bold shadow-2xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {durLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Budget Filter & Reset Row */}
          <div className="pt-4 space-y-2 border-t border-slate-100 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t('daily_budget_heading', currentLanguage)}
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('reset_all_filters', currentLanguage)}</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {BUDGET_LEVELS.map((tier) => {
                const budgetLabel =
                  tier.id === 'all' ? t('budget_all_label', currentLanguage) :
                  tier.id === 'Budget' ? t('budget_budget_label', currentLanguage) :
                  tier.id === 'Moderate' ? t('budget_comfort_label', currentLanguage) :
                  tier.id === 'Luxury' ? t('budget_luxury_label', currentLanguage) : tier.label;

                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedBudget(tier.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      selectedBudget === tier.id
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {budgetLabel}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* =========================================================================
            "BEYOND THE FAMOUS PLACES" — CURATED LESSER-KNOWN GEMS SECTION
           ========================================================================= */}
        {!onlyHiddenGems && searchQuery.trim() === '' && (
          <div className="mb-14 bg-gradient-to-br from-[#062A20] via-[#093528] to-[#041E17] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-700/40 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-60 h-60 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-400/30">
                    <TreePine className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t('beyond_famous_pill', currentLanguage)}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-royal tracking-wide">
                    {t('curated_wonders_heading', currentLanguage)}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-200/90 mt-1 max-w-2xl">
                    {t('curated_wonders_desc', currentLanguage)}
                  </p>
                </div>

                <div className="flex items-center space-x-2 self-start sm:self-auto">
                  <span className="text-xs text-amber-200 flex items-center space-x-1 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                    <span>ASI & Dept of Tourism Verified</span>
                  </span>
                </div>
              </div>

              {/* Grid of Hidden Gems */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hiddenGems.map(({ destination: gem, relevanceScore, relevanceExplanation }) => (
                  <DestinationCard
                    key={`gem-${gem.id}`}
                    destination={gem}
                    onSelect={onSelectDestination}
                    isSaved={savedDestinationIds.includes(gem.id)}
                    onToggleSave={onToggleSave}
                    onPlanTripTo={onPlanTripTo}
                    relevanceScore={relevanceScore}
                    relevanceExplanation={relevanceExplanation}
                    onViewOnMap={onViewOnMap}
                    onAddToItinerary={onAddToItinerary}
                    onOpenVoiceGuide={onOpenVoiceGuide}
                    isInCurrentItinerary={currentItineraryDestIds.includes(gem.id)}
                    currentLanguage={currentLanguage}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            MAIN RESULTS COUNTER & ACTIVE FILTER SUMMARY
           ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-bold text-slate-800">
              Showing <span className="text-emerald-700 font-extrabold">{scoredDestinations.length}</span> destination{scoredDestinations.length === 1 ? '' : 's'}
            </p>

            {selectedCategory !== 'All' && (
              <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Theme: {selectedCategory}
              </span>
            )}

            {selectedRegion !== 'All' && (
              <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Region: {selectedRegion}
              </span>
            )}

            {onlyHiddenGems && (
              <span className="bg-emerald-700 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                Hidden Gems Only
              </span>
            )}
          </div>

          <div className="text-xs text-slate-500">
            Click &ldquo;Details&rdquo; for cultural guidelines, nearby spots & audio guide
          </div>
        </div>

        {/* =========================================================================
            DESTINATION CARDS RESPONSIVE GRID
           ========================================================================= */}
        {scoredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {scoredDestinations.map(({ destination: dest, relevanceScore, relevanceExplanation }) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onSelect={onSelectDestination}
                isSaved={savedDestinationIds.includes(dest.id)}
                onToggleSave={onToggleSave}
                onPlanTripTo={onPlanTripTo}
                relevanceScore={relevanceScore}
                relevanceExplanation={relevanceExplanation}
                onViewOnMap={onViewOnMap}
                onAddToItinerary={onAddToItinerary}
                onOpenVoiceGuide={onOpenVoiceGuide}
                isInCurrentItinerary={currentItineraryDestIds.includes(dest.id)}
                currentLanguage={currentLanguage}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State with Friendly Fallback */
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-dashed border-slate-300 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-royal">
              No matching destinations found
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              We couldn't find any sights matching &ldquo;{searchQuery || selectedCategory}&rdquo;. Try adjusting the budget, region, or duration filters.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 px-6 py-2.5 bg-[#062A20] text-amber-300 font-bold rounded-xl text-sm hover:bg-[#0B3B2C] transition-all shadow-md inline-flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
