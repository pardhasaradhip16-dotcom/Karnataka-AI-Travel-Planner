import React, { useEffect, useMemo } from 'react';
import { 
  X, 
  MapPin, 
  Star, 
  Calendar, 
  Clock, 
  IndianRupee, 
  Heart, 
  Sparkles, 
  Compass, 
  Utensils, 
  Lightbulb, 
  CheckCircle2, 
  Navigation,
  ShieldCheck,
  AlertTriangle,
  Scroll,
  Map,
  PlusCircle,
  ArrowRight,
  Mic
} from 'lucide-react';
import type { Destination } from '../types';
import { DiscoveryService } from '../services/discoveryService';
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

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onPlanTripTo: (destination: Destination) => void;
  onSelectNearby?: (destination: Destination) => void;
  onViewOnMap?: (destination: Destination) => void;
  onAddToItinerary?: (destination: Destination) => void;
  onOpenVoiceGuide?: (destination: Destination) => void;
  isInCurrentItinerary?: boolean;
  currentLanguage?: string;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  isSaved,
  onToggleSave,
  onPlanTripTo,
  onSelectNearby,
  onViewOnMap,
  onAddToItinerary,
  onOpenVoiceGuide,
  isInCurrentItinerary = false,
  currentLanguage = 'en'
}) => {
  const loc = destination ? getLocalizedDestination(destination, currentLanguage) : null;
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (destination) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [destination, onClose]);

  // Compute verified nearby attractions using real geographic coordinates
  const nearbyDestinations = useMemo(() => {
    if (!destination) return [];
    return DiscoveryService.getNearbyDestinations(destination.id, 140);
  }, [destination]);

  if (!destination) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Bar for Close & Actions */}
        <div className="absolute top-4 right-4 z-20 flex items-center space-x-2">
          {/* Save Button */}
          <button
            onClick={() => onToggleSave(destination.id)}
            className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-transform active:scale-95 ${
              isSaved 
                ? 'bg-rose-500 text-white' 
                : 'bg-white/90 hover:bg-white text-slate-800 hover:text-rose-600'
            }`}
            aria-label={isSaved ? "Saved to trips" : "Save destination"}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-colors"
            aria-label="Close details modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Container */}
        <div className="overflow-y-auto">
          {/* Hero Banner Header */}
          <div className="relative h-72 sm:h-96 w-full bg-slate-900">
            <img
              src={destination.heroImage}
              alt={destination.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = destination.fallbackImage;
              }}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {loc?.region || formatLocalizedRegion(destination.region, currentLanguage)}
                </span>

                {destination.isLesserKnownGem && (
                  <span className="bg-emerald-600/90 text-white text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/40 flex items-center space-x-1">
                    <Compass className="w-3.5 h-3.5 text-amber-300" />
                    <span>{t('badge_hidden_gem', currentLanguage)}</span>
                  </span>
                )}

                {destination.category.map((cat) => (
                  <span key={cat} className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white/20">
                    {formatLocalizedCategory(cat, currentLanguage)}
                  </span>
                ))}
              </div>

              <div className="flex items-baseline space-x-3 flex-wrap">
                <h2 id="modal-title" className="text-3xl sm:text-5xl font-extrabold text-white font-royal tracking-wide">
                  {currentLanguage === 'en' ? destination.name : (loc?.name || destination.name)}
                </h2>
                {currentLanguage !== 'en' && loc?.name !== destination.name && (
                  <span className="text-amber-200 text-lg sm:text-2xl font-semibold">
                    ({destination.name})
                  </span>
                )}
                <span className="text-amber-300 text-xl sm:text-2xl font-bold">
                  {destination.kannadaName}
                </span>
              </div>

              <div className="text-emerald-200 text-xs sm:text-sm mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{loc?.district || destination.district} District, Karnataka</span>
                </div>
                <span>•</span>
                <span>{destination.coordinatesNote}</span>
                {destination.coordinates && (
                  <>
                    <span>•</span>
                    <span className="text-amber-300 font-mono text-[11px]">
                      {destination.coordinates.lat.toFixed(4)}°N, {destination.coordinates.lng.toFixed(4)}°E
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Modal Content Sections */}
          <div className="p-6 sm:p-8 space-y-8 bg-[#FCFBF7]">
            
            {/* Quick Facts Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <div className="flex items-center space-x-3 p-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">{t('traveller_rating', currentLanguage)}</p>
                  <p className="font-bold text-slate-900 text-sm">{destination.rating.toFixed(1)} / 5.0 ({destination.reviewsCount}+)</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">{t('recommended_time', currentLanguage)}</p>
                  <p className="font-bold text-slate-900 text-sm">{formatLocalizedDuration(destination.idealDays, currentLanguage)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-2">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
                  <IndianRupee className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">{t('average_budget', currentLanguage)}</p>
                  <p className="font-bold text-slate-900 text-sm">{formatLocalizedBudget(destination.estimatedBudget, currentLanguage)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-2">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-medium">{t('ideal_season', currentLanguage)}</p>
                  <p className="font-bold text-slate-900 text-sm">{formatLocalizedSeason(destination.bestTimeToVisit, currentLanguage)}</p>
                </div>
              </div>
            </div>

            {/* Overview & Cultural Significance */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-[#062A20] font-royal flex items-center space-x-2">
                <Compass className="w-5 h-5 text-emerald-700" />
                <span>{t('about_place', currentLanguage)} {loc?.name || destination.name}</span>
              </h3>
              <p className="text-slate-700 leading-relaxed text-base">
                {destination.description}
              </p>
              
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-950 flex items-start space-x-3">
                <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sm">{t('significance_label', currentLanguage)} </span>
                  <span className="text-sm">{destination.significance}</span>
                </div>
              </div>
            </div>

            {/* Verification Metadata & Responsible Tourism Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Seasonal Advisory & Restrictions */}
              {destination.seasonalNotice && (
                <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl text-amber-950">
                  <div className="flex items-center space-x-2 font-bold text-sm mb-1.5 text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>{t('seasonal_advisory', currentLanguage)}</span>
                  </div>
                  <p className="text-xs text-amber-900/90 leading-relaxed">
                    {destination.seasonalNotice}
                  </p>
                </div>
              )}

              {/* Verified Authority Source */}
              <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl text-emerald-950">
                <div className="flex items-center space-x-2 font-bold text-sm mb-1.5 text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>{t('verified_source', currentLanguage)}</span>
                </div>
                <p className="text-xs text-emerald-900/90 leading-relaxed">
                  {destination.verifiedAuthority || 'Archaeological Survey of India (ASI) & Karnataka State Tourism Department'}
                </p>
                <p className="text-[11px] text-emerald-700 mt-1">
                  {t('crowd_density', currentLanguage)} <span className="font-semibold">{formatLocalizedCrowd(destination.crowdLevel, currentLanguage) || 'Standard'}</span> • {t('terrain', currentLanguage)} <span className="font-semibold">{destination.accessibilityRating}</span>
                </p>
              </div>
            </div>

            {/* Cultural Etiquette & Responsible Tourism Guidelines */}
            {destination.culturalEtiquette && destination.culturalEtiquette.length > 0 && (
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center space-x-2 font-bold text-slate-900 text-sm">
                  <Scroll className="w-4 h-4 text-emerald-700" />
                  <span>{t('cultural_guidelines', currentLanguage)}</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {destination.culturalEtiquette.map((rule, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Top Attractions Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#062A20] font-royal flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span>{t('key_highlights', currentLanguage)}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {destination.topAttractions.map((attraction, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-slate-900 text-sm">{attraction.name}</h4>
                        <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-full">
                          #{idx + 1}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1">
                        {attraction.description}
                      </p>
                    </div>
                    {attraction.timing && (
                      <p className="mt-3 text-[11px] text-emerald-700 font-medium flex items-center space-x-1 pt-2 border-t border-slate-100">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Timings: {attraction.timing}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Nearby Attractions (Calculated from Coordinates) */}
            {nearbyDestinations.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#062A20] font-royal flex items-center space-x-2">
                    <Navigation className="w-5 h-5 text-amber-600" />
                    <span>{t('nearby_heading', currentLanguage)}</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">{t('calculated_coords', currentLanguage)}</span>
                </div>
                <p className="text-xs text-slate-600">
                  {t('combine_with', currentLanguage)}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {nearbyDestinations.slice(0, 3).map(({ destination: nearby, distanceKm }) => {
                    const nearbyLoc = getLocalizedDestination(nearby, currentLanguage);
                    return (
                      <div 
                        key={nearby.id}
                        onClick={() => onSelectNearby && onSelectNearby(nearby)}
                        className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer p-3 flex flex-col justify-between hover:border-emerald-500/50"
                      >
                        <div className="flex items-center space-x-3">
                          <img 
                            src={nearby.heroImage} 
                            alt={nearby.name}
                            className="w-14 h-14 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                          />
                          <div className="overflow-hidden">
                            <h4 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 truncate">
                              {nearbyLoc.name}
                            </h4>
                            <p className="text-xs text-slate-500 truncate">{nearbyLoc.district} District</p>
                            <div className="flex items-center space-x-1 text-xs text-amber-700 font-bold mt-0.5">
                              <MapPin className="w-3 h-3 text-amber-600" />
                              <span>{distanceKm} {t('km_away', currentLanguage)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-800 font-semibold">
                          <span>{nearby.isLesserKnownGem ? `🌿 ${t('badge_hidden_gem', currentLanguage)}` : formatLocalizedCategory(nearby.category[0], currentLanguage)}</span>
                          <span className="flex items-center space-x-1 text-slate-500 group-hover:text-emerald-700">
                            <span>{t('view_action', currentLanguage)}</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Local Gastronomy & Delicacies */}
            <div className="space-y-3 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 p-5 rounded-3xl border border-amber-200/80">
              <h3 className="text-lg font-bold text-amber-950 font-royal flex items-center space-x-2">
                <Utensils className="w-5 h-5 text-amber-700" />
                <span>{t('local_flavours', currentLanguage)}</span>
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {destination.localDelicacies.map((dish, i) => (
                  <span 
                    key={i} 
                    className="bg-white text-amber-900 text-xs font-semibold px-3 py-1.5 rounded-xl border border-amber-200 shadow-2xs"
                  >
                    🍴 {dish}
                  </span>
                ))}
              </div>
            </div>

            {/* Travel Advice & Tips */}
            <div className="space-y-3 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 font-royal flex items-center space-x-2">
                <Navigation className="w-5 h-5 text-emerald-700" />
                <span>{t('travel_tips_heading', currentLanguage)}</span>
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {destination.travelTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Modal Sticky Bottom Actions Bar */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{t('suitability', currentLanguage)} </span>
            <span>{destination.travellerSuitability ? formatLocalizedPeople(destination.travellerSuitability, currentLanguage).join(', ') : t('all_travelers', currentLanguage)}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
            {/* View on Map Button */}
            {onViewOnMap && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onViewOnMap(destination);
                }}
                className="px-4 py-2.5 rounded-xl border border-slate-300 font-semibold text-xs sm:text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center space-x-1.5"
              >
                <Map className="w-4 h-4 text-emerald-700" />
                <span>{t('view_on_map', currentLanguage)}</span>
              </button>
            )}

            {/* Listen to the Story (Voice Guide AI) Button */}
            {onOpenVoiceGuide && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenVoiceGuide(destination);
                }}
                className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-md flex items-center space-x-1.5 transition-all transform hover:-translate-y-0.5"
                title={`Listen to Yatra Voice Guide in 6 languages for ${destination.name}`}
              >
                <Mic className="w-4 h-4 text-slate-950" />
                <span>{t('voice_guide', currentLanguage)}</span>
              </button>
            )}

            {/* Add to Current Itinerary Button (if available) */}
            {onAddToItinerary && (
              <button
                type="button"
                onClick={() => {
                  onAddToItinerary(destination);
                }}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-1.5 transition-all ${
                  isInCurrentItinerary
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm'
                }`}
              >
                {isInCurrentItinerary ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>{t('in_trip', currentLanguage)}</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4 text-amber-300" />
                    <span>{t('add_to_trip', currentLanguage)}</span>
                  </>
                )}
              </button>
            )}

            {/* Plan Trip CTA */}
            <button
              onClick={() => {
                onClose();
                onPlanTripTo(destination);
              }}
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-[#062A20] shadow-md flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-[#062A20]" />
              <span>{t('plan_trip', currentLanguage)}: {loc?.name || destination.name}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
