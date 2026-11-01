import React, { useState } from 'react';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  Star, 
  ArrowUpRight, 
  Clock, 
  Sparkles,
  Map,
  PlusCircle,
  CheckCircle2,
  Users,
  Compass,
  Mic
} from 'lucide-react';
import type { Destination } from '../types';
import { 
  t, 
  getLocalizedDestination,
  formatLocalizedDuration,
  formatLocalizedBudget,
  formatLocalizedSeason,
  formatLocalizedPeople,
  formatLocalizedCrowd,
  formatLocalizedRegion,
  formatLocalizedCategory
} from '../i18n/translations';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (destination: Destination) => void;
  isSaved: boolean;
  onToggleSave: (destinationId: string) => void;
  onPlanTripTo: (destination: Destination) => void;
  relevanceScore?: number;
  relevanceExplanation?: string;
  onViewOnMap?: (destination: Destination) => void;
  onAddToItinerary?: (destination: Destination) => void;
  onOpenVoiceGuide?: (destination: Destination) => void;
  isInCurrentItinerary?: boolean;
  currentLanguage?: string;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onSelect,
  isSaved,
  onToggleSave,
  onPlanTripTo,
  relevanceScore,
  relevanceExplanation,
  onViewOnMap,
  onAddToItinerary,
  onOpenVoiceGuide,
  isInCurrentItinerary = false,
  currentLanguage = 'en'
}) => {
  const [imgError, setImgError] = useState(false);
  const loc = getLocalizedDestination(destination, currentLanguage);

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-emerald-600">
      
      {/* Destination Image Area */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={() => onSelect(destination)}>
        <img
          src={imgError ? destination.fallbackImage : destination.heroImage}
          alt={`Authentic scenery of ${destination.name}, ${destination.district}, Karnataka`}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Gradient Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto">
            {/* Region pill */}
            <span className="bg-[#062A20]/90 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/40 shadow-sm flex items-center space-x-1">
              <span>{loc.region || formatLocalizedRegion(destination.region, currentLanguage)}</span>
            </span>

            {/* Hidden Gem tranquil badge if verified lesser-known */}
            {destination.isLesserKnownGem && (
              <span className="bg-emerald-600/95 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center space-x-1 border border-emerald-400/50">
                <Compass className="w-3 h-3 text-amber-300" />
                <span>{t('badge_hidden_gem', currentLanguage)}</span>
              </span>
            )}

            {/* Category tag */}
            <span className="bg-slate-900/80 backdrop-blur-md text-emerald-200 text-xs font-medium px-2.5 py-1 rounded-full border border-emerald-500/30">
              {formatLocalizedCategory(destination.category[0], currentLanguage)}
            </span>
          </div>

          {/* Save / Favorite Button with Accessible Hit Area */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(destination.id);
            }}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-transform active:scale-90 shadow-md backdrop-blur-md pointer-events-auto ${
              isSaved 
                ? 'bg-rose-500 text-white' 
                : 'bg-white/90 hover:bg-white text-slate-700 hover:text-rose-500'
            }`}
            aria-label={isSaved ? `Remove ${destination.name} from saved trips` : `Save ${destination.name} to my trips`}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Match Score Badge (if available) */}
        {relevanceScore !== undefined && (
          <div className="absolute top-16 left-4 pointer-events-none">
            <div className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow-lg border border-amber-300/40">
              <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-pulse" />
              <span>{relevanceScore}% {t('badge_match', currentLanguage)}</span>
            </div>
          </div>
        )}

        {/* Bottom Banner Content on Image */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide font-royal">
                  {currentLanguage === 'en' ? destination.name : loc.name}
                </h3>
                {currentLanguage === 'en' ? (
                  destination.kannadaName && (
                    <span className="text-amber-300 text-base font-semibold">
                      {destination.kannadaName}
                    </span>
                  )
                ) : (
                  loc.name !== destination.name && (
                    <span className="text-amber-300 text-sm font-semibold opacity-90">
                      ({destination.name})
                    </span>
                  )
                )}
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/90 flex items-center space-x-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>{currentLanguage === 'en' ? destination.district : (loc.district || destination.district)}</span>
                {destination.crowdLevel && (
                  <>
                    <span>•</span>
                    <span className="text-amber-200 text-xs">{formatLocalizedCrowd(destination.crowdLevel, currentLanguage)}</span>
                  </>
                )}
              </p>
            </div>

            {/* Rating pill */}
            <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/20 flex-shrink-0">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold text-white">{destination.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Tagline */}
          <p className="text-emerald-950 font-bold text-sm sm:text-base leading-snug">
            {loc.tagline}
          </p>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {destination.description}
          </p>

          {/* Why Recommended Callout (if passed) */}
          {relevanceExplanation && (
            <div className="mt-3 p-2.5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-950 text-xs flex items-start space-x-2 leading-relaxed">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-900">{t('why_recommended', currentLanguage)} </span>
                <span className="text-amber-900/90">{relevanceExplanation}</span>
              </div>
            </div>
          )}

          {/* Quick Metrics Grid */}
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-2 text-slate-700 bg-[#FCFBF7] p-2.5 rounded-xl border border-slate-100">
              <Clock className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-medium">{t('card_ideal_stay', currentLanguage)}</p>
                <p className="font-bold text-slate-900">{formatLocalizedDuration(destination.idealDays, currentLanguage)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-slate-700 bg-[#FCFBF7] p-2.5 rounded-xl border border-slate-100">
              <IndianRupee className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 font-medium">{t('card_budget', currentLanguage)}</p>
                <p className="font-bold text-slate-900">{formatLocalizedBudget(destination.estimatedBudget, currentLanguage)}</p>
              </div>
            </div>

            <div className="col-span-2 flex items-center space-x-2 text-slate-700 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100/60">
              <Calendar className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <div className="flex items-center justify-between w-full">
                <span className="text-[11px] text-emerald-900 font-medium">{t('best_season', currentLanguage)}</span>
                <span className="text-[11px] font-bold text-emerald-800">{formatLocalizedSeason(destination.bestTimeToVisit, currentLanguage)}</span>
              </div>
            </div>

            {destination.travellerSuitability && destination.travellerSuitability.length > 0 && (
              <div className="col-span-2 flex items-center space-x-2 text-slate-600 bg-slate-50 p-2 rounded-xl text-[11px]">
                <Users className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="truncate">
                  <span className="font-semibold text-slate-700">{t('best_for', currentLanguage)} </span>
                  {formatLocalizedPeople(destination.travellerSuitability.slice(0, 3), currentLanguage).join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Card Actions Toolbar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center space-x-2">
          {/* View Details Primary Action */}
          <button
            type="button"
            onClick={() => onSelect(destination)}
            className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm bg-[#062A20] hover:bg-[#0B3B2C] text-white flex items-center justify-center space-x-1.5 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            aria-label={`View details and attractions for ${destination.name}`}
          >
            <span>{t('card_guide', currentLanguage)}</span>
            <ArrowUpRight className="w-4 h-4 text-amber-300" />
          </button>

          {/* Voice Guide Action */}
          {onOpenVoiceGuide && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenVoiceGuide(destination);
              }}
              className="py-2.5 px-3 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center space-x-1 transition-all shadow-sm active:scale-95 border border-amber-500/30"
              title={`Listen to Yatra Voice Guide in 6 languages for ${destination.name}`}
              aria-label={`Listen to voice guide for ${destination.name}`}
            >
              <Mic className="w-3.5 h-3.5 text-slate-950" />
              <span>{t('card_voice', currentLanguage)}</span>
            </button>
          )}

          {/* View on Map Action */}
          {onViewOnMap && (
            <button
              type="button"
              onClick={() => onViewOnMap(destination)}
              className="py-2.5 px-3 rounded-xl font-semibold text-xs bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 transition-colors flex items-center justify-center space-x-1"
              title={`View ${destination.name} coordinates on Karnataka map`}
              aria-label={`View ${destination.name} on map`}
            >
              <Map className="w-4 h-4 text-emerald-700" />
              <span>{t('card_map', currentLanguage)}</span>
            </button>
          )}

          {/* Add to Itinerary / Plan Trip CTA */}
          {onAddToItinerary ? (
            <button
              type="button"
              onClick={() => onAddToItinerary(destination)}
              className={`py-2.5 px-3 rounded-xl font-semibold text-xs border flex items-center justify-center space-x-1 transition-all ${
                isInCurrentItinerary
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300/80'
              }`}
              title={isInCurrentItinerary ? `Already in current itinerary` : `Add ${destination.name} to itinerary`}
              aria-label={`Add ${destination.name} to itinerary`}
            >
              {isInCurrentItinerary ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t('card_in_trip', currentLanguage)}</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-3.5 h-3.5 text-amber-700" />
                  <span>{t('card_add_trip', currentLanguage)}</span>
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onPlanTripTo(destination)}
              className="py-2.5 px-3 rounded-xl font-semibold text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300/80 flex items-center justify-center space-x-1 transition-colors"
              title={`Start planning itinerary for ${destination.name}`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{t('modal_plan_trip', currentLanguage)}</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
