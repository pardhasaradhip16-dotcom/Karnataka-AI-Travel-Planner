import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Search, 
  Compass, 
  Clock, 
  IndianRupee, 
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Mic
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import type { Destination } from '../types';
import { t, getLocalizedDestination, formatLocalizedDuration } from '../i18n/translations';

interface HeroProps {
  onPlanTrip: () => void;
  onExploreDestinations: () => void;
  onSelectDestination: (destination: Destination) => void;
  onOpenVoiceGuide?: (destination?: Destination) => void;
  currentLanguage?: string;
}

export const Hero: React.FC<HeroProps> = ({
  onPlanTrip,
  onExploreDestinations,
  onSelectDestination,
  onOpenVoiceGuide,
  currentLanguage = 'en'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('any');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Filter destinations for hero search dropdown
  const filteredSuggestions = searchTerm.trim()
    ? DESTINATIONS.filter(d => 
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.category.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
      ).slice(0, 4)
    : [];

  return (
    <section className="relative w-full bg-[#062A20] text-white overflow-hidden pb-16 pt-8 sm:pt-14 lg:pt-20">
      
      {/* Background Graphic Layer: Authentic Landscape + Emerald/Forest Gradient */}
      <div className="absolute inset-0 z-0 opacity-35 mix-blend-luminosity pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=2000&q=85"
          alt="Karnataka Heritage Landscape"
          className="w-full h-full object-cover object-center filter saturate-150"
          loading="eager"
        />
      </div>

      {/* Radial Gradient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Pattern Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* State Tourism Pill */}
        <div className="flex justify-center sm:justify-start">
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium shadow-inner backdrop-blur-md mb-6 animate-pulse-glow">
            <span className="flex h-2 w-2 rounded-full bg-amber-400"></span>
            <span className="text-amber-300 font-semibold tracking-wide">Karnataka Yatra AI</span>
            <span className="text-emerald-500">•</span>
            <span className="text-emerald-200">{t('tourism_pill', currentLanguage)}</span>
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="max-w-4xl text-center sm:text-left">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-royal">
            {t('hero_title_1', currentLanguage)} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300 drop-shadow-sm">
              {t('hero_title_2', currentLanguage)}
            </span>
          </h1>

          <p className="mt-5 sm:mt-6 text-lg sm:text-xl lg:text-2xl text-emerald-100/90 font-normal leading-relaxed max-w-3xl">
            {t('hero_subtitle', currentLanguage)}
          </p>

          {/* Prominent Dual Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Primary Action: Plan My Trip */}
            <button
              onClick={onPlanTrip}
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-base sm:text-lg text-[#062A20] bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-gold hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 border-2 border-amber-300/40"
              aria-label="Plan My Trip using AI"
            >
              <Sparkles className="w-5 h-5 mr-2.5 text-[#062A20]" />
              <span>{t('cta_plan_trip', currentLanguage)}</span>
              <ArrowRight className="w-5 h-5 ml-2.5 text-[#062A20]" />
            </button>

            {/* Secondary Action: Explore Destinations */}
            <button
              onClick={onExploreDestinations}
              className="inline-flex items-center justify-center px-7 py-4 rounded-2xl font-semibold text-base sm:text-lg text-white bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-500/40 hover:border-emerald-400 backdrop-blur-md shadow-md transition-all duration-200"
              aria-label="Explore Karnataka Destinations"
            >
              <Compass className="w-5 h-5 mr-2.5 text-emerald-400" />
              <span>{t('cta_explore', currentLanguage)}</span>
              <ChevronDown className="w-4 h-4 ml-2 text-emerald-300" />
            </button>

            {/* Tertiary Action: Voice Guide AI */}
            {onOpenVoiceGuide && (
              <button
                onClick={() => onOpenVoiceGuide()}
                className="inline-flex items-center justify-center px-6 py-4 rounded-2xl font-bold text-base sm:text-lg text-emerald-950 bg-gradient-to-r from-emerald-100 via-white to-emerald-200 hover:from-white hover:to-emerald-100 border-2 border-emerald-400/50 shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                aria-label="Open Yatra Voice Guide AI"
              >
                <Mic className="w-5 h-5 mr-2 text-emerald-800 animate-pulse" />
                <span>{t('cta_voice_guide', currentLanguage)}</span>
                <span className="ml-2 text-[11px] bg-amber-400 text-slate-900 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  6 Languages
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Quick AI Search & Filter Box */}
        <div className="mt-12 lg:mt-14 max-w-5xl">
          <div className="bg-[#0B3B2C]/90 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-4 sm:p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-800/60 mb-3 px-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-300 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('finder_title', currentLanguage)}</span>
              </span>
              <span className="text-xs text-emerald-300/70 hidden sm:inline">
                {t('finder_subtitle', currentLanguage)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              {/* Destination search with autocomplete */}
              <div className="sm:col-span-6 relative">
                <label htmlFor="hero-search-input" className="block text-xs font-medium text-emerald-200 mb-1">
                  {t('search_label', currentLanguage)}
                </label>
                <div className="relative">
                  <Search className="w-5 h-5 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="hero-search-input"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder={t('search_placeholder', currentLanguage)}
                    className="w-full pl-11 pr-4 py-3 bg-[#062A20]/90 border border-emerald-700/60 rounded-xl text-white placeholder-emerald-400/60 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-white text-xs px-1.5 py-0.5 rounded"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Suggestions Dropdown */}
                {isSearchFocused && filteredSuggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in">
                    <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Matching Destinations
                    </div>
                    {filteredSuggestions.map((dest) => {
                      const loc = getLocalizedDestination(dest, currentLanguage);
                      return (
                        <button
                          key={dest.id}
                          onMouseDown={() => {
                            onSelectDestination(dest);
                            setIsSearchFocused(false);
                            setSearchTerm('');
                          }}
                          className="w-full text-left px-3.5 py-2.5 hover:bg-emerald-50 flex items-center justify-between transition-colors text-slate-800"
                        >
                          <div className="flex items-center space-x-2.5">
                            <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <div>
                              <span className="font-bold text-sm text-emerald-950">{currentLanguage === 'en' ? dest.name : loc.name}</span>
                              {currentLanguage !== 'en' && loc.name !== dest.name && (
                                <span className="text-xs text-slate-400 ml-1.5 font-normal">({dest.name})</span>
                              )}
                              <p className="text-xs text-slate-500 line-clamp-1">{loc.tagline}</p>
                            </div>
                          </div>
                          <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
                            {dest.idealDays}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Duration filter */}
              <div className="sm:col-span-3">
                <label htmlFor="duration-select" className="block text-xs font-medium text-emerald-200 mb-1">
                  {t('available_time', currentLanguage)}
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="duration-select"
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                    className="w-full pl-9 pr-8 py-3 bg-[#062A20]/90 border border-emerald-700/60 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 appearance-none cursor-pointer"
                  >
                    <option value="any">{t('duration_all_label', currentLanguage)}</option>
                    <option value="weekend">{t('duration_2days_label', currentLanguage)}</option>
                    <option value="medium">{formatLocalizedDuration('4 - 5 Days', currentLanguage)}</option>
                    <option value="week">{formatLocalizedDuration('7 Days', currentLanguage)}</option>
                    <option value="extended">{formatLocalizedDuration('10+ Days', currentLanguage)}</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-emerald-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Action Button: Find Experiences */}
              <div className="sm:col-span-3 flex items-end">
                <button
                  onClick={onExploreDestinations}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center space-x-2"
                >
                  <Search className="w-4 h-4 text-emerald-100" />
                  <span>{t('search_button', currentLanguage)}</span>
                </button>
              </div>
            </div>

            {/* Quick Popular Prompts / Chips */}
            <div className="mt-3.5 pt-3 border-t border-emerald-800/40 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-emerald-300 font-medium">{t('quick_suggestions', currentLanguage)}</span>
              {[
                { id: 'hampi', en: 'Hampi Stone Chariot', te: 'హంపి రాతి రథం', kn: 'ಹಂಪಿ ಕಲ್ಲಿನ ರಥ', hi: 'हंपी पत्थर का रथ', ta: 'ஹம்பி கல் தேர்', ml: 'ഹംപി ശിലാ രഥം' },
                { id: 'mysuru', en: 'Mysore Palace at Night', te: 'రాత్రి వేళ మైసూరు ప్యాలెస్', kn: 'ಮೈಸೂರು ಅರಮನೆ ದೀಪಾಲಂಕಾರ', hi: 'मैसूर पैलेस रोशनी', ta: 'மைசூர் அரண்மனை இரவு காட்சி', ml: 'മൈസൂർ കൊട്ടാരം രാത്രി കാഴ്ച' },
                { id: 'coorg', en: 'Coorg Coffee Trails', te: 'కూర్గ్ కాఫీ తోటలు', kn: 'ಕೂರ್ಗ್ ಕಾಫಿ ತೋಟಗಳು', hi: 'कूर्ग कॉफ़ी बागान', ta: 'கூர்க் காபி தோட்டங்கள்', ml: 'കൂർഗ് കാപ്പിത്തോട്ടങ്ങൾ' },
                { id: 'gokarna', en: 'Gokarna Om Beach', te: 'గోకర్ణ ఓం బీచ్', kn: 'ಗೋಕರ್ಣ ಓಂ ಕಡಲತೀರ', hi: 'गोकर्ण ओम बीच', ta: 'கோகர்ணா ஓம் கடற்கரை', ml: 'ഗോകർണം ഓം ബീച്ച്' },
                { id: 'chikkamagaluru', en: 'Mullayanagiri Peak', te: 'ముళ్ళయ్యనగిరి శిఖరం', kn: 'ಮುಳ್ಳಯ್ಯನಗಿರಿ ಶಿಖರ', hi: 'मुल्लायनगिरि शिखर', ta: 'முள்ளையனகிரி சிகரம்', ml: 'മുള്ളയനഗിരി കൊടുമുടി' },
                { id: 'badami', en: 'Badami Cave Temples', te: 'బాదామి గుహాలయాలు', kn: 'ಬಾದಾಮಿ ಗುಹಾ ದೇವಾಲಯಗಳು', hi: 'बादामी गुफा मंदिर', ta: 'பாதாமி குகைக் கோயில்கள்', ml: 'ബദാമി ഗുഹാക്ഷേത്രങ്ങൾ' }
              ].map((chip) => {
                const chipLabel = (chip as any)[currentLanguage] || chip.en;
                return (
                  <button
                    key={chip.id}
                    onClick={() => {
                      const match = DESTINATIONS.find(d => d.id === chip.id);
                      if (match) {
                        onSelectDestination(match);
                      } else {
                        onExploreDestinations();
                      }
                    }}
                    className="px-2.5 py-1 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 hover:text-white border border-emerald-700/50 transition-colors"
                  >
                    {chipLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Trust Badges / Stats Strip */}
        <div className="mt-12 pt-8 border-t border-emerald-800/50 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-900/80 border border-emerald-500/30 flex items-center justify-center text-amber-400">
              <MapPin className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-white">{t('stat_districts', currentLanguage)}</p>
              <p className="text-xs text-emerald-300/80">{t('stat_districts_sub', currentLanguage)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-900/80 border border-emerald-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-white">{t('stat_realtime', currentLanguage)}</p>
              <p className="text-xs text-emerald-300/80">{t('stat_realtime_sub', currentLanguage)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-900/80 border border-emerald-500/30 flex items-center justify-center text-amber-400">
              <IndianRupee className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-white">{t('stat_budget', currentLanguage)}</p>
              <p className="text-xs text-emerald-300/80">{t('stat_budget_sub', currentLanguage)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-900/80 border border-emerald-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold text-white">{t('stat_eco', currentLanguage)}</p>
              <p className="text-xs text-emerald-300/80">{t('stat_eco_sub', currentLanguage)}</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
