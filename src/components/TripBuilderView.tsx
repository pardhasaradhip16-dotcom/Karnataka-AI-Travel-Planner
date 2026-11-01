import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  MapPin, 
  Users, 
  IndianRupee, 
  Clock, 
  Compass, 
  CheckCircle2, 
  Printer, 
  Utensils, 
  Navigation, 
  Car, 
  AlertCircle, 
  Heart 
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import type { Destination } from '../types';

interface TripBuilderViewProps {
  initialDestination?: Destination | null;
  onBackToHome: () => void;
  onSelectDestination: (dest: Destination) => void;
  onSaveItinerary?: (itineraryTitle: string) => void;
}

const STARTING_CITIES = [
  'Bengaluru (Kempegowda Int. Airport / KSR)',
  'Mysuru (South Karnataka)',
  'Hubballi - Dharwad (North Karnataka)',
  'Mangaluru (Coastal Karavali)',
  'Belagavi (North-Western Karnataka)',
  'Shivamogga (Gateway to Malnad)'
];

export const TripBuilderView: React.FC<TripBuilderViewProps> = ({
  initialDestination,
  onBackToHome,
  onSelectDestination,
  onSaveItinerary
}) => {
  const [selectedDestId, setSelectedDestId] = useState<string>(
    initialDestination ? initialDestination.id : 'hampi'
  );
  const [startingCity, setStartingCity] = useState(STARTING_CITIES[0]);
  const [duration, setDuration] = useState<'3-days' | '5-days' | '7-days'>('3-days');
  const [travelerType, setTravelerType] = useState<'family' | 'couple' | 'solo' | 'friends'>('family');
  const [budgetTier, setBudgetTier] = useState<'budget' | 'comfort' | 'luxury'>('comfort');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Heritage', 'Food']);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStepText, setGenerationStepText] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [hasSaved, setHasSaved] = useState(false);

  useEffect(() => {
    if (initialDestination) {
      setSelectedDestId(initialDestination.id);
    }
  }, [initialDestination]);

  const targetDestination = DESTINATIONS.find(d => d.id === selectedDestId) || DESTINATIONS[0];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      if (selectedInterests.length > 1) {
        setSelectedInterests(selectedInterests.filter(i => i !== interest));
      }
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedPlan(null);

    const steps = [
      'Scanning topography and Western Ghats road status...',
      `Optimizing darshan slots & daylight in ${targetDestination.name}...`,
      'Aligning authentic local eatery stops with zero tourist traps...',
      'Synthesizing personalized day-by-day itinerary...'
    ];

    steps.forEach((text, i) => {
      setTimeout(() => {
        setGenerationStepText(text);
      }, i * 400);
    });

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedPlan({
        title: `${duration === '3-days' ? '3-Day' : duration === '5-days' ? '5-Day' : '7-Day'} Curated Journey: ${targetDestination.name} & Surroundings`,
        target: targetDestination,
        duration,
        travelerType,
        budgetEstimate: duration === '3-days' ? '₹7,800 - ₹9,500' : duration === '5-days' ? '₹14,000 - ₹18,000' : '₹22,000 - ₹28,000',
        days: [
          {
            dayNumber: 1,
            title: `Arrival & Heritage Inception in ${targetDestination.name}`,
            morning: `Depart from ${startingCity.split(' ')[0]}. Scenic road or train transit arriving mid-morning. Check into certified eco-homestay.`,
            afternoon: `Visit ${targetDestination.topAttractions[0]?.name || 'the central monument'}. Explore detailed stonework and panoramic views with licensed guide.`,
            evening: `Stroll through local bazaar. Relish authentic ${targetDestination.localDelicacies[0] || 'local dinner'}. Sunset viewpoint.`,
            transportNote: 'KSRTC Rajahamsa / Airavat Express or Private Cab recommended.'
          },
          {
            dayNumber: 2,
            title: `Deep Cultural Immersion & Scenic Landscapes`,
            morning: `Early morning sunrise at ${targetDestination.topAttractions[1]?.name || 'the viewpoint'} (fresh crisp mountain air before crowds arrive).`,
            afternoon: `Visit ${targetDestination.topAttractions[2]?.name || 'the heritage site'}. Savor traditional Banana-leaf lunch (${targetDestination.localDelicacies[1] || 'Oota'}).`,
            evening: `Traditional craft & artisan workshop. Evening cultural Aarti or lakeside stroll.`,
            transportNote: 'Local auto-rickshaw or electric rental scooter for ease of access.'
          },
          {
            dayNumber: 3,
            title: `Hidden Gems & Tranquil Farewell`,
            morning: `Visit tranquil off-beat sanctuary: ${targetDestination.topAttractions[3]?.name || 'secluded waterfall & nature trail'}.`,
            afternoon: `Souvenir shopping (authentic spices, coffee beans, sandalwood attar). Leisurely authentic lunch.`,
            evening: `Return transit to ${startingCity.split(' ')[0]}. End of memorable Karnataka Yatra!`,
            transportNote: 'Direct highway connectivity with planned dinner stopover on expressway.'
          }
        ]
      });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#FCFBF7] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Breadcrumb */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#062A20] hover:bg-slate-50 font-semibold text-sm shadow-2xs transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          {/* Module 1 Notice Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <span>Trip Planner Module (Interactive Preview)</span>
          </div>
        </div>

        {/* Header Hero */}
        <div className="bg-gradient-to-br from-[#062A20] via-[#0B3B2C] to-[#114B3A] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-400/30 mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Trip Builder Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-royal tracking-tight">
              Design Your Karnataka Itinerary
            </h1>
            <p className="mt-2 text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              Customize your duration, starting point, and travel vibe. Our AI takes into account real travel times, Western Ghat topography, and temple timings.
            </p>
          </div>
          
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Builder Form Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/90 mb-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Step 1: Destination Selection */}
            <div>
              <label htmlFor="planner-dest-select" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>Primary Destination to Explore</span>
              </label>
              <select
                id="planner-dest-select"
                value={selectedDestId}
                onChange={(e) => setSelectedDestId(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {DESTINATIONS.map((dest) => (
                  <option key={dest.id} value={dest.id}>
                    {dest.name} ({dest.kannadaName}) — {dest.district} District [{dest.region}]
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-slate-500">
                Selected: <span className="font-semibold text-emerald-800">{targetDestination.tagline}</span>
              </p>
            </div>

            {/* Step 2: Starting City */}
            <div>
              <label htmlFor="planner-start-city" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center space-x-1.5">
                <Navigation className="w-4 h-4 text-emerald-700" />
                <span>Starting From (Karnataka Hub)</span>
              </label>
              <select
                id="planner-start-city"
                value={startingCity}
                onChange={(e) => setStartingCity(e.target.value)}
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {STARTING_CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-slate-500">
                {targetDestination.coordinatesNote}
              </p>
            </div>

            {/* Step 3: Duration Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>Trip Duration</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '3-days', label: '3 Days', sub: 'Weekend' },
                  { id: '5-days', label: '5 Days', sub: 'Extended' },
                  { id: '7-days', label: '7 Days', sub: 'Full Circuit' }
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDuration(d.id as any)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      duration === d.id
                        ? 'border-emerald-700 bg-emerald-50/80 text-emerald-950 font-bold ring-2 ring-emerald-600/30'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="block text-sm font-bold">{d.label}</span>
                    <span className="text-[11px] text-slate-500 font-normal">{d.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Who is traveling */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center space-x-1.5">
                <Users className="w-4 h-4 text-emerald-700" />
                <span>Who is Traveling?</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'family', label: 'Family', sub: 'Seniors/Kids' },
                  { id: 'couple', label: 'Couple', sub: 'Relaxed' },
                  { id: 'solo', label: 'Solo', sub: 'Explorer' },
                  { id: 'friends', label: 'Friends', sub: 'Adventure' }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTravelerType(t.id as any)}
                    className={`p-2.5 rounded-2xl border text-center transition-all ${
                      travelerType === t.id
                        ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-400/40'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="block text-xs font-bold">{t.label}</span>
                    <span className="text-[10px] text-slate-500">{t.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Budget Comfort Tier */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center space-x-1.5">
                <IndianRupee className="w-4 h-4 text-amber-600" />
                <span>Budget Level (Per Person / Day)</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'budget', label: 'Budget', range: '₹1.5k - ₹2.5k' },
                  { id: 'comfort', label: 'Comfort', range: '₹2.8k - ₹4k' },
                  { id: 'luxury', label: 'Royal', range: '₹5k+' }
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBudgetTier(b.id as any)}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      budgetTier === b.id
                        ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="block text-sm font-bold">{b.label}</span>
                    <span className="text-[10px] text-slate-500">{b.range}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 6: Primary Interests */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center space-x-1.5">
                <Compass className="w-4 h-4 text-emerald-700" />
                <span>Interests & Activities (Select Multi)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {['Heritage', 'Nature', 'Food', 'Adventure', 'Beaches', 'Wildlife', 'Culture'].map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedInterests.includes(interest)
                        ? 'bg-[#062A20] text-amber-300'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {interest} {selectedInterests.includes(interest) ? '✓' : '+'}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Action Button: Generate Itinerary */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Free instant generation • Powered by Karnataka Yatra AI models</span>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-[#062A20] shadow-gold transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2.5 disabled:opacity-75"
            >
              <Sparkles className={`w-5 h-5 text-[#062A20] ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Calculating Itinerary...' : 'Generate Custom Itinerary'}</span>
            </button>
          </div>

        </div>

        {/* AI Loading State */}
        {isGenerating && (
          <div className="bg-white rounded-3xl p-10 text-center border border-amber-300 shadow-xl mb-10 animate-pulse">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
              <Compass className="w-8 h-8 animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-royal">
              Assembling your journey through Karnataka...
            </h3>
            <p className="text-sm font-semibold text-emerald-800 mt-2">
              {generationStepText || 'Preparing itinerary...'}
            </p>
            <p className="text-xs text-slate-400 mt-3">
              Calculating road topography, temple darshan timings & certified homestay availability.
            </p>
          </div>
        )}

        {/* Generated Itinerary Display */}
        {generatedPlan && !isGenerating && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-600/30 mb-10 animate-in fade-in slide-in-from-bottom-4">
            
            {/* Itinerary Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>AI Generated Itinerary Blueprint</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#062A20] font-royal">
                  {generatedPlan.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center space-x-2">
                  <span>Starting from {startingCity.split(' ')[0]}</span>
                  <span>•</span>
                  <span>Group: {travelerType.toUpperCase()}</span>
                  <span>•</span>
                  <span className="font-semibold text-amber-700">Estimated Total: {generatedPlan.budgetEstimate}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2.5">
                <button
                  onClick={() => {
                    setHasSaved(true);
                    if (onSaveItinerary) onSaveItinerary(generatedPlan.title);
                  }}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-1.5 transition-colors ${
                    hasSaved
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${hasSaved ? 'fill-current' : ''}`} />
                  <span>{hasSaved ? 'Saved to Trips' : 'Save Itinerary'}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold flex items-center space-x-1"
                  title="Print or save as PDF"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">Print</span>
                </button>
              </div>
            </div>

            {/* Day-by-Day Schedule Cards */}
            <div className="mt-8 space-y-6">
              {generatedPlan.days.map((day: any) => (
                <div key={day.dayNumber} className="bg-[#FCFBF7] rounded-2xl p-5 sm:p-7 border border-slate-200">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/80">
                    <div className="flex items-center space-x-3">
                      <span className="w-9 h-9 rounded-xl bg-[#062A20] text-amber-400 font-extrabold flex items-center justify-center text-sm font-royal">
                        D{day.dayNumber}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-royal">
                        {day.title}
                      </h3>
                    </div>

                    <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                      Full Day
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                    {/* Morning */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <p className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1 flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Morning (08:00 - 12:30)</span>
                      </p>
                      <p className="text-slate-700 leading-relaxed">{day.morning}</p>
                    </div>

                    {/* Afternoon */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1 flex items-center space-x-1">
                        <Utensils className="w-3.5 h-3.5" />
                        <span>Afternoon & Lunch (13:00 - 17:00)</span>
                      </p>
                      <p className="text-slate-700 leading-relaxed">{day.afternoon}</p>
                    </div>

                    {/* Evening */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                      <p className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider mb-1 flex items-center space-x-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Evening & Sunset (17:30 - 21:00)</span>
                      </p>
                      <p className="text-slate-700 leading-relaxed">{day.evening}</p>
                    </div>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center space-x-1 text-slate-700">
                      <Car className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{day.transportNote}</span>
                    </span>
                    <button
                      onClick={() => onSelectDestination(targetDestination)}
                      className="text-emerald-800 hover:text-emerald-950 font-bold underline text-xs"
                    >
                      View Attraction Guide
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Disclaimer & Next Module CTA */}
            <div className="mt-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-xs text-amber-950">
              <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Hackathon Prototype Notice: </span>
                <span>
                  This generated itinerary blueprint was calibrated by Karnataka Yatra AI. In the upcoming Booking & Multi-stop module, you will be able to customize individual stops, book KSTDC hotels directly, and share offline PDF guides.
                </span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
