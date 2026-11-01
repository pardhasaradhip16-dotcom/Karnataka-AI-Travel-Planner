import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Users, 
  IndianRupee, 
  Clock, 
  Compass, 
  Heart, 
  Droplets, 
  Mountain, 
  Palmtree, 
  Landmark, 
  Sun, 
  TreePine, 
  Utensils, 
  Smile, 
  User, 
  Home, 
  Award, 
  Car, 
  Key, 
  Bus, 
  AlertCircle, 
  Edit3 
} from 'lucide-react';

import { 
  WIZARD_INTERESTS, 
  DURATION_OPTIONS, 
  BUDGET_PRESETS, 
  TRAVELER_GROUPS, 
  KARNATAKA_CITIES, 
  ACCESSIBILITY_OPTIONS, 
  TRANSPORT_OPTIONS, 
  TRAVEL_PACES, 
  SAMPLE_TRIP_PRESETS,
  getLocalizedTransport,
  getLocalizedPace,
  getLocalizedAccessibility,
  getLocalizedCity,
  getLocalizedInterest,
  getLocalizedDuration,
  getLocalizedBudget,
  getLocalizedTraveler
} from '../../data/tripBuilderData';

import { t } from '../../i18n/translations';

import type { 
  TripBuilderPreferences, 
  InterestId, 
  DurationOptionId, 
  BudgetTierId, 
  TravelerGroupId, 
  Destination 
} from '../../types';

interface TripBuilderWizardProps {
  initialDestination?: Destination | null;
  currentLanguage: string;
  onSubmit: (preferences: TripBuilderPreferences) => void;
  onCancel: () => void;
  showToast: (msg: string) => void;
}

const STORAGE_DRAFT_KEY = 'karnataka_yatra_wizard_draft';

const DEFAULT_PREFERENCES: TripBuilderPreferences = {
  interests: ['nature', 'heritage', 'food'],
  duration: '2-3-days',
  customDays: 3,
  budgetTier: 'comfortable',
  customBudgetAmount: 3800,
  budgetBasis: 'per_person',
  travelerType: 'family',
  groupSize: 4,
  startingCity: KARNATAKA_CITIES[0],
  isCustomCity: false,
  customCityName: '',
  startDate: '',
  endDate: '',
  transportPreference: 'cab_chauffeur',
  accessibilityNeeds: ['minimal_stairs'],
  pace: 'balanced'
};

export const TripBuilderWizard: React.FC<TripBuilderWizardProps> = ({
  initialDestination,
  currentLanguage,
  onSubmit,
  onCancel,
  showToast
}) => {
  // Step 1 to 6 (Step 6 is Trip Summary)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sampleDropdownOpen, setSampleDropdownOpen] = useState(false);

  // Form State (initialized from localStorage draft if present)
  const [formData, setFormData] = useState<TripBuilderPreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_PREFERENCES, ...parsed };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_PREFERENCES;
  });

  // If initialDestination was passed from DestinationModal/Card, pre-fill it
  useEffect(() => {
    if (initialDestination) {
      const relevantInterests: InterestId[] = [];
      initialDestination.category.forEach(c => {
        const lower = c.toLowerCase() as InterestId;
        if (!relevantInterests.includes(lower)) {
          relevantInterests.push(lower);
        }
      });
      if (relevantInterests.length === 0) relevantInterests.push('heritage');

      setFormData(prev => ({
        ...prev,
        interests: Array.from(new Set([...prev.interests, ...relevantInterests]))
      }));
    }
  }, [initialDestination]);

  // Persist form progress to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify(formData));
    } catch (e) {
      console.error('Could not save draft to localStorage', e);
    }
  }, [formData]);

  // Step 1: Toggle Interests
  const handleToggleInterest = (id: InterestId) => {
    setErrorMsg(null);
    setFormData(prev => {
      const exists = prev.interests.includes(id);
      if (exists) {
        return { ...prev, interests: prev.interests.filter(item => item !== id) };
      } else {
        return { ...prev, interests: [...prev.interests, id] };
      }
    });
  };

  // Step 2: Duration selection
  const handleSelectDuration = (id: DurationOptionId, days: number) => {
    setErrorMsg(null);
    setFormData(prev => ({
      ...prev,
      duration: id,
      customDays: id === 'custom' ? (prev.customDays || 8) : days
    }));
  };

  // Step 3: Budget selection
  const handleSelectBudgetTier = (id: BudgetTierId, defaultPerDay: number) => {
    setErrorMsg(null);
    setFormData(prev => ({
      ...prev,
      budgetTier: id,
      customBudgetAmount: id === 'custom' ? (prev.customBudgetAmount || 4000) : defaultPerDay
    }));
  };

  // Step 4: Traveler Group selection
  const handleSelectTravelerGroup = (id: TravelerGroupId, defaultCount: number) => {
    setErrorMsg(null);
    setFormData(prev => ({
      ...prev,
      travelerType: id,
      groupSize: defaultCount
    }));
  };

  // Step 5: Accessibility Needs toggle
  const handleToggleAccessibility = (id: string) => {
    setFormData(prev => {
      const exists = prev.accessibilityNeeds.includes(id);
      return {
        ...prev,
        accessibilityNeeds: exists
          ? prev.accessibilityNeeds.filter(item => item !== id)
          : [...prev.accessibilityNeeds, id]
      };
    });
  };

  // Validation before advancing
  const validateAndProceed = () => {
    setErrorMsg(null);

    if (currentStep === 1) {
      if (formData.interests.length === 0) {
        setErrorMsg('Please choose at least one interest or passion to continue.');
        return;
      }
    } else if (currentStep === 2) {
      if (formData.duration === 'custom') {
        if (!formData.customDays || formData.customDays < 1 || formData.customDays > 30) {
          setErrorMsg('Please specify a valid custom trip duration between 1 and 30 days.');
          return;
        }
      }
    } else if (currentStep === 3) {
      if (formData.budgetTier === 'custom') {
        if (!formData.customBudgetAmount || formData.customBudgetAmount < 500) {
          setErrorMsg('Please enter a valid INR budget amount (minimum ₹500).');
          return;
        }
      }
    } else if (currentStep === 4) {
      if (formData.groupSize < 1 || formData.groupSize > 100) {
        setErrorMsg('Please specify a valid traveler count (at least 1 traveler).');
        return;
      }
    } else if (currentStep === 5) {
      if (formData.isCustomCity && !formData.customCityName.trim()) {
        setErrorMsg('Please enter your custom starting point or city name.');
        return;
      }
    }

    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      // Step 6: Submit final preferences!
      onSubmit(formData);
    }
  };

  const handleBack = () => {
    setErrorMsg(null);
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      onCancel();
    }
  };

  // Apply a sample preset
  const applySampleTrip = (presetIndex: number) => {
    const selectedPreset = SAMPLE_TRIP_PRESETS[presetIndex];
    setFormData(selectedPreset.preferences);
    setSampleDropdownOpen(false);
    showToast(`Loaded sample trip: "${selectedPreset.title}"`);
    setCurrentStep(6); // Jump straight to summary for review!
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Helper to render interest icons
  const renderInterestIcon = (name: string, className: string) => {
    switch (name) {
      case 'Mountain': return <Mountain className={className} />;
      case 'Droplets': return <Droplets className={className} />;
      case 'Palmtree': return <Palmtree className={className} />;
      case 'Landmark': return <Landmark className={className} />;
      case 'Sun': return <Sun className={className} />;
      case 'Compass': return <Compass className={className} />;
      case 'TreePine': return <TreePine className={className} />;
      case 'Utensils': return <Utensils className={className} />;
      case 'Smile': return <Smile className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFBF7] py-8 sm:py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Controls: Back button & "Try Sample Trip" button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200/80 gap-3">
          <button
            onClick={onCancel}
            className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-600 hover:text-[#062A20] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('wizard_btn_exit', currentLanguage)}</span>
          </button>

          {/* Sample Trip Presets Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSampleDropdownOpen(!sampleDropdownOpen)}
              className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs sm:text-sm border border-amber-300 shadow-2xs flex items-center space-x-2 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{t('wizard_btn_sample', currentLanguage)}</span>
              <span className="bg-amber-200 text-amber-900 text-[10px] px-1.5 py-0.5 rounded-full font-extrabold">4 Presets</span>
            </button>

            {sampleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Select a Realistic Karnataka Journey:
                </div>
                {SAMPLE_TRIP_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => applySampleTrip(idx)}
                    className="w-full text-left p-3 rounded-xl hover:bg-emerald-50 transition-colors flex flex-col space-y-1 text-slate-800"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#062A20]">{preset.title}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        {preset.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">{preset.description}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Wizard Header & Progress Indicator */}
        <div className="mt-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-2">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>
                  {t('wizard_badge', currentLanguage)}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#062A20] font-royal tracking-tight">
                {currentStep === 1 && t('wizard_step1_title', currentLanguage)}
                {currentStep === 2 && t('wizard_step2_title', currentLanguage)}
                {currentStep === 3 && t('wizard_step3_title', currentLanguage)}
                {currentStep === 4 && t('wizard_step4_title', currentLanguage)}
                {currentStep === 5 && t('wizard_step5_title', currentLanguage)}
                {currentStep === 6 && t('wizard_step6_title', currentLanguage)}
              </h1>
            </div>

            <span className="text-xs sm:text-sm font-bold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs self-start sm:self-auto">
              {t('wizard_step_of', currentLanguage).replace('{curr}', String(currentStep)).replace('{total}', '6')}
            </span>
          </div>

          {/* Visual Progress Bar */}
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden p-0.5 shadow-inner">
            <div 
              className="bg-gradient-to-r from-emerald-600 via-amber-500 to-yellow-400 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            />
          </div>

          {/* Step Badges Row (Desktop) */}
          <div className="hidden md:grid grid-cols-6 gap-2 mt-3 text-center text-xs">
            {[
              t('wizard_tab_interests', currentLanguage),
              t('wizard_tab_duration', currentLanguage),
              t('wizard_tab_budget', currentLanguage),
              t('wizard_tab_travelers', currentLanguage),
              t('wizard_tab_location', currentLanguage),
              t('wizard_tab_summary', currentLanguage)
            ].map((label, idx) => (
              <div
                key={idx}
                className={`py-1 rounded-lg font-semibold transition-colors ${
                  currentStep === idx + 1
                    ? 'text-emerald-900 bg-emerald-100 font-bold'
                    : currentStep > idx + 1
                    ? 'text-slate-700 bg-white/70'
                    : 'text-slate-400'
                }`}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Validation Error Banner */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start space-x-3 text-sm animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="font-semibold">{errorMsg}</div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 1: WHAT DO YOU ENJOY? (Visual Cards for 10 interests)                */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <p className="text-slate-600 text-sm sm:text-base">
                {t('wizard_step1_subtitle', currentLanguage)}
              </p>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {formData.interests.length} selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {WIZARD_INTERESTS.map((item) => {
                const isSelected = formData.interests.includes(item.id);
                const locInterest = getLocalizedInterest(item.id, currentLanguage);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleToggleInterest(item.id)}
                    className={`group relative text-left rounded-3xl overflow-hidden border-2 transition-all duration-200 transform hover:-translate-y-1 focus:outline-none flex flex-col justify-between shadow-xs bg-white ${
                      isSelected
                        ? 'border-emerald-700 bg-white ring-4 ring-emerald-600/30 shadow-lg scale-[1.01]'
                        : 'border-slate-200 bg-white hover:border-emerald-600 hover:shadow-md'
                    }`}
                    aria-pressed={isSelected}
                  >
                    {/* Top Image Banner */}
                    <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

                      {/* Top Row: Tag Badge & Checkbox */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/95 text-emerald-950 border border-slate-200 shadow-xs backdrop-blur-sm">
                          {item.tag}
                        </span>

                        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-sm ${
                          isSelected 
                            ? 'bg-emerald-700 text-white font-bold' 
                            : 'bg-white/95 text-slate-700 border border-slate-200 font-bold'
                        }`}>
                          {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : '+'}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Content Body in Crisp Light Mode */}
                    <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                      <div>
                        <div className="flex items-center space-x-2.5 mb-1.5">
                          <div className={`p-2 rounded-xl transition-colors ${
                            isSelected ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {renderInterestIcon(item.iconName, 'w-4 h-4')}
                          </div>
                          <h3 className="font-bold text-base sm:text-lg text-slate-900 font-royal tracking-tight">
                            {locInterest.title}
                          </h3>
                        </div>

                        <p className="text-amber-800 text-xs font-semibold">
                          {locInterest.subtitle}
                        </p>

                        <p className="text-slate-600 text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed">
                          {locInterest.description}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="mt-4 pt-2.5 border-t border-emerald-100 flex items-center space-x-1.5 text-xs font-bold text-emerald-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          <span>{t('wizard_selected', currentLanguage)}</span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: HOW LONG IS YOUR TRIP?                                            */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <p className="text-slate-600 text-sm sm:text-base">
              {t('wizard_step2_subtitle', currentLanguage)}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {DURATION_OPTIONS.map((opt) => {
                const isSelected = formData.duration === opt.id;
                const locDuration = getLocalizedDuration(opt.id, currentLanguage);

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectDuration(opt.id, opt.days)}
                    className={`text-left p-6 rounded-3xl border-2 transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-700 bg-white ring-4 ring-emerald-600/30 shadow-lg'
                        : 'border-slate-200 bg-white hover:border-emerald-600 hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900">
                          {opt.badge}
                        </span>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-emerald-700 text-white' : 'border border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </div>

                      <div className="flex items-baseline space-x-2">
                        <h3 className="text-xl font-bold text-slate-900 font-royal">
                          {locDuration.title}
                        </h3>
                        <span className="text-xs text-amber-700 font-semibold">{locDuration.subtitle}</span>
                      </div>

                      <p className="text-xs font-bold text-emerald-700 mt-1">{opt.subtitle}</p>
                      <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                        {locDuration.description}
                      </p>
                    </div>

                    {/* Custom days input if custom selected */}
                    {opt.id === 'custom' && isSelected && (
                      <div className="mt-4 pt-4 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
                        <label htmlFor="custom-days-input" className="block text-xs font-bold text-slate-700 mb-1">
                          Enter Exact Number of Days:
                        </label>
                        <div className="flex items-center space-x-3">
                          <input
                            id="custom-days-input"
                            type="number"
                            min="1"
                            max="30"
                            value={formData.customDays || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, customDays: parseInt(e.target.value) || 1 }))}
                            className="w-32 px-3 py-2 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                          />
                          <span className="text-xs text-slate-500 font-medium">Days (e.g. 10 or 14 days)</span>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: WHAT IS YOUR BUDGET?                                              */}
        {/* ========================================================================= */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <p className="text-slate-600 text-sm sm:text-base">
              {t('wizard_step3_subtitle', currentLanguage)}
            </p>

            {/* Basis Toggle: Per Person vs Entire Group */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Budget Calculation Basis
                </span>
                <p className="text-sm font-semibold text-slate-800">
                  Are your budget numbers per person or for your whole traveling party?
                </p>
              </div>

              <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-stretch sm:self-auto">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, budgetBasis: 'per_person' }))}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    formData.budgetBasis === 'per_person'
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Per Person
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, budgetBasis: 'entire_group' }))}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    formData.budgetBasis === 'entire_group'
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  For Entire Group ({formData.groupSize} people)
                </button>
              </div>
            </div>

            {/* Budget Presets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {BUDGET_PRESETS.map((preset) => {
                const isSelected = formData.budgetTier === preset.id;
                const locBudget = getLocalizedBudget(preset.id, currentLanguage);

                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectBudgetTier(preset.id, preset.perDayAmount)}
                    className={`text-left p-6 rounded-3xl border-2 transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-500 bg-white ring-4 ring-amber-400/40 shadow-lg'
                        : 'border-slate-200 bg-white hover:border-amber-400 hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-950">
                          {locBudget.rangeText}
                        </span>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-amber-500 text-slate-950 font-bold' : 'border border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </div>

                      <div className="flex items-baseline space-x-2">
                        <h3 className="text-xl font-bold text-slate-900 font-royal">
                          {locBudget.title}
                        </h3>
                        <span className="text-xs text-emerald-800 font-semibold">{locBudget.subtitle}</span>
                      </div>

                      <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                        {locBudget.description}
                      </p>

                      <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-100">
                        {locBudget.perks.map((perk, i) => (
                          <div key={i} className="flex items-center space-x-1.5 text-xs text-slate-700">
                            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>{perk}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Custom INR Input if Custom Selected */}
                    {preset.id === 'custom' && isSelected && (
                      <div className="mt-4 pt-4 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
                        <label htmlFor="custom-budget-input" className="block text-xs font-bold text-slate-700 mb-1">
                          Specify Target Amount (INR ₹):
                        </label>
                        <div className="relative">
                          <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            id="custom-budget-input"
                            type="number"
                            min="500"
                            step="500"
                            value={formData.customBudgetAmount || ''}
                            onChange={(e) => setFormData(prev => ({ ...prev, customBudgetAmount: parseInt(e.target.value) || 0 }))}
                            placeholder="e.g. 15000"
                            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: WHO IS TRAVELLING?                                                */}
        {/* ========================================================================= */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <p className="text-slate-600 text-sm sm:text-base">
              {t('wizard_step4_subtitle', currentLanguage)}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {TRAVELER_GROUPS.map((grp) => {
                const isSelected = formData.travelerType === grp.id;
                const locTraveler = getLocalizedTraveler(grp.id, currentLanguage);

                return (
                  <button
                    key={grp.id}
                    type="button"
                    onClick={() => handleSelectTravelerGroup(grp.id, grp.defaultSize)}
                    className={`text-left p-6 rounded-3xl border-2 transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-700 bg-white ring-4 ring-emerald-600/30 shadow-lg'
                        : 'border-slate-200 bg-white hover:border-emerald-600 hover:shadow-md'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {grp.id === 'solo' && <User className="w-6 h-6" />}
                          {grp.id === 'couple' && <Heart className="w-6 h-6" />}
                          {grp.id === 'friends' && <Users className="w-6 h-6" />}
                          {grp.id === 'family' && <Home className="w-6 h-6" />}
                          {grp.id === 'seniors' && <Award className="w-6 h-6" />}
                          {grp.id === 'group' && <Compass className="w-6 h-6" />}
                        </div>

                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-emerald-700 text-white' : 'border border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 font-royal">
                        {locTraveler.title}
                      </h3>
                      <p className="text-xs text-emerald-800 font-semibold">{locTraveler.subtitle}</p>

                      <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                        {locTraveler.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Group Size Adjuster */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t('wizard_step4_group_size_label', currentLanguage)}
                </span>
                <p className="text-sm font-semibold text-slate-800">
                  {t('wizard_step4_group_size_sub', currentLanguage)}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, groupSize: Math.max(1, prev.groupSize - 1) }))}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center text-lg transition-colors"
                >
                  –
                </button>
                <span className="w-12 text-center text-xl font-extrabold text-[#062A20]">
                  {formData.groupSize}
                </span>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, groupSize: prev.groupSize + 1 }))}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center text-lg transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 5: STARTING LOCATION & DETAILS (EXACT USER SCREENSHOT)               */}
        {/* ========================================================================= */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <p className="text-slate-600 text-sm sm:text-base">
              {t('wizard_step5_subtitle', currentLanguage)}
            </p>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              
              {/* Starting City */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>{t('wizard_step5_starting_label', currentLanguage)}</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, isCustomCity: false }))}
                    className={`p-3 rounded-xl text-xs sm:text-sm font-semibold border text-left flex items-center justify-between ${
                      !formData.isCustomCity
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-slate-200 text-slate-700 bg-slate-50'
                    }`}
                  >
                    <span>{t('wizard_step5_hub_tab', currentLanguage)}</span>
                    {!formData.isCustomCity && <Check className="w-4 h-4 text-emerald-700" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, isCustomCity: true }))}
                    className={`p-3 rounded-xl text-xs sm:text-sm font-semibold border text-left flex items-center justify-between ${
                      formData.isCustomCity
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-slate-200 text-slate-700 bg-slate-50'
                    }`}
                  >
                    <span>{t('wizard_step5_custom_tab', currentLanguage)}</span>
                    {formData.isCustomCity && <Check className="w-4 h-4 text-emerald-700" />}
                  </button>
                </div>

                {!formData.isCustomCity ? (
                  <select
                    value={formData.startingCity}
                    onChange={(e) => setFormData(prev => ({ ...prev, startingCity: e.target.value }))}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    {KARNATAKA_CITIES.map((c) => (
                      <option key={c} value={c}>{getLocalizedCity(c, currentLanguage)}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={formData.customCityName}
                    onChange={(e) => setFormData(prev => ({ ...prev, customCityName: e.target.value }))}
                    placeholder={t('wizard_step5_custom_placeholder', currentLanguage)}
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                )}
              </div>

              {/* Optional Travel Dates */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-emerald-700" />
                  <span>{t('wizard_step5_dates_label', currentLanguage)}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="wizard-start-date" className="block text-[11px] text-slate-400 mb-1">{t('wizard_step5_start_date', currentLanguage)}</label>
                    <input
                      id="wizard-start-date"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="wizard-end-date" className="block text-[11px] text-slate-400 mb-1">{t('wizard_step5_end_date', currentLanguage)}</label>
                    <input
                      id="wizard-end-date"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* Transport Preference */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center space-x-1.5">
                  <Car className="w-4 h-4 text-emerald-700" />
                  <span>{t('wizard_step5_transport_label', currentLanguage)}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TRANSPORT_OPTIONS.map((tr) => {
                    const locTr = getLocalizedTransport(tr.id, currentLanguage);
                    return (
                      <button
                        key={tr.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, transportPreference: tr.id }))}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex items-start space-x-3 ${
                          formData.transportPreference === tr.id
                            ? 'border-emerald-700 bg-emerald-50/70 ring-2 ring-emerald-600/30'
                            : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="mt-0.5">
                          {tr.id === 'cab_chauffeur' && <Car className="w-5 h-5 text-emerald-700" />}
                          {tr.id === 'self_drive' && <Key className="w-5 h-5 text-amber-600" />}
                          {tr.id === 'public_transit' && <Bus className="w-5 h-5 text-blue-600" />}
                          {tr.id === 'two_wheeler' && <Compass className="w-5 h-5 text-orange-600" />}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-sm text-slate-900">{locTr.title}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{locTr.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Pace */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  <span>{t('wizard_step5_pace_label', currentLanguage)}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {TRAVEL_PACES.map((pc) => {
                    const locPace = getLocalizedPace(pc.id, currentLanguage);
                    return (
                      <button
                        key={pc.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, pace: pc.id }))}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          formData.pace === pc.id
                            ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-400/40'
                            : 'border-slate-200 bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="font-bold text-sm text-slate-900 block">{locPace.title}</span>
                        <p className="text-xs text-slate-500 mt-1 leading-snug">{locPace.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accessibility & Dietary Needs */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>{t('wizard_step5_accessibility_label', currentLanguage)}</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ACCESSIBILITY_OPTIONS.map((acc) => {
                    const isChecked = formData.accessibilityNeeds.includes(acc.id);
                    const locAcc = getLocalizedAccessibility(acc.id, currentLanguage);

                    return (
                      <button
                        key={acc.id}
                        type="button"
                        onClick={() => handleToggleAccessibility(acc.id)}
                        className={`p-3 rounded-2xl border text-left transition-all flex items-start space-x-2.5 ${
                          isChecked
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold'
                            : 'border-slate-200 bg-slate-50 text-slate-600'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center flex-shrink-0 border ${
                          isChecked ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">{locAcc.label}</span>
                          <span className="text-[11px] text-slate-500">{locAcc.sub}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 6: FINAL TRIP SUMMARY SCREEN (With Edit action for every section)     */}
        {/* ========================================================================= */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-gradient-to-br from-[#062A20] via-[#0B3B2C] to-[#114B3A] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-400/40 relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  {t('wizard_step6_ready_badge', currentLanguage)}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-royal mt-1">
                  {t('wizard_step6_title', currentLanguage)}
                </h2>
                <p className="text-sm text-emerald-100/90 mt-1 max-w-2xl">
                  {t('wizard_step6_subtitle', currentLanguage)}
                </p>
              </div>
            </div>

            {/* Summary Cards with Edit Actions */}
            <div className="space-y-4">
              
              {/* Card 1: Interests */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t('wizard_step6_card_interests', currentLanguage)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {formData.interests.map(i => {
                      const locI = getLocalizedInterest(i, currentLanguage);
                      return (
                        <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-900 font-bold rounded-xl text-xs border border-emerald-200">
                          {locI.title}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 self-start sm:self-auto"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{t('wizard_step6_btn_edit', currentLanguage)}</span>
                </button>
              </div>

              {/* Card 2: Duration */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t('wizard_step6_card_duration', currentLanguage)}
                    </span>
                  </div>
                  <p className="text-base font-bold text-slate-900 mt-1">
                    {formData.duration === 'custom' 
                      ? `${formData.customDays} Days (Custom Duration)` 
                      : getLocalizedDuration(formData.duration, currentLanguage).title}
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 self-start sm:self-auto"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{t('wizard_step6_btn_edit', currentLanguage)}</span>
                </button>
              </div>

              {/* Card 3: Budget */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t('wizard_step6_card_budget', currentLanguage)}
                    </span>
                  </div>
                  <p className="text-base font-bold text-slate-900 mt-1">
                    {formData.budgetTier === 'custom'
                      ? `₹${formData.customBudgetAmount.toLocaleString('en-IN')}`
                      : getLocalizedBudget(formData.budgetTier, currentLanguage).title}
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 self-start sm:self-auto"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{t('wizard_step6_btn_edit', currentLanguage)}</span>
                </button>
              </div>

              {/* Card 4: Travelers */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t('wizard_step6_card_travelers', currentLanguage)}
                    </span>
                  </div>
                  <p className="text-base font-bold text-slate-900 mt-1">
                    {getLocalizedTraveler(formData.travelerType, currentLanguage).title} • {formData.groupSize}
                  </p>
                </div>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 self-start sm:self-auto"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{t('wizard_step6_btn_edit', currentLanguage)}</span>
                </button>
              </div>

              {/* Card 5: Location, Transport & Pace */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t('wizard_step6_card_logistics', currentLanguage)}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 mt-1">
                    {t('wizard_step6_origin', currentLanguage)}: <span className="font-semibold text-emerald-800">{formData.isCustomCity ? formData.customCityName : getLocalizedCity(formData.startingCity, currentLanguage).split(' ')[0]}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t('wizard_step6_transport', currentLanguage)}: <span className="font-semibold">{getLocalizedTransport(formData.transportPreference, currentLanguage).title}</span> • {t('wizard_step6_pace', currentLanguage)}: <span className="font-semibold">{getLocalizedPace(formData.pace, currentLanguage).title}</span>
                  </p>
                  {formData.accessibilityNeeds.length > 0 && (
                    <p className="text-xs text-amber-700 font-medium mt-1">
                      {t('wizard_step6_accessibility', currentLanguage)}: {formData.accessibilityNeeds.map(a => getLocalizedAccessibility(a, currentLanguage).label).join(', ')}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setCurrentStep(5)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 self-start sm:self-auto"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{t('wizard_step6_btn_edit', currentLanguage)}</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Wizard Bottom Navigation Buttons */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm transition-colors flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStep === 1 ? t('wizard_btn_cancel', currentLanguage) : t('wizard_btn_back', currentLanguage)}</span>
          </button>

          <button
            type="button"
            onClick={validateAndProceed}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-[#062A20] shadow-gold hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 border-2 border-amber-300/40"
          >
            <span>{currentStep === 6 ? t('wizard_btn_generate', currentLanguage) : t('wizard_btn_continue', currentLanguage)}</span>
            {currentStep === 6 ? <Sparkles className="w-5 h-5 text-[#062A20]" /> : <ArrowRight className="w-5 h-5 text-[#062A20]" />}
          </button>
        </div>

      </div>
    </div>
  );
};
