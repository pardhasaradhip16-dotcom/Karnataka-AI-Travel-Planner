import React, { useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Sparkles, 
  RefreshCw, 
  ArrowRight 
} from 'lucide-react';
import type { Destination, DestinationAlternative } from '../../types';

interface ReplacePlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationToReplace: Destination | null;
  alternatives: DestinationAlternative[];
  onConfirmReplace: (oldDestId: string, newDestId: string) => void;
}

export const ReplacePlaceModal: React.FC<ReplacePlaceModalProps> = ({
  isOpen,
  onClose,
  destinationToReplace,
  alternatives,
  onConfirmReplace
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !destinationToReplace) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="replace-modal-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8 flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#062A20] text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h2 id="replace-modal-title" className="text-xl font-bold font-royal">
                Replace Destination
              </h2>
              <p className="text-xs text-emerald-200">
                Swapping: <span className="font-bold text-amber-300">{destinationToReplace.name} ({destinationToReplace.kannadaName})</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Ranked Alternatives List */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-[#FCFBF7]">
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>
              Ranked alternatives based on your travel interests, budget, and route proximity:
            </span>
          </div>

          {alternatives.map((alt) => (
            <div
              key={alt.destination.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start space-x-3.5 flex-1">
                <img
                  src={alt.destination.heroImage}
                  alt={alt.destination.name}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-slate-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = alt.destination.fallbackImage;
                  }}
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-slate-900 text-base font-royal">
                      {alt.destination.name}
                    </h4>
                    <span className="text-xs text-amber-700 font-semibold">
                      {alt.destination.kannadaName}
                    </span>
                    <span className="bg-emerald-100 text-emerald-900 text-[11px] font-extrabold px-2 py-0.5 rounded-full">
                      {alt.matchScore}% Match
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-0.5 flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{alt.destination.district} District</span>
                    <span>•</span>
                    <span>{alt.destination.region}</span>
                  </p>

                  <p className="text-xs text-slate-600 mt-1.5 leading-snug">
                    {alt.reason}
                  </p>

                  <div className="mt-2 flex items-center space-x-3 text-[11px] text-slate-500">
                    <span className="font-semibold text-emerald-800">
                      {alt.destination.estimatedBudget}
                    </span>
                    <span>•</span>
                    <span>Ideal: {alt.destination.idealDays}</span>
                  </div>
                </div>
              </div>

              {/* Swap Button */}
              <button
                onClick={() => {
                  onConfirmReplace(destinationToReplace.id, alt.destination.id);
                  onClose();
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-[#062A20] font-bold text-xs sm:text-sm rounded-xl shadow-sm flex items-center justify-center space-x-1.5 transition-all self-stretch sm:self-auto flex-shrink-0"
              >
                <span>Select & Recalculate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};
