import { 
  VERIFIED_STATUTORY_FEES, 
  ACCOMMODATION_RATES, 
  TRANSPORT_COST_MODELS, 
  FOOD_COST_CONFIGS, 
  MISCELLANEOUS_DAILY_PER_PERSON
} from '../data/budgetRates';
import type { StatutoryAttractionFee } from '../data/budgetRates';
import type { 
  Destination, 
  BudgetBasis, 
  BudgetTierId, 
  AccommodationTier, 
  TransportPreference,
  DetailedExpenseBreakdown,
  ExpenseCategorySummary,
  ExpenseItemDetail,
  DayCostBreakdown,
  BudgetEvaluationResult,
  BudgetSavingRecommendation,
  ExpenseBreakdown
} from '../types';

export interface CalculationInputParams {
  destinations: Destination[];
  totalDays: number;
  groupSize: number;
  transportPreference: TransportPreference;
  accommodationPreference: AccommodationTier;
  budgetTier: BudgetTierId;
  targetBudget: number;
  budgetBasis: BudgetBasis;
  activeAttractionIds?: string[];
}

export class BudgetCalculatorService {

  /**
   * Determine default accommodation tier if not explicitly specified by user.
   */
  public static resolveDefaultAccommodation(budgetTier: BudgetTierId): AccommodationTier {
    switch (budgetTier) {
      case 'budget':
        return 'budget_homestay';
      case 'comfortable':
        return 'standard_hotel';
      case 'premium':
        return 'heritage_resort';
      case 'custom':
      default:
        return 'standard_hotel';
    }
  }

  /**
   * Calculate full, transparent itemized expenses across all 6 categories.
   */
  public static calculateDetailedExpenses(params: CalculationInputParams): DetailedExpenseBreakdown {
    const {
      destinations,
      totalDays,
      groupSize,
      transportPreference,
      accommodationPreference,
      budgetTier
    } = params;

    const validatedGroupSize = Math.max(1, groupSize || 1);
    const validatedDays = Math.max(1, totalDays || 1);
    const nights = Math.max(1, validatedDays - 1);

    // 1. Accommodation Calculation
    const roomsCount = Math.max(1, Math.ceil(validatedGroupSize / 2));
    const roomConfig = ACCOMMODATION_RATES[accommodationPreference] || ACCOMMODATION_RATES.standard_hotel;
    const stayTotal = roomsCount * nights * roomConfig.avgRoomRatePerNight;

    const stayItems: ExpenseItemDetail[] = [
      {
        id: 'stay-rooms',
        name: `${roomConfig.label} (${roomsCount} ${roomsCount === 1 ? 'room' : 'rooms'} × ${nights} ${nights === 1 ? 'night' : 'nights'})`,
        amount: stayTotal,
        unit: `₹${roomConfig.avgRoomRatePerNight.toLocaleString('en-IN')}/room/night`,
        isPerPerson: false,
        isVerifiedStatutory: false,
        sourceAuthority: 'Karnataka Hospitality Tariff Survey',
        estimationNote: roomConfig.estimationBasis,
        category: 'stay'
      }
    ];

    // 2. Transportation Calculation
    const transportModel = TRANSPORT_COST_MODELS[transportPreference] || TRANSPORT_COST_MODELS.cab_chauffeur;
    let transportTotal = 0;
    const transportItems: ExpenseItemDetail[] = [];

    if (transportPreference === 'public_transit') {
      const transitPerPerson = transportModel.perPersonDailyCost * validatedDays;
      transportTotal = transitPerPerson * validatedGroupSize;
      transportItems.push({
        id: 'trans-public',
        name: `KSRTC Airavat / Express & Intercity Transit (${validatedGroupSize} pax × ${validatedDays} days)`,
        amount: transportTotal,
        unit: `₹${transportModel.perPersonDailyCost}/person/day`,
        isPerPerson: true,
        isVerifiedStatutory: false,
        sourceAuthority: 'KSRTC Public Tariff Tables',
        estimationNote: transportModel.estimationBasis,
        category: 'transport'
      });
    } else if (transportPreference === 'self_drive') {
      const vehicleCount = Math.max(1, Math.ceil(validatedGroupSize / 5));
      const rentalCost = vehicleCount * transportModel.baseDailyGroupCost * validatedDays;
      // Average 140km daily travel across Karnataka corridors
      const estTotalKm = validatedDays * 140;
      const fuelCost = Math.round((estTotalKm / transportModel.estimatedMileageKmpl) * transportModel.fuelRatePerLitre * vehicleCount);
      const tollsCost = transportModel.tollAndParkingPerDay * validatedDays * vehicleCount;
      transportTotal = rentalCost + fuelCost + tollsCost;

      transportItems.push(
        {
          id: 'trans-self-rental',
          name: `Self-Drive Rental Vehicle (${vehicleCount} ${vehicleCount === 1 ? 'car' : 'cars'} × ${validatedDays} days)`,
          amount: rentalCost,
          unit: `₹${transportModel.baseDailyGroupCost}/day`,
          isPerPerson: false,
          isVerifiedStatutory: false,
          sourceAuthority: 'Karnataka Car Rental Aggregators',
          estimationNote: 'Zoomcar / Revv standard self-drive tariff.',
          category: 'transport'
        },
        {
          id: 'trans-self-fuel',
          name: `Fuel Estimate (~${estTotalKm} km @ 14 kmpl petrol)`,
          amount: fuelCost,
          unit: `₹${transportModel.fuelRatePerLitre}/L petrol`,
          isPerPerson: false,
          isVerifiedStatutory: false,
          sourceAuthority: 'Indian Oil / HPCL Karnataka Fuel Prices',
          estimationNote: 'Estimated for 140 km/day highway and ghat driving.',
          category: 'transport'
        },
        {
          id: 'trans-self-tolls',
          name: 'FASTag Tolls & Regional Parking Allowance',
          amount: tollsCost,
          unit: `₹${transportModel.tollAndParkingPerDay}/day`,
          isPerPerson: false,
          isVerifiedStatutory: false,
          sourceAuthority: 'NHAI FASTag & Local Municipalities',
          estimationNote: 'Tolls along NH48, NH275, NH66 corridors.',
          category: 'transport'
        }
      );
    } else if (transportPreference === 'cab_chauffeur') {
      const vehicleCount = Math.max(1, Math.ceil(validatedGroupSize / 5));
      // Outstation cabs billing is min 250km/day
      const dailyBilledKm = 250;
      const kmCharge = dailyBilledKm * transportModel.perKmRate * validatedDays * vehicleCount;
      const driverBata = transportModel.driverAllowancePerDay * validatedDays * vehicleCount;
      const tollsAndParking = transportModel.tollAndParkingPerDay * validatedDays * vehicleCount;
      transportTotal = kmCharge + driverBata + tollsAndParking;

      transportItems.push(
        {
          id: 'trans-cab-run',
          name: `Chauffeur Cab (${vehicleCount} vehicle × min 250 km/day × ₹${transportModel.perKmRate}/km)`,
          amount: kmCharge,
          unit: `₹${transportModel.perKmRate}/km`,
          isPerPerson: false,
          isVerifiedStatutory: false,
          sourceAuthority: 'Karnataka Tourist Taxi Operators Association',
          estimationNote: 'Outstation sedan/SUV standard commercial rate.',
          category: 'transport'
        },
        {
          id: 'trans-cab-driver',
          name: `Driver Night Bata & Food Allowance (${validatedDays} days)`,
          amount: driverBata,
          unit: `₹${transportModel.driverAllowancePerDay}/day`,
          isPerPerson: false,
          isVerifiedStatutory: false,
          sourceAuthority: 'Standard Driver Union Minimum Bata',
          estimationNote: 'Fixed standard driver subsistence allowance.',
          category: 'transport'
        },
        {
          id: 'trans-cab-toll',
          name: `Highway Tolls, Green Tax & Monument Parking`,
          amount: tollsAndParking,
          unit: `₹${transportModel.tollAndParkingPerDay}/day`,
          isPerPerson: false,
          isVerifiedStatutory: false,
          sourceAuthority: 'NHAI Toll Gates & Tourist Parking',
          estimationNote: 'FASTag toll plazas on state & national highways.',
          category: 'transport'
        }
      );
    } else if (transportPreference === 'two_wheeler') {
      const bikeCount = Math.max(1, Math.ceil(validatedGroupSize / 2));
      const bikeRentTotal = bikeCount * 750 * validatedDays;
      const bikeFuelTotal = bikeCount * 250 * validatedDays;
      transportTotal = bikeRentTotal + bikeFuelTotal;

      transportItems.push(
        {
          id: 'trans-bike-rent',
          name: `Motorcycle / Scooter Rental (${bikeCount} ${bikeCount === 1 ? 'bike' : 'bikes'} × ${validatedDays} days)`,
          amount: bikeRentTotal,
          unit: `₹750/day per bike`,
          isPerPerson: false,
          isVerifiedStatutory: false,
          sourceAuthority: 'Local Tourist Bike Rentals',
          estimationNote: 'Rental rates across Gokarna, Hampi, and Mysuru.',
          category: 'transport'
        },
        {
          id: 'trans-bike-fuel',
          name: `Two-Wheeler Fuel (~45 kmpl estimate)`,
          amount: bikeFuelTotal,
          unit: `₹250/day per bike`,
          isPerPerson: false,
          isVerifiedStatutory: false,
          sourceAuthority: 'Petrol Rate Karnataka',
          estimationNote: 'Fuel estimate for local exploring.',
          category: 'transport'
        }
      );
    }

    // 3. Food & Dining Calculation
    const foodConfig = FOOD_COST_CONFIGS[budgetTier] || FOOD_COST_CONFIGS.comfortable;
    const foodDailyPerPerson = foodConfig.dailyPerPerson;
    const foodTotal = foodDailyPerPerson * validatedGroupSize * validatedDays;

    const foodItems: ExpenseItemDetail[] = [
      {
        id: 'food-breakfast',
        name: `Breakfast: ${foodConfig.breakfastDesc}`,
        amount: Math.round(foodTotal * 0.22),
        unit: `Per person per day`,
        isPerPerson: true,
        isVerifiedStatutory: false,
        sourceAuthority: 'Karnataka Culinary Price Index',
        estimationNote: foodConfig.estimationBasis,
        category: 'food'
      },
      {
        id: 'food-lunch',
        name: `Lunch: ${foodConfig.lunchDesc}`,
        amount: Math.round(foodTotal * 0.45),
        unit: `Per person per day`,
        isPerPerson: true,
        isVerifiedStatutory: false,
        sourceAuthority: 'Karnataka Culinary Price Index',
        estimationNote: foodConfig.estimationBasis,
        category: 'food'
      },
      {
        id: 'food-dinner',
        name: `Dinner: ${foodConfig.dinnerDesc}`,
        amount: foodTotal - (Math.round(foodTotal * 0.22) + Math.round(foodTotal * 0.45)),
        unit: `Per person per day`,
        isPerPerson: true,
        isVerifiedStatutory: false,
        sourceAuthority: 'Karnataka Culinary Price Index',
        estimationNote: foodConfig.estimationBasis,
        category: 'food'
      }
    ];

    // 4. Entry Fees Calculation (Strictly Verified Statutory Rates)
    let entryFeesTotal = 0;
    const entryItems: ExpenseItemDetail[] = [];
    const verifiedStatutoryHighlights: string[] = [];

    destinations.forEach(dest => {
      const fees = VERIFIED_STATUTORY_FEES[dest.id] || [];
      fees.forEach((fee: StatutoryAttractionFee) => {
        if (fee.adultFeeInr > 0) {
          const itemTotal = fee.adultFeeInr * validatedGroupSize;
          entryFeesTotal += itemTotal;
          entryItems.push({
            id: `entry-${dest.id}-${fee.attractionName.slice(0, 10)}`,
            name: `${dest.name}: ${fee.attractionName}`,
            amount: itemTotal,
            unit: `₹${fee.adultFeeInr}/person`,
            isPerPerson: true,
            isVerifiedStatutory: true,
            sourceAuthority: fee.authority,
            estimationNote: fee.notes,
            category: 'entry'
          });
          verifiedStatutoryHighlights.push(`${dest.name} - ${fee.attractionName} (₹${fee.adultFeeInr} statutory tariff by ${fee.authority})`);
        } else {
          // Free statutory entry
          entryItems.push({
            id: `entry-free-${dest.id}-${fee.attractionName.slice(0, 10)}`,
            name: `${dest.name}: ${fee.attractionName}`,
            amount: 0,
            unit: `Free Public Access`,
            isPerPerson: true,
            isVerifiedStatutory: true,
            sourceAuthority: fee.authority,
            estimationNote: fee.notes,
            category: 'entry'
          });
        }
      });
    });

    // 5. Activities & Guided Experiences Calculation
    let activitiesTotal = 0;
    const activityItems: ExpenseItemDetail[] = [];

    destinations.forEach(dest => {
      if (dest.id === 'hampi') {
        const boatCost = 300 * Math.max(1, Math.ceil(validatedGroupSize / 4));
        activitiesTotal += boatCost;
        activityItems.push({
          id: 'act-hampi-coracle',
          name: 'Hampi Tungabhadra River Coracle Boat Ride',
          amount: boatCost,
          unit: '₹300/boat (seats 4)',
          isPerPerson: false,
          isVerifiedStatutory: false,
          sourceAuthority: 'Local Licensed Boat Operators',
          estimationNote: 'Authentic round coracle drift by Anegundi river bank.',
          category: 'activities'
        });
      }
      if (dest.id === 'coorg') {
        const estateCost = 250 * validatedGroupSize;
        activitiesTotal += estateCost;
        activityItems.push({
          id: 'act-coorg-plantation',
          name: 'Coorg Coffee & Spice Plantation Guided Sensory Walk',
          amount: estateCost,
          unit: '₹250/person',
          isPerPerson: true,
          isVerifiedStatutory: false,
          sourceAuthority: 'Kodagu Planters Association',
          estimationNote: 'Guided walking tour through Arabica coffee estates.',
          category: 'activities'
        });
      }
      if (dest.id === 'kabini') {
        // Canter wildlife safari
        const safariCost = 650 * validatedGroupSize;
        activitiesTotal += safariCost;
        activityItems.push({
          id: 'act-kabini-safari',
          name: 'Nagarhole Tiger Reserve Canter Wildlife Safari',
          amount: safariCost,
          unit: '₹650/person',
          isPerPerson: true,
          isVerifiedStatutory: true,
          sourceAuthority: 'Karnataka Forest Department',
          estimationNote: 'Official 2.5-hour deep jungle wildlife safari with naturalist.',
          category: 'activities'
        });
      }
      if (dest.id === 'udupi') {
        const ferryCost = 300 * validatedGroupSize;
        activitiesTotal += ferryCost;
        activityItems.push({
          id: 'act-udupi-ferry',
          name: 'St. Mary’s Geological Island Round-Trip Boat Ferry',
          amount: ferryCost,
          unit: '₹300/person',
          isPerPerson: true,
          isVerifiedStatutory: true,
          sourceAuthority: 'Malpe Beach Development Committee',
          estimationNote: 'Official return boat transfer from Malpe harbour.',
          category: 'activities'
        });
      }
    });

    // 6. Miscellaneous Expenses
    const miscDailyPerPerson = MISCELLANEOUS_DAILY_PER_PERSON;
    const miscTotal = miscDailyPerPerson * validatedGroupSize * validatedDays;
    const miscItems: ExpenseItemDetail[] = [
      {
        id: 'misc-hydration',
        name: 'Tender Coconut, Mineral Water & Monsoon Hydration',
        amount: Math.round(miscTotal * 0.40),
        unit: '₹70/person/day',
        isPerPerson: true,
        isVerifiedStatutory: false,
        sourceAuthority: 'Local Market Average',
        estimationNote: 'Clean packaged water & fresh coconuts at tourist spots.',
        category: 'misc'
      },
      {
        id: 'misc-temple',
        name: 'Temple Archana Pooja, Chappal Stand & Guide Tipping',
        amount: Math.round(miscTotal * 0.35),
        unit: '₹60/person/day',
        isPerPerson: true,
        isVerifiedStatutory: false,
        sourceAuthority: 'Temple Trusts & Local Standards',
        estimationNote: 'Voluntary pooja offerings and authorized local guides.',
        category: 'misc'
      },
      {
        id: 'misc-contingency',
        name: 'Emergency Travel Medical & Minor Incidentals Reserve',
        amount: miscTotal - (Math.round(miscTotal * 0.40) + Math.round(miscTotal * 0.35)),
        unit: '₹50/person/day',
        isPerPerson: true,
        isVerifiedStatutory: false,
        sourceAuthority: 'Prudent Travel Buffer (5%)',
        estimationNote: 'Safety contingency fund for unplanned needs.',
        category: 'misc'
      }
    ];

    // Aggregate Grand Totals
    const grandTotal = stayTotal + transportTotal + foodTotal + entryFeesTotal + activitiesTotal + miscTotal;
    const perPersonTotal = Math.round(grandTotal / validatedGroupSize);

    // Compute Exact Percentages
    const stayPercent = Math.round((stayTotal / grandTotal) * 100) || 0;
    const transportPercent = Math.round((transportTotal / grandTotal) * 100) || 0;
    const foodPercent = Math.round((foodTotal / grandTotal) * 100) || 0;
    const entryFeesPercent = Math.round((entryFeesTotal / grandTotal) * 100) || 0;
    const activitiesPercent = Math.round((activitiesTotal / grandTotal) * 100) || 0;
    const miscPercent = Math.max(0, 100 - (stayPercent + transportPercent + foodPercent + entryFeesPercent + activitiesPercent));

    // Calculate Verified Statutory vs Estimated Share
    let verifiedTotal = 0;
    const allItems = [...stayItems, ...transportItems, ...foodItems, ...entryItems, ...activityItems, ...miscItems];
    allItems.forEach(item => {
      if (item.isVerifiedStatutory) verifiedTotal += item.amount;
    });
    const estimatedTotal = grandTotal - verifiedTotal;
    const verifiedPercentage = Math.round((verifiedTotal / grandTotal) * 100) || 0;

    // Categories Breakdown Summaries
    const categories: ExpenseCategorySummary[] = [
      {
        key: 'stay',
        label: 'Accommodation',
        amount: stayTotal,
        percentage: stayPercent,
        isVerified: false,
        verifiedAmount: 0,
        estimatedAmount: stayTotal,
        estimationRule: roomConfig.estimationBasis,
        items: stayItems
      },
      {
        key: 'transport',
        label: 'Transportation',
        amount: transportTotal,
        percentage: transportPercent,
        isVerified: false,
        verifiedAmount: 0,
        estimatedAmount: transportTotal,
        estimationRule: transportModel.estimationBasis,
        items: transportItems
      },
      {
        key: 'food',
        label: 'Food & Dining',
        amount: foodTotal,
        percentage: foodPercent,
        isVerified: false,
        verifiedAmount: 0,
        estimatedAmount: foodTotal,
        estimationRule: foodConfig.estimationBasis,
        items: foodItems
      },
      {
        key: 'entry',
        label: 'Monument & Entry Fees',
        amount: entryFeesTotal,
        percentage: entryFeesPercent,
        isVerified: true,
        verifiedAmount: entryFeesTotal,
        estimatedAmount: 0,
        estimationRule: '100% verified statutory government tariffs (ASI / Mysore Palace Board / KSTDC).',
        verifiedSource: 'Archaeological Survey of India & Karnataka Tourism Board',
        items: entryItems
      },
      {
        key: 'activities',
        label: 'Activities & Experiences',
        amount: activitiesTotal,
        percentage: activitiesPercent,
        isVerified: activityItems.some(a => a.isVerifiedStatutory),
        verifiedAmount: activityItems.filter(a => a.isVerifiedStatutory).reduce((acc, curr) => acc + curr.amount, 0),
        estimatedAmount: activityItems.filter(a => !a.isVerifiedStatutory).reduce((acc, curr) => acc + curr.amount, 0),
        estimationRule: 'Government safaris, eco-island ferry tickets, and licensed local activities.',
        items: activityItems
      },
      {
        key: 'misc',
        label: 'Miscellaneous & Contingency',
        amount: miscTotal,
        percentage: miscPercent,
        isVerified: false,
        verifiedAmount: 0,
        estimatedAmount: miscTotal,
        estimationRule: `Estimated allowance of ₹${miscDailyPerPerson}/person/day for hydration, temple poojas, and parking.`,
        items: miscItems
      }
    ];

    // Day-by-Day Cost Distribution
    const dayByDayCosts: DayCostBreakdown[] = [];
    const dailyTransport = Math.round(transportTotal / validatedDays);
    const dailyStay = Math.round(stayTotal / validatedDays);
    const dailyFood = Math.round(foodTotal / validatedDays);
    const dailyMisc = Math.round(miscTotal / validatedDays);

    for (let dayIdx = 1; dayIdx <= validatedDays; dayIdx++) {
      const destIndex = Math.min(
        Math.floor((dayIdx - 1) / Math.ceil(validatedDays / destinations.length)),
        destinations.length - 1
      );
      const activeDest = destinations[destIndex];

      // Attribute specific day entry fees and activities
      const dayEntryItems = entryItems.filter(item => item.name.includes(activeDest?.name || ''));
      const dayEntryCost = dayEntryItems.reduce((acc, curr) => acc + curr.amount, 0);

      const dayActivityItems = activityItems.filter(item => item.name.toLowerCase().includes(activeDest?.id || ''));
      const dayActivityCost = dayActivityItems.reduce((acc, curr) => acc + curr.amount, 0);

      const dayTotalCost = dailyTransport + dailyStay + dailyFood + dayEntryCost + dayActivityCost + dailyMisc;

      dayByDayCosts.push({
        dayNumber: dayIdx,
        destinationName: activeDest?.name || 'Karnataka Circuit',
        transport: dailyTransport,
        stay: dailyStay,
        food: dailyFood,
        entryFees: dayEntryCost,
        activities: dayActivityCost,
        misc: dailyMisc,
        dayTotal: dayTotalCost,
        items: [...dayEntryItems, ...dayActivityItems]
      });
    }

    // Documented Assumptions
    const estimationAssumptions: string[] = [
      `Accommodation costs assume ${roomsCount} ${roomsCount === 1 ? 'room' : 'rooms'} based on 2 adults per room at ₹${roomConfig.avgRoomRatePerNight.toLocaleString('en-IN')}/night.`,
      `Transport model assumes ${transportModel.label} under current Karnataka state tariff averages.`,
      `Food estimate assumes ₹${foodDailyPerPerson}/person/day reflecting 3 authentic meals and Mysore filter coffee.`,
      `Monument entry fees are 100% verified statutory tariffs by the Archaeological Survey of India (ASI) & Mysore Palace Board.`,
      `No live dynamic airline surge or peak holiday premiums are fabricated; baseline figures represent standard tourist season benchmarks.`
    ];

    return {
      stay: stayTotal,
      transport: transportTotal,
      food: foodTotal,
      entryFees: entryFeesTotal,
      activities: activitiesTotal,
      misc: miscTotal,
      total: grandTotal,
      perPersonTotal,
      stayPercent,
      transportPercent,
      foodPercent,
      entryFeesPercent,
      activitiesPercent,
      miscPercent,
      verifiedTotal,
      estimatedTotal,
      verifiedPercentage,
      categories,
      dayByDayCosts,
      estimationAssumptions,
      verifiedStatutoryHighlights
    };
  }

  /**
   * Evaluate user budget against estimated cost, calculate variance, and provide actionable savings recommendations.
   */
  public static evaluateBudget(
    detailed: DetailedExpenseBreakdown,
    targetBudget: number,
    budgetBasis: BudgetBasis,
    groupSize: number,
    params: CalculationInputParams
  ): BudgetEvaluationResult {
    const validatedGroupSize = Math.max(1, groupSize || 1);
    
    // Normalize target budget to total group expenditure
    const totalTargetBudget = budgetBasis === 'per_person' 
      ? targetBudget * validatedGroupSize 
      : targetBudget;

    const totalEstimated = detailed.total;
    const perPersonEstimated = detailed.perPersonTotal;
    const variance = totalTargetBudget - totalEstimated; // positive = under budget, negative = over budget
    const percentageUsed = Math.min(300, Math.round((totalEstimated / (totalTargetBudget || 1)) * 100));

    let status: 'under_budget' | 'balanced' | 'over_budget';
    let statusLabel: string;
    let shortfallAmount: number | undefined;
    let shortfallExplanation: string | undefined;

    if (variance >= 0) {
      if (percentageUsed >= 92) {
        status = 'balanced';
        statusLabel = `₹${variance.toLocaleString('en-IN')} Surplus (Optimal Plan)`;
      } else {
        status = 'under_budget';
        statusLabel = `₹${variance.toLocaleString('en-IN')} Remaining Surplus`;
      }
    } else {
      status = 'over_budget';
      shortfallAmount = Math.abs(variance);
      statusLabel = `₹${shortfallAmount.toLocaleString('en-IN')} Budget Shortfall`;
      shortfallExplanation = `Your planned circuit requires ₹${totalEstimated.toLocaleString('en-IN')}, which exceeds your ${budgetBasis === 'per_person' ? 'per-person' : 'group'} allocation of ₹${totalTargetBudget.toLocaleString('en-IN')} by ₹${shortfallAmount.toLocaleString('en-IN')}. Below are realistic ways to optimize your travel without cutting essential experiences.`;
    }

    // Generate Actionable Cheaper Alternatives
    const savingsRecommendations: BudgetSavingRecommendation[] = [];

    // Alternative 1: Switch Transport
    if (params.transportPreference === 'cab_chauffeur') {
      const publicTransitDiff = detailed.transport - (480 * params.totalDays * validatedGroupSize);
      if (publicTransitDiff > 1000) {
        savingsRecommendations.push({
          id: 'opt-transit',
          title: 'Switch to KSRTC Airavat & Rail Transit',
          description: 'Karnataka’s state transport network has comfortable Volvo Airavat AC coaches connecting Bengaluru, Mysuru, Hampi, and coastal towns.',
          potentialSavings: Math.max(0, publicTransitDiff),
          actionType: 'switch_transport',
          actionLabel: `Save ₹${publicTransitDiff.toLocaleString('en-IN')} • Switch to Public Transit`,
          targetValue: 'public_transit'
        });
      }
    } else if (params.transportPreference === 'self_drive') {
      const transitDiff = detailed.transport - (480 * params.totalDays * validatedGroupSize);
      if (transitDiff > 800) {
        savingsRecommendations.push({
          id: 'opt-transit-self',
          title: 'Switch from Self-Drive to KSRTC Intercity Buses',
          description: 'Save on rental charges, fuel at ₹102.8/L, and FASTag highway tolls by using direct state express buses.',
          potentialSavings: Math.max(0, transitDiff),
          actionType: 'switch_transport',
          actionLabel: `Save ₹${transitDiff.toLocaleString('en-IN')} • Switch to Bus Transit`,
          targetValue: 'public_transit'
        });
      }
    }

    // Alternative 2: Switch Accommodation
    if (params.accommodationPreference === 'luxury_villa') {
      const rooms = Math.max(1, Math.ceil(validatedGroupSize / 2));
      const nights = Math.max(1, params.totalDays - 1);
      const stayDiff = (13500 - 3200) * rooms * nights;
      savingsRecommendations.push({
        id: 'opt-stay-comfort',
        title: 'Choose Comfortable 3-Star AC Hotels',
        description: 'Enjoy clean AC rooms with complimentary breakfast instead of luxury villas.',
        potentialSavings: stayDiff,
        actionType: 'switch_stay',
        actionLabel: `Save ₹${stayDiff.toLocaleString('en-IN')} • Switch to Comfort Hotels`,
        targetValue: 'standard_hotel'
      });
    } else if (params.accommodationPreference === 'heritage_resort') {
      const rooms = Math.max(1, Math.ceil(validatedGroupSize / 2));
      const nights = Math.max(1, params.totalDays - 1);
      const stayDiff = (6400 - 1650) * rooms * nights;
      savingsRecommendations.push({
        id: 'opt-stay-homestay',
        title: 'Stay in Authentic KSTDC Mayura / Coffee Homestays',
        description: 'Immerse in warm Karnataka hospitality with authentic home-cooked meals at half the cost of commercial resorts.',
        potentialSavings: stayDiff,
        actionType: 'switch_stay',
        actionLabel: `Save ₹${stayDiff.toLocaleString('en-IN')} • Switch to Homestays`,
        targetValue: 'budget_homestay'
      });
    } else if (params.accommodationPreference === 'standard_hotel') {
      const rooms = Math.max(1, Math.ceil(validatedGroupSize / 2));
      const nights = Math.max(1, params.totalDays - 1);
      const stayDiff = (3200 - 1650) * rooms * nights;
      if (stayDiff > 500) {
        savingsRecommendations.push({
          id: 'opt-stay-budget',
          title: 'Switch to Verified Budget Homestays',
          description: 'Save substantially on room tariff while supporting local village and coffee plantation hosts.',
          potentialSavings: stayDiff,
          actionType: 'switch_stay',
          actionLabel: `Save ₹${stayDiff.toLocaleString('en-IN')} • Switch to Budget Homestays`,
          targetValue: 'budget_homestay'
        });
      }
    }

    // Alternative 3: Dining Tier Optimization
    if (params.budgetTier === 'premium') {
      const foodDiff = (1850 - 850) * validatedGroupSize * params.totalDays;
      savingsRecommendations.push({
        id: 'opt-food-local',
        title: 'Dine at Renowned Heritage Thali Messes & Darshinis',
        description: 'Experience legendary Karnataka delicacies (Mylari Dosa, Jolada Rotti Oota, coastal seafood mess) at genuine local prices.',
        potentialSavings: foodDiff,
        actionType: 'switch_activities',
        actionLabel: `Save ₹${foodDiff.toLocaleString('en-IN')} • Switch to Regional Dining`,
        targetValue: 'comfortable'
      });
    }

    return {
      targetBudget,
      budgetBasis,
      totalEstimatedCost: totalEstimated,
      perPersonEstimatedCost: perPersonEstimated,
      variance,
      status,
      statusLabel,
      percentageUsed,
      shortfallAmount,
      shortfallExplanation,
      savingsRecommendations
    };
  }

  /**
   * Produce legacy ExpenseBreakdown format for backward compatibility with existing views.
   */
  public static toLegacyExpenseBreakdown(detailed: DetailedExpenseBreakdown): ExpenseBreakdown {
    return {
      stay: detailed.stay,
      transport: detailed.transport,
      food: detailed.food,
      activities: detailed.activities + detailed.entryFees,
      entryFees: detailed.entryFees,
      misc: detailed.misc,
      total: detailed.total,
      stayPercent: detailed.stayPercent,
      transportPercent: detailed.transportPercent,
      foodPercent: detailed.foodPercent,
      activitiesPercent: detailed.activitiesPercent + detailed.entryFeesPercent,
      entryFeesPercent: detailed.entryFeesPercent,
      miscPercent: detailed.miscPercent
    };
  }
}
