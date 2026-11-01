import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InterestCategories } from './components/InterestCategories';
import { ExploreSection } from './components/ExploreSection';
import { HowItWorks } from './components/HowItWorks';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { DestinationModal } from './components/DestinationModal';
import { SavedTripsModal } from './components/SavedTripsModal';
import { VoiceGuideModal } from './components/VoiceGuide/VoiceGuideModal';
import { YatraBuddyChat } from './components/YatraBuddy/YatraBuddyChat';
import { TripBuilderWizard } from './components/SmartTripBuilder/TripBuilderWizard';
import { ItineraryResultsView } from './components/SmartTripBuilder/ItineraryResultsView';
import { RecommendationEngine } from './services/recommendationEngine';
import { RoutePlanningService } from './services/routePlanningService';
import type { Destination, Category, TripBuilderPreferences, GeneratedItinerary } from './types';
import { DESTINATIONS } from './data/destinations';
import { Sparkles, X } from 'lucide-react';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'home' | 'planner' | 'explore' | 'itinerary'>('home');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedVoiceDestination, setSelectedVoiceDestination] = useState<Destination | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [plannerDestination, setPlannerDestination] = useState<Destination | null>(null);
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary | null>(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [isLargeFont, setIsLargeFont] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize saved destinations from localStorage
  const [savedDestinationIds, setSavedDestinationIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('karnataka_yatra_saved');
      return stored ? JSON.parse(stored) : ['hampi', 'mysuru'];
    } catch {
      return ['hampi', 'mysuru'];
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('karnataka_yatra_saved', JSON.stringify(savedDestinationIds));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [savedDestinationIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleToggleSave = (destId: string) => {
    const dest = DESTINATIONS.find(d => d.id === destId);
    if (savedDestinationIds.includes(destId)) {
      setSavedDestinationIds(savedDestinationIds.filter(id => id !== destId));
      showToast(`Removed ${dest?.name || 'Destination'} from saved trips.`);
    } else {
      setSavedDestinationIds([...savedDestinationIds, destId]);
      showToast(`✨ Saved ${dest?.name || 'Destination'} to your trips!`);
    }
  };

  const handleClearAllSaved = () => {
    setSavedDestinationIds([]);
    showToast('Cleared all saved destinations.');
  };

  const handleStartTripWithDestination = (dest: Destination) => {
    setPlannerDestination(dest);
    setActiveView('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartTripWithSaved = () => {
    if (savedDestinationIds.length > 0) {
      const firstSaved = DESTINATIONS.find(d => d.id === savedDestinationIds[0]);
      if (firstSaved) setPlannerDestination(firstSaved);
    }
    setActiveView('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: 'home' | 'planner' | 'explore' | 'itinerary') => {
    setActiveView(view);
    if (view === 'explore') {
      setTimeout(() => {
        const el = document.getElementById('explore-karnataka');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (cat: Category) => {
    setSelectedCategory(cat);
    const el = document.getElementById('explore-karnataka');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Submit preferences from Wizard and generate Itinerary using RecommendationEngine
  const handleWizardSubmit = (preferences: TripBuilderPreferences) => {
    const itinerary = RecommendationEngine.synthesizeItinerary(preferences);
    setGeneratedItinerary(itinerary);
    setActiveView('itinerary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`✨ Personalized ${itinerary.totalDays}-Day itinerary generated!`);
  };

  // Functional button: Regenerate Trip
  const handleRegenerateTrip = () => {
    if (generatedItinerary) {
      const refreshed = RecommendationEngine.regenerate(generatedItinerary);
      setGeneratedItinerary(refreshed);
      showToast('✨ Regenerated itinerary with fresh sequencing!');
    }
  };

  // Functional button: Replace Place
  const handleReplaceDestination = (oldDestId: string, newDestId: string) => {
    if (generatedItinerary) {
      const updated = RecommendationEngine.replaceDestination(generatedItinerary, oldDestId, newDestId);
      setGeneratedItinerary(updated);
      showToast('Swapped destination and recalculated itinerary & totals!');
    }
  };

  // Functional button: Remove Place
  const handleRemoveDestination = (destId: string) => {
    if (generatedItinerary) {
      if (generatedItinerary.destinationsCovered.length <= 1) {
        showToast('At least one destination is required in the itinerary.');
        return;
      }
      const updated = RecommendationEngine.removeDestination(generatedItinerary, destId);
      setGeneratedItinerary(updated);
      showToast('Removed destination and updated circuit.');
    }
  };

  // Functional button: Optimize Route Order (Nearest-Neighbour + 2-opt heuristic)
  const handleOptimizeRoute = () => {
    if (generatedItinerary) {
      const { updatedItinerary, savingsMessage, wasReordered } = RoutePlanningService.optimizeItinerary(
        generatedItinerary,
        (prefs, dests) => RecommendationEngine.synthesizeItinerary(prefs, dests)
      );
      if (wasReordered) {
        setGeneratedItinerary(updatedItinerary);
        showToast(`⚡ ${savingsMessage}`);
      } else {
        showToast(savingsMessage);
      }
    }
  };

  // Functional handler: Synchronize live budget adjustments from TravelBudgetDashboard
  const handleUpdateBudgetPreferences = (updatedPrefs: Partial<TripBuilderPreferences>) => {
    if (generatedItinerary) {
      const recalculated = RecommendationEngine.recalculateBudget(generatedItinerary, updatedPrefs);
      setGeneratedItinerary(recalculated);
      showToast('💰 Budget & day costs recalculated with updated parameters!');
    }
  };

  // Functional handler: Add destination to current itinerary or start new trip
  const handleAddToItinerary = (dest: Destination) => {
    if (generatedItinerary) {
      const isAlreadyPresent = generatedItinerary.destinationsCovered.some(d => d.id === dest.id);
      if (isAlreadyPresent) {
        showToast(`"${dest.name}" is already in your current itinerary.`);
        return;
      }
      const updatedDests = [...generatedItinerary.destinationsCovered, dest];
      const newItinerary = RecommendationEngine.synthesizeItinerary(
        {
          ...generatedItinerary.preferencesSnapshot,
          duration: updatedDests.length >= 4 ? '6-7-days' : updatedDests.length >= 3 ? '4-5-days' : '2-3-days'
        },
        updatedDests
      );
      setGeneratedItinerary(newItinerary);
      showToast(`✨ Added ${dest.name} to your itinerary! View itinerary to explore the route.`);
    } else {
      handleStartTripWithDestination(dest);
      showToast(`Selected ${dest.name}! Complete trip details to build your itinerary.`);
    }
  };

  // Functional handler: View destination coordinates on interactive Leaflet route map
  const handleViewOnMap = (dest: Destination) => {
    if (generatedItinerary) {
      const isPresent = generatedItinerary.destinationsCovered.some(d => d.id === dest.id);
      if (!isPresent) {
        const updatedDests = [...generatedItinerary.destinationsCovered, dest];
        const newItinerary = RecommendationEngine.synthesizeItinerary(
          generatedItinerary.preferencesSnapshot,
          updatedDests
        );
        setGeneratedItinerary(newItinerary);
      }
      setActiveView('itinerary');
      showToast(`🗺️ Displaying ${dest.name} on the interactive route map.`);
    } else {
      const defaultPrefs: TripBuilderPreferences = {
        interests: ['heritage', 'nature', 'culture'],
        duration: dest.idealDays.includes('1') ? '1-day' : '2-3-days',
        customDays: 2,
        budgetTier: 'comfortable',
        customBudgetAmount: 5000,
        budgetBasis: 'per_person',
        travelerType: 'couple',
        groupSize: 2,
        startingCity: 'bengaluru',
        isCustomCity: false,
        customCityName: '',
        startDate: '',
        endDate: '',
        transportPreference: 'cab_chauffeur',
        accommodationPreference: 'standard_hotel',
        accessibilityNeeds: [],
        pace: 'balanced'
      };
      const newItinerary = RecommendationEngine.synthesizeItinerary(defaultPrefs, [dest]);
      setGeneratedItinerary(newItinerary);
      setActiveView('itinerary');
      showToast(`🗺️ Displaying ${dest.name} on the interactive map.`);
    }
  };

  // Functional handler: Open Multilingual Yatra Voice Guide AI
  const handleOpenVoiceGuide = (dest?: Destination) => {
    if (dest) {
      setSelectedVoiceDestination(dest);
    } else {
      const defaultDest = DESTINATIONS.find(d => d.id === 'hampi') || DESTINATIONS[0];
      setSelectedVoiceDestination(defaultDest);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#FCFBF7] text-slate-800 ${isLargeFont ? 'text-lg' : 'text-base'}`}>
      
      {/* Toast Notification Container (floats above assistant button) */}
      {toastMessage && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#062A20] text-amber-300 border border-amber-400/40 px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 animate-in slide-in-from-bottom-5">
          <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-emerald-300 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Global Navigation Bar */}
      <Navbar
        activeView={activeView === 'itinerary' ? 'planner' : activeView}
        onNavigate={handleNavigate}
        savedCount={savedDestinationIds.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        currentLanguage={currentLanguage}
        onLanguageChange={(lang) => {
          setCurrentLanguage(lang);
          showToast(`Language preference switched.`);
        }}
        isLargeFont={isLargeFont}
        onToggleLargeFont={() => setIsLargeFont(!isLargeFont)}
        onOpenVoiceGuide={() => handleOpenVoiceGuide()}
      />

      {/* Main View Switching */}
      <main className="flex-1">
        {activeView === 'planner' ? (
          /* Multi-Step Smart Trip Builder Wizard */
          <TripBuilderWizard
            initialDestination={plannerDestination}
            currentLanguage={currentLanguage}
            onSubmit={handleWizardSubmit}
            onCancel={() => handleNavigate('home')}
            showToast={showToast}
          />
        ) : activeView === 'itinerary' && generatedItinerary ? (
          /* AI Generated Itinerary Results Route with Functional Actions */
          <ItineraryResultsView
            itinerary={generatedItinerary}
            onModifyPreferences={() => {
              setActiveView('planner');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectDestination={(dest) => setSelectedDestination(dest)}
            onOpenVoiceGuide={handleOpenVoiceGuide}
            onSaveTrip={(title) => {
              const destIds = generatedItinerary.destinationsCovered.map(d => d.id);
              setSavedDestinationIds(prev => Array.from(new Set([...prev, ...destIds])));
              showToast(`Saved "${title}" to your trips!`);
            }}
            onBackToHome={() => handleNavigate('home')}
            isSaved={generatedItinerary.destinationsCovered.every(d => savedDestinationIds.includes(d.id))}
            onRegenerateTrip={handleRegenerateTrip}
            onReplaceDestination={handleReplaceDestination}
            onRemoveDestination={handleRemoveDestination}
            onOptimizeRoute={handleOptimizeRoute}
            onUpdateBudgetPreferences={handleUpdateBudgetPreferences}
            currentLanguage={currentLanguage}
          />
        ) : (
          /* Home & Discover Module */
          <>
            {/* 1. Hero Section */}
            <Hero
              onPlanTrip={() => handleNavigate('planner')}
              onExploreDestinations={() => {
                const el = document.getElementById('explore-karnataka');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectDestination={(dest) => setSelectedDestination(dest)}
              onOpenVoiceGuide={handleOpenVoiceGuide}
              currentLanguage={currentLanguage}
            />

            {/* 2. Visual Interest Categories */}
            <InterestCategories
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              currentLanguage={currentLanguage}
            />

            {/* 3. Explore Karnataka Curated Destination Cards & Search Module */}
            <ExploreSection
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onSelectDestination={(dest) => setSelectedDestination(dest)}
              onOpenVoiceGuide={handleOpenVoiceGuide}
              savedDestinationIds={savedDestinationIds}
              onToggleSave={handleToggleSave}
              onPlanTripTo={handleStartTripWithDestination}
              onViewOnMap={handleViewOnMap}
              onAddToItinerary={handleAddToItinerary}
              currentItineraryDestIds={generatedItinerary ? generatedItinerary.destinationsCovered.map(d => d.id) : []}
              currentLanguage={currentLanguage}
            />

            {/* 4. How It Works */}
            <HowItWorks
              onStartPlanning={() => handleNavigate('planner')}
              currentLanguage={currentLanguage}
            />

            {/* 5. Features Section */}
            <FeaturesSection currentLanguage={currentLanguage} />
          </>
        )}
      </main>

      {/* Destination Details Modal */}
      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        isSaved={selectedDestination ? savedDestinationIds.includes(selectedDestination.id) : false}
        onToggleSave={handleToggleSave}
        onPlanTripTo={handleStartTripWithDestination}
        onSelectNearby={(nearbyDest) => setSelectedDestination(nearbyDest)}
        onViewOnMap={handleViewOnMap}
        onAddToItinerary={handleAddToItinerary}
        onOpenVoiceGuide={handleOpenVoiceGuide}
        isInCurrentItinerary={
          selectedDestination && generatedItinerary
            ? generatedItinerary.destinationsCovered.some(d => d.id === selectedDestination.id)
            : false
        }
        currentLanguage={currentLanguage}
      />

      {/* Yatra Voice Guide AI Modal */}
      <VoiceGuideModal
        destination={selectedVoiceDestination}
        onClose={() => setSelectedVoiceDestination(null)}
        initialLanguage={currentLanguage as any}
      />

      {/* Saved Trips Modal */}
      <SavedTripsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedIds={savedDestinationIds}
        onRemoveSaved={handleToggleSave}
        onClearAll={handleClearAllSaved}
        onSelectDestination={(dest) => setSelectedDestination(dest)}
        onPlanTripWithSaved={handleStartTripWithSaved}
        currentLanguage={currentLanguage}
      />

      {/* Yatra Buddy Conversational Travel Assistant */}
      <YatraBuddyChat
        itinerary={generatedItinerary}
        selectedDestination={selectedDestination}
        savedDestinationIds={savedDestinationIds}
        destinations={DESTINATIONS}
        onUpdateBudgetPreferences={handleUpdateBudgetPreferences}
        onWizardSubmit={handleWizardSubmit}
        onReplaceDestination={handleReplaceDestination}
        onAddToItinerary={handleAddToItinerary}
        onSelectDestination={(dest) => setSelectedDestination(dest)}
        onOpenVoiceGuide={handleOpenVoiceGuide}
        onViewOnMap={handleViewOnMap}
        onNavigate={handleNavigate}
        showToast={showToast}
        currentLanguage={currentLanguage}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenSaved={() => setIsSavedModalOpen(true)}
      />

    </div>
  );
};

export default App;
