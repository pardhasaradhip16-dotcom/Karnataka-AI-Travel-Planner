import { DESTINATIONS } from '../data/destinations';
import { 
  STARTING_HUB_COORDINATES, 
  getEstimatedCorridor 
} from '../data/routesData';
import { BudgetCalculatorService } from './budgetCalculatorService';
import type { 
  TripBuilderPreferences, 
  GeneratedItinerary, 
  ItineraryDay, 
  Destination, 
  FeasibilityWarning, 
  DestinationRecommendation, 
  DestinationAlternative, 
  ExpenseBreakdown,
  DetailedExpenseBreakdown 
} from '../types';

export class RecommendationEngine {

  /**
   * Main synthesis pipeline that implements the 10 core recommendation rules.
   */
  public static synthesizeItinerary(
    prefs: TripBuilderPreferences,
    forcedDestinations?: Destination[]
  ): GeneratedItinerary {
    // 1. Determine target day count
    const totalDays = this.calculateDays(prefs);

    // 2. Perform Feasibility Analysis
    const feasibilityWarnings = this.analyzeFeasibility(prefs, totalDays);

    // 3. Select and order destinations (or use forced ones during replacement/regeneration)
    const destinationsCovered = forcedDestinations && forcedDestinations.length > 0
      ? forcedDestinations
      : this.selectAndSequenceDestinations(prefs, totalDays);

    // 4. Generate "Why Recommended" explanations and match scores for each chosen place
    const destinationRecommendations: DestinationRecommendation[] = destinationsCovered.map((dest, idx) => {
      const whyRecommended = this.generateRecommendationReason(dest, prefs, idx);
      const matchScore = this.computeDestinationScore(dest, prefs).totalScore;
      const prevDest = idx > 0 ? destinationsCovered[idx - 1] : null;
      const corridor = prevDest ? getEstimatedCorridor(prevDest.id, dest.id) : null;

      return {
        destinationId: dest.id,
        name: dest.name,
        kannadaName: dest.kannadaName,
        district: dest.district,
        region: dest.region,
        whyRecommended,
        matchScore: Math.min(99, Math.max(70, Math.round(matchScore * 10))),
        travelCorridorFromPrevious: corridor ? `${corridor.highway} (~${corridor.typicalTime})` : undefined,
        estimatedTransitHours: corridor ? corridor.typicalTime : undefined
      };
    });

    // 5. Generate Ranked Alternative Destinations
    const coveredIds = new Set(destinationsCovered.map(d => d.id));
    const alternatives: DestinationAlternative[] = this.rankAlternatives(prefs, coveredIds);

    // 6. Compute Detailed Itemized Expenses & Budget Evaluation
    const accommodationTier = prefs.accommodationPreference || BudgetCalculatorService.resolveDefaultAccommodation(prefs.budgetTier);

    const targetBudgetAmount = prefs.budgetTier === 'custom'
      ? prefs.customBudgetAmount
      : prefs.budgetTier === 'budget' ? 2200 * totalDays
      : prefs.budgetTier === 'comfortable' ? 4200 * totalDays
      : 8000 * totalDays;

    const calcParams = {
      destinations: destinationsCovered,
      totalDays,
      groupSize: prefs.groupSize,
      transportPreference: prefs.transportPreference,
      accommodationPreference: accommodationTier,
      budgetTier: prefs.budgetTier,
      targetBudget: targetBudgetAmount,
      budgetBasis: prefs.budgetBasis
    };

    const detailedExpenseBreakdown = BudgetCalculatorService.calculateDetailedExpenses(calcParams);
    const budgetEvaluation = BudgetCalculatorService.evaluateBudget(
      detailedExpenseBreakdown,
      targetBudgetAmount,
      prefs.budgetBasis,
      prefs.groupSize,
      calcParams
    );
    const expenseBreakdown = BudgetCalculatorService.toLegacyExpenseBreakdown(detailedExpenseBreakdown);
    const costTotalNum = detailedExpenseBreakdown.total;
    const costPerPersonNum = detailedExpenseBreakdown.perPersonTotal;

    // 7. Build Day-by-Day Experience Schedule
    const days = this.constructDays(prefs, totalDays, destinationsCovered, detailedExpenseBreakdown);

    // 8. Build Summary Title and Subtitle
    const title = `${totalDays}-Day ${destinationsCovered.map(d => d.name).join(' & ')} Curated Journey`;
    const kannadaTitle = `${totalDays} ದಿನಗಳ ${destinationsCovered.map(d => d.kannadaName).join(' ಮತ್ತು ')} ಅದ್ಭುತ ಪ್ರವಾಸ`;

    // 9. Starting Coordinates
    const startingCoords = STARTING_HUB_COORDINATES[prefs.startingCity] || { lat: 12.9716, lng: 77.5946 };

    // 10. Packing & Accessibility highlights
    const accessibilityHighlights = prefs.accessibilityNeeds.length > 0
      ? prefs.accessibilityNeeds.map(n => n.replace('_', ' ').toUpperCase())
      : ['Standard Walking Trails'];

    const packingList = this.generatePackingList(prefs, destinationsCovered);

    return {
      id: `yatra-${Date.now()}`,
      generatedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      title,
      kannadaTitle,
      subtitle: `Intelligently personalized for ${prefs.travelerType.toUpperCase()} (${prefs.groupSize} travelers) seeking ${prefs.interests.join(', ')}`,
      summary: `A carefully clustered ${totalDays}-day circuit across ${destinationsCovered.map(d => `${d.name} (${d.district})`).join(' and ')}. Sequenced along practical road corridors with a ${prefs.pace} pace and authentic local Karnataka delicacies.`,
      destinationsCovered,
      destinationRecommendations,
      alternatives,
      feasibilityWarnings,
      expenseBreakdown,
      detailedExpenseBreakdown,
      budgetEvaluation,
      accommodationPreference: accommodationTier,
      totalDays,
      estimatedCostTotal: `₹${costTotalNum.toLocaleString('en-IN')}`,
      costPerPerson: `₹${costPerPersonNum.toLocaleString('en-IN')}`,
      budgetBasis: prefs.budgetBasis,
      travelerLabel: prefs.travelerType.charAt(0).toUpperCase() + prefs.travelerType.slice(1),
      groupSize: prefs.groupSize,
      paceLabel: prefs.pace.charAt(0).toUpperCase() + prefs.pace.slice(1),
      transportLabel: prefs.transportPreference.replace('_', ' ').toUpperCase(),
      startingLocation: prefs.isCustomCity ? prefs.customCityName : prefs.startingCity.split(' ')[0],
      startingCoordinates: startingCoords,
      accessibilityHighlights,
      seasonalAdvice: 'Best season to travel Karnataka is September to March. Carry woolens for Ghat nights and hydration for open boulder monuments.',
      packingList,
      days,
      preferencesSnapshot: {
        ...prefs,
        accommodationPreference: accommodationTier
      }
    };
  }

  /**
   * Replace a destination with an alternative and recalculate all metrics.
   */
  public static replaceDestination(
    currentItinerary: GeneratedItinerary,
    oldDestId: string,
    newDestId: string
  ): GeneratedItinerary {
    const newDest = DESTINATIONS.find(d => d.id === newDestId);
    if (!newDest) return currentItinerary;

    const updatedDestinations = currentItinerary.destinationsCovered.map(d => 
      d.id === oldDestId ? newDest : d
    );

    return this.synthesizeItinerary(currentItinerary.preferencesSnapshot, updatedDestinations);
  }

  /**
   * Remove a destination and recalculate.
   */
  public static removeDestination(
    currentItinerary: GeneratedItinerary,
    destIdToRemove: string
  ): GeneratedItinerary {
    if (currentItinerary.destinationsCovered.length <= 1) {
      return currentItinerary; // Keep at least one destination
    }

    const updatedDestinations = currentItinerary.destinationsCovered.filter(d => d.id !== destIdToRemove);
    return this.synthesizeItinerary(currentItinerary.preferencesSnapshot, updatedDestinations);
  }

  /**
   * Regenerate itinerary with alternate day sequencing / activities.
   */
  public static regenerate(currentItinerary: GeneratedItinerary): GeneratedItinerary {
    return this.synthesizeItinerary(currentItinerary.preferencesSnapshot);
  }

  /* ---------------------- INTERNAL ENGINE HELPER METHODS ---------------------- */

  private static calculateDays(prefs: TripBuilderPreferences): number {
    if (prefs.duration === '1-day') return 1;
    if (prefs.duration === '2-3-days') return 3;
    if (prefs.duration === '4-5-days') return prefs.customDays ? Math.max(3, Math.min(5, prefs.customDays)) : 4;
    if (prefs.duration === '6-7-days') return prefs.customDays ? Math.max(6, Math.min(7, prefs.customDays)) : 6;
    if (prefs.duration === 'custom') return Math.max(1, Math.min(14, prefs.customDays || 5));
    return 3;
  }

  /**
   * Requirement 9: Warn when requested trip is infeasible instead of inventing a solution.
   */
  private static analyzeFeasibility(prefs: TripBuilderPreferences, days: number): FeasibilityWarning[] {
    const warnings: FeasibilityWarning[] = [];

    // Check budget feasibility
    let perDayPerPerson = 3500;
    if (prefs.budgetTier === 'budget') perDayPerPerson = 2000;
    else if (prefs.budgetTier === 'comfortable') perDayPerPerson = 3800;
    else if (prefs.budgetTier === 'premium') perDayPerPerson = 7500;
    else if (prefs.budgetTier === 'custom') {
      perDayPerPerson = prefs.budgetBasis === 'per_person' 
        ? prefs.customBudgetAmount / days 
        : (prefs.customBudgetAmount / prefs.groupSize) / days;
    }

    if (perDayPerPerson < 1200) {
      warnings.push({
        type: 'budget_tight',
        title: 'Tight Budget Alert for Karnataka Transit',
        message: `Your specified budget (~₹${Math.round(perDayPerPerson)}/person/day) is below typical minimum daily costs for verified homestays, meals, and intercity state transit.`,
        suggestion: 'Consider budgeting at least ₹1,800/person/day, or prioritize government KSRTC non-AC express buses and temple accommodation.'
      });
    }

    // Check duration vs multiple divergent interests
    const hasNorthInterests = prefs.interests.some(i => i === 'heritage' || i === 'temples');
    const hasBeachInterests = prefs.interests.some(i => i === 'beaches');
    const hasGhatInterests = prefs.interests.some(i => i === 'nature' || i === 'waterfalls');

    if (days === 1 && (prefs.interests.length >= 4 || (hasNorthInterests && hasBeachInterests) || (hasNorthInterests && hasGhatInterests))) {
      warnings.push({
        type: 'duration_tight',
        title: 'Ambitious 1-Day Itinerary Constraint',
        message: 'A single 24-hour day is insufficient to bridge geographically separated destinations like Hampi and Gokarna (~7 hours driving apart).',
        suggestion: 'We have consolidated your 1-day itinerary to one premier clustered district with minimal road transit.'
      });
    }

    // Accessibility feasibility check for rough terrain
    if (prefs.accessibilityNeeds.includes('wheelchair') && prefs.interests.includes('adventure')) {
      warnings.push({
        type: 'accessibility_notice',
        title: 'Accessibility Terrain Notice',
        message: 'Several iconic Karnataka viewpoints (e.g. Matanga Hill boulders in Hampi, Mullayanagiri peak) have steep rock staircases without ramps.',
        suggestion: 'We have prioritized level viewpoints, battery buggy areas at monuments, and ground-level riverside spots.'
      });
    }

    return warnings;
  }

  /**
   * Requirement 2, 4, 5: Filter, group geographically, and arrange in practical route order.
   */
  private static selectAndSequenceDestinations(
    prefs: TripBuilderPreferences,
    totalDays: number
  ): Destination[] {
    // Score all available destinations
    const scored = DESTINATIONS.map(d => ({
      destination: d,
      ...this.computeDestinationScore(d, prefs)
    })).sort((a, b) => b.totalScore - a.totalScore);

    // Number of destinations depends on duration to avoid rushing
    const maxPlaces = totalDays === 1 ? 1 : totalDays <= 3 ? 1 : totalDays <= 5 ? 2 : 3;

    // Primary anchor destination
    const primary = scored[0].destination;
    const selected: Destination[] = [primary];

    // Select subsequent destinations that are geographically compatible
    for (let i = 1; i < scored.length && selected.length < maxPlaces; i++) {
      const candidate = scored[i].destination;
      // Check geographic compatibility: prefer same or adjacent region
      const isGeographicallyCompatible = 
        candidate.region === primary.region ||
        (primary.region === 'South Karnataka' && candidate.region === 'Malnad & Ghats') ||
        (primary.region === 'Malnad & Ghats' && candidate.region === 'Coastal Karavali') ||
        (primary.region === 'North Karnataka' && candidate.region === 'North Karnataka');

      if (isGeographicallyCompatible && !selected.some(s => s.id === candidate.id)) {
        selected.push(candidate);
      }
    }

    // Fallback if needed
    if (selected.length === 0) {
      selected.push(DESTINATIONS[0]);
    }

    // Sequence destinations starting from departure city
    return this.sequenceDestinationsByCorridor(selected, prefs.startingCity);
  }

  private static sequenceDestinationsByCorridor(
    destinations: Destination[],
    startingCity: string
  ): Destination[] {
    if (destinations.length <= 1) return destinations;

    const startHubLower = startingCity.toLowerCase();
    
    // If starting from Bengaluru (South/East), sequence South-to-North or closer first
    if (startHubLower.includes('bengaluru') || startHubLower.includes('mysuru')) {
      return [...destinations].sort((a, b) => a.coordinates.lat - b.coordinates.lat);
    }

    // If starting from Hubballi/Belagavi (North), sequence North-to-South
    if (startHubLower.includes('hubballi') || startHubLower.includes('belagavi')) {
      return [...destinations].sort((a, b) => b.coordinates.lat - a.coordinates.lat);
    }

    return destinations;
  }

  /**
   * Requirement 7: Rank alternatives using interest-match, budget-fit, travel-efficiency, and duration scores.
   */
  private static computeDestinationScore(
    dest: Destination,
    prefs: TripBuilderPreferences
  ): { totalScore: number; interestMatch: number; budgetFit: number; travelEfficiency: number } {
    let interestMatch = 0;

    // Interest tag matching
    prefs.interests.forEach(interest => {
      if (interest === 'nature' && dest.category.includes('Nature')) interestMatch += 2.5;
      if (interest === 'waterfalls' && (dest.id === 'jogfalls' || dest.id === 'coorg' || dest.id === 'chikkamagaluru')) interestMatch += 3.5;
      if (interest === 'beaches' && dest.category.includes('Beaches')) interestMatch += 3.5;
      if (interest === 'heritage' && dest.category.includes('Heritage')) interestMatch += 3.0;
      if (interest === 'temples' && (dest.category.includes('Heritage') || dest.category.includes('Culture') || dest.id === 'udupi')) interestMatch += 3.0;
      if (interest === 'adventure' && dest.category.includes('Adventure')) interestMatch += 2.5;
      if (interest === 'wildlife' && (dest.category.includes('Wildlife') || dest.id === 'kabini')) interestMatch += 3.5;
      if (interest === 'food' && (dest.category.includes('Food') || dest.id === 'udupi' || dest.id === 'mysuru')) interestMatch += 2.0;
      if (interest === 'relaxation' && (dest.id === 'coorg' || dest.id === 'gokarna' || dest.id === 'kabini')) interestMatch += 2.5;
      if (interest === 'culture' && dest.category.includes('Culture')) interestMatch += 2.0;
    });

    // Budget fit
    let budgetFit = 2.0;
    if (prefs.budgetTier === 'budget' && dest.budgetLevel === 'Budget') budgetFit = 3.0;
    else if (prefs.budgetTier === 'comfortable' && (dest.budgetLevel === 'Moderate' || dest.budgetLevel === 'Budget')) budgetFit = 3.0;
    else if (prefs.budgetTier === 'premium' && dest.budgetLevel === 'Luxury') budgetFit = 3.5;

    // Travel efficiency from starting city
    let travelEfficiency = 2.0;
    const startCityLower = prefs.startingCity.toLowerCase();
    if (startCityLower.includes('bengaluru') && dest.region === 'South Karnataka') travelEfficiency = 3.0;
    if (startCityLower.includes('hubballi') && dest.region === 'North Karnataka') travelEfficiency = 3.0;
    if (startCityLower.includes('mangaluru') && dest.region === 'Coastal Karavali') travelEfficiency = 3.0;

    const totalScore = interestMatch + budgetFit + travelEfficiency;
    return { totalScore, interestMatch, budgetFit, travelEfficiency };
  }

  private static rankAlternatives(
    prefs: TripBuilderPreferences,
    excludedIds: Set<string>
  ): DestinationAlternative[] {
    const candidates = DESTINATIONS.filter(d => !excludedIds.has(d.id));

    return candidates.map(dest => {
      const { totalScore } = this.computeDestinationScore(dest, prefs);
      const matchScore = Math.min(98, Math.max(65, Math.round(totalScore * 9.5)));
      
      let reason = `Rich in ${dest.category.join(' and ')} experiences with verified rating of ${dest.rating}★.`;
      if (dest.budgetLevel === 'Budget') {
        reason += ' Budget-friendly stay and food options.';
      } else if (dest.budgetLevel === 'Luxury') {
        reason += ' Features premier wilderness and heritage lodges.';
      }

      return {
        destination: dest,
        matchScore,
        reason,
        budgetDifference: dest.estimatedBudget
      };
    }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
  }

  /**
   * Requirement 8: Explain why each destination was recommended.
   */
  private static generateRecommendationReason(
    dest: Destination,
    prefs: TripBuilderPreferences,
    index: number
  ): string {
    const matchedPassions = prefs.interests.filter(i => {
      const cap = (i.charAt(0).toUpperCase() + i.slice(1)) as any;
      return dest.category.includes(cap) || 
        (i === 'waterfalls' && (dest.id === 'coorg' || dest.id === 'jogfalls' || dest.id === 'chikkamagaluru')) ||
        (i === 'temples' && (dest.id === 'hampi' || dest.id === 'mysuru' || dest.id === 'udupi' || dest.id === 'badami'));
    });

    const passionsText = matchedPassions.length > 0 
      ? `strongly aligns with your passion for ${matchedPassions.join(' and ')}` 
      : `offers premier scenic vistas and authentic Karnataka heritage`;

    const roleText = index === 0 
      ? `Primary circuit anchor: ${dest.name} ${passionsText}.`
      : `Secondary stop: Conveniently connects with road corridors while adding diverse ${dest.category[0]} experiences.`;

    const travelerText = prefs.travelerType === 'family' 
      ? ' Child and elder-friendly infrastructure with easy dining.'
      : prefs.travelerType === 'seniors'
      ? ' Flat walking paths and comfortable battery buggy access available.'
      : ' Excellent photography viewpoints and local street cuisine.';

    return `${roleText}${travelerText}`;
  }

  /**
   * Requirement 6: Estimate total trip expenses (stay, transport, food, activities).
   */
  public static calculateExpenseBreakdown(
    prefs: TripBuilderPreferences,
    days: number,
    _destinations: Destination[]
  ): ExpenseBreakdown {
    // Base daily cost per person based on budget tier and destinations
    let baseDailyPerPerson = 3200;
    if (prefs.budgetTier === 'budget') baseDailyPerPerson = 2000;
    else if (prefs.budgetTier === 'comfortable') baseDailyPerPerson = 3800;
    else if (prefs.budgetTier === 'premium') baseDailyPerPerson = 7500;
    else if (prefs.budgetTier === 'custom') {
      baseDailyPerPerson = prefs.budgetBasis === 'per_person'
        ? Math.round(prefs.customBudgetAmount / days)
        : Math.round((prefs.customBudgetAmount / prefs.groupSize) / days);
    }

    const perPersonTotal = Math.max(1200 * days, baseDailyPerPerson * days);

    // Realistic itemized percentage distribution in Karnataka tourism
    const stay = Math.round(perPersonTotal * 0.45);      // 45% Accommodation
    const transport = Math.round(perPersonTotal * 0.25); // 25% Road/Train/Fuel
    const food = Math.round(perPersonTotal * 0.18);      // 18% Dining & Coffee
    const activities = perPersonTotal - (stay + transport + food); // 12% Monument tickets/safaris

    return {
      stay,
      transport,
      food,
      activities,
      total: perPersonTotal,
      stayPercent: 45,
      transportPercent: 25,
      foodPercent: 18,
      activitiesPercent: 12
    };
  }

  /**
   * Build Day-by-Day Experience Schedule with photographs, visit durations, travel times, and meal spots.
   */
  private static constructDays(
    prefs: TripBuilderPreferences,
    totalDays: number,
    destinations: Destination[],
    expense: ExpenseBreakdown | DetailedExpenseBreakdown
  ): ItineraryDay[] {
    const days: ItineraryDay[] = [];
    const isDetailed = 'dayByDayCosts' in expense;
    const fallbackDaily = Math.round(expense.total / totalDays);
    const startCityClean = prefs.isCustomCity ? prefs.customCityName : prefs.startingCity.split(' ')[0];

    for (let i = 1; i <= totalDays; i++) {
      const destIndex = Math.min(
        Math.floor((i - 1) / Math.ceil(totalDays / destinations.length)),
        destinations.length - 1
      );
      const activeDest = destinations[destIndex];

      const isFirstDay = i === 1;
      const isLastDay = i === totalDays;

      // Realistic visit durations & travel times
      const morningTime = prefs.pace === 'relaxed' ? '09:00 AM – 12:30 PM' : '07:30 AM – 12:00 PM';
      const afternoonTime = '01:30 PM – 05:00 PM';
      const eveningTime = '05:30 PM – 08:30 PM';

      const corridor = i > 1 && destinations[destIndex - 1] 
        ? getEstimatedCorridor(destinations[destIndex - 1].id, activeDest.id) 
        : null;

      days.push({
        dayNumber: i,
        dayTitle: isFirstDay 
          ? `Day 1: Departure from ${startCityClean} & Welcome to ${activeDest.name}`
          : isLastDay
          ? `Day ${i}: Farewell Sights & Return Journey towards ${startCityClean}`
          : `Day ${i}: Immersive Cultural Discovery in ${activeDest.name}`,
        kannadaDayTitle: `${i} ನೇ ದಿನ: ${activeDest.kannadaName} ದರ್ಶನ`,
        destinationName: activeDest.name,
        destinationId: activeDest.id,
        heroImage: activeDest.heroImage,
        morning: {
          title: isFirstDay 
            ? `Arrival & Check-in at ${activeDest.name}`
            : `${activeDest.topAttractions[0]?.name || 'Morning Heritage Walk'}`,
          description: isFirstDay
            ? `Depart from ${startCityClean}. Highway transit arriving mid-morning. Settle into verified homestay and enjoy refreshing filter kaapi.`
            : `Witness morning light at ${activeDest.topAttractions[0]?.name || 'monument'}. ${activeDest.topAttractions[0]?.description || 'Crisp air and minimal crowd.'}`,
          timing: morningTime,
          location: activeDest.name,
          icon: isFirstDay ? 'Car' : 'Sun',
          visitDuration: '2.5 to 3 Hours',
          travelTimeToNext: '20 min local auto/cab ride',
          accessibilityTag: prefs.accessibilityNeeds.includes('wheelchair') ? 'Wheelchair Ramp & Battery Buggy Access' : undefined,
          recommendedMealSpot: `Local Breakfast: Hot ${activeDest.localDelicacies[0] || 'Masala Dosa with Chutney'}`,
          practicalNotes: 'Carry a refillable water bottle and wear easy-to-remove footwear for shrines.'
        },
        afternoon: {
          title: `${activeDest.topAttractions[1]?.name || 'Iconic Cultural Landmark'}`,
          description: `Explore ${activeDest.topAttractions[1]?.name || 'heritage site'}. ${activeDest.topAttractions[1]?.description || 'Guided tour of intricate carvings and royal courtyards.'}`,
          timing: afternoonTime,
          location: `${activeDest.name} District`,
          icon: 'Landmark',
          visitDuration: '2 Hours',
          travelTimeToNext: '15 min scenic drive to viewpoint',
          accessibilityTag: prefs.accessibilityNeeds.includes('minimal_stairs') ? 'Flat ground corridor / Elevator equipped' : undefined,
          recommendedMealSpot: `Authentic Lunch: Traditional Banana-leaf Bhojana with ${activeDest.localDelicacies[1] || 'Sambar and Sweets'}`,
          practicalNotes: 'Audio guides available at ASI ticket counters for detailed historical stories.'
        },
        evening: {
          title: isLastDay
            ? `Souvenir Shopping & Return Transit to ${startCityClean}`
            : `Twilight Sunset at ${activeDest.topAttractions[2]?.name || 'Scenic Promenade'}`,
          description: isLastDay
            ? `Pick up GI-tagged Karnataka souvenirs (spices, sandalwood, silk, coffee). Smooth highway transit back to ${startCityClean}.`
            : `Unwind with magical twilight vistas at ${activeDest.topAttractions[2]?.name || 'viewpoint'}. Stroll through local bazaars for freshly made sweets.`,
          timing: eveningTime,
          location: `${activeDest.name} Viewpoint`,
          icon: 'Sparkles',
          visitDuration: '1.5 to 2 Hours',
          recommendedMealSpot: `Dinner: Authentic ${activeDest.localDelicacies[2] || 'Regional Supper'}`,
          practicalNotes: 'Carry cash for rural artisan purchases as mobile network can vary in hilly areas.'
        },
        transportAdvice: corridor 
          ? `Inter-city transit: ~${corridor.distanceKm} km via ${corridor.highway} (approx. ${corridor.typicalTime}).`
          : prefs.transportPreference === 'public_transit'
          ? 'KSRTC local buses and authorized digital meter auto-rickshaws available at city center.'
          : 'Dedicated private cab waiting at designated parking bays; smooth navigation on ghat roads.',
        accessibilityNote: prefs.accessibilityNeeds.length > 0
          ? `Configured with ${prefs.accessibilityNeeds.join(', ')} criteria. Minimal walking strain.`
          : 'Moderate walking terrain. Comfortable sports shoes recommended.',
        estimatedDayCost: isDetailed && (expense as DetailedExpenseBreakdown).dayByDayCosts[i - 1]
          ? (expense as DetailedExpenseBreakdown).dayByDayCosts[i - 1].dayTotal
          : fallbackDaily
      });
    }

    return days;
  }

  private static generatePackingList(prefs: TripBuilderPreferences, destinations: Destination[]): string[] {
    const list = [
      'Government Issued Photo ID (Voter ID / Aadhaar / Passport)',
      'Modest, breathable cotton clothing for sacred temple sanctums',
      'Comfortable walking shoes with rubber grip for stone courtyards & trails',
      'Refillable metal water bottle (Karnataka Western Ghats plastic-free zone)'
    ];

    if (destinations.some(d => d.region === 'Malnad & Ghats')) {
      list.push('Light fleece jacket / sweater for chilly Western Ghat evenings (Coorg, Chikkamagaluru)');
      list.push('Umbrella or compact rain poncho for sudden tropical mountain showers');
    }

    if (destinations.some(d => d.region === 'Coastal Karavali')) {
      list.push('High-SPF eco sunscreen, sunglasses, and beach slippers for Gokarna/Malpe sands');
    }

    if (prefs.travelerType === 'seniors') {
      list.push('Regular personal prescription medications & walking stick with non-slip rubber tip');
    }

    return list;
  }

  /**
   * Recalculates budget, day-costs, and totals when user updates budget sandbox inputs.
   */
  public static recalculateBudget(
    itinerary: GeneratedItinerary,
    updatedPrefs: Partial<TripBuilderPreferences>
  ): GeneratedItinerary {
    const newPrefs: TripBuilderPreferences = {
      ...itinerary.preferencesSnapshot,
      ...updatedPrefs
    };
    return this.synthesizeItinerary(newPrefs, itinerary.destinationsCovered);
  }
}
