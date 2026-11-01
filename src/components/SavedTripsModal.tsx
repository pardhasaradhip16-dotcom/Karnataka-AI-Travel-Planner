import React from 'react';
import { 
  X, 
  Heart, 
  Trash2, 
  Sparkles, 
  MapPin 
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import type { Destination } from '../types';
import { getLocalizedDestination } from '../i18n/translations';

interface SavedTripsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onRemoveSaved: (id: string) => void;
  onClearAll: () => void;
  onSelectDestination: (dest: Destination) => void;
  onPlanTripWithSaved: () => void;
  currentLanguage?: string;
}

export const SavedTripsModal: React.FC<SavedTripsModalProps> = ({
  isOpen,
  onClose,
  savedIds,
  onRemoveSaved,
  onClearAll,
  onSelectDestination,
  onPlanTripWithSaved,
  currentLanguage = 'en'
}) => {
  if (!isOpen) return null;

  const savedDestinations = DESTINATIONS.filter(d => savedIds.includes(d.id));

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-modal-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#062A20] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-400">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 id="saved-modal-title" className="text-xl font-bold font-royal">
                Saved Trips & Destinations
              </h2>
              <p className="text-xs text-emerald-200">
                {savedDestinations.length} destination{savedDestinations.length === 1 ? '' : 's'} bookmarked for your trip
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close saved trips modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-3 bg-[#FCFBF7]">
          {savedDestinations.length > 0 ? (
            savedDestinations.map((dest) => (
              <div 
                key={dest.id}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex items-center justify-between gap-3"
              >
                <div 
                  className="flex items-center space-x-3.5 cursor-pointer flex-1"
                  onClick={() => {
                    onClose();
                    onSelectDestination(dest);
                  }}
                >
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = dest.fallbackImage;
                    }}
                  />
                  <div>
                    {(() => {
                      const loc = getLocalizedDestination(dest, currentLanguage);
                      return (
                        <>
                          <div className="flex items-baseline space-x-2">
                            <h4 className="font-bold text-slate-900 text-base">{currentLanguage === 'en' ? dest.name : loc.name}</h4>
                            {currentLanguage !== 'en' && loc.name !== dest.name && (
                              <span className="text-xs text-slate-500 font-medium">({dest.name})</span>
                            )}
                            <span className="text-xs text-amber-600 font-semibold">{dest.kannadaName}</span>
                          </div>
                          <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-emerald-600" />
                            <span>{loc.district} District</span>
                            <span>•</span>
                            <span>{dest.idealDays}</span>
                          </p>
                        </>
                      );
                    })()}
                    <p className="text-xs text-emerald-800 font-semibold mt-1">
                      {dest.estimatedBudget}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onRemoveSaved(dest.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    aria-label={`Remove ${dest.name} from saved destinations`}
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 px-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-400 flex items-center justify-center mx-auto mb-3">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900 text-base font-royal">No saved destinations yet</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Explore Karnataka's top destinations and click the heart icon on any destination card to bookmark it here.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {savedDestinations.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs font-semibold text-slate-500 hover:text-rose-600"
            >
              Clear All ({savedDestinations.length})
            </button>

            <button
              onClick={() => {
                onClose();
                onPlanTripWithSaved();
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-[#062A20] font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-[#062A20]" />
              <span>Plan Trip With Saved Places</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
