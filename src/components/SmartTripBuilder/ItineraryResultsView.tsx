import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Printer, 
  Heart, 
  CheckCircle2, 
  Car, 
  Utensils, 
  Sun, 
  ShieldCheck, 
  CheckSquare, 
  Square, 
  Edit3, 
  RefreshCw, 
  Trash2, 
  Map as MapIcon, 
  AlertTriangle, 
  IndianRupee,
  Zap,
  Columns,
  Mic
} from 'lucide-react';
import { InteractiveLeafletMap } from './InteractiveLeafletMap';
import { KarnatakaMapSection } from './KarnatakaMapSection';
import { ReplacePlaceModal } from './ReplacePlaceModal';
import { TravelBudgetDashboard } from './TravelBudgetDashboard';
import type { GeneratedItinerary, Destination, TripBuilderPreferences } from '../../types';
import { getLocalizedDestination } from '../../i18n/translations';

interface ItineraryResultsViewProps {
  itinerary: GeneratedItinerary;
  onModifyPreferences: () => void;
  onSelectDestination: (dest: Destination) => void;
  onSaveTrip: (title: string) => void;
  onBackToHome: () => void;
  isSaved: boolean;
  onRegenerateTrip: () => void;
  onReplaceDestination: (oldDestId: string, newDestId: string) => void;
  onRemoveDestination: (destId: string) => void;
  onOptimizeRoute?: () => void;
  onUpdateBudgetPreferences?: (updatedPrefs: Partial<TripBuilderPreferences>) => void;
  onOpenVoiceGuide?: (dest: Destination) => void;
  currentLanguage?: string;
}

export const ItineraryResultsView: React.FC<ItineraryResultsViewProps> = ({
  itinerary,
  onModifyPreferences,
  onSelectDestination,
  onSaveTrip,
  onBackToHome,
  isSaved,
  onRegenerateTrip,
  onReplaceDestination,
  onRemoveDestination,
  onOptimizeRoute,
  onUpdateBudgetPreferences,
  onOpenVoiceGuide,
  currentLanguage = 'en'
}) => {
  const [selectedDayTab, setSelectedDayTab] = useState<number | 'all'>('all');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showMap, setShowMap] = useState<boolean>(true);
  const [mapType, setMapType] = useState<'leaflet' | 'schematic'>('leaflet');
  const [isSplitView, setIsSplitView] = useState<boolean>(false);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [destinationToReplace, setDestinationToReplace] = useState<Destination | null>(null);
  const [activeSelectedDestId, setActiveSelectedDestId] = useState<string | null>(null);

  const toggleChecklist = (item: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleRegenerateClick = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      onRegenerateTrip();
      setIsRegenerating(false);
    }, 600);
  };

  const handleOptimizeClick = () => {
    if (onOptimizeRoute) {
      setIsOptimizing(true);
      setTimeout(() => {
        onOptimizeRoute();
        setIsOptimizing(false);
      }, 500);
    }
  };

  const handleDestinationCardClick = (dest: Destination) => {
    setActiveSelectedDestId(dest.id);
    onSelectDestination(dest);
  };

  const displayedDays = selectedDayTab === 'all' 
    ? itinerary.days 
    : itinerary.days.filter(d => d.dayNumber === selectedDayTab);

  return (
    <div className="min-h-screen bg-[#FCFBF7] py-8 sm:py-14">
      <div className={`${isSplitView ? 'max-w-[96vw]' : 'max-w-6xl'} mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300`}>
        
        {/* Navigation Breadcrumb Bar & Top Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200/80 gap-3 mb-8">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#062A20] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <span className="text-slate-300">/</span>
            <button
              onClick={onModifyPreferences}
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Preferences</span>
            </button>
          </div>

          {/* Quick Top Actions: Optimize, Regenerate, Map Toggle, Save, Print */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Functional Button: Optimize Route */}
            {onOptimizeRoute && (
              <button
                onClick={handleOptimizeClick}
                disabled={isOptimizing}
                className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 border border-amber-500/40 flex items-center space-x-1.5 transition-all shadow-2xs"
                title="Reorder stops using 2-opt heuristic to reduce driving kilometers"
              >
                <Zap className={`w-3.5 h-3.5 text-slate-950 ${isOptimizing ? 'animate-spin' : ''}`} />
                <span>{isOptimizing ? 'Optimizing...' : 'Optimize Route'}</span>
              </button>
            )}

            {/* Functional Button: Budget Dashboard */}
            <button
              onClick={() => {
                const el = document.getElementById('budget-dashboard-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 flex items-center space-x-1.5 transition-all shadow-2xs"
              title="Open Transparent Travel-Budget Dashboard"
            >
              <IndianRupee className="w-3.5 h-3.5 text-amber-800" />
              <span>Budget Planner</span>
            </button>

            {/* Functional Button: Regenerate Trip */}
            <button
              onClick={handleRegenerateClick}
              disabled={isRegenerating}
              className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center space-x-1.5 transition-all shadow-2xs"
              title="Recalculate day plans and route alternatives"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
              <span>{isRegenerating ? 'Re-ranking...' : 'Regenerate'}</span>
            </button>

            {/* Functional Button: View Map Toggle */}
            <button
              onClick={() => setShowMap(!showMap)}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 transition-all shadow-2xs ${
                showMap
                  ? 'bg-[#062A20] text-amber-300'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>{showMap ? 'Hide Map' : 'View Map'}</span>
            </button>

            {/* Split View Toggle (Desktop) */}
            {showMap && (
              <button
                onClick={() => setIsSplitView(!isSplitView)}
                className={`hidden lg:flex px-3 py-2 rounded-xl text-xs sm:text-sm font-bold items-center space-x-1.5 transition-all shadow-2xs ${
                  isSplitView
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
                title="Toggle side-by-side split screen with map"
              >
                <Columns className="w-3.5 h-3.5" />
                <span>{isSplitView ? 'Standard View' : 'Split View'}</span>
              </button>
            )}

            {/* Functional Button: Save Trip */}
            <button
              onClick={() => onSaveTrip(itinerary.title)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 shadow-2xs transition-all ${
                isSaved
                  ? 'bg-emerald-700 text-white'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save Trip'}</span>
            </button>

            {/* Functional Button: Print Itinerary */}
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs sm:text-sm font-semibold flex items-center space-x-1.5 shadow-2xs transition-colors"
              title="Print or export to PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Feasibility Warnings Banner */}
        {itinerary.feasibilityWarnings.length > 0 && (
          <div className="mb-8 space-y-3">
            {itinerary.feasibilityWarnings.map((warn, i) => (
              <div 
                key={i}
                className="p-4 sm:p-5 rounded-2xl bg-amber-50 border-2 border-amber-300/80 text-amber-950 flex items-start space-x-3.5 shadow-sm"
              >
                <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-amber-950 flex items-center space-x-2">
                    <span>{warn.title}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-900 mt-0.5 leading-relaxed">
                    {warn.message}
                  </p>
                  <p className="text-xs font-semibold text-emerald-900 mt-2 bg-emerald-100/60 p-2 rounded-xl border border-emerald-200/60">
                    💡 Smart AI Adjustment: {warn.suggestion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hero Itinerary Header Card */}
        <div className="bg-gradient-to-br from-[#062A20] via-[#0B3B2C] to-[#114B3A] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-400/40 relative overflow-hidden mb-8">
          <div className="relative z-10">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-sm">
                ✓ AI Verified Itinerary
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                Origin: {itinerary.startingLocation}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium border border-white/20">
                Pace: {itinerary.paceLabel}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-200 text-xs font-medium border border-emerald-500/20">
                {itinerary.destinationsCovered.length} Distinct Karnataka Region{itinerary.destinationsCovered.length > 1 ? 's' : ''}
              </span>
            </div>

            {/* Main Title & Kannada Title */}
            <h1 className="text-3xl sm:text-5xl font-extrabold font-royal tracking-tight text-white leading-tight">
              {itinerary.title}
            </h1>
            <p className="text-amber-300 text-lg sm:text-xl font-bold mt-1">
              {itinerary.kannadaTitle}
            </p>

            <p className="text-emerald-100/90 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
              {itinerary.summary}
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-8 pt-6 border-t border-emerald-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
              <div className="bg-emerald-950/50 p-3.5 rounded-2xl border border-emerald-800/50">
                <p className="text-[11px] text-emerald-300/80 uppercase font-semibold">Total Duration</p>
                <p className="text-xl font-extrabold text-white mt-0.5">{itinerary.totalDays} Days</p>
              </div>

              <div className="bg-emerald-950/50 p-3.5 rounded-2xl border border-emerald-800/50">
                <p className="text-[11px] text-emerald-300/80 uppercase font-semibold">Estimated Cost</p>
                <p className="text-xl font-extrabold text-amber-300 mt-0.5">{itinerary.estimatedCostTotal}</p>
                <p className="text-[10px] text-emerald-400 font-medium">({itinerary.costPerPerson} / person)</p>
              </div>

              <div className="bg-emerald-950/50 p-3.5 rounded-2xl border border-emerald-800/50">
                <p className="text-[11px] text-emerald-300/80 uppercase font-semibold">Travelers</p>
                <p className="text-xl font-extrabold text-white mt-0.5">{itinerary.groupSize} ({itinerary.travelerLabel})</p>
              </div>

              <div className="bg-emerald-950/50 p-3.5 rounded-2xl border border-emerald-800/50">
                <p className="text-[11px] text-emerald-300/80 uppercase font-semibold">Transport Mode</p>
                <p className="text-xl font-extrabold text-white mt-0.5">{itinerary.transportLabel}</p>
              </div>
            </div>

          </div>

          <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Real Interactive Leaflet OpenStreetMap Map Section */}
        {showMap && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Karnataka OpenStreetMap & OSRM Routing
                </span>
              </div>

              {/* Map Type Switcher */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-700">
                <button
                  onClick={() => setMapType('leaflet')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    mapType === 'leaflet' ? 'bg-[#062A20] text-amber-300 font-bold shadow-2xs' : 'hover:text-slate-900'
                  }`}
                >
                  Interactive Leaflet
                </button>
                <button
                  onClick={() => setMapType('schematic')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    mapType === 'schematic' ? 'bg-[#062A20] text-amber-300 font-bold shadow-2xs' : 'hover:text-slate-900'
                  }`}
                >
                  Regional Corridor
                </button>
              </div>
            </div>

            {mapType === 'leaflet' ? (
              <InteractiveLeafletMap
                itinerary={itinerary}
                selectedDestinationId={activeSelectedDestId}
                onSelectDestination={handleDestinationCardClick}
                onOpenVoiceGuide={onOpenVoiceGuide}
              />
            ) : (
              <KarnatakaMapSection
                itinerary={itinerary}
                onSelectDestination={handleDestinationCardClick}
              />
            )}
          </div>
        )}

        {/* Main Content Layout (Supports Side-by-Side Split View on Desktop) */}
        <div className={isSplitView ? 'grid grid-cols-1 lg:grid-cols-12 gap-8' : 'space-y-8'}>
          
          {/* Left Column: Itinerary Details & Day-by-Day (7 cols in Split View) */}
          <div className={isSplitView ? 'lg:col-span-7 space-y-8' : 'space-y-8'}>
            
            {/* Travel-Budget Planning & Expense Transparency Dashboard */}
            <div id="budget-dashboard-section" className="scroll-mt-6">
              <TravelBudgetDashboard
                itinerary={itinerary}
                onUpdatePreferences={onUpdateBudgetPreferences || (() => {})}
              />
            </div>

            {/* Covered Destinations Cards */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold font-royal text-[#062A20]">
                    Curated Circuit Destinations
                  </h3>
                  <p className="text-xs text-slate-500">
                    Click any card to highlight on the interactive map or replace with an alternative.
                  </p>
                </div>
                <span className="text-xs bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-full">
                  {itinerary.destinationsCovered.length} Place{itinerary.destinationsCovered.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-4">
                {itinerary.destinationsCovered.map((dest, idx) => {
                  const rec = itinerary.destinationRecommendations.find(r => r.destinationId === dest.id);
                  const isCardSelected = activeSelectedDestId === dest.id;

                  return (
                    <div 
                      key={dest.id}
                      onClick={() => handleDestinationCardClick(dest)}
                      className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-5 ${
                        isCardSelected 
                          ? 'border-amber-400 ring-4 ring-amber-400/40 shadow-xl' 
                          : 'border-slate-200/90 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start space-x-4 flex-1">
                        <img
                          src={dest.heroImage}
                          alt={dest.name}
                          className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover flex-shrink-0 border border-slate-200"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = dest.fallbackImage;
                          }}
                        />
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="w-6 h-6 rounded-full bg-[#062A20] text-amber-300 font-bold text-xs flex items-center justify-center">
                              {idx + 1}
                            </span>
                            {(() => {
                              const loc = getLocalizedDestination(dest, currentLanguage);
                              return (
                                <>
                                  <h4 className="font-bold text-slate-900 text-lg font-royal">
                                    {currentLanguage === 'en' ? dest.name : loc.name}
                                  </h4>
                                  {currentLanguage !== 'en' && loc.name !== dest.name && (
                                    <span className="text-xs text-slate-500 font-medium">({dest.name})</span>
                                  )}
                                  <span className="text-xs text-amber-700 font-semibold">
                                    ({dest.kannadaName})
                                  </span>
                                </>
                              );
                            })()}
                            {rec && (
                              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2 py-0.5 rounded-full">
                                {rec.matchScore}% Match
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-500 flex items-center space-x-2">
                            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                            <span>{dest.district} District</span>
                            <span>•</span>
                            <span className="font-semibold text-slate-700">{dest.region}</span>
                          </p>

                          {rec && (
                            <div className="p-2.5 rounded-xl bg-[#FCFBF7] border border-slate-200 text-xs text-slate-700 mt-2 leading-relaxed">
                              <span className="font-bold text-emerald-900">Why recommended: </span>
                              <span>{rec.whyRecommended}</span>
                            </div>
                          )}

                          {rec?.travelCorridorFromPrevious && (
                            <p className="text-[11px] text-amber-800 font-medium flex items-center space-x-1 mt-1">
                              <Car className="w-3.5 h-3.5 text-amber-600" />
                              <span>Corridor transit: {rec.travelCorridorFromPrevious}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col items-center justify-end gap-2 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 flex-shrink-0" onClick={e => e.stopPropagation()}>
                        {onOpenVoiceGuide && (
                          <button
                            type="button"
                            onClick={() => onOpenVoiceGuide(dest)}
                            className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-colors shadow-2xs"
                            title={`Listen to Voice Guide for ${dest.name}`}
                          >
                            <Mic className="w-3.5 h-3.5" />
                            <span>Voice</span>
                          </button>
                        )}

                        <button
                          onClick={() => setDestinationToReplace(dest)}
                          className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs border border-amber-300 flex items-center space-x-1.5 transition-colors shadow-2xs"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-amber-700" />
                          <span>Replace</span>
                        </button>

                        {itinerary.destinationsCovered.length > 1 && (
                          <button
                            onClick={() => onRemoveDestination(dest.id)}
                            className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-700 font-semibold text-xs border border-slate-200 hover:border-rose-300 flex items-center space-x-1.5 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Day-by-Day Experience Schedule */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-royal text-[#062A20]">
                    Day-by-Day Experience Schedule
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Morning, afternoon, and evening slots sequenced for daylight, darshan timings & dining.
                  </p>
                </div>

                <div className="flex items-center space-x-1.5 overflow-x-auto pb-2 sm:pb-0">
                  <button
                    type="button"
                    onClick={() => setSelectedDayTab('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      selectedDayTab === 'all'
                        ? 'bg-[#062A20] text-amber-300'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    All Days ({itinerary.days.length})
                  </button>

                  {itinerary.days.map((day) => (
                    <button
                      key={day.dayNumber}
                      type="button"
                      onClick={() => setSelectedDayTab(day.dayNumber)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        selectedDayTab === day.dayNumber
                          ? 'bg-[#062A20] text-amber-300'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Day {day.dayNumber}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-8 mt-6">
                {displayedDays.map((day) => (
                  <div 
                    key={day.dayNumber}
                    className="bg-[#FCFBF7] rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-2xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200/80 gap-3 mb-5">
                      <div className="flex items-center space-x-3.5">
                        <span className="w-10 h-10 rounded-2xl bg-[#062A20] text-amber-400 font-extrabold flex items-center justify-center font-royal text-base shadow-sm">
                          D{day.dayNumber}
                        </span>
                        <div>
                          <h3 className="text-xl font-bold font-royal text-slate-900">
                            {day.dayTitle}
                          </h3>
                          <p className="text-xs text-amber-800 font-semibold">{day.kannadaDayTitle}</p>
                        </div>
                      </div>

                      <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full self-start sm:self-auto">
                        Base: {day.destinationName}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Morning */}
                      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider flex items-center space-x-1">
                              <Sun className="w-3.5 h-3.5 text-amber-500" />
                              <span>Morning</span>
                            </span>
                            <span className="text-[11px] font-semibold text-slate-400">{day.morning.timing}</span>
                          </div>

                          <h4 className="font-bold text-slate-900 text-sm mb-1">{day.morning.title}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">{day.morning.description}</p>

                          {day.morning.visitDuration && (
                            <p className="text-[11px] text-slate-400 mt-2 flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>Visit: {day.morning.visitDuration}</span>
                            </p>
                          )}
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1">
                          {day.morning.recommendedMealSpot && (
                            <div className="text-[11px] text-amber-900 font-medium flex items-start space-x-1.5">
                              <Utensils className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                              <span>{day.morning.recommendedMealSpot}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Afternoon */}
                      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider flex items-center space-x-1">
                              <Clock className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Afternoon</span>
                            </span>
                            <span className="text-[11px] font-semibold text-slate-400">{day.afternoon.timing}</span>
                          </div>

                          <h4 className="font-bold text-slate-900 text-sm mb-1">{day.afternoon.title}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">{day.afternoon.description}</p>

                          {day.afternoon.visitDuration && (
                            <p className="text-[11px] text-slate-400 mt-2 flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>Visit: {day.afternoon.visitDuration}</span>
                            </p>
                          )}
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1">
                          {day.afternoon.recommendedMealSpot && (
                            <div className="text-[11px] text-emerald-900 font-medium flex items-start space-x-1.5">
                              <Utensils className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span>{day.afternoon.recommendedMealSpot}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Evening */}
                      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider flex items-center space-x-1">
                              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                              <span>Evening</span>
                            </span>
                            <span className="text-[11px] font-semibold text-slate-400">{day.evening.timing}</span>
                          </div>

                          <h4 className="font-bold text-slate-900 text-sm mb-1">{day.evening.title}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">{day.evening.description}</p>

                          {day.evening.visitDuration && (
                            <p className="text-[11px] text-slate-400 mt-2 flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>Visit: {day.evening.visitDuration}</span>
                            </p>
                          )}
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1">
                          {day.evening.recommendedMealSpot && (
                            <div className="text-[11px] text-indigo-900 font-medium flex items-start space-x-1.5">
                              <Utensils className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0 mt-0.5" />
                              <span>{day.evening.recommendedMealSpot}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-2">
                      <div className="flex items-center space-x-2">
                        <Car className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                        <span>{day.transportAdvice}</span>
                      </div>
                      <div className="text-slate-500">
                        Day Budget: <span className="font-bold text-slate-800">₹{day.estimatedDayCost.toLocaleString('en-IN')}</span> / person
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Map in Split View Mode (5 cols) OR Checklist in standard view */}
          {isSplitView && showMap ? (
            <div className="lg:col-span-5 sticky top-24 self-start space-y-6">
              <InteractiveLeafletMap
                itinerary={itinerary}
                selectedDestinationId={activeSelectedDestId}
                onSelectDestination={handleDestinationCardClick}
                isExpanded={true}
                onToggleExpand={() => setIsSplitView(false)}
                className="h-[calc(100vh-140px)]"
              />
            </div>
          ) : null}

        </div>

        {/* Travel Preparation Grid: Interactive Checklist & Weather Advisory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold font-royal text-[#062A20] mb-2 flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>Personalized Packing Checklist</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Tick off items as you pack for your Karnataka trip:
            </p>

            <div className="space-y-2.5">
              {itinerary.packingList.map((item, idx) => {
                const isChecked = !!checkedItems[item];

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleChecklist(item)}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-start space-x-2.5 transition-all ${
                      isChecked 
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-semibold line-through opacity-75' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <div className="mt-0.5">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold font-royal text-[#062A20] mb-2 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span>Verified Travel Advisory</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Important local regulations and assistance lines:
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80">
                  <span className="font-bold text-amber-950">Temple Attire Rule: </span>
                  <span className="text-amber-900">Modest dress code in ancient sanctums. Traditional dhotis/sarees or pants/kurtas required.</span>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/80">
                  <span className="font-bold text-emerald-950">Western Ghats Plastic Ban: </span>
                  <span className="text-emerald-900">Carry your trash back from waterfalls and forest trails. Help keep the Sahyadris pristine.</span>
                </div>

                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200/80">
                  <span className="font-bold text-blue-950">24x7 Tourist Helpline: </span>
                  <span className="text-blue-900">Dial <span className="font-bold">1363</span> (KSTDC Tourist Police) or <span className="font-bold">112</span> for immediate emergency aid.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={onModifyPreferences}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center space-x-1.5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Parameters</span>
              </button>

              <button
                onClick={onBackToHome}
                className="px-5 py-2.5 rounded-xl bg-[#062A20] hover:bg-[#0B3B2C] text-amber-300 font-bold text-xs shadow-md transition-colors"
              >
                Done / Explore More
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Replace Place Modal */}
      <ReplacePlaceModal
        isOpen={!!destinationToReplace}
        onClose={() => setDestinationToReplace(null)}
        destinationToReplace={destinationToReplace}
        alternatives={itinerary.alternatives}
        onConfirmReplace={onReplaceDestination}
      />

    </div>
  );
};
