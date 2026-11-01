import React, { useState } from 'react';
import { 
  Compass, 
  Heart, 
  Menu, 
  X, 
  Globe, 
  Sparkles, 
  MapPin, 
  Type,
  Mic
} from 'lucide-react';
import { t, SUPPORTED_APP_LANGUAGES } from '../i18n/translations';

interface NavbarProps {
  activeView: 'home' | 'planner' | 'explore';
  onNavigate: (view: 'home' | 'planner' | 'explore') => void;
  savedCount: number;
  onOpenSaved: () => void;
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  isLargeFont: boolean;
  onToggleLargeFont: () => void;
  onOpenVoiceGuide?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  savedCount,
  onOpenSaved,
  currentLanguage,
  onLanguageChange,
  isLargeFont,
  onToggleLargeFont,
  onOpenVoiceGuide
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'planner' | 'explore') => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-nav shadow-sm transition-all duration-200">
      {/* Top Accessibility Bar */}
      <div className="bg-[#062A20] text-emerald-100 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-emerald-200 tracking-wide line-clamp-1">
              {t('official_edition', currentLanguage)}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Font size toggle for low digital literacy / elders */}
            <button
              onClick={onToggleLargeFont}
              aria-label="Toggle text size"
              className={`flex items-center space-x-1 px-2 py-0.5 rounded text-xs transition-colors ${
                isLargeFont 
                  ? 'bg-amber-400 text-slate-900 font-bold' 
                  : 'bg-[#114B3A] text-emerald-200 hover:text-white'
              }`}
              title="Change reading size for easy reading"
            >
              <Type className="w-3.5 h-3.5" />
              <span>{isLargeFont ? t('standard_size', currentLanguage) : t('large_text', currentLanguage)}</span>
            </button>

            {/* Helpline indicator */}
            <span className="hidden md:inline-flex items-center space-x-1 text-emerald-300">
              <span className="text-amber-300 font-semibold">{t('tourist_helpline', currentLanguage)}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 text-left focus:outline-none focus:ring-2 focus:ring-emerald-600 rounded-lg p-1"
          >
            {/* Majestic Emblem Symbol */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#062A20] via-[#0B3B2C] to-[#114B3A] border-2 border-amber-400/80 shadow-md flex items-center justify-center text-amber-300">
              <Compass className="w-7 h-7 text-amber-400" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#062A20] font-royal">
                  Karnataka Yatra
                </span>
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  AI
                </span>
              </div>
              <span className="text-xs text-[#114B3A] font-medium tracking-wide flex items-center space-x-1">
                <span>ಕರ್ನಾಟಕ ಯಾತ್ರೆ</span>
                <span className="text-amber-500">•</span>
                <span className="text-slate-600 font-sans">One State. Many Worlds.</span>
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                activeView === 'home'
                  ? 'bg-[#0B3B2C] text-white shadow-sm'
                  : 'text-slate-700 hover:text-[#0B3B2C] hover:bg-[#0B3B2C]/5'
              }`}
            >
              {t('nav_home', currentLanguage)}
            </button>

            <button
              onClick={() => handleNavClick('explore')}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 flex items-center space-x-1.5 ${
                activeView === 'explore'
                  ? 'bg-[#0B3B2C] text-white shadow-sm'
                  : 'text-slate-700 hover:text-[#0B3B2C] hover:bg-[#0B3B2C]/5'
              }`}
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>{t('nav_explore', currentLanguage)}</span>
            </button>

            <button
              onClick={() => handleNavClick('planner')}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 flex items-center space-x-1.5 ${
                activeView === 'planner'
                  ? 'bg-[#0B3B2C] text-white shadow-sm'
                  : 'text-slate-700 hover:text-[#0B3B2C] hover:bg-[#0B3B2C]/5'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t('nav_plan_trip', currentLanguage)}</span>
            </button>

            {/* Saved Trips Button */}
            <button
              onClick={onOpenSaved}
              className="px-3.5 py-2.5 rounded-xl font-medium text-sm text-slate-700 hover:text-[#0B3B2C] hover:bg-[#0B3B2C]/5 transition-all duration-150 flex items-center space-x-2 relative"
              aria-label="View Saved Trips"
            >
              <Heart className={`w-4 h-4 ${savedCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-600'}`} />
              <span>{t('nav_saved_trips', currentLanguage)}</span>
              {savedCount > 0 && (
                <span className="bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Yatra Voice Guide AI Nav Button */}
            {onOpenVoiceGuide && (
              <button
                onClick={onOpenVoiceGuide}
                className="px-3.5 py-2 rounded-xl font-semibold text-xs text-emerald-950 bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-300/80 transition-all duration-150 flex items-center space-x-1.5 shadow-2xs group"
                title="Open Yatra Voice Guide AI (Multilingual Tour Guide in 6 Languages)"
                aria-label="Open Voice Tour Guide"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-600 animate-ping mr-0.5" />
                <Mic className="w-3.5 h-3.5 text-emerald-700 group-hover:scale-110 transition-transform" />
                <span>{t('nav_voice_guide', currentLanguage)}</span>
                <span className="bg-amber-400 text-slate-900 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                  AI
                </span>
              </button>
            )}
          </nav>

          {/* Desktop Right Actions: Language Selector & Primary CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                id="language-selector-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-emerald-600 hover:text-emerald-800 transition-colors shadow-2xs cursor-pointer"
                aria-expanded={langDropdownOpen}
                aria-label="Select language"
              >
                <Globe className="w-4 h-4 text-emerald-700" />
                <span className="font-bold text-emerald-950">
                  {SUPPORTED_APP_LANGUAGES.find(l => l.code === currentLanguage)?.native || 'English'}
                </span>
                <span className="text-[10px] text-slate-400">
                  ({SUPPORTED_APP_LANGUAGES.find(l => l.code === currentLanguage)?.label || 'EN'})
                </span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3.5 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    {t('choose_language', currentLanguage)}
                  </div>
                  {SUPPORTED_APP_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      id={`lang-option-${lang.code}`}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between transition-colors ${
                        currentLanguage === lang.code
                          ? 'bg-emerald-50 text-emerald-900 font-bold border-l-4 border-emerald-600'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{lang.native}</span>
                        <span className="text-[10px] text-slate-400">{lang.region}</span>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Prominent Plan My Trip CTA */}
            <button
              onClick={() => handleNavClick('planner')}
              className="group relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-bold text-sm text-[#062A20] bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 border border-amber-500/30"
            >
              <Sparkles className="w-4 h-4 mr-2 text-[#062A20] transition-transform group-hover:rotate-12" />
              <span>{t('cta_plan_trip', currentLanguage)}</span>
            </button>
          </div>

          {/* Mobile menu toggle & quick actions */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onOpenSaved}
              className="p-2 rounded-xl text-slate-700 hover:text-rose-600 relative"
              aria-label="Saved Destinations"
            >
              <Heart className={`w-5 h-5 ${savedCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-600'}`} />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-800 hover:bg-emerald-50 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4">
          <nav className="flex flex-col space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-base flex items-center justify-between ${
                activeView === 'home' ? 'bg-[#0B3B2C] text-white' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>{t('nav_home', currentLanguage)}</span>
              <span className="text-xs opacity-75 font-normal">ಮುಖ್ಯಪುಟ</span>
            </button>

            <button
              onClick={() => handleNavClick('explore')}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-base flex items-center justify-between ${
                activeView === 'explore' ? 'bg-[#0B3B2C] text-white' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span>{t('nav_explore', currentLanguage)}</span>
              </div>
            </button>

            <button
              onClick={() => handleNavClick('planner')}
              className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-base flex items-center justify-between ${
                activeView === 'planner' ? 'bg-[#0B3B2C] text-white' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>{t('nav_plan_trip', currentLanguage)}</span>
              </div>
            </button>

            <button
              onClick={() => {
                onOpenSaved();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 rounded-xl font-semibold text-base text-slate-800 hover:bg-slate-100 flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-rose-500" />
                <span>{t('nav_saved_trips', currentLanguage)}</span>
              </div>
              <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {savedCount}
              </span>
            </button>

            {onOpenVoiceGuide && (
              <button
                onClick={() => {
                  onOpenVoiceGuide();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl font-semibold text-base text-emerald-950 bg-emerald-50 border border-emerald-200/80 hover:bg-emerald-100/70 flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Mic className="w-5 h-5 text-emerald-700" />
                  <span>{t('nav_voice_guide', currentLanguage)}</span>
                </div>
                <span className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  6 Languages
                </span>
              </button>
            )}
          </nav>

          {/* Mobile Language Selector */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
              {t('choose_language', currentLanguage)}
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {SUPPORTED_APP_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`py-2 px-2 rounded-lg text-xs font-medium text-center border ${
                    currentLanguage === lang.code
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-slate-200 text-slate-700 bg-white'
                  }`}
                >
                  <div className="font-bold">{lang.native}</div>
                  <div className="text-[10px] text-slate-400">{lang.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Big Mobile CTA */}
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('planner')}
              className="w-full py-3.5 rounded-xl font-bold text-base text-[#062A20] bg-gradient-to-r from-amber-400 to-yellow-400 flex items-center justify-center space-x-2 shadow-md"
            >
              <Sparkles className="w-5 h-5 text-[#062A20]" />
              <span>{t('cta_plan_trip', currentLanguage)}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
