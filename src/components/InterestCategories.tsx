import React from 'react';
import { 
  Landmark, 
  Mountain, 
  Palmtree, 
  Compass, 
  Utensils, 
  TreePine, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { INTEREST_CATEGORIES } from '../data/interests';
import type { Category } from '../types';
import { t } from '../i18n/translations';

interface InterestCategoriesProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  currentLanguage?: string;
}

export const InterestCategories: React.FC<InterestCategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
  currentLanguage = 'en'
}) => {
  const isKn = currentLanguage === 'kn';
  const isTe = currentLanguage === 'te';
  const isHi = currentLanguage === 'hi';
  const isTa = currentLanguage === 'ta';
  const isMl = currentLanguage === 'ml';

  // Map icon names to Lucide icon components
  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case 'Landmark': return <Landmark className={className} />;
      case 'Mountain': return <Mountain className={className} />;
      case 'Palmtree': return <Palmtree className={className} />;
      case 'TreePine': return <TreePine className={className} />;
      case 'Utensils': return <Utensils className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#F7F5EE]/80 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>
                {isKn ? 'ಆಸಕ್ತಿಗಳು & ವಿಭಾಗಗಳು' :
                 isTe ? 'ఆసక్తులు & విభాగాలు' :
                 isHi ? 'रुचियां और श्रेणियां' :
                 isTa ? 'விருப்பங்கள் & பிரிவுகள்' :
                 isMl ? 'താല്പര്യങ്ങൾ & വിഭാഗങ്ങൾ' :
                 'Passions & Interests'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062A20] font-royal tracking-tight">
              {t('categories_title', currentLanguage)}
            </h2>
            <p className="mt-2 text-slate-600 text-base sm:text-lg max-w-2xl">
              {t('categories_subtitle', currentLanguage)}
            </p>
          </div>

          {/* Quick "Show All" Reset Button */}
          {selectedCategory !== 'All' && (
            <button
              onClick={() => onSelectCategory('All')}
              className="mt-4 md:mt-0 self-start md:self-auto px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5"
            >
              <span>
                {isKn ? `ತೋರಿಸಲಾಗುತ್ತಿದೆ: ${selectedCategory} (ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ)` :
                 isTe ? `చూపిస్తోంది: ${selectedCategory} (ఫిల్టర్ తొలగించండి)` :
                 isHi ? `दिखा रहा है: ${selectedCategory} (फ़िल्टर हटाएं)` :
                 isTa ? `காட்டப்படுகிறது: ${selectedCategory} (வடிகட்டியை நீக்கு)` :
                 isMl ? `കാണിക്കുന്നു: ${selectedCategory} (ഫിൽട്ടർ ഒഴിവാക്കുക)` :
                 `Showing: ${selectedCategory} (Clear Filter)`}
              </span>
              <span className="bg-emerald-700 px-1.5 py-0.5 rounded text-[10px]">✕</span>
            </button>
          )}
        </div>

        {/* Categories Grid (Nature, Heritage, Beaches, Adventure, Food, Wildlife, Culture) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {INTEREST_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(isSelected ? 'All' : cat.id)}
                className={`relative group overflow-hidden rounded-3xl p-6 text-left transition-all duration-300 transform hover:-translate-y-1.5 focus:outline-none focus:ring-4 focus:ring-amber-400 flex flex-col justify-between min-h-[220px] ${
                  isSelected
                    ? 'ring-4 ring-amber-400 shadow-2xl scale-[1.02]'
                    : 'border border-slate-200/90 shadow-md hover:shadow-xl'
                }`}
                aria-pressed={isSelected}
              >
                {/* Background Image Layer */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Rich Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} opacity-85 group-hover:opacity-90 transition-opacity`} />
                </div>

                {/* Top Row: Icon & Count Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-md ${
                    isSelected ? 'bg-amber-400 text-slate-950' : 'bg-white/20 backdrop-blur-md text-white'
                  }`}>
                    {renderIcon(cat.iconName, 'w-6 h-6')}
                  </div>

                  <span className="text-xs bg-black/40 backdrop-blur-md text-amber-300 font-bold px-2.5 py-1 rounded-full border border-white/10">
                    {cat.count}+ {isKn ? 'ತಾಣಗಳು' : isTe ? 'ప్రదేశాలు' : isHi ? 'स्थान' : isTa ? 'இடங்கள்' : isMl ? 'സ്ഥലങ്ങൾ' : 'Spots'}
                  </span>
                </div>

                {/* Bottom Row: Title, Native subtitle, and description */}
                <div className="relative z-10 mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white font-royal tracking-wide drop-shadow-sm">
                      {t('cat_' + cat.id.toLowerCase().replace(/ /g, '_'), currentLanguage)}
                    </h3>
                  </div>

                  <p className="text-amber-300/90 text-xs font-semibold mt-0.5">
                    {currentLanguage === 'en' ? cat.kannadaTitle : cat.title}
                  </p>

                  <p className="text-emerald-100/90 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Active Indicator Bar */}
                  <div className="mt-3 flex items-center space-x-1.5 text-xs font-bold text-amber-300">
                    <span>
                      {isSelected
                        ? (isKn ? '✓ ಫಿಲ್ಟರ್ ಅನ್ವಯಿಸಲಾಗಿದೆ' : isTe ? '✓ ఫిల్టర్ వర్తించబడింది' : isHi ? '✓ फ़िल्टर लागू' : isTa ? '✓ வடிகட்டப்பட்டது' : isMl ? '✓ ഫിൽട്ടർ ചെയ്തു' : '✓ Filter Applied')
                        : (isKn ? 'ತಾಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ' : isTe ? 'ప్రదేశాలు చూడండి' : isHi ? 'स्थान देखें' : isTa ? 'இடங்களை காண்க' : isMl ? 'സ്ഥലങ്ങൾ കാണൂ' : 'Explore Sights')}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Highlight ring for selected */}
                {isSelected && (
                  <div className="absolute top-3 right-3 z-20 w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                )}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
