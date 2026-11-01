import React, { useState, useMemo } from 'react';
import { 
  Car, 
  Hotel, 
  Utensils, 
  Ticket, 
  Compass, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  SlidersHorizontal, 
  RefreshCw, 
  Coins 
} from 'lucide-react';
import type { 
  GeneratedItinerary, 
  TripBuilderPreferences, 
  AccommodationTier, 
  TransportPreference, 
  BudgetTierId, 
  BudgetBasis, 
  BudgetSavingRecommendation 
} from '../../types';
import { 
  ACCOMMODATION_RATES, 
  TRANSPORT_COST_MODELS 
} from '../../data/budgetRates';
import { BudgetCalculatorService } from '../../services/budgetCalculatorService';

interface TravelBudgetDashboardProps {
  itinerary: GeneratedItinerary;
  onUpdatePreferences: (updatedPrefs: Partial<TripBuilderPreferences>) => void;
  className?: string;
}

export const TravelBudgetDashboard: React.FC<TravelBudgetDashboardProps> = ({
  itinerary,
  onUpdatePreferences,
  className = ''
}) => {
  const [isSandboxExpanded, setIsSandboxExpanded] = useState<boolean>(true);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showDayByDay, setShowDayByDay] = useState<boolean>(false);
  const [showAssumptionsModal, setShowAssumptionsModal] = useState<boolean>(false);

  // Local sandbox state initialized from current itinerary snapshot
  const [localGroupSize, setLocalGroupSize] = useState<number>(itinerary.groupSize || 2);
  const [localBudgetBasis, setLocalBudgetBasis] = useState<BudgetBasis>(itinerary.budgetBasis || 'per_person');
  const [localTargetBudget, setLocalTargetBudget] = useState<number>(() => {
    if (itinerary.preferencesSnapshot.budgetTier === 'custom') {
      return itinerary.preferencesSnapshot.customBudgetAmount || 25000;
    }
    const days = itinerary.totalDays || 3;
    if (itinerary.preferencesSnapshot.budgetTier === 'budget') return 2200 * days;
    if (itinerary.preferencesSnapshot.budgetTier === 'comfortable') return 4200 * days;
    return 8000 * days;
  });

  const [localTransport, setLocalTransport] = useState<TransportPreference>(
    itinerary.preferencesSnapshot.transportPreference || 'cab_chauffeur'
  );
  const [localAccommodation, setLocalAccommodation] = useState<AccommodationTier>(
    itinerary.accommodationPreference || 
    BudgetCalculatorService.resolveDefaultAccommodation(itinerary.preferencesSnapshot.budgetTier)
  );
  const [localBudgetTier, setLocalBudgetTier] = useState<BudgetTierId>(
    itinerary.preferencesSnapshot.budgetTier || 'comfortable'
  );

  // Calculate live itemized breakdown and budget evaluation based on current sandbox values
  const { detailedBreakdown, evaluation } = useMemo(() => {
    const calcParams = {
      destinations: itinerary.destinationsCovered,
      totalDays: itinerary.totalDays,
      groupSize: localGroupSize,
      transportPreference: localTransport,
      accommodationPreference: localAccommodation,
      budgetTier: localBudgetTier,
      targetBudget: localTargetBudget,
      budgetBasis: localBudgetBasis
    };

    const detailed = BudgetCalculatorService.calculateDetailedExpenses(calcParams);
    const evalResult = BudgetCalculatorService.evaluateBudget(
      detailed,
      localTargetBudget,
      localBudgetBasis,
      localGroupSize,
      calcParams
    );

    return { detailedBreakdown: detailed, evaluation: evalResult };
  }, [
    itinerary.destinationsCovered, 
    itinerary.totalDays, 
    localGroupSize, 
    localTransport, 
    localAccommodation, 
    localBudgetTier, 
    localTargetBudget, 
    localBudgetBasis
  ]);

  // Sync sandbox changes to parent itinerary state
  const handleApplyToItinerary = () => {
    onUpdatePreferences({
      groupSize: localGroupSize,
      budgetBasis: localBudgetBasis,
      customBudgetAmount: localTargetBudget,
      budgetTier: localBudgetTier,
      transportPreference: localTransport,
      accommodationPreference: localAccommodation
    });
  };

  // 1-Click Apply for Cost Reduction Recommendations
  const handleApplyRecommendation = (rec: BudgetSavingRecommendation) => {
    if (rec.actionType === 'switch_transport' && rec.targetValue) {
      setLocalTransport(rec.targetValue as TransportPreference);
      onUpdatePreferences({ transportPreference: rec.targetValue as TransportPreference });
    } else if (rec.actionType === 'switch_stay' && rec.targetValue) {
      setLocalAccommodation(rec.targetValue as AccommodationTier);
      onUpdatePreferences({ accommodationPreference: rec.targetValue as AccommodationTier });
    } else if (rec.actionType === 'switch_activities' && rec.targetValue) {
      setLocalBudgetTier(rec.targetValue as BudgetTierId);
      onUpdatePreferences({ budgetTier: rec.targetValue as BudgetTierId });
    }
  };

  // Category Icon helper
  const getCategoryIcon = (key: string) => {
    switch (key) {
      case 'stay':
        return <Hotel className="w-5 h-5 text-amber-500" />;
      case 'transport':
        return <Car className="w-5 h-5 text-emerald-500" />;
      case 'food':
        return <Utensils className="w-5 h-5 text-orange-500" />;
      case 'entry':
        return <Ticket className="w-5 h-5 text-indigo-500" />;
      case 'activities':
        return <Compass className="w-5 h-5 text-cyan-500" />;
      case 'misc':
      default:
        return <Coins className="w-5 h-5 text-slate-500" />;
    }
  };

  const getCategoryColor = (key: string) => {
    switch (key) {
      case 'stay': return 'bg-amber-500';
      case 'transport': return 'bg-emerald-600';
      case 'food': return 'bg-orange-500';
      case 'entry': return 'bg-indigo-600';
      case 'activities': return 'bg-cyan-600';
      case 'misc': default: return 'bg-slate-500';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>

      {/* TOP HEADER: Transparent Budget Scoreboard */}
      <div className="bg-[#062A20] text-white rounded-3xl p-6 sm:p-8 border border-amber-400/30 shadow-xl relative overflow-hidden">
        
        {/* Subtle Decorative Pattern Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-emerald-800/60">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Transparent & Verified Karnataka Travel Economics</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-royal text-white tracking-tight">
              Yatra Travel-Budget Planner
            </h2>
            <p className="text-emerald-200/80 text-sm mt-1 max-w-xl">
              Itemized estimates across transportation, rooms, local cuisine, statutory ASI monuments, and experiences.
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowAssumptionsModal(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center space-x-1.5 transition-colors"
            >
              <Info className="w-3.5 h-3.5 text-amber-300" />
              <span>Data Sources & Assumptions</span>
            </button>
            <button
              onClick={() => setShowDayByDay(!showDayByDay)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center space-x-1.5 ${
                showDayByDay 
                  ? 'bg-amber-400 text-slate-950 border-amber-500' 
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{showDayByDay ? 'Hide Daily Costs' : 'View Day-by-Day Costs'}</span>
            </button>
          </div>
        </div>

        {/* METRICS ROW: Total Estimated Cost vs Target Budget */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          
          {/* 1. Total Estimated Expenditure */}
          <div className="bg-[#041D16] border border-emerald-800/80 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-xs font-semibold text-emerald-300/80 uppercase tracking-wide">
              Total Estimated Circuit
            </span>
            <div className="my-1.5">
              <div className="text-2xl sm:text-3xl font-black text-white flex items-baseline space-x-1">
                <span>₹{detailedBreakdown.total.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[11px] text-emerald-400 font-medium">
                For {localGroupSize} {localGroupSize === 1 ? 'traveler' : 'travelers'} ({itinerary.totalDays} Days)
              </p>
            </div>
            <div className="pt-2 border-t border-emerald-900/60 text-[11px] text-emerald-200/70 flex items-center justify-between">
              <span>Per Person:</span>
              <strong className="text-amber-300 font-bold">₹{detailedBreakdown.perPersonTotal.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          {/* 2. Target User Budget */}
          <div className="bg-[#041D16] border border-emerald-800/80 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-xs font-semibold text-emerald-300/80 uppercase tracking-wide flex items-center justify-between">
              <span>Selected Budget</span>
              <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-1.5 py-0.5 rounded">
                {localBudgetBasis === 'per_person' ? 'Per Person' : 'Group Total'}
              </span>
            </span>
            <div className="my-1.5">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">
                ₹{(localBudgetBasis === 'per_person' ? localTargetBudget * localGroupSize : localTargetBudget).toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-emerald-200/70">
                {localBudgetBasis === 'per_person' 
                  ? `₹${localTargetBudget.toLocaleString('en-IN')} / person` 
                  : `₹${Math.round(localTargetBudget / localGroupSize).toLocaleString('en-IN')} / person`}
              </p>
            </div>
            <div className="pt-2 border-t border-emerald-900/60 text-[11px] text-emerald-200/70">
              Priced at {localBudgetTier.toUpperCase()} tier
            </div>
          </div>

          {/* 3. Budget Variance / Overspend / Surplus Status */}
          <div className={`rounded-2xl p-4 flex flex-col justify-between border ${
            evaluation.status === 'over_budget'
              ? 'bg-rose-950/40 border-rose-500/50'
              : evaluation.status === 'balanced'
              ? 'bg-amber-950/40 border-amber-500/50'
              : 'bg-emerald-950/40 border-emerald-500/50'
          }`}>
            <span className="text-xs font-semibold text-white/80 uppercase tracking-wide flex items-center space-x-1.5">
              {evaluation.status === 'over_budget' ? (
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              )}
              <span>Budget Health</span>
            </span>
            <div className="my-1.5">
              <div className={`text-xl sm:text-2xl font-black ${
                evaluation.status === 'over_budget' ? 'text-rose-300' : 'text-emerald-300'
              }`}>
                {evaluation.statusLabel}
              </div>
              <p className="text-[11px] text-white/70 mt-0.5">
                {evaluation.status === 'over_budget' 
                  ? `${evaluation.percentageUsed}% of planned budget used`
                  : `${evaluation.percentageUsed}% utilized (within budget limits)`}
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 text-[11px] text-white/70">
              {evaluation.status === 'over_budget' ? 'Optimization suggested below' : 'Circuit is comfortably funded'}
            </div>
          </div>

          {/* 4. Statutory Verified Share */}
          <div className="bg-[#041D16] border border-emerald-800/80 rounded-2xl p-4 flex flex-col justify-between">
            <span className="text-xs font-semibold text-emerald-300/80 uppercase tracking-wide flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Data Authenticity</span>
            </span>
            <div className="my-1.5">
              <div className="text-2xl sm:text-3xl font-black text-emerald-300">
                ₹{detailedBreakdown.verifiedTotal.toLocaleString('en-IN')}
              </div>
              <p className="text-[11px] text-emerald-200/70">
                {detailedBreakdown.verifiedPercentage}% statutory fixed government tickets
              </p>
            </div>
            <div className="pt-2 border-t border-emerald-900/60 text-[11px] text-emerald-300/70">
              ASI, Mysore Palace Board & KSTDC
            </div>
          </div>

        </div>

        {/* PROGRESS BAR: Budget Utilization */}
        <div className="relative z-10 mt-6 pt-5 border-t border-emerald-800/60">
          <div className="flex items-center justify-between text-xs text-emerald-200 mb-1.5">
            <span className="font-semibold flex items-center space-x-1.5">
              <span>Overall Budget Utilization</span>
              <span className="text-amber-300 font-bold">({evaluation.percentageUsed}%)</span>
            </span>
            <span>
              ₹{detailedBreakdown.total.toLocaleString('en-IN')} of ₹{(localBudgetBasis === 'per_person' ? localTargetBudget * localGroupSize : localTargetBudget).toLocaleString('en-IN')}
            </span>
          </div>
          <div className="w-full h-3 bg-emerald-950/80 rounded-full overflow-hidden border border-emerald-800/80 p-0.5">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                evaluation.status === 'over_budget' 
                  ? 'bg-rose-500' 
                  : evaluation.percentageUsed > 85 
                  ? 'bg-amber-400' 
                  : 'bg-emerald-400'
              }`}
              style={{ width: `${Math.min(100, evaluation.percentageUsed)}%` }}
            />
          </div>
        </div>

      </div>

      {/* OVER-BUDGET SHORTFALL EXPLANATION & ACTIONABLE CHEAPER ALTERNATIVES */}
      {evaluation.status === 'over_budget' && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 shadow-md animate-in slide-in-from-top-3">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-amber-950">
                Trip Allocation Advisory: ₹{evaluation.shortfallAmount?.toLocaleString('en-IN')} Shortfall
              </h3>
              <p className="text-xs sm:text-sm text-amber-900/80 mt-1">
                {evaluation.shortfallExplanation}
              </p>

              {/* Actionable Alternatives Cards */}
              {evaluation.savingsRecommendations.length > 0 && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {evaluation.savingsRecommendations.map(rec => (
                    <div 
                      key={rec.id}
                      className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900">{rec.title}</h4>
                          <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Save ₹{rec.potentialSavings.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                          {rec.description}
                        </p>
                      </div>
                      <button
                        onClick={() => handleApplyRecommendation(rec)}
                        className="mt-3 w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-2xs"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                        <span>{rec.actionLabel}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE BUDGET SANDBOX CONTROLS */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        
        <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsSandboxExpanded(!isSandboxExpanded)}>
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
              <SlidersHorizontal className="w-5 h-5 text-emerald-800" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <span>Interactive Budget & Logistics Sandbox</span>
                <span className="text-[11px] bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded-full">
                  What-If Recalculator
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Adjust accommodation tier, transport, travelers, or target budget to see immediate live re-costing.
              </p>
            </div>
          </div>
          <button className="text-slate-500 hover:text-slate-800 p-1">
            {isSandboxExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {isSandboxExpanded && (
          <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Input 1: Target Budget & Basis */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Target Budget Amount
              </label>
              <div className="flex rounded-xl border border-slate-300 overflow-hidden shadow-2xs focus-within:ring-2 focus-within:ring-emerald-500">
                <span className="bg-slate-100 px-3 py-2 text-slate-600 font-bold text-sm flex items-center">
                  ₹
                </span>
                <input
                  type="number"
                  min={1000}
                  step={500}
                  value={localTargetBudget}
                  onChange={(e) => setLocalTargetBudget(Math.max(1000, Number(e.target.value) || 0))}
                  className="w-full px-3 py-2 text-sm font-bold text-slate-900 focus:outline-hidden"
                />
              </div>

              {/* Basis Toggle */}
              <div className="grid grid-cols-2 gap-1.5 mt-2 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setLocalBudgetBasis('per_person')}
                  className={`py-1 rounded-lg transition-colors ${
                    localBudgetBasis === 'per_person' ? 'bg-white text-emerald-900 font-bold shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Per Person
                </button>
                <button
                  type="button"
                  onClick={() => setLocalBudgetBasis('entire_group')}
                  className={`py-1 rounded-lg transition-colors ${
                    localBudgetBasis === 'entire_group' ? 'bg-white text-emerald-900 font-bold shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Entire Group
                </button>
              </div>
            </div>

            {/* Input 2: Number of Travellers */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Group Size ({localGroupSize} {localGroupSize === 1 ? 'Traveler' : 'Travelers'})
              </label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setLocalGroupSize(Math.max(1, localGroupSize - 1))}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-lg flex items-center justify-center transition-colors shadow-2xs"
                >
                  -
                </button>
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-center font-bold text-sm text-slate-900">
                  {localGroupSize} {localGroupSize === 1 ? 'Solo' : localGroupSize === 2 ? 'Couple' : `${localGroupSize} Pax`}
                </div>
                <button
                  type="button"
                  onClick={() => setLocalGroupSize(Math.min(15, localGroupSize + 1))}
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-lg flex items-center justify-center transition-colors shadow-2xs"
                >
                  +
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                {Math.max(1, Math.ceil(localGroupSize / 2))} double rooms needed (2 adults/room).
              </p>
            </div>

            {/* Input 3: Transport Preference */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Transport Mode
              </label>
              <select
                value={localTransport}
                onChange={(e) => setLocalTransport(e.target.value as TransportPreference)}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                <option value="cab_chauffeur">Chauffeur Cab (Sedan / Innova)</option>
                <option value="self_drive">Self-Drive Car (Rental + Fuel)</option>
                <option value="public_transit">KSRTC Airavat / Bus & Train</option>
                <option value="two_wheeler">Two-Wheeler Rental (Bike / Scooter)</option>
              </select>
              <p className="text-[11px] text-slate-500 mt-1.5">
                {TRANSPORT_COST_MODELS[localTransport].description}
              </p>
            </div>

            {/* Input 4: Accommodation Preference */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Accommodation Tier
              </label>
              <select
                value={localAccommodation}
                onChange={(e) => setLocalAccommodation(e.target.value as AccommodationTier)}
                className="w-full py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                <option value="budget_homestay">Budget Homestay / KSTDC (~₹1,650/room)</option>
                <option value="standard_hotel">Comfort 3-Star AC Hotel (~₹3,200/room)</option>
                <option value="heritage_resort">Heritage Resort / Estate (~₹6,400/room)</option>
                <option value="luxury_villa">Luxury Pool Villa (~₹13,500/room)</option>
              </select>
              <p className="text-[11px] text-slate-500 mt-1.5">
                {ACCOMMODATION_RATES[localAccommodation].description}
              </p>
            </div>

            {/* Apply Recalculation Button */}
            <div className="md:col-span-2 lg:col-span-4 pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                💡 Live preview updates instantly above. Click to save changes to the main trip itinerary.
              </span>
              <button
                type="button"
                onClick={handleApplyToItinerary}
                className="px-5 py-2.5 rounded-xl bg-[#062A20] hover:bg-[#0A3D2E] text-amber-300 font-bold text-xs sm:text-sm flex items-center space-x-2 transition-all shadow-md"
              >
                <RefreshCw className="w-4 h-4 text-amber-400" />
                <span>Save & Synchronize With Itinerary</span>
              </button>
            </div>

          </div>
        )}
      </div>

      {/* CATEGORY VISUAL EXPENSE BREAKDOWN (STACKED BAR) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Itemized Category Distribution
            </h3>
            <p className="text-xs text-slate-500">
              Proportion of expenditure allocated across the 6 travel categories.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
            Total: ₹{detailedBreakdown.total.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Multi-Segment Color Stacked Progress Bar */}
        <div className="w-full h-5 rounded-full overflow-hidden flex bg-slate-100 border border-slate-200 p-0.5">
          {detailedBreakdown.categories.map((cat) => (
            cat.amount > 0 && (
              <div
                key={cat.key}
                style={{ width: `${cat.percentage}%` }}
                className={`h-full ${getCategoryColor(cat.key)} transition-all duration-300`}
                title={`${cat.label}: ₹${cat.amount.toLocaleString('en-IN')} (${cat.percentage}%)`}
              />
            )
          ))}
        </div>

        {/* Legend Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
          {detailedBreakdown.categories.map((cat) => (
            <div key={cat.key} className="flex items-center space-x-1.5">
              <span className={`w-3 h-3 rounded-full ${getCategoryColor(cat.key)}`} />
              <span className="font-semibold text-slate-700">{cat.label}:</span>
              <span className="text-slate-900 font-bold">₹{cat.amount.toLocaleString('en-IN')}</span>
              <span className="text-slate-400 text-[11px]">({cat.percentage}%)</span>
            </div>
          ))}
        </div>
      </div>

      {/* 6 DETAILED EXPENSE CATEGORY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {detailedBreakdown.categories.map((cat) => {
          const isExpanded = expandedCategory === cat.key;
          return (
            <div 
              key={cat.key}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-all"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                      {getCategoryIcon(cat.key)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{cat.label}</h4>
                      <span className="text-[11px] text-slate-500">{cat.percentage}% of total</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-black text-slate-900">
                      ₹{cat.amount.toLocaleString('en-IN')}
                    </div>
                    {cat.isVerified ? (
                      <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full inline-flex items-center space-x-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Statutory Verified</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                        Estimated Average
                      </span>
                    )}
                  </div>
                </div>

                {/* Estimation Basis Note */}
                <p className="text-xs text-slate-600 mt-3 italic leading-relaxed">
                  {cat.estimationRule}
                </p>

                {/* Sub-Items List */}
                <div className="mt-3.5 space-y-2">
                  {(isExpanded ? cat.items : cat.items.slice(0, 2)).map((item) => (
                    <div 
                      key={item.id}
                      className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-xs flex items-center justify-between"
                    >
                      <div className="pr-2">
                        <div className="font-semibold text-slate-800 flex items-center space-x-1">
                          <span>{item.name}</span>
                          {item.isVerifiedStatutory && (
                            <span className="text-[9px] bg-emerald-200 text-emerald-950 font-bold px-1 rounded">
                              ASI
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500">{item.unit}</span>
                      </div>
                      <span className="font-bold text-slate-900 flex-shrink-0">
                        {item.amount > 0 ? `₹${item.amount.toLocaleString('en-IN')}` : 'Free'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Show more toggle if more than 2 items */}
              {cat.items.length > 2 && (
                <button
                  type="button"
                  onClick={() => setExpandedCategory(isExpanded ? null : cat.key)}
                  className="mt-4 pt-2.5 border-t border-slate-100 text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center justify-center space-x-1"
                >
                  <span>{isExpanded ? 'Show Less' : `View All (${cat.items.length}) Items`}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* DAY-BY-DAY COST BREAKDOWN SECTION */}
      {showDayByDay && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm animate-in slide-in-from-bottom-3">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-emerald-700" />
                <span>Day-by-Day Itemized Cost Breakdown</span>
              </h3>
              <p className="text-xs text-slate-500">
                Detailed day-level expense allocation for each stage of your Karnataka yatra.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-900 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Day</th>
                  <th className="py-3 px-4">Primary Destination</th>
                  <th className="py-3 px-4">Transport</th>
                  <th className="py-3 px-4">Stay</th>
                  <th className="py-3 px-4">Food</th>
                  <th className="py-3 px-4">Entry & Activities</th>
                  <th className="py-3 px-4">Incidentals</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Day Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {detailedBreakdown.dayByDayCosts.map((day) => (
                  <tr key={day.dayNumber} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      Day {day.dayNumber}
                    </td>
                    <td className="py-3 px-4 font-semibold text-emerald-900">
                      {day.destinationName}
                    </td>
                    <td className="py-3 px-4">₹{day.transport.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4">₹{day.stay.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4">₹{day.food.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4">
                      ₹{(day.entryFees + day.activities).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4">₹{day.misc.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 text-right font-black text-slate-900 text-sm">
                      ₹{day.dayTotal.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DATA SOURCES & ESTIMATION ASSUMPTIONS MODAL */}
      {showAssumptionsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5 text-amber-800" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Data Accuracy & Estimation Methodology
                </h3>
              </div>
              <button
                onClick={() => setShowAssumptionsModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
                <h4 className="font-bold text-emerald-950 flex items-center space-x-1.5 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Statutory Government Verified Tariffs</span>
                </h4>
                <p className="text-xs text-emerald-900">
                  All monument tickets (Hampi Vijaya Vittala composite ticket ₹40, Badami Caves ₹25, Mysore Palace Durbar ₹100, Jog Falls ₹30, Abbey Falls ₹15) are verified from official government gazettes.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1.5">Estimation Rules & Transparent Benchmarks</h4>
                <ul className="space-y-1.5 list-disc pl-4 text-xs text-slate-600">
                  {detailedBreakdown.estimationAssumptions.map((assumption, idx) => (
                    <li key={idx}>{assumption}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
                <strong>No Fabricated Live Prices:</strong> We do not claim live surge pricing or airline market rates. Prices represent actual seasonal baseline averages for Karnataka road travel, tested against Karnataka State Tourism standards.
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-right">
              <button
                onClick={() => setShowAssumptionsModal(false)}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Close Transparency Notice
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
