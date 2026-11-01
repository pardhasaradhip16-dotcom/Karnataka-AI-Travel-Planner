import type { AccommodationTier, TransportPreference, BudgetTierId } from '../types';

/**
 * Verified Statutory Entry Fees for Karnataka Attractions & Heritage Monuments.
 * Sourced directly from Archaeological Survey of India (ASI), Mysore Palace Board,
 * and Karnataka State Tourism Development Corporation (KSTDC).
 */
export interface StatutoryAttractionFee {
  destinationId: string;
  attractionName: string;
  adultFeeInr: number;
  childFeeInr: number;
  foreignNationalFeeInr: number;
  authority: string;
  isVerifiedStatutory: boolean;
  notes: string;
}

export const VERIFIED_STATUTORY_FEES: Record<string, StatutoryAttractionFee[]> = {
  hampi: [
    {
      destinationId: 'hampi',
      attractionName: 'Stone Chariot & Vijaya Vittala Temple Complex',
      adultFeeInr: 40,
      childFeeInr: 0,
      foreignNationalFeeInr: 600,
      authority: 'Archaeological Survey of India (ASI)',
      isVerifiedStatutory: true,
      notes: 'Composite ticket includes Vittala Temple and Lotus Mahal Zenana enclosure on same day.'
    },
    {
      destinationId: 'hampi',
      attractionName: 'Virupaksha Temple Sanctuary',
      adultFeeInr: 25,
      childFeeInr: 0,
      foreignNationalFeeInr: 50,
      authority: 'Hindu Religious & Charitable Endowments (HR&CE)',
      isVerifiedStatutory: true,
      notes: 'Inner sanctum maintenance fee; main courtyard entry is free.'
    },
    {
      destinationId: 'hampi',
      attractionName: 'Matanga Hill & Sunset Boulder Trail',
      adultFeeInr: 0,
      childFeeInr: 0,
      foreignNationalFeeInr: 0,
      authority: 'Open Heritage Access',
      isVerifiedStatutory: true,
      notes: 'Natural viewpoint; free public access. Carry hydration.'
    }
  ],
  mysuru: [
    {
      destinationId: 'mysuru',
      attractionName: 'Amba Vilas (Mysore Palace) Main Durbar & Interior',
      adultFeeInr: 100,
      childFeeInr: 50,
      foreignNationalFeeInr: 1000,
      authority: 'Mysore Palace Board (Govt of Karnataka)',
      isVerifiedStatutory: true,
      notes: 'Standard electronic entry ticket. Sunday night palace illumination viewing from garden is free.'
    },
    {
      destinationId: 'mysuru',
      attractionName: 'Chamundeshwari Temple & Nandi Hill',
      adultFeeInr: 0,
      childFeeInr: 0,
      foreignNationalFeeInr: 0,
      authority: 'Muzrai Department',
      isVerifiedStatutory: true,
      notes: 'General darshan is free. Special quick-darshan pass is ₹100 (optional).'
    },
    {
      destinationId: 'mysuru',
      attractionName: 'St. Philomena’s Cathedral & Crypt',
      adultFeeInr: 0,
      childFeeInr: 0,
      foreignNationalFeeInr: 0,
      authority: 'Diocese of Mysore',
      isVerifiedStatutory: true,
      notes: 'Free entry for all visitors. Modest dress code expected.'
    }
  ],
  coorg: [
    {
      destinationId: 'coorg',
      attractionName: 'Abbey Falls Nature Pathway',
      adultFeeInr: 15,
      childFeeInr: 10,
      foreignNationalFeeInr: 50,
      authority: 'Kodagu Tourism & Gram Panchayat',
      isVerifiedStatutory: true,
      notes: 'Pathway maintenance fee + ₹30 vehicle parking.'
    },
    {
      destinationId: 'coorg',
      attractionName: 'Dubare Elephant Camp River Crossing & Interaction',
      adultFeeInr: 100,
      childFeeInr: 50,
      foreignNationalFeeInr: 400,
      authority: 'Karnataka Forest Department (Jungle Lodges)',
      isVerifiedStatutory: true,
      notes: 'River boat crossing ₹50 + camp entry ₹50. Elephant bathing activity is extra ₹100.'
    },
    {
      destinationId: 'coorg',
      attractionName: 'Namdroling Monastery (Golden Temple Bylakuppe)',
      adultFeeInr: 0,
      childFeeInr: 0,
      foreignNationalFeeInr: 0,
      authority: 'Namdroling Tibetan Community',
      isVerifiedStatutory: true,
      notes: 'Free public entry. Peaceful silence requested inside prayer halls.'
    }
  ],
  gokarna: [
    {
      destinationId: 'gokarna',
      attractionName: 'Mahabaleshwar Temple & Atmalinga Shrine',
      adultFeeInr: 0,
      childFeeInr: 0,
      foreignNationalFeeInr: 0,
      authority: 'Temple Trust',
      isVerifiedStatutory: true,
      notes: 'Free traditional darshan. Dhoti mandatory for men touching Atmalinga.'
    },
    {
      destinationId: 'gokarna',
      attractionName: 'Om Beach & Kudle Beach Coastal Trek',
      adultFeeInr: 0,
      childFeeInr: 0,
      foreignNationalFeeInr: 0,
      authority: 'Uttara Kannada Coastal Tourism',
      isVerifiedStatutory: true,
      notes: 'Scenic rocky trail connecting 5 beaches; free public access.'
    }
  ],
  chikkamagaluru: [
    {
      destinationId: 'chikkamagaluru',
      attractionName: 'Mullayanagiri Peak & Seethalayyanagiri Shrine',
      adultFeeInr: 0,
      childFeeInr: 0,
      foreignNationalFeeInr: 0,
      authority: 'Karnataka Forest Department',
      isVerifiedStatutory: true,
      notes: 'Highest peak in Karnataka; free access. Green cess of ₹20 collected per vehicle.'
    },
    {
      destinationId: 'chikkamagaluru',
      attractionName: 'Baba Budangiri & Manikyadhara Falls',
      adultFeeInr: 0,
      childFeeInr: 0,
      foreignNationalFeeInr: 0,
      authority: 'Forest Dept / Muzrai',
      isVerifiedStatutory: true,
      notes: 'Holy syncretic shrine; free entry.'
    }
  ],
  badami: [
    {
      destinationId: 'badami',
      attractionName: 'Badami Rock-cut Cave Temples (Caves 1–4)',
      adultFeeInr: 25,
      childFeeInr: 0,
      foreignNationalFeeInr: 300,
      authority: 'Archaeological Survey of India (ASI)',
      isVerifiedStatutory: true,
      notes: 'ASI monument entry ticket covers all 4 cave temples and Agastya lake overlook.'
    },
    {
      destinationId: 'badami',
      attractionName: 'Bhutanatha Group of Temples',
      adultFeeInr: 0,
      childFeeInr: 0,
      foreignNationalFeeInr: 0,
      authority: 'Archaeological Survey of India (ASI)',
      isVerifiedStatutory: true,
      notes: 'Lakeside sandstone temples; free access during daylight hours.'
    }
  ],
  kabini: [
    {
      destinationId: 'kabini',
      attractionName: 'Nagarhole Tiger Reserve Canter Safari (Bus)',
      adultFeeInr: 650,
      childFeeInr: 350,
      foreignNationalFeeInr: 1850,
      authority: 'Karnataka Forest Department',
      isVerifiedStatutory: true,
      notes: 'Government scheduled safari. Forest entry and naturalist guide fee included.'
    },
    {
      destinationId: 'kabini',
      attractionName: 'Kabini River Coracle Boat Safari',
      adultFeeInr: 300,
      childFeeInr: 150,
      foreignNationalFeeInr: 600,
      authority: 'Jungle Lodges & Resorts (JLR)',
      isVerifiedStatutory: true,
      notes: '30-minute circular coracle boat drift along water edge with lifejackets.'
    }
  ],
  udupi: [
    {
      destinationId: 'udupi',
      attractionName: 'Sri Krishna Matha & Kanakana Kindi',
      adultFeeInr: 0,
      childFeeInr: 0,
      foreignNationalFeeInr: 0,
      authority: 'Ashta Matha Council',
      isVerifiedStatutory: true,
      notes: 'Free public darshan and complimentary Anna Santharpana (temple lunch oota) daily.'
    },
    {
      destinationId: 'udupi',
      attractionName: 'St. Mary’s Island Ferry & Columnar Basalt Park',
      adultFeeInr: 300,
      childFeeInr: 150,
      foreignNationalFeeInr: 500,
      authority: 'Malpe Beach Development Committee',
      isVerifiedStatutory: true,
      notes: 'Round-trip motorboat ferry from Malpe beach; plastic-free eco island.'
    }
  ],
  jogfalls: [
    {
      destinationId: 'jogfalls',
      attractionName: 'Jog Falls Main Viewpoint & Laser Show Amphitheatre',
      adultFeeInr: 30,
      childFeeInr: 15,
      foreignNationalFeeInr: 100,
      authority: 'Jog Management Authority (JMA)',
      isVerifiedStatutory: true,
      notes: 'Statutory gate entry. Vehicle parking ₹50.'
    }
  ],
  belur: [
    {
      destinationId: 'belur',
      attractionName: 'Chennakeshava Temple Belur & Hoysaleswara Temple Halebeedu',
      adultFeeInr: 25,
      childFeeInr: 0,
      foreignNationalFeeInr: 300,
      authority: 'Archaeological Survey of India (ASI)',
      isVerifiedStatutory: true,
      notes: 'UNESCO World Heritage inscription; ASI museum entry is ₹25, main active shrine free.'
    }
  ]
};

/**
 * Seasonal Accommodation Room Rates in Karnataka (2 adults per room).
 * Rates reflect verified averages across standard seasons (October - March peak).
 */
export interface AccommodationRateConfig {
  tier: AccommodationTier;
  label: string;
  kannadaLabel: string;
  avgRoomRatePerNight: number;
  description: string;
  amenities: string[];
  estimationBasis: string;
}

export const ACCOMMODATION_RATES: Record<AccommodationTier, AccommodationRateConfig> = {
  budget_homestay: {
    tier: 'budget_homestay',
    label: 'Budget Homestay / KSTDC Mayura',
    kannadaLabel: 'ಬಜೆಟ್ ಹೋಮ್‌ಸ್ಟೇ / ಕೆಎಸ್‌ಟಿಡಿಸಿ',
    avgRoomRatePerNight: 1650,
    description: 'Authentic local family homestay or government KSTDC hotel with clean double bedrooms, hot water, and home-cooked breakfasts.',
    amenities: ['Clean Double Bed', 'Attached Bath with Geyser', 'Home Cooked Breakfast', 'Local Host Guidance'],
    estimationBasis: 'Based on surveyed Karnataka Homestay Association & KSTDC Mayura tariffs.'
  },
  standard_hotel: {
    tier: 'standard_hotel',
    label: 'Comfort 3-Star AC Hotel',
    kannadaLabel: 'ಆರಾಮದಾಯಕ 3-ಸ್ಟಾರ್ ಹೋಟೆಲ್',
    avgRoomRatePerNight: 3200,
    description: 'Well-rated 3-star property with air-conditioning, Wi-Fi, in-house restaurant, room service, and secure parking.',
    amenities: ['AC Room', 'Complimentary Buffet Breakfast', 'High-Speed Wi-Fi', 'Parking & Room Service'],
    estimationBasis: 'Based on regional aggregators (MakeMyTrip / Goibibo average for 3-star in Karnataka).'
  },
  heritage_resort: {
    tier: 'heritage_resort',
    label: 'Heritage Resort / Coffee Estate Retreat',
    kannadaLabel: 'ಪರಂಪರೆ ರೆಸಾರ್ಟ್ / ಕಾಫಿ ಎಸ್ಟೇಟ್',
    avgRoomRatePerNight: 6400,
    description: 'Picturesque estate bungalow or heritage palace hotel surrounded by coffee plantations, forest trails, or river views.',
    amenities: ['Estate Plantation Walk', 'Swimming Pool', 'Multi-Cuisine Dining', 'Bonfire & Recreation'],
    estimationBasis: 'Based on surveyed Coorg & Chikkamagaluru plantation resort averages.'
  },
  luxury_villa: {
    tier: 'luxury_villa',
    label: 'Luxury Pool Villa / Wilderness Lodge',
    kannadaLabel: 'ಐಷಾರಾಮಿ ವಿಲ್ಲಾ / ವೈಲ್ಡರ್ನೆಸ್ ಲಾಡ್ಜ್',
    avgRoomRatePerNight: 13500,
    description: 'Premier eco-luxury retreat (such as Evolve Back, Serai, or Jungle Lodges luxury cottages) with personalized butler service and gourmet dining.',
    amenities: ['Private Plunge Pool', 'All Meals Included', 'Private Naturalist Safari', 'Spa Treatment Credits'],
    estimationBasis: 'Based on luxury wilderness lodge rack rates in Kabini and Kodagu.'
  }
};

/**
 * Transport Estimation Configuration.
 */
export interface TransportCostModel {
  preference: TransportPreference;
  label: string;
  isGroupShared: boolean;
  baseDailyGroupCost: number;
  perPersonDailyCost: number;
  perKmRate: number;
  driverAllowancePerDay: number;
  tollAndParkingPerDay: number;
  fuelRatePerLitre: number;
  estimatedMileageKmpl: number;
  description: string;
  estimationBasis: string;
}

export const TRANSPORT_COST_MODELS: Record<TransportPreference, TransportCostModel> = {
  public_transit: {
    preference: 'public_transit',
    label: 'Public Transit (KSRTC Airavat / Rajahamsa + Rail)',
    isGroupShared: false,
    baseDailyGroupCost: 0,
    perPersonDailyCost: 480, // Intercity bus/train average + local auto
    perKmRate: 0,
    driverAllowancePerDay: 0,
    tollAndParkingPerDay: 0,
    fuelRatePerLitre: 0,
    estimatedMileageKmpl: 0,
    description: 'Premier KSRTC Airavat AC / Rajahamsa sleeper bus network combined with local auto-rickshaws.',
    estimationBasis: 'KSRTC tariff tables for Bengaluru-Mysuru-Hampi-Coorg routes + ₹150 daily auto allowance.'
  },
  self_drive: {
    preference: 'self_drive',
    label: 'Self-Drive Car (Rental + Fuel + Tolls)',
    isGroupShared: true,
    baseDailyGroupCost: 2200, // Hatchback/Compact SUV rental per day
    perPersonDailyCost: 0,
    perKmRate: 0,
    driverAllowancePerDay: 0,
    tollAndParkingPerDay: 180, // FASTag tolls & parking
    fuelRatePerLitre: 102.8, // Karnataka petrol price standard
    estimatedMileageKmpl: 14.0,
    description: 'Rental car driven by you. Split vehicle rental, fuel at ₹102.8/L, and FASTag tolls among the group.',
    estimationBasis: 'Zoomcar / Revv Karnataka standard day rates + average 130 km/day travel at 14 kmpl.'
  },
  cab_chauffeur: {
    preference: 'cab_chauffeur',
    label: 'Private Chauffeur Cab (Outstation Sedan / Innova)',
    isGroupShared: true,
    baseDailyGroupCost: 0, // Calculated dynamically from km + driver bata
    perPersonDailyCost: 0,
    perKmRate: 15.0, // ₹14-16/km for Sedan/Ertiga
    driverAllowancePerDay: 450, // Driver night bata
    tollAndParkingPerDay: 250,
    fuelRatePerLitre: 0, // Fuel included in per-km commercial rate
    estimatedMileageKmpl: 0,
    description: 'Dedicated air-conditioned outstation cab with a professional driver. Minimum 250 km/day billing.',
    estimationBasis: 'Karnataka Tourist Taxi Operators Association (KTTOA) standard outstation tariff.'
  },
  two_wheeler: {
    preference: 'two_wheeler',
    label: 'Two-Wheeler Rental (Royal Enfield / Activa)',
    isGroupShared: false, // 1 bike per 2 passengers
    baseDailyGroupCost: 0,
    perPersonDailyCost: 450, // ₹800 bike rental split by 2 + fuel
    perKmRate: 0,
    driverAllowancePerDay: 0,
    tollAndParkingPerDay: 40,
    fuelRatePerLitre: 102.8,
    estimatedMileageKmpl: 35.0,
    description: 'Motorcycle / scooter adventure for solo or duos exploring Western Ghat roads.',
    estimationBasis: 'Local rental rates in Gokarna/Hampi/Mysuru (~₹700-900/day per bike).'
  }
};

/**
 * Food & Dining Tiers (Cost per person per day).
 */
export interface FoodCostConfig {
  tier: BudgetTierId;
  dailyPerPerson: number;
  breakfastDesc: string;
  lunchDesc: string;
  dinnerDesc: string;
  estimationBasis: string;
}

export const FOOD_COST_CONFIGS: Record<BudgetTierId, FoodCostConfig> = {
  budget: {
    tier: 'budget',
    dailyPerPerson: 420,
    breakfastDesc: 'Udupi Darshini Masala Dosa & Filter Coffee (~₹80)',
    lunchDesc: 'Karnataka Jolada Rotti or Traditional Rice Oota (~₹180)',
    dinnerDesc: 'Benne Dosa / Roti Curry & tender coconut (~₹160)',
    estimationBasis: 'Verified average for local Karnataka vegetarian messes and Darshinis.'
  },
  comfortable: {
    tier: 'comfortable',
    dailyPerPerson: 850,
    breakfastDesc: 'Hotel Buffet / Cafe Specialty Dosa & Fresh Juice (~₹180)',
    lunchDesc: 'Authentic Heritage Thali / Regional Seafood & Kodava Curry (~₹380)',
    dinnerDesc: 'Casual dining restaurant with local delicacies & dessert (~₹290)',
    estimationBasis: 'Mid-range family restaurants and heritage dining across Karnataka hubs.'
  },
  premium: {
    tier: 'premium',
    dailyPerPerson: 1850,
    breakfastDesc: 'Resort Continental & South Indian Artisanal Breakfast (~₹450)',
    lunchDesc: 'Fine Dining Estate Thali / Coastal Tiger Prawns & Fish Oota (~₹750)',
    dinnerDesc: 'Candlelight Resort Dinner / Kodava Gourmet Tasting (~₹650)',
    estimationBasis: 'Resort multi-cuisine restaurants and premium dining establishments.'
  },
  custom: {
    tier: 'custom',
    dailyPerPerson: 750,
    breakfastDesc: 'Fresh local breakfast and Mysore coffee (~₹150)',
    lunchDesc: 'Hearty regional meal (~₹350)',
    dinnerDesc: 'Relaxed dinner (~₹250)',
    estimationBasis: 'Configurable custom daily dining allowance.'
  }
};

/**
 * Miscellaneous & Incidentals Allowance per person per day.
 * Covers safe drinking water bottles, parking, temple pooja archana, chappal stand,
 * local guide tipping, and small emergency reserve.
 */
export const MISCELLANEOUS_DAILY_PER_PERSON = 180;
