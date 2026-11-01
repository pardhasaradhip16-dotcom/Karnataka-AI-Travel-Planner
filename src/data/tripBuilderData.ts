import type { 
  WizardInterestOption, 
  DurationOptionId, 
  BudgetTierId, 
  TravelerGroupId, 
  TransportPreference, 
  TravelPace, 
  TripBuilderPreferences 
} from '../types';

export const WIZARD_INTERESTS: WizardInterestOption[] = [
  {
    id: 'nature',
    title: 'Nature & Hills',
    kannadaTitle: 'ಪ್ರಕೃತಿ ಮತ್ತು ಗಿರಿಧಾಮ',
    description: 'Misty Sahyadri mountain peaks, lush coffee plantations & rolling valleys.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
    iconName: 'Mountain',
    tag: 'Western Ghats'
  },
  {
    id: 'waterfalls',
    title: 'Cascading Waterfalls',
    kannadaTitle: 'ಮನಮೋಹಕ ಜಲಪಾತಗಳು',
    description: 'Thunderous Jog Falls, Abbey Falls, Iruppu, and hidden forest cascades.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    iconName: 'Droplets',
    tag: 'Monsoon Splendour'
  },
  {
    id: 'beaches',
    title: 'Coastal Beaches',
    kannadaTitle: 'ಕರಾವಳಿ ಸಮುದ್ರ ತೀರಗಳು',
    description: 'Om Beach cliffs, Malpe sea walk, Kaup lighthouse & golden sunset sands.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    iconName: 'Palmtree',
    tag: 'Arabian Shores'
  },
  {
    id: 'heritage',
    title: 'Royal Heritage & Forts',
    kannadaTitle: 'ರಾಜಮನೆತನದ ಪರಂಪರೆ',
    description: 'Magnificent Mysore Palace, Vijayanagara ruins, and historic hill fortresses.',
    image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=600&q=80',
    iconName: 'Landmark',
    tag: 'UNESCO Wonders'
  },
  {
    id: 'temples',
    title: 'Temples & Sacred Shrines',
    kannadaTitle: 'ಪವಿತ್ರ ದೇವಾಲಯಗಳು',
    description: 'Virupaksha, Chamundi Hill, Udupi Sri Krishna Matha, and Badami rock caves.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    iconName: 'Sun',
    tag: 'Spiritual Haven'
  },
  {
    id: 'adventure',
    title: 'Trek & Adventure',
    kannadaTitle: 'ಸಾಹಸ ಮತ್ತು ಚಾರಣ',
    description: 'Mullayanagiri peak climbs, Dandeli river rafting, and boulder scrambling.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    iconName: 'Compass',
    tag: 'Thrills'
  },
  {
    id: 'wildlife',
    title: 'Wild Safaris',
    kannadaTitle: 'ವನ್ಯಜೀವಿ ಸಫಾರಿ',
    description: 'Nagarhole tigers, wild Asiatic elephants, and Kabini black panther tracking.',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=600&q=80',
    iconName: 'TreePine',
    tag: 'Flora & Fauna'
  },
  {
    id: 'food',
    title: 'Food & Gastronomy',
    kannadaTitle: 'ಕರ್ನಾಟಕ ಪಾಕಪದ್ಧತಿ',
    description: 'Mylari butter dosa, authentic Udupi thali, Dharwad peda & filter kaapi.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    iconName: 'Utensils',
    tag: 'Culinary Delights'
  },
  {
    id: 'relaxation',
    title: 'Relaxation & Wellness',
    kannadaTitle: 'ವಿಶ್ರಾಂತಿ ಮತ್ತು ಶಾಂತಿ',
    description: 'Peaceful plantation homestays, birdwatching, Ayurvedic retreats & serenity.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    iconName: 'Smile',
    tag: 'Slow Living'
  },
  {
    id: 'culture',
    title: 'Culture, Arts & Handlooms',
    kannadaTitle: 'ಕಲೆ, ನೃತ್ಯ ಮತ್ತು ಸಂಸ್ಕೃತಿ',
    description: 'Live Yakshagana coastal theatre, Mysore silk weavers & traditional crafts.',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80',
    iconName: 'Sparkles',
    tag: 'Living Traditions'
  }
];

export const DURATION_OPTIONS = [
  {
    id: '1-day' as DurationOptionId,
    days: 1,
    title: 'One Day Express',
    kannadaTitle: 'ಒಂದು ದಿನದ ಪ್ರವಾಸ',
    subtitle: 'Quick Day Excursion',
    description: 'Perfect for quick weekend city escapes, temple darshans, or single-day road trips.',
    badge: 'Express 24h'
  },
  {
    id: '2-3-days' as DurationOptionId,
    days: 3,
    title: '2 – 3 Days',
    kannadaTitle: '೨ - ೩ ದಿನಗಳು',
    subtitle: 'Weekend Getaway',
    description: 'Ideal for discovering one prime destination like Hampi, Coorg, or Mysuru without rushing.',
    badge: 'Most Popular',
    recommended: true
  },
  {
    id: '4-5-days' as DurationOptionId,
    days: 5,
    title: '4 – 5 Days',
    kannadaTitle: '೪ - ೫ ದಿನಗಳು',
    subtitle: 'Mini Vacation',
    description: 'Explore multi-destination circuits (e.g. Mysuru + Coorg or Coastal Karavali + Udupi).',
    badge: 'Comprehensive'
  },
  {
    id: '6-7-days' as DurationOptionId,
    days: 7,
    title: '6 – 7 Days',
    kannadaTitle: '೬ - ೭ ದಿನಗಳು',
    subtitle: 'Grand Week Circuit',
    description: 'Immersive exploration covering Northern Chalukya heritage, coastal coves, and coffee hills.',
    badge: 'Grand Journey'
  },
  {
    id: 'custom' as DurationOptionId,
    days: 10,
    title: 'Custom Duration',
    kannadaTitle: 'ನಿಮ್ಮದೇ ದಿನಗಳು',
    subtitle: 'Choose Exact Days',
    description: 'Enter your exact trip duration from 8 to 21 days for an extensive holiday.',
    badge: 'Tailored'
  }
];

export const BUDGET_PRESETS = [
  {
    id: 'budget' as BudgetTierId,
    title: 'Budget-Friendly',
    kannadaTitle: 'ಮಿತವ್ಯಯದ ಬಜೆಟ್',
    perDayAmount: 2000,
    rangeText: '₹1,500 – ₹2,500 / day',
    description: 'Clean certified homestays / dharamsalas, KSRTC bus/train travel, and iconic local food messes.',
    perks: ['KSRTC Rajahamsa/Airavat', 'Authentic local mess meals', 'Heritage homestays / lodges']
  },
  {
    id: 'comfortable' as BudgetTierId,
    title: 'Comfortable',
    kannadaTitle: 'ಆರಾಮದಾಯಕ ಬಜೆಟ್',
    perDayAmount: 3800,
    rangeText: '₹3,000 – ₹5,000 / day',
    description: '3-star boutique resorts / estate bungalows, AC cabs or Vande Bharat trains, and guided visits.',
    perks: ['AC car / Vande Bharat', 'Boutique plantation stays', 'Licensed tour guide visits'],
    recommended: true
  },
  {
    id: 'premium' as BudgetTierId,
    title: 'Royal / Premium',
    kannadaTitle: 'ರಾಜಮನೆತನದ ಐಷಾರಾಮಿ',
    perDayAmount: 7500,
    rangeText: '₹6,000+ / day',
    description: 'Luxury jungle resorts (Jungle Lodges & Resorts), private chauffeur SUV, and heritage fine dining.',
    perks: ['Private SUV chauffeur', 'Luxury wilderness lodges', 'VIP darshan & private boat safaris']
  },
  {
    id: 'custom' as BudgetTierId,
    title: 'Custom Amount',
    kannadaTitle: 'ನಿರ್ದಿಷ್ಟ ಮೊತ್ತ',
    perDayAmount: 4000,
    rangeText: 'Set your exact figure',
    description: 'Specify an exact total or daily INR budget tailored to your personal plan.',
    perks: ['Exact INR calculations', 'Flexible spend allocation', 'Custom group splitting']
  }
];

export const TRAVELER_GROUPS = [
  {
    id: 'solo' as TravelerGroupId,
    title: 'Solo Explorer',
    kannadaTitle: 'ಏಕಾಂಗಿ ಪ್ರಯಾಣಿಕ',
    defaultSize: 1,
    icon: 'User',
    description: 'Freedom, off-beat trails, meeting friendly locals, and independent rhythm.'
  },
  {
    id: 'couple' as TravelerGroupId,
    title: 'Couple',
    kannadaTitle: 'ದಂಪತಿ',
    defaultSize: 2,
    icon: 'Heart',
    description: 'Romantic sunset viewpoints, cozy private estate stays, and scenic drives.'
  },
  {
    id: 'friends' as TravelerGroupId,
    title: 'Friends',
    kannadaTitle: 'ಸ್ನೇಹಿತರ ಗುಂಪು',
    defaultSize: 4,
    icon: 'Users',
    description: 'Beach bonfires, mountain treks, café hopping, and energetic adventure.'
  },
  {
    id: 'family' as TravelerGroupId,
    title: 'Family',
    kannadaTitle: 'ಕುಟುಂಬ',
    defaultSize: 4,
    icon: 'Home',
    description: 'Kid-friendly stops, safe hotels, balanced breaks, and multi-generational comfort.',
    recommended: true
  },
  {
    id: 'seniors' as TravelerGroupId,
    title: 'Senior Citizens',
    kannadaTitle: 'ಹಿರಿಯ ನಾಗರಿಕರು',
    defaultSize: 2,
    icon: 'Award',
    description: 'Comfort pace, minimal stairs, battery buggies at monuments, and elevator access.'
  },
  {
    id: 'group' as TravelerGroupId,
    title: 'Large Group / Tour',
    kannadaTitle: 'ದೊಡ್ಡ ಸಂಘ / ಪ್ರವಾಸ',
    defaultSize: 8,
    icon: 'Compass',
    description: 'Tempo Traveller / coach transport, unified dining, and coordinated visits.'
  }
];

export const KARNATAKA_CITIES = [
  'Bengaluru (Kempegowda Int. Airport / KSR / Yesvantpur)',
  'Mysuru (South Karnataka Hub)',
  'Hubballi - Dharwad (North Karnataka Gateway)',
  'Mangaluru (Coastal Karavali & Airport)',
  'Belagavi (North-Western Karnataka)',
  'Shivamogga (Gateway to Malnad & Jog Falls)',
  'Kalaburagi (Kalyana Karnataka / Gulbarga)',
  'Ballari (Near Hampi & Vijayanagara)',
  'Udupi (Coastal Temple Town)',
  'Hassan (Gateway to Belur & Halebeedu)'
];

export const ACCESSIBILITY_OPTIONS = [
  { id: 'wheelchair', label: 'Wheelchair / Ramp Access Needed', sub: 'Flat terrain & ramps at temples and museums' },
  { id: 'minimal_stairs', label: 'Minimal Stairs & Elevators', sub: 'Ground floor rooms & minimal climbing' },
  { id: 'senior_pace', label: 'Senior Friendly Relaxed Pace', sub: 'Frequent rest breaks and gentle walking' },
  { id: 'vegetarian_jain', label: 'Pure Veg / Jain Food Priority', sub: 'Pure vegetarian and sattvic dining suggestions' },
  { id: 'kid_friendly', label: 'Toddler & Child Friendly', sub: 'Stroller friendly paths, parks, and calm waters' }
];

export const TRANSPORT_OPTIONS = [
  {
    id: 'cab_chauffeur' as TransportPreference,
    title: 'Chauffeur Cab / Rental Taxi',
    kannadaTitle: 'ಖಾಸಗಿ ಕಾರು / ಕ್ಯಾಬ್',
    desc: 'Door-to-door comfort, zero driving fatigue on Western Ghat hairpin bends.',
    icon: 'Car'
  },
  {
    id: 'self_drive' as TransportPreference,
    title: 'Self-Drive Car',
    kannadaTitle: 'ಸ್ವಂತ ಚಾಲನೆ',
    desc: 'Ultimate flexibility for spontaneous scenic stops along picturesque highways.',
    icon: 'Key'
  },
  {
    id: 'public_transit' as TransportPreference,
    title: 'KSRTC Buses & Indian Railways',
    kannadaTitle: 'ಕೆ.ಎಸ್.ಆರ್.ಟಿ.ಸಿ ಮತ್ತು ರೈಲು',
    desc: 'Authentic, budget-friendly and well-connected state transport network.',
    icon: 'Bus'
  },
  {
    id: 'two_wheeler' as TransportPreference,
    title: 'Motorbike / Scooter Tour',
    kannadaTitle: 'ಬೈಕ್ / ದ್ವಿಚಕ್ರ ವಾಹನ',
    desc: 'Feel the mountain mist and coastal breeze on thrilling scenic roads.',
    icon: 'Compass'
  }
];

export const TRAVEL_PACES = [
  {
    id: 'relaxed' as TravelPace,
    title: 'Relaxed & Leisurely',
    kannadaTitle: 'ವಿಶ್ರಾಂತಿಯ ವೇಗ',
    desc: 'Late morning starts, 2 key attractions per day, long leisurely meals.'
  },
  {
    id: 'balanced' as TravelPace,
    title: 'Balanced & Steady',
    kannadaTitle: 'ಸಮತೋಲಿತ ವೇಗ',
    desc: 'The golden mean. See key sights with ample time to rest and savor local culture.',
    recommended: true
  },
  {
    id: 'fast_paced' as TravelPace,
    title: 'Explorer / Cover Everything',
    kannadaTitle: 'ಸಂಪೂರ್ಣ ಅನ್ವೇಷಣೆ',
    desc: 'Early sunrises, packed days, maximum sights and photography stops.'
  }
];

/* PRE-CONFIGURED SAMPLE TRIPS */
export const SAMPLE_TRIP_PRESETS: {
  title: string;
  badge: string;
  description: string;
  preferences: TripBuilderPreferences;
}[] = [
  {
    title: 'Family Western Ghats & Royal Mysore Circuit',
    badge: 'Top Family Pick',
    description: '4 Days covering Mysore Palace, Chamundi Hill, Abbey Falls in Coorg, and coffee plantations with family comfort.',
    preferences: {
      interests: ['nature', 'heritage', 'waterfalls', 'food', 'relaxation'],
      duration: '4-5-days',
      customDays: 4,
      budgetTier: 'comfortable',
      customBudgetAmount: 3500,
      budgetBasis: 'per_person',
      travelerType: 'family',
      groupSize: 4,
      startingCity: 'Bengaluru (Kempegowda Int. Airport / KSR / Yesvantpur)',
      isCustomCity: false,
      customCityName: '',
      startDate: '',
      endDate: '',
      transportPreference: 'cab_chauffeur',
      accessibilityNeeds: ['minimal_stairs', 'senior_pace'],
      pace: 'balanced'
    }
  },
  {
    title: 'UNESCO Hampi & Badami Archaeological Odyssey',
    badge: 'Culture & Heritage',
    description: '3 Days exploring the Vijayanagara Stone Chariot, boulder hills, and 6th-century Chalukyan rock caves.',
    preferences: {
      interests: ['heritage', 'temples', 'culture', 'adventure', 'food'],
      duration: '2-3-days',
      customDays: 3,
      budgetTier: 'budget',
      customBudgetAmount: 2200,
      budgetBasis: 'per_person',
      travelerType: 'solo',
      groupSize: 1,
      startingCity: 'Hubballi - Dharwad (North Karnataka Gateway)',
      isCustomCity: false,
      customCityName: '',
      startDate: '',
      endDate: '',
      transportPreference: 'public_transit',
      accessibilityNeeds: [],
      pace: 'fast_paced'
    }
  },
  {
    title: 'Karavali Coastal Beach Trek & Sea Breeze',
    badge: 'Beaches & Chill',
    description: '3 Days of Gokarna Om Beach, Kudle clifftop sunsets, fresh seafood thalis, and coastal peace.',
    preferences: {
      interests: ['beaches', 'relaxation', 'food', 'adventure'],
      duration: '2-3-days',
      customDays: 3,
      budgetTier: 'comfortable',
      customBudgetAmount: 3200,
      budgetBasis: 'per_person',
      travelerType: 'friends',
      groupSize: 3,
      startingCity: 'Mangaluru (Coastal Karavali & Airport)',
      isCustomCity: false,
      customCityName: '',
      startDate: '',
      endDate: '',
      transportPreference: 'self_drive',
      accessibilityNeeds: [],
      pace: 'relaxed'
    }
  },
  {
    title: 'Wild Kabini & Misty Kodagu Coffee Sanctuary',
    badge: 'Wildlife & Luxury',
    description: '6 Days of boat safaris, tiger reserves, estate homestays, and pristine mountain air.',
    preferences: {
      interests: ['wildlife', 'nature', 'relaxation', 'food'],
      duration: '6-7-days',
      customDays: 6,
      budgetTier: 'premium',
      customBudgetAmount: 7500,
      budgetBasis: 'per_person',
      travelerType: 'couple',
      groupSize: 2,
      startingCity: 'Bengaluru (Kempegowda Int. Airport / KSR / Yesvantpur)',
      isCustomCity: false,
      customCityName: '',
      startDate: '',
      endDate: '',
      transportPreference: 'cab_chauffeur',
      accessibilityNeeds: ['ground_floor'],
      pace: 'relaxed'
    }
  }
];

export const MULTILINGUAL_TRANSPORT: Record<string, Record<string, { title: string; desc: string }>> = {
  cab_chauffeur: {
    en: { title: 'Chauffeur Cab / Rental Taxi', desc: 'Door-to-door comfort, zero driving fatigue on Western Ghat hairpin bends.' },
    kn: { title: 'ಖಾಸಗಿ ಕಾರು / ಬಾಡಿಗೆ ಟ್ಯಾಕ್ಸಿ', desc: 'ಮನೆಬಾಗಿಲಿಗೆ ಸೌಕರ್ಯ, ಘಾಟ್ ರಸ್ತೆಗಳಲ್ಲಿ ಚಾಲನೆಯ ಆಯಾಸವಿಲ್ಲದೆ ಆರಾಮದಾಯಕ ಪಯಣ.' },
    hi: { title: 'ड्राइवर सहित टैक्सी / कैब', desc: 'घर-घर तक आराम, पश्चिमी घाट की घुमावदार सड़कों पर बिना थकान के सुरक्षित यात्रा।' },
    te: { title: 'డ్రైవర్‌తో కూడిన క్యాబ్ / టాక్సీ', desc: 'ఇంటి వద్దకే సౌకర్యం, ఘాట్ రోడ్లలో డ్రైవింగ్ అలసట లేకుండా సుఖవంతమైన ప్రయాణం.' },
    ta: { title: 'டிரைவருடன் கூடிய கார் / டாக்ஸி', desc: 'வீட்டு வாசல் வரை வசதி, மலைப்பாதைகளில் சோர்வில்லாத சொகுசுப் பயணம்.' },
    ml: { title: 'ഡ്രൈവറുള്ള കാർ / വാടക ടാക്സി', desc: 'വീട്ടുപടിക്കൽ എത്തുന്ന സൗകര്യം, ചുരങ്ങളിൽ ഡ്രൈവിംഗ് ക്ഷീണമില്ലാത്ത സുഖയാത്ര.' }
  },
  self_drive: {
    en: { title: 'Self-Drive Car', desc: 'Ultimate flexibility for spontaneous scenic stops along picturesque highways.' },
    kn: { title: 'ಸ್ವಂತ ಚಾಲನೆಯ ಕಾರು', desc: 'ಸುಂದರ ಹೆದ್ದಾರಿಗಳಲ್ಲಿ ನಿಮ್ಮಿಷ್ಟದಂತೆ ನಿಂತು ಪ್ರಕೃತಿಯನ್ನು ಆನಂದಿಸುವ ಸಂಪೂರ್ಣ ಸ್ವಾತಂತ್ರ್ಯ.' },
    hi: { title: 'सेल्फ-ड्राइव कार', desc: 'सुंदर राजमार्गों पर अपनी गति से रुकने और घूमने की पूरी आज़ादी।' },
    te: { title: 'సెల్ఫ్-డ్రైవ్ కారు', desc: 'అందమైన హైవేలలో మీకు నచ్చిన చోట ఆగుతూ స్వేచ్ఛగా ప్రయాణించే అవకాశం.' },
    ta: { title: 'சுயமாக ஓட்டும் கார்', desc: 'அழகிய நெடுஞ்சாலைகளில் உங்கள் விருப்பப்படி நின்று ரசிக்கும் சுதந்திரம்.' },
    ml: { title: 'സ്വയം ഡ്രൈവ് ചെയ്യുന്ന കാർ', desc: 'മനോഹരമായ ഹൈവേകളിൽ ഇഷ്ടാനുസരണം നിർത്തി ആസ്വദിക്കാനുള്ള പൂർണ്ണ സ്വാതന്ത്ര്യം.' }
  },
  public_transit: {
    en: { title: 'KSRTC Buses & Indian Railways', desc: 'Authentic, budget-friendly and well-connected state transport network.' },
    kn: { title: 'ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಮತ್ತು ರೈಲ್ವೆ', desc: 'ಪ್ರಾಮಾಣಿಕ, ಮಿತವ್ಯಯದ ಮತ್ತು ರಾಜ್ಯಾದ್ಯಂತ ಸಂಪರ್ಕವಿರುವ ಸುಸಜ್ಜಿತ ಸಾರಿಗೆ ಜಾಲ.' },
    hi: { title: 'केएसआरटीसी बसें और भारतीय रेलवे', desc: 'किफायती, प्रामाणिक और कर्नाटक के कोने-कोने तक बेहतरीन नेटवर्क।' },
    te: { title: 'కేఎస్‌ఆర్‌టిసి బస్సులు & రైల్వేలు', desc: 'ఆర్థికమైన, ప్రామాణికమైన మరియు విస్తృత నెట్‌వర్క్ కలిగిన రవాణా వ్యవస్థ.' },
    ta: { title: 'கே.எஸ்.ஆர்.டி.சி பேருந்துகள் & ரயில்வே', desc: 'சிக்கனமான, நம்பகமான மற்றும் மாநிலம் தழுவிய சிறந்த போக்குவரத்து.' },
    ml: { title: 'കെ.എസ്.ആർ.ടി.സി ബസുകളും ട്രെയിനും', desc: 'ചിലവ് കുറഞ്ഞതും വിപുലവുമായ പൊതുഗതാഗത ശൃംഖല.' }
  },
  two_wheeler: {
    en: { title: 'Motorbike / Scooter Tour', desc: 'Feel the mountain mist and coastal breeze on thrilling scenic roads.' },
    kn: { title: 'ಬೈಕ್ / ದ್ವಿಚಕ್ರ ವಾಹನ ಪ್ರವಾಸ', desc: 'ಘಟ್ಟಗಳ ತಂಪಾದ ಗಾಳಿ ಮತ್ತು ಕರಾವಳಿಯ ತಂಗಾಳಿಯನ್ನು ಅನುಭವಿಸುವ ರೋಮಾಂಚಕ ಪಯಣ.' },
    hi: { title: 'बाइक / स्कूटर टूर', desc: 'रोमांचक पहाड़ी रास्तों और तटीय हवाओं का सीधा अनुभव।' },
    te: { title: 'బైక్ / స్కూటర్ యాత్ర', desc: 'కొండల చల్లని గాలి మరియు తీరప్రాంత ఆహ్లాదాన్ని ఆస్వాదించే సాహసోపేత యాత్ర.' },
    ta: { title: 'பைக் / ஸ்கூட்டர் டூர்', desc: 'மலைக்காற்றையும் கடற்கரை தென்றலையும் அனுபவிக்கும் சிலிர்ப்பான பயணம்.' },
    ml: { title: 'ബൈക്ക് / സ്കൂട്ടർ ടൂർ', desc: 'മലനിരകളിലെ കോടമഞ്ഞും തീരദേശ കാറ്റും തൊട്ടറിഞ്ഞുള്ള സാഹസിക യാത്ര.' }
  }
};

export const MULTILINGUAL_PACES: Record<string, Record<string, { title: string; desc: string }>> = {
  relaxed: {
    en: { title: 'Relaxed & Leisurely', desc: 'Late morning starts, 2 key attractions per day, long leisurely meals.' },
    kn: { title: 'ವಿಶ್ರಾಂತಿಯ ನಿಧಾನ ವೇಗ', desc: 'ಬೆಳಿಗ್ಗೆ ನಿಧಾನವಾಗಿ ಪ್ರಾರಂಭ, ದಿನಕ್ಕೆ ೨ ಪ್ರಮುಖ ತಾಣಗಳು, ಆರಾಮದಾಯಕ ಊಟ.' },
    hi: { title: 'आरामदायक और शांत गति', desc: 'सुबह आराम से शुरुआत, दिन में 2 मुख्य आकर्षण, सुकून से भोजन।' },
    te: { title: 'ప్రశాంతమైన వేగం', desc: 'ఉదయం నిదానంగా ప్రారంభం, రోజుకు 2 ముఖ్య ప్రదేశాలు, తీరిగ్గా భోజనం.' },
    ta: { title: 'நிதானமான ஓய்வு வேகம்', desc: 'காலை தாமதமாக தொடக்கம், ஒரு நாளைக்கு 2 முக்கிய இடங்கள், நிதான உணவு.' },
    ml: { title: 'ശാന്തവും സാവധാനവുമുള്ള വേഗത', desc: 'രാവിലെ സാവധാനം തുടക്കം, ദിവസം 2 പ്രധാന കാഴ്ചകൾ, വിശ്രമത്തോടെയുള്ള ഭക്ഷണം.' }
  },
  balanced: {
    en: { title: 'Balanced & Steady', desc: 'The golden mean. See key sights with ample time to rest and savor local culture.' },
    kn: { title: 'ಸಮತೋಲಿತ ಮಧ್ಯಮ ವೇಗ', desc: 'ಪ್ರಮುಖ ತಾಣಗಳನ್ನು ವೀಕ್ಷಿಸುತ್ತಾ, ಸಂಸ್ಕೃತಿ ಮತ್ತು ವಿಶ್ರಾಂತಿಗೆ ಸಮಾನ ಆದ್ಯತೆ.' },
    hi: { title: 'संतुलित गति', desc: 'प्रमुख स्थलों को देखने के साथ विश्राम और स्थानीय संस्कृति का आनंद।' },
    te: { title: 'సమతుల్య వేగం', desc: 'ప్రధాన ఆకర్షణలను చూస్తూనే తగినంత విశ్రాంతి తీసుకునే ఉత్తమ ప్రణాళిక.' },
    ta: { title: 'சமநிலையான வேகம்', desc: 'முக்கிய இடங்களை ரசித்து, போதுமான ஓய்வு மற்றும் கலாச்சார அனுபவம்.' },
    ml: { title: 'സന്തുലിതമായ വേഗത', desc: 'പ്രധാന കാഴ്ചകൾ കണ്ട്, വിശ്രമത്തിനും സംസ്കാരത്തിനും തുല്യ പ്രാധാന്യം.' }
  },
  fast_paced: {
    en: { title: 'Explorer / Cover Everything', desc: 'Early sunrises, packed days, maximum sights and photography stops.' },
    kn: { title: 'ಸಂಪೂರ್ಣ ಅನ್ವೇಷಣೆಯ ವೇಗ', desc: 'ಮುಂಜಾನೆಯ ಸೂರ್ಯೋದಯದಿಂದ ರಾತ್ರಿಯವರೆಗೆ ಗರಿಷ್ಠ ತಾಣಗಳ ಭೇಟಿ ಮತ್ತು ಛಾಯಾಗ್ರಹಣ.' },
    hi: { title: 'तेज़ गति / संपूर्ण अन्वेषण', desc: 'सुबह जल्दी शुरुआत, अधिकतम दर्शनीय स्थल और फोटोग्राफी स्टॉप।' },
    te: { title: 'వేగవంతమైన అన్వేషణ', desc: 'సూర్యోదయంతో ప్రారంభం, అత్యధిక ప్రదేశాల సందర్శన మరియు ఫోటోగ్రఫీ.' },
    ta: { title: 'துரிதமான ஆய்வு', desc: 'அதிகாலையில் தொடக்கம், அதிகபட்ச இடங்களை பார்ப்பதற்கான முழு நாள் திட்டம்.' },
    ml: { title: 'പരമാവധി കാഴ്ചകൾ കാണുന്ന വേഗത', desc: 'പുലർച്ചെ തുടക്കം, കൂടുതൽ സ്ഥലങ്ങൾ കാണാനുള്ള ഊർജ്ജസ്വലമായ യാത്ര.' }
  }
};

export const MULTILINGUAL_ACCESSIBILITY: Record<string, Record<string, { label: string; sub: string }>> = {
  wheelchair: {
    en: { label: 'Wheelchair / Ramp Access Needed', sub: 'Flat terrain & ramps at temples and museums' },
    kn: { label: 'ವ್ಹೀಲ್‌ಚೇರ್ / ರ‍್ಯಾಂಪ್ ಪ್ರವೇಶ ಅಗತ್ಯವಿದೆ', sub: 'ದೇವಾಲಯ ಮತ್ತು ಸ್ಮಾರಕಗಳಲ್ಲಿ ಸುಲಭ ರ‍್ಯಾಂಪ್ ಸೌಲಭ್ಯ' },
    hi: { label: 'व्हीलचेयर / रैंप सुविधा आवश्यक', sub: 'मंदिरों और संग्रहालयों में सपाट सतह और रैंप' },
    te: { label: 'వీల్‌చైర్ / ర్యాంప్ సదుపాయం అవసరం', sub: 'ఆలయాలు మరియు మ్యూజియంలలో సులభమైన ర్యాంప్ సదుపాయం' },
    ta: { label: 'சக்கர நாற்காலி / சாய்வுதளம் தேவை', sub: 'கோவில்கள் மற்றும் அருங்காட்சியகங்களில் சாய்வுதள வசதி' },
    ml: { label: 'വീൽചെയർ / റാംപ് സൗകര്യം ആവശ്യമാണ്', sub: 'ക്ഷേത്രങ്ങളിലും മ്യൂസിയങ്ങളിലും പരന്ന വഴികളും റാംപുകളും' }
  },
  minimal_stairs: {
    en: { label: 'Minimal Stairs & Elevators', sub: 'Ground floor rooms & minimal climbing' },
    kn: { label: 'ಕಡಿಮೆ ಮೆಟ್ಟಿಲುಗಳು & ಲಿಫ್ಟ್ ಆದ್ಯತೆ', sub: 'ನೆಲಮಹಡಿಯ ಕೊಠಡಿಗಳು ಮತ್ತು ಕಡಿಮೆ ನಡಿಗೆ' },
    hi: { label: 'कम सीढ़ियां और लिफ्ट प्राथमिकता', sub: 'भूतल के कमरे और न्यूनतम चढ़ाई' },
    te: { label: 'తక్కువ మెట్లు & లిఫ్ట్ సౌకర్యం', sub: 'గ్రౌండ్ ఫ్లోర్ గదులు మరియు తక్కువ నడక' },
    ta: { label: 'குறைந்த படிக்கட்டுகள் & லிப்ட் வசதி', sub: 'தரைதள அறைகள் மற்றும் குறைந்த நடைபயிற்சி' },
    ml: { label: 'കുറഞ്ഞ പടികളും ലിഫ്റ്റും', sub: 'താഴത്തെ നിലയിലെ മുറികളും കുറഞ്ഞ നടത്തവും' }
  },
  senior_pace: {
    en: { label: 'Senior Friendly Relaxed Pace', sub: 'Frequent rest breaks and gentle walking' },
    kn: { label: 'ಹಿರಿಯ ನಾಗರಿಕರಿಗೆ ಅನುಕೂಲಕರ ವೇಗ', sub: 'ಆಗಾಗ್ಗೆ ವಿಶ್ರಾಂತಿ ಮತ್ತು ಸುಲಭ ನಡಿಗೆಯ ಪ್ರವಾಸ' },
    hi: { label: 'वरिष्ठ नागरिकों के अनुकूल गति', sub: 'नियमित विश्राम और आरामदायक भ्रमण' },
    te: { label: 'సీనియర్ సిటిజన్లకు అనుకూలమైన వేగం', sub: 'తరచుగా విశ్రాంతి మరియు సులభమైన నడక' },
    ta: { label: 'மூத்த குடிமக்களுக்கான நிதான நடை', sub: 'அடிக்கடி ஓய்வு மற்றும் மெதுவான நடைபயிற்சி' },
    ml: { label: 'മുതിർന്ന പൗരന്മാർക്ക് അനുയോജ്യമായ വേഗത', sub: 'ഇടയ്ക്കിടെയുള്ള വിശ്രമവും സുഖകരമായ നടത്തവും' }
  },
  vegetarian_jain: {
    en: { label: 'Pure Veg / Jain Food Priority', sub: 'Pure vegetarian and sattvic dining suggestions' },
    kn: { label: 'ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ / ಜೈನ ಆಹಾರ ಆದ್ಯತೆ', sub: 'ಶುದ್ಧ ಸಸ್ಯಾಹಾರಿ ಮತ್ತು ಸಾತ್ವಿಕ ಊಟದ ಶಿಫಾರಸುಗಳು' },
    hi: { label: 'शुद्ध शाकाहारी / जैन भोजन प्राथमिकता', sub: 'शुद्ध शाकाहारी और सात्विक भोजन के सुझाव' },
    te: { label: 'శుద్ధ శాకాహారం / జైన ఆహార ప్రాధాన్యత', sub: 'పరిశుభ్రమైన శాకాహార మరియు సాత్విక భోజన సూచనలు' },
    ta: { label: 'தூய சைவ / ஜெயின் உணவு முன்னுரிமை', sub: 'தூய சைவ மற்றும் சாத்வீக உணவு பரிந்துரைகள்' },
    ml: { label: 'ശുദ്ധ സസ്യഭക്ഷണം / ജൈന ഭക്ഷണം', sub: 'ശുദ്ധ സസ്യഭക്ഷണ റെസ്റ്റോറന്റുകൾ മാത്രം' }
  },
  kid_friendly: {
    en: { label: 'Toddler & Child Friendly', sub: 'Stroller friendly paths, parks, and calm waters' },
    kn: { label: 'ಮಕ್ಕಳು ಮತ್ತು ಶಿಶುಸ್ನೇಹಿ ಸೌಲಭ್ಯ', sub: 'ಸ್ಟ್ರಾಲ್-ಸ್ನೇಹಿ ಹಾದಿಗಳು, ಉದ್ಯಾನವನಗಳು ಮತ್ತು ಸುರಕ್ಷಿತ ನೀರು' },
    hi: { label: 'छोटे बच्चों के अनुकूल', sub: 'प्रैम-सुलभ रास्ते, पार्क और शांत सुरक्षित जल स्थल' },
    te: { label: 'పిల్లలకు అనుకూలమైన వాతావరణం', sub: 'స్ట్రోలర్ అనుకూల దారులు, పార్కులు మరియు సురక్షిత ప్రదేశాలు' },
    ta: { label: 'குழந்தைகளுக்கு உகந்த வசதிகள்', sub: 'பிராம் தள்ளுவண்டி வசதி, பூங்காக்கள் மற்றும் பாதுகாப்பான நீர்நிலைகள்' },
    ml: { label: 'കുട്ടികൾക്കും കുഞ്ഞുങ്ങൾക്കും അനുയോജ്യം', sub: 'സ്ട്രോളർ സൗഹൃദ വഴികൾ, പാർക്കുകൾ, സുരക്ഷിത തീരങ്ങൾ' }
  }
};

export const MULTILINGUAL_CITIES: Record<string, Record<string, string>> = {
  'Bengaluru (Kempegowda Int. Airport / KSR / Yesvantpur)': {
    en: 'Bengaluru (Kempegowda Int. Airport / KSR / Yesvantpur)',
    kn: 'ಬೆಂಗಳೂರು (ಕೆಂಪೇಗೌಡ ಅಂತಾರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನಿಲ್ದಾಣ / ಕೆಎಸ್‌ಆರ್ / ಯಶವಂತಪುರ)',
    hi: 'बेंगलुरु (केम्पेगौड़ा अंतरराष्ट्रीय हवाई अड्डा / केएसआर / यशवंतपुर)',
    te: 'బెంగళూరు (కెంపేగౌడ అంతర్జాతీయ విమానాశ్రయం / కెఎస్‌ఆర్ / యశ్వంత్‌పూర్)',
    ta: 'பெங்களூரு (கெம்பேகவுடா சர்வதேச விமான நிலையம் / கே.எஸ்.ஆர் / யஷ்வந்த்பூர்)',
    ml: 'ബെംഗളൂരു (കെംപെഗൗഡ അന്താരാഷ്ട്ര വിമാനത്താവളം / കെ.എസ്.ആർ / യശ്വന്ത്പൂർ)'
  },
  'Mysuru (South Karnataka Hub)': {
    en: 'Mysuru (South Karnataka Hub)',
    kn: 'ಮೈಸೂರು (ದಕ್ಷಿಣ ಕರ್ನಾಟಕದ ಸಾಂಸ್ಕೃತಿಕ ಕೇಂದ್ರ)',
    hi: 'मैसूरु (दक्षिण कर्नाटक सांस्कृतिक केंद्र)',
    te: 'మైసూరు (దక్షిణ కర్ణాటక సాంస్కృతిక కేంద్రం)',
    ta: 'மைசூரு (தென் கர்நாடக கலாச்சார மையம்)',
    ml: 'മൈസൂരു (തെക്കൻ കർണാടക സാംസ്കാരിക കേന്ദ്രം)'
  },
  'Hubballi - Dharwad (North Karnataka Gateway)': {
    en: 'Hubballi - Dharwad (North Karnataka Gateway)',
    kn: 'ಹುಬ್ಬಳ್ಳಿ - ಧಾರವಾಡ (ಉತ್ತರ ಕರ್ನಾಟಕದ ಹೆಬ್ಬಾಗಿಲು)',
    hi: 'हुबली - धारवाड़ (उत्तर कर्नाटक का प्रवेश द्वार)',
    te: 'హుబ్బళ్ళి - ధార్వాడ్ (ఉత్తర కర్ణాటక ద్వారము)',
    ta: 'ஹூப்ளி - தார்வாட் (வட கர்நாடக நுழைவாயில்)',
    ml: 'ഹുബ്ബള്ളി - ധാർവാഡ് (വടക്കൻ കർണാടക കവാടം)'
  },
  'Mangaluru (Coastal Karavali & Airport)': {
    en: 'Mangaluru (Coastal Karavali & Airport)',
    kn: 'ಮಂಗಳೂರು (ಕರಾವಳಿ ಕೇಂದ್ರ ಮತ್ತು ವಿಮಾನ ನಿಲ್ದಾಣ)',
    hi: 'मंगलुरु (तटीय करावली और हवाई अड्डा)',
    te: 'మంగళూరు (తీరప్రాంతం & విమానాశ్రయం)',
    ta: 'மங்களூரு (கடலோர கர்நாடகா & விமான நிலையம்)',
    ml: 'മംഗലാപുരം (തീരദേശ കേന്ദ്രവും വിമാനത്താവളവും)'
  },
  'Belagavi (North-Western Karnataka)': {
    en: 'Belagavi (North-Western Karnataka)',
    kn: 'ಬೆಳಗಾವಿ (ವಾಯವ್ಯ ಕರ್ನಾಟಕ ಕೇಂದ್ರ)',
    hi: 'बेलगावी (उत्तर-पश्चिमी कर्नाटक)',
    te: 'బెళగావి (వాయవ్య కర్ణాటక)',
    ta: 'பெலகாவி (வடமேற்கு கர்நாடகா)',
    ml: 'ബെലഗാവി (വടക്ക്-പടിഞ്ഞാറൻ കർണാടക)'
  },
  'Shivamogga (Gateway to Malnad & Jog Falls)': {
    en: 'Shivamogga (Gateway to Malnad & Jog Falls)',
    kn: 'ಶಿವಮೊಗ್ಗ (ಮಲೆನಾಡಿನ ಹೆಬ್ಬಾಗಿಲು & ಜೋಗ ಜಲಪಾತ)',
    hi: 'शिवमोग्गा (मलनाड का प्रवेश द्वार & जोग जलप्रपात)',
    te: 'శివమొగ్గ (మల్నాడు ముఖద్వారం & జోగ్ జలపాతం)',
    ta: 'சிவமொக்கா (மல்நாடு நுழைவாயில் & ஜோக் நீர்வீழ்ச்சி)',
    ml: 'ശിവമോഗ്ഗ (മലനാടിന്റെ കവാടം & ജോഗ് വെള്ളച്ചാട്ടം)'
  },
  'Kalaburagi (Kalyana Karnataka / Gulbarga)': {
    en: 'Kalaburagi (Kalyana Karnataka / Gulbarga)',
    kn: 'ಕಲಬುರಗಿ (ಕಲ್ಯಾಣ ಕರ್ನಾಟಕ / ಗುಲ್ಬರ್ಗ)',
    hi: 'कलबुर्गी (कल्याण कर्नाटक / गुलबर्गा)',
    te: 'కలబురగి (కళ్యాణ కర్ణాటక / గుల్బర్గా)',
    ta: 'கலபுரகி (கல்யாண கர்நாடகா / குல்பர்கா)',
    ml: 'കലബുറഗി (കല്യാണ കർണാടക / ഗുൽബർഗ)'
  },
  'Ballari (Near Hampi & Vijayanagara)': {
    en: 'Ballari (Near Hampi & Vijayanagara)',
    kn: 'ಬಳ್ಳಾರಿ (ಹಂಪಿ ಮತ್ತು ವಿಜಯನಗರ ಸಮೀಪ)',
    hi: 'बल्लारी (हंपी और विजयनगर के पास)',
    te: 'బళ్లారి (హంపి మరియు విజయనగరం సమీపం)',
    ta: 'பல்லாரி (ஹம்பி & விஜயநகரம் அருகில்)',
    ml: 'ബല്ലാരി (ഹംപിക്കും വിജയനഗരത്തിനും സമീപം)'
  },
  'Udupi (Coastal Temple Town)': {
    en: 'Udupi (Coastal Temple Town)',
    kn: 'ಉಡುಪಿ (ಕರಾವಳಿಯ ಪವಿತ್ರ ಕೃಷ್ಣನ ನಗರಿ)',
    hi: 'उडुपी (तटीय कृष्ण मंदिर नगरी)',
    te: 'ఉడుపి (తీరప్రాంత కృష్ణాలయం)',
    ta: 'உடுப்பி (கடலோர கிருஷ்ணர் கோவில் நகரம்)',
    ml: 'ഉഡുപ്പി (തീരദേശ കൃഷ്ണ ക്ഷേത്ര നഗരം)'
  },
  'Hassan (Gateway to Belur & Halebeedu)': {
    en: 'Hassan (Gateway to Belur & Halebeedu)',
    kn: 'ಹಾಸನ (ಬೇಲೂರು ಮತ್ತು ಹಳೇಬೀಡಿನ ಹೆಬ್ಬಾಗಿಲು)',
    hi: 'हासन (बेलूर और हलेबीडु का प्रवेश द्वार)',
    te: 'హాసన్ (బేలూరు & హళేబీడు ముఖద్వారం)',
    ta: 'ஹாசன் (பேலூர் & ஹளபேடு நுழைவாயில்)',
    ml: 'ഹാസൻ (ബേലൂർ, ഹളേബീഡു കവാടം)'
  }
};

export const MULTILINGUAL_INTERESTS: Record<string, Record<string, { title: string; description: string; tag: string }>> = {
  nature: {
    en: { title: 'Nature & Hills', description: 'Misty Sahyadri mountain peaks, lush coffee plantations & rolling valleys.', tag: 'Western Ghats' },
    kn: { title: 'ಪ್ರಕೃತಿ ಮತ್ತು ಗಿರಿಧಾಮ', description: 'ಮಂಜು ಮುಸುಕಿದ ಸಹ್ಯಾದ್ರಿ ಶಿಖರಗಳು, ಹಸಿರು ಕಾಫಿ ತೋಟಗಳು ಮತ್ತು ರಮಣೀಯ ಕಣಿವೆಗಳು.', tag: 'ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು' },
    hi: { title: 'प्रकृति और पहाड़', description: 'धुंध से ढकी सह्याद्री चोटियां, हरी-भरी कॉफ़ी के बागान और खूबसूरत घाटियां।', tag: 'पश्चिमी घाट' },
    te: { title: 'ప్రకృతి మరియు కొండలు', description: 'మంచు కురిసే పశ్చిమ కనుమల శిఖరాలు, పచ్చని కాఫీ తోటలు మరియు సుందర లోయలు.', tag: 'పశ్చిమ కనుమలు' },
    ta: { title: 'இயற்கை மற்றும் மலைகள்', description: 'பனி படர்ந்த மேற்குத் தொடர்ச்சி மலைச் சிகரங்கள், பசுமையான காபி தோட்டங்கள்.', tag: 'மேற்குத் தொடர்ச்சி மலை' },
    ml: { title: 'പ്രകൃതിയും മലനിരകളും', description: 'കോടമഞ്ഞ് പുതച്ച സഹ്യാദ്രി മലനിരകളും കാപ്പിത്തോട്ടങ്ങളും താഴ്‌വരകളും.', tag: 'പശ്ചിമഘട്ടം' }
  },
  waterfalls: {
    en: { title: 'Cascading Waterfalls', description: 'Thunderous Jog Falls, Abbey Falls, Iruppu, and hidden forest cascades.', tag: 'Monsoon Splendour' },
    kn: { title: 'ಮನಮೋಹಕ ಜಲಪಾತಗಳು', description: 'ಘರ್ಜಿಸುವ ಜೋಗ ಜಲಪಾತ, ಅಬ್ಬಿ, ಇರುಪ್ಪು ಮತ್ತು ನಿಗೂಢ ಅರಣ್ಯ ಜಲಧಾರೆಗಳು.', tag: 'ವರ್ಷಧಾರೆಯ ವೈಭವ' },
    hi: { title: 'भव्य जलप्रपात', description: 'गरजते जोग फॉल्स, एब्बी, इरुप्पू और घने जंगलों में छिपे मनमोहक झरने।', tag: 'मानसून की सुंदरता' },
    te: { title: 'జలపాతాలు', description: 'ఉవ్వెత్తున దూకే జోగ్ జలపాతం, అబ్బే ఫాల్స్ మరియు దట్టమైన అటవీ జలపాతాలు.', tag: 'వర్షాకాల శోభ' },
    ta: { title: 'அருவிகள்', description: 'ஆர்ப்பரிக்கும் ஜோக் நீர்வீழ்ச்சி, அபே அருவி மற்றும் பசுமை வன அருவிகள்.', tag: 'மழைக்கால அழகு' },
    ml: { title: 'വെള്ളച്ചാട്ടങ്ങൾ', description: 'ഇരമ്പിയാർക്കുന്ന ജോഗ് വെള്ളച്ചാട്ടം, ആബ്ബെ, ഇരുപ്പു തുടങ്ങിയ കാട്ടരുവികൾ.', tag: 'മഴക്കാല സൗന്ദര്യം' }
  },
  beaches: {
    en: { title: 'Coastal Beaches', description: 'Om Beach cliffs, Malpe sea walk, Kaup lighthouse & golden sunset sands.', tag: 'Arabian Shores' },
    kn: { title: 'ಕರಾವಳಿ ಸಮುದ್ರ ತೀರಗಳು', description: 'ಓಂ ಬೀಚ್ ಬಂಡೆಗಳು, ಮಲ್ಪೆ ಸೀ-ವಾಕ್, ಕಾಪು ಲೈಟ್‌ಹೌಸ್ ಮತ್ತು ಸುವರ್ಣ ಸೂರ್ಯಾಸ್ತ.', tag: 'ಅರಬ್ಬಿ ಸಮುದ್ರ ತೀರ' },
    hi: { title: 'तटीय समुद्र तट', description: 'ओम बीच की चट्टानें, मालपे सी वॉक, कापू लाइटहाउस और सुनहरी रेत।', tag: 'अरब सागर तट' },
    te: { title: 'సముద్ర తీరాలు', description: 'ఓం బీచ్ కొండలు, మాల్పే సీ వాక్, కాపు లైట్‌హౌస్ మరియు అందమైన సూర్యాస్తమయాలు.', tag: 'అరేబియా తీరం' },
    ta: { title: 'கடற்கரைகள்', description: 'ஓம் கடற்கரைப் பாறைகள், மால்பே நடைபாதை, காப்பு கலங்கரை விளக்கம்.', tag: 'அரபிக் கடற்கரை' },
    ml: { title: 'കടൽത്തീരങ്ങൾ', description: 'ഓം ബീച്ച്, മാൽപെ സീ വാക്ക്, കാപ്പു ലൈറ്റ്‌ഹൗസ്, സുവർണ്ണ സൂര്യാസ്തമയങ്ങൾ.', tag: 'അറബിക്കടൽത്തീരം' }
  },
  heritage: {
    en: { title: 'Royal Heritage & Forts', description: 'Magnificent Mysore Palace, Vijayanagara ruins, and historic hill fortresses.', tag: 'UNESCO Wonders' },
    kn: { title: 'ರಾಜಮನೆತನದ ಪರಂಪರೆ & ಕೋಟೆಗಳು', description: 'ಭವ್ಯ ಮೈಸೂರು ಅರಮನೆ, ಹಂಪಿಯ ವಿಜಯನಗರ ಅವಶೇಷಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ಗಿರಿ ಕೋಟೆಗಳು.', tag: 'ಯುನೆಸ್ಕೋ ಅದ್ಭುತಗಳು' },
    hi: { title: 'शाही विरासत और किले', description: 'भव्य मैसूर महल, विजयनगर के ऐतिहासिक खंडहर और पहाड़ी किले।', tag: 'यूनेस्को धरोहर' },
    te: { title: 'రాచరిక వారసత్వం & కోటలు', description: 'గౌరవనీయ మైసూరు ప్యాలెస్, హంపి శిథిలాలు మరియు చారిత్రక కొండ కోటలు.', tag: 'యునెస్కో అద్భుతాలు' },
    ta: { title: 'ராஜ பாரம்பரியம் & கோட்டைகள்', description: 'பிரம்மாண்ட மைசூர் அரண்மனை, ஹம்பி விஜயநகர இடிபாடுகள், மலைக் கோட்டைகள்.', tag: 'யுனெஸ்கோ அதிசயங்கள்' },
    ml: { title: 'രാജകീയ പൈതൃകവും കോട്ടകളും', description: 'ഗംഭീരമായ മൈസൂർ കൊട്ടാരം, ഹംപി വിജയനഗര അവശിഷ്ടങ്ങൾ, ചരിത്ര കോട്ടകൾ.', tag: 'യുനെസ്കോ വിസ്മയങ്ങൾ' }
  },
  temples: {
    en: { title: 'Temples & Sacred Shrines', description: 'Virupaksha, Chamundi Hill, Udupi Sri Krishna Matha, and Badami rock caves.', tag: 'Spiritual Haven' },
    kn: { title: 'ಪವಿತ್ರ ದೇವಾಲಯಗಳು', description: 'ವಿರೂಪಾಕ್ಷ, ಚಾಮುಂಡಿ ಬೆಟ್ಟ, ಉಡುಪಿ ಶ್ರೀಕೃಷ್ಣ ಮಠ ಮತ್ತು ಬಾದಾಮಿ ಗುಹಾ ದೇವಾಲಯಗಳು.', tag: 'ಆಧ್ಯಾತ್ಮಿಕ ಕ್ಷೇತ್ರ' },
    hi: { title: 'पवित्र मंदिर और तीर्थ', description: 'विरूपाक्ष, चामुंडी पहाड़ी, उडुपी श्रीकृष्ण मठ और बादामी गुफा मंदिर।', tag: 'आध्यात्मिक केंद्र' },
    te: { title: 'పుణ్యక్షేత్రాలు & ఆలయాలు', description: 'విరూపాక్ష, చాముండి కొండ, ఉడుపి శ్రీకృష్ణ మఠం మరియు బాదామి గుహాలయాలు.', tag: 'ఆధ్యాత్మిక ధామం' },
    ta: { title: 'புனிதக் கோவில்கள் & தலங்கள்', description: 'விருபாக்ஷா, சாமுண்டி மலை, உடுப்பி கிருஷ்ணர் மடம், பாதாமி குகைக்கோவில்கள்.', tag: 'ஆன்மீக பூமி' },
    ml: { title: 'ക്ഷേത്രങ്ങളും തീർത്ഥാടനവും', description: 'വിരൂപാക്ഷ, ചാമുണ്ഡി ഹിൽ, ഉഡുപ്പി ശ്രീകൃഷ്ണ മഠം, ബാദാമി ഗുഹാക്ഷേത്രങ്ങൾ.', tag: 'ആത്മീയ സങ്കേതം' }
  },
  adventure: {
    en: { title: 'Trek & Adventure', description: 'Mullayanagiri peak climbs, Dandeli river rafting, and boulder scrambling.', tag: 'Thrills' },
    kn: { title: 'ಸಾಹಸ ಮತ್ತು ಚಾರಣ', description: 'ಮುಳ್ಳಯ್ಯನಗಿರಿ ಶಿಖರಾರೋಹಣ, ದಾಂಡೇಲಿ ನದಿ ರಾಫ್ಟಿಂಗ್ ಮತ್ತು ರೋಮಾಂಚಕ ಚಾರಣ.', tag: 'ರೋಮಾಂಚನ' },
    hi: { title: 'ट्रेकिंग और रोमांच', description: 'मुल्लायनगिरि चोटी पर चढ़ाई, दांडेली रिवर राफ्टिंग और चट्टानी ट्रेक।', tag: 'रोमांच' },
    te: { title: 'ట్రెక్కింగ్ & సాహసాలు', description: 'ముళ్ళయ్యనగిరి పర్వతారోహణ, దాండేలి రివర్ రాఫ్టింగ్ మరియు కొండల ట్రెక్కింగ్.', tag: 'సాహసం' },
    ta: { title: 'சாகசம் & மலையேற்றம்', description: 'முல்லையனகிரி சிகர மலையேற்றம், தாண்டேலி படகு சவாரி மற்றும் பாறைப் பயணம்.', tag: 'சிலிர்ப்பூட்டும் பயணம்' },
    ml: { title: 'സാഹസികതയും ട്രെക്കിംഗും', description: 'മുള്ളയ്യനഗിരി കൊടുമുടി കയറ്റം, ദാണ്ഡേലി റിവർ റാഫ്റ്റിംഗ്, ട്രെക്കിംഗ്.', tag: 'ആവേശം' }
  },
  wildlife: {
    en: { title: 'Wild Safaris', description: 'Nagarhole tigers, wild Asiatic elephants, and Kabini black panther tracking.', tag: 'Flora & Fauna' },
    kn: { title: 'ವನ್ಯಜೀವಿ ಸಫಾರಿ', description: 'ನಾಗರಹೊಳೆ ಹುಲಿಗಳು, ಕಾಡಾನೆಗಳು ಮತ್ತು ಕಬಿನಿ ಕಪ್ಪು ಚಿರತೆಯ ರೋಮಾಂಚಕ ವೀಕ್ಷಣೆ.', tag: 'ಕಾಡು & ಪ್ರಾಣಿಸಂಕುಲ' },
    hi: { title: 'वन्यजीव सफारी', description: 'नागरहोले के बाघ, जंगली एशियाई हाथी और काबिनी के ब्लैक पैंथर।', tag: 'वन्यजीव' },
    te: { title: 'వన్యప్రాణి సఫారీ', description: 'నాగర్‌హోల్ పులులు, అడవి ఏనుగులు మరియు కబిని బ్లాక్ పాంథర్ సఫారీ.', tag: 'వన్యప్రాణులు' },
    ta: { title: 'வனவிலங்கு சஃபாரி', description: 'நாகர்ஹோலே புலிகள், காட்டு யானைகள் மற்றும் கபினி கருஞ்சிறுத்தை சஃபாரி.', tag: 'காட்டுயிர்கள்' },
    ml: { title: 'വന്യജീവി സഫാരി', description: 'നാഗർഹോളെ കടുവകൾ, കാട്ടാനകൾ, കബിനിയിലെ കരിമ്പുലി സഫാരി.', tag: 'വന്യജീവികൾ' }
  },
  food: {
    en: { title: 'Food & Gastronomy', description: 'Mylari butter dosa, authentic Udupi thali, Dharwad peda & filter kaapi.', tag: 'Culinary Delights' },
    kn: { title: 'ಕರ್ನಾಟಕ ಪಾಕಪದ್ಧತಿ & ರುಚಿ', description: 'ಮೈಲಾರಿ ಬೆಣ್ಣೆ ದೋಸೆ, ಅಪ್ಪಟ ಉಡುಪಿ ಊಟ, ಧಾರವಾಡ ಪೇಡಾ ಮತ್ತು ಪರಿಮಳದ ಫಿಲ್ಟರ್ ಕಾಫಿ.', tag: 'ರುಚಿಕರ ತಿನಿಸುಗಳು' },
    hi: { title: 'स्थानीय भोजन और स्वाद', description: 'मयिलारी बटर डोसा, प्रामाणिक उडुपी थाली, धारवाड़ पेड़ा और फिल्टर कॉफी।', tag: 'स्वादिष्ट व्यंजन' },
    te: { title: 'ఆహారం & స్థానిక వంటకాలు', description: 'మైలారి వెన్న దోశ, అసలైన ఉడుపి భోజనం, ధార్వాడ్ పేడా మరియు ఫిల్టర్ కాఫీ.', tag: 'రుచికరమైన విందు' },
    ta: { title: 'உணவு & சுவைகள்', description: 'மயிலாரி வெண்ணெய் தோசை, உண்மையான உடுப்பி சாப்பாடு, தார்வாட் பேடா, ஃபில்டர் காபி.', tag: 'சுவையான உணவுகள்' },
    ml: { title: 'നാടൻ രുചിക്കൂട്ടുകൾ', description: 'മൈലാരി വെണ്ണ ദോശ, തനത് ഉഡുപ്പി സദ്യ, ധാർവാഡ് പേഡ, ഫിൽട്ടർ കോഫി.', tag: 'രുചിഭേദങ്ങൾ' }
  },
  relaxation: {
    en: { title: 'Relaxation & Wellness', description: 'Peaceful plantation homestays, birdwatching, Ayurvedic retreats & serenity.', tag: 'Slow Living' },
    kn: { title: 'ವಿಶ್ರಾಂತಿ ಮತ್ತು ಶಾಂತಿ', description: 'ಕಾಫಿ ತೋಟಗಳ ಹೋಂಸ್ಟೇ, ಪಕ್ಷಿ ವೀಕ್ಷಣೆ, ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸೆ ಮತ್ತು ಪ್ರಶಾಂತ ವಾತಾವರಣ.', tag: 'ನೆಮ್ಮದಿಯ ಬದುಕು' },
    hi: { title: 'विश्राम और तंदुरुस्ती', description: 'शांत बागान होमस्टे, पक्षी दर्शन, आयुर्वेदिक वेलनेस और प्रकृति का सुकून।', tag: 'शांति' },
    te: { title: 'విశ్రాంతి & ప్రశాంతత', description: 'తోటల మధ్య హోమ్‌స్టేలు, పక్షుల వీక్షణ, ఆయుర్వేద స్వస్థత మరియు ప్రశాంతత.', tag: 'ప్రశాంత జీవనం' },
    ta: { title: 'ஓய்வு & புத்துணர்ச்சி', description: 'அமைதியான எஸ்டேட் ஹோம்கேர், பறவைகள் பார்த்தல், ஆயுர்வேத ஓய்வு.', tag: 'அமைதியான வாழ்க்கை' },
    ml: { title: 'വിശ്രമവും ആശ്വാസവും', description: 'തോട്ടങ്ങളിലെ ശാന്തമായ ഹോംസ്റ്റേകൾ, പക്ഷിനിരീക്ഷണം, ആയുർവേദ കേന്ദ്രങ്ങൾ.', tag: 'ശാന്തജീവിതം' }
  },
  culture: {
    en: { title: 'Culture, Arts & Handlooms', description: 'Live Yakshagana coastal theatre, Mysore silk weavers & traditional crafts.', tag: 'Living Traditions' },
    kn: { title: 'ಕಲೆ, ನೃತ್ಯ ಮತ್ತು ಸಂಸ್ಕೃತಿ', description: 'ಕರಾವಳಿಯ ಯಕ್ಷಗಾನ, ಮೈಸೂರು ರೇಷ್ಮೆ ನೇಯ್ಗೆ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಕರಕುಶಲ ಕಲೆ.', tag: 'ಸಜೀವ ಪರಂಪರೆ' },
    hi: { title: 'संस्कृति, कला और हथकरघा', description: 'जीवंत यक्षगान तटीय रंगमंच, मैसूर रेशम बुनकर और पारंपरिक शिल्प।', tag: 'जीवंत परंपराएं' },
    te: { title: 'సంస్కృతి, కళలు & చేనేత', description: 'యక్షగానం నృత్య నాటకం, మైసూరు పట్టు నేత మరియు సాంప్రదాయ చేతివృత్తులు.', tag: 'జీవన సంప్రదాయాలు' },
    ta: { title: 'கலாச்சாரம் & கைத்தறி', description: 'யக்ஷகான நாட்டியம், மைசூர் பட்டு நெசவு மற்றும் பாரம்பரிய கைவினைப் பொருட்கள்.', tag: 'வாழும் பாரம்பரியம்' },
    ml: { title: 'കലയും സംസ്കാരവും കൈത്തറിയും', description: 'തനത് യക്ഷഗാനം, മൈസൂർ പട്ട് നെയ്ത്ത്, പരമ്പരാഗത കരകൗശല വിദ്യകൾ.', tag: 'പാരമ്പര്യം' }
  }
};

export const MULTILINGUAL_DURATIONS: Record<string, Record<string, { title: string; subtitle: string; description: string; badge: string }>> = {
  '1-day': {
    en: { title: 'One Day Express', subtitle: 'Quick Day Excursion', description: 'Perfect for quick weekend city escapes, temple darshans, or single-day road trips.', badge: 'Express 24h' },
    kn: { title: 'ಒಂದು ದಿನದ ಪ್ರವಾಸ', subtitle: 'ತ್ವರಿತ ದಿನದ ಪಯಣ', description: 'ವಾರಾಂತ್ಯದ ತ್ವರಿತ ಪ್ರವಾಸ, ದೇವಸ್ಥಾನದ ದರ್ಶನ ಅಥವಾ ಒಂದು ದಿನದ ರಸ್ತೆ ಪ್ರವಾಸಕ್ಕೆ ಸೂಕ್ತ.', badge: 'ಎಕ್ಸ್‌ಪ್ರೆಸ್ ೨೪ ಗಂಟೆ' },
    hi: { title: 'एक दिवसीय एक्सप्रेस', subtitle: 'त्वरित यात्रा', description: 'वीकेंड की त्वरित यात्रा, मंदिर दर्शन या एक दिन के रोड ट्रिप के लिए उत्तम।', badge: 'एक्सप्रेस 24 घंटे' },
    te: { title: 'ఒక్క రోజు ఎక్స్‌ప్రెస్', subtitle: 'త్వరిత విహారయాత్ర', description: 'వీకెండ్ త్వరిత యాత్ర, ఆలయ దర్శనం లేదా ఒక్క రోజు రోడ్ ట్రిప్‌కు అనుకూలం.', badge: 'ఎక్స్‌ప్రెస్ 24 గం' },
    ta: { title: 'ஒரு நாள் எக்ஸ்பிரஸ்', subtitle: 'விரைவான ஒரு நாள் பயணம்', description: 'வார இறுதி பயணம், கோவில் தரிசனம் அல்லது ஒரு நாள் பயணத்திற்கு ஏற்றது.', badge: 'எக்ஸ்பிரஸ் 24 மணி' },
    ml: { title: 'ഒരു ദിവസത്തെ യാത്ര', subtitle: 'ലഘു ഏകദിന പര്യടനം', description: 'വാരാന്ത്യ യാത്രകൾക്കും ക്ഷേത്രദർശനങ്ങൾക്കും ഒരു ദിവസത്തെ യാത്രയ്ക്കും ഉത്തമം.', badge: 'എക്സ്പ്രസ് 24 മണിക്കൂർ' }
  },
  '2-3-days': {
    en: { title: '2 – 3 Days', subtitle: 'Weekend Getaway', description: 'Ideal for discovering one prime destination like Hampi, Coorg, or Mysuru without rushing.', badge: 'Most Popular' },
    kn: { title: '೨ - ೩ ದಿನಗಳು', subtitle: 'ವಾರಾಂತ್ಯದ ರಜೆ', description: 'ಹಂಪಿ, ಕೂರ್ಗ್ ಅಥವಾ ಮೈಸೂರಿನಂತಹ ಪ್ರಮುಖ ತಾಣವನ್ನು ಆರಾಮವಾಗಿ ಕಣ್ತುಂಬಿಕೊಳ್ಳಲು ಅತ್ಯುತ್ತಮ.', badge: 'ಅತ್ಯಂತ ಜನಪ್ರಿಯ' },
    hi: { title: '2 – 3 दिन', subtitle: 'सप्ताहांत की छुट्टी', description: 'हंपी, कूर्ग या मैसूर जैसे प्रमुख स्थल को बिना जल्दबाजी के देखने के लिए आदर्श।', badge: 'सर्वाधिक लोकप्रिय' },
    te: { title: '2 – 3 రోజులు', subtitle: 'వీకెండ్ వెకేషన్', description: 'హంపి, కూర్గ్ లేదా మైసూరు లాంటి ప్రధాన ప్రాంతాన్ని తీరిగ్గా చూడటానికి ఉత్తమం.', badge: 'అత్యంత ప్రాచుర్యం' },
    ta: { title: '2 – 3 நாட்கள்', subtitle: 'வார இறுதி உலா', description: 'ஹம்பி, கூர்க் அல்லது மைசூர் போன்ற முக்கிய இடத்தை நிதானமாக ரசிக்க ஏற்றது.', badge: 'மிகவும் பிரபலம்' },
    ml: { title: '2 – 3 ദിവസങ്ങൾ', subtitle: 'വാരാന്ത്യ അവധിക്കാലം', description: 'ഹംപി, കൂർഗ്, മൈസൂരു തുടങ്ങിയ പ്രമുഖ കേന്ദ്രങ്ങൾ തിടുക്കമില്ലാതെ ആസ്വദിക്കാം.', badge: 'ഏറ്റവും പ്രിയപ്പെട്ടത്' }
  },
  '4-5-days': {
    en: { title: '4 – 5 Days', subtitle: 'Mini Vacation', description: 'Explore multi-destination circuits (e.g. Mysuru + Coorg or Coastal Karavali + Udupi).', badge: 'Comprehensive' },
    kn: { title: '೪ - ೫ ದಿನಗಳು', subtitle: 'ಸಣ್ಣ ರಜಾದಿನಗಳ ಪ್ರವಾಸ', description: 'ಬಹು-ತಾಣಗಳ ಸಂಯೋಜಿತ ಪ್ರವಾಸ (ಉದಾ: ಮೈಸೂರು + ಕೂರ್ಗ್ ಅಥವಾ ಕರಾವಳಿ + ಉಡುಪಿ).', badge: 'ಸಮಗ್ರ ಪ್ರವಾಸ' },
    hi: { title: '4 – 5 दिन', subtitle: 'मिनी वेकेशन', description: 'कई गंतव्यों का संयुक्त सर्किट (उदा: मैसूर + कूर्ग या तटीय करावली + उडुपी)।', badge: 'व्यापक सर्किट' },
    te: { title: '4 – 5 రోజులు', subtitle: 'మినీ వెకేషన్', description: 'బహుళ ప్రాంతాల సర్క్యూట్ (ఉదా: మైసూరు + కూర్గ్ లేదా కరావళి + ఉడుపి).', badge: 'సమగ్ర యాత్ర' },
    ta: { title: '4 – 5 நாட்கள்', subtitle: 'சிறு விடுமுறை', description: 'பல இடங்களை இணைக்கும் பயணம் (எ.கா: மைசூர் + கூர்க் அல்லது உடுப்பி + கடற்கரை).', badge: 'முழுமையான உலா' },
    ml: { title: '4 – 5 ദിവസങ്ങൾ', subtitle: 'ചെറിയ അവധിക്കാലം', description: 'ഒന്നിലധികം സ്ഥലങ്ങൾ ഉൾക്കൊള്ളുന്ന യാത്ര (ഉദാ: മൈസൂരു + കൂർഗ് അല്ലെങ്കിൽ ഉഡുപ്പി).', badge: 'വിപുലമായ യാത്ര' }
  },
  '6-7-days': {
    en: { title: '6 – 7 Days', subtitle: 'Grand Week Circuit', description: 'Immersive exploration covering Northern Chalukya heritage, coastal coves, and coffee hills.', badge: 'Grand Journey' },
    kn: { title: '೬ - ೭ ದಿನಗಳು', subtitle: 'ಭವ್ಯ ವಾರದ ಪ್ರವಾಸ', description: 'ಉತ್ತರ ಕರ್ನಾಟಕದ ಚಾಲುಕ್ಯ ಪರಂಪರೆ, ಕರಾವಳಿ ತೀರಗಳು ಮತ್ತು ಮಲೆನಾಡಿನ ಗಿರಿಧಾಮಗಳ ಸಮಗ್ರ ದರ್ಶನ.', badge: 'ಭವ್ಯ ಪಯಣ' },
    hi: { title: '6 – 7 दिन', subtitle: 'भव्य साप्ताहिक यात्रा', description: 'चालुक्य विरासत, शांत तटीय समुद्र तट और हरी-भरी पहाड़ियों का संपूर्ण अनुभव।', badge: 'भव्य यात्रा' },
    te: { title: '6 – 7 రోజులు', subtitle: 'వారపు మహా యాత్ర', description: 'ఉత్తర కర్ణాటక చాళుక్య వారసత్వం, తీరప్రాంత బీచ్‌లు మరియు కాఫీ కొండల సంపూర్ణ దర్శనం.', badge: 'మహా యాత్ర' },
    ta: { title: '6 – 7 நாட்கள்', subtitle: 'முழு வாரப் பயணம்', description: 'சாளுக்கிய பாரம்பரியம், கடலோர அழகுகள் மற்றும் மலைப்பகுதிகளின் முழுமையான பயணம்.', badge: 'பிரம்மாண்டப் பயணம்' },
    ml: { title: '6 – 7 ദിവസങ്ങൾ', subtitle: 'ഒരു ആഴ്ചത്തെ മഹായാത്ര', description: 'ചാലൂക്യ പൈതൃകം, തീരദേശങ്ങൾ, മലനിരകൾ എന്നിവയെല്ലാം കോർത്തിണക്കിയ യാത്ര.', badge: 'മഹായാത്ര' }
  },
  'custom': {
    en: { title: 'Custom Duration', subtitle: 'Choose Exact Days', description: 'Enter your exact trip duration from 8 to 21 days for an extensive holiday.', badge: 'Tailored' },
    kn: { title: 'ನಿಮ್ಮದೇ ದಿನಗಳು', subtitle: 'ನಿರ್ದಿಷ್ಟ ದಿನಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ', description: 'ದೀರ್ಘ ರಜೆಗಾಗಿ ನಿಮ್ಮ ಅನುಕೂಲಕ್ಕೆ ತಕ್ಕಂತೆ ೮ ರಿಂದ ೨೧ ದಿನಗಳನ್ನು ನಮೂದಿಸಿ.', badge: 'ನಿಮ್ಮಿಷ್ಟದಂತೆ' },
    hi: { title: 'कस्टम अवधि', subtitle: 'सटीक दिन चुनें', description: 'लंबी छुट्टी के लिए 8 से 21 दिनों की अपनी सटीक यात्रा अवधि दर्ज करें।', badge: 'अनुकूलित' },
    te: { title: 'మీకు నచ్చిన రోజులు', subtitle: 'ఖచ్చితమైన రోజులు ఎంచుకోండి', description: 'సుదీర్ఘ యాత్ర కోసం 8 నుండి 21 రోజుల వరకు మీ సమయాన్ని నమోదు చేయండి.', badge: 'మీ ఇష్టం' },
    ta: { title: 'தனிப்பயன் நாட்கள்', subtitle: 'துல்லியமான நாட்கள்', description: 'நீண்ட விடுமுறைக்கு 8 முதல் 21 நாட்கள் வரை உங்கள் விருப்பப்படி குறிப்பிடவும்.', badge: 'விருப்பப்படி' },
    ml: { title: 'ഇഷ്ടാനുസൃത കാലാവധി', subtitle: 'കൃത്യമായ ദിവസങ്ങൾ', description: 'ദീർഘകാല അവധിക്കായി 8 മുതൽ 21 ദിവസം വരെ നിങ്ങൾക്ക് അനുയോജ്യമായത് തിരഞ്ഞെടുക്കുക.', badge: 'പ്രത്യേകം തയ്യാറാക്കിയത്' }
  }
};

export const MULTILINGUAL_BUDGETS: Record<string, Record<string, { title: string; rangeText: string; description: string; perks: string[] }>> = {
  budget: {
    en: { title: 'Budget-Friendly', rangeText: '₹1,500 – ₹2,500 / day', description: 'Clean certified homestays / dharamsalas, KSRTC bus/train travel, and iconic local food messes.', perks: ['KSRTC Rajahamsa/Airavat', 'Authentic local mess meals', 'Heritage homestays / lodges'] },
    kn: { title: 'ಮಿತವ್ಯಯದ ಬಜೆಟ್', rangeText: '₹೧,೫೦೦ – ₹೨,೫೦೦ / ದಿನಕ್ಕೆ', description: 'ಸ್ವಚ್ಛವಾದ ಹೋಂಸ್ಟೇಗಳು, ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಬಸ್/ರೈಲು ಮತ್ತು ಅಧಿಕೃತ ಸ್ಥಳೀಯ ಖಾನಾವಳಿ ಊಟ.', perks: ['ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ರಾಜಹಂಸ/ಐರಾವತ', 'ಅಧಿಕೃತ ಸ್ಥಳೀಯ ಊಟದ ಮನೆಗಳು', 'ಪಾರಂಪರಿಕ ಹೋಂಸ್ಟೇಗಳು'] },
    hi: { title: 'किफायती / बजट-फ्रेंडली', rangeText: '₹1,500 – ₹2,500 / दिन', description: 'स्वच्छ प्रमाणित होमस्टे / धर्मशालाएं, केएसआरटीसी बस/ट्रेन और प्रामाणिक स्थानीय भोजनालय।', perks: ['केएसआरटीसी राजहंस/ऐरावत', 'प्रामाणिक स्थानीय भोजन', 'हेरिटेज होमस्टे / लॉज'] },
    te: { title: 'ఆర్థికమైన బడ్జెట్', rangeText: '₹1,500 – ₹2,500 / రోజుకు', description: 'పరిశుభ్రమైన హోమ్‌స్టేలు, కేఎస్‌ఆర్‌టిసి బస్సు/రైలు మరియు అసలైన స్థానిక భోజనం.', perks: ['కేఎస్‌ఆర్‌టిసి రాజహంస/ఐరావత్', 'ప్రామాణిక స్థానిక భోజనాలు', 'హెరిటేజ్ హోమ్‌స్టేలు'] },
    ta: { title: 'சிக்கன பட்ஜெட்', rangeText: '₹1,500 – ₹2,500 / ஒரு நாளைக்கு', description: 'சுத்தமான ஹோம்ஸ்டே, கே.எஸ்.ஆர்.டி.சி பேருந்து/ரயில் மற்றும் பாரம்பரிய உள்ளூர் உணவு.', perks: ['கே.எஸ்.ஆர்.டி.சி ராஜஹம்சா/ஐராவத்', 'உள்ளூர் மெஸ் உணவுகள்', 'பாரம்பரிய ஹோம்ஸ்டே'] },
    ml: { title: 'ബജറ്റ് സൗഹൃദം', rangeText: '₹1,500 – ₹2,500 / ദിവസം', description: 'വൃത്തിയുള്ള ഹോംസ്റ്റേകൾ, കെ.എസ്.ആർ.ടി.സി ബസ്/ട്രെയിൻ, നാടൻ ഭക്ഷണശാലകൾ.', perks: ['കെ.എസ്.ആർ.ടി.സി രാജഹംസ/ഐരാവത്', 'തനത് നാടൻ ഭക്ഷണം', 'പൈതൃക ഹോംസ്റ്റേകൾ'] }
  },
  comfortable: {
    en: { title: 'Comfortable', rangeText: '₹3,000 – ₹5,000 / day', description: '3-star boutique resorts / estate bungalows, AC cabs or Vande Bharat trains, and guided visits.', perks: ['AC car / Vande Bharat', 'Boutique plantation stays', 'Licensed tour guide visits'] },
    kn: { title: 'ಆರಾಮದಾಯಕ ಬಜೆಟ್', rangeText: '₹೩,೦೦೦ – ₹೫,೦೦೦ / ದಿನಕ್ಕೆ', description: '೩-ಸ್ಟಾರ್ ರೆಸಾರ್ಟ್‌ಗಳು / ಕಾಫಿ ತೋಟದ ಬಂಗಲೆಗಳು, ಎಸಿ ಕಾರು ಅಥವಾ ವಂದೇ ಭಾರತ್ ರೈಲು.', perks: ['ಎಸಿ ಕಾರು / ವಂದೇ ಭಾರತ್', 'ಕಾಫಿ ತೋಟದ ರೆಸಾರ್ಟ್‌ಗಳು', 'ಪರವಾನಗಿ ಪಡೆದ ಮಾರ್ಗದರ್ಶಿ'] },
    hi: { title: 'आरामदायक', rangeText: '₹3,000 – ₹5,000 / दिन', description: '3-स्टार बुटीक रिसॉर्ट्स / एस्टेट बंगले, एसी कैब या वंदे भारत ट्रेन और निर्देशित पर्यटन।', perks: ['एसी कार / वंदे भारत', 'बुटीक प्लांटेशन स्टे', 'लाइसेंस प्राप्त टूर गाइड'] },
    te: { title: 'సౌకర్యవంతమైన బడ్జెట్', rangeText: '₹3,000 – ₹5,000 / రోజుకు', description: '3-స్టార్ బోటిక్ రిసార్ట్‌లు / ఎస్టేట్ బంగ్లాలు, ఎసి క్యాబ్‌లు లేదా వందే భారత్ రైళ్లు.', perks: ['ఎసి కారు / వందే భారత్', 'ప్లాంటేషన్ రిసార్ట్ బస', 'గైడెడ్ టూర్ దర్శనాలు'] },
    ta: { title: 'வசதியான பட்ஜெட்', rangeText: '₹3,000 – ₹5,000 / ஒரு நாளைக்கு', description: '3-நட்சத்திர ரிசார்ட்டுகள் / எஸ்டேட் பங்களாக்கள், ஏசி கார்கள் அல்லது வந்தே பாரத் ரயில்.', perks: ['ஏசி கார் / வந்தே பாரத்', 'தோட்ட தங்குமிடங்கள்', 'வழிகாட்டப்பட்ட சுற்றுலா'] },
    ml: { title: 'സുഖപ്രദമായ ബജറ്റ്', rangeText: '₹3,000 – ₹5,000 / ദിവസം', description: '3-സ്റ്റാർ റിസോർട്ടുകൾ / എസ്റ്റേറ്റ് ബംഗ്ലാവുകൾ, എസി കാർ അല്ലെങ്കിൽ വന്ദേ ഭാരത് ട്രെയിൻ.', perks: ['എസി കാർ / വന്ദേ ഭാരത്', 'പ്ലാന്റേഷൻ റിസോർട്ടുകൾ', 'ഗൈഡഡ് ടൂറുകൾ'] }
  },
  premium: {
    en: { title: 'Royal / Premium', rangeText: '₹6,000+ / day', description: 'Luxury jungle resorts (Jungle Lodges & Resorts), private chauffeur SUV, and heritage fine dining.', perks: ['Private SUV chauffeur', 'Luxury wilderness lodges', 'VIP darshan & private boat safaris'] },
    kn: { title: 'ರಾಜಮನೆತನದ ಐಷಾರಾಮಿ', rangeText: '₹೬,೦೦೦+ / ದಿನಕ್ಕೆ', description: 'ಐಷಾರಾಮಿ ಜಂಗಲ್ ಲಾಡ್ಜ್‌ಗಳು, ಖಾಸಗಿ ಎಸ್‌ಯುವಿ ಕಾರು ಮತ್ತು ರಾಜವೈಭೋಗದ ಆಹಾರ.', perks: ['ಖಾಸಗಿ ಎಸ್‌ಯುವಿ ಚಾಲಕ', 'ಐಷಾರಾಮಿ ಅರಣ್ಯ ರೆಸಾರ್ಟ್‌ಗಳು', 'ವಿಐಪಿ ದರ್ಶನ & ಬೋಟ್ ಸಫಾರಿ'] },
    hi: { title: 'रॉयल / प्रीमियम', rangeText: '₹6,000+ / दिन', description: 'लक्ज़री जंगल लॉज (JLR), निजी एसयूवी वाहन और हेरिटेज फाइन डाइनिंग।', perks: ['निजी एसयूवी ड्राइवर', 'लक्ज़री वाइल्डरनेस लॉज', 'वीआईपी दर्शन और बोट सफारी'] },
    te: { title: 'రాచరిక లగ్జరీ / ప్రీమియం', rangeText: '₹6,000+ / రోజుకు', description: 'లగ్జరీ జంగిల్ లాడ్జీలు (JLR), ప్రైవేట్ SUV డ్రైవర్ మరియు విలాసవంతమైన భోజనం.', perks: ['ప్రైవేట్ SUV డ్రైవర్', 'లగ్జరీ అటవీ లాడ్జీలు', 'విఐపి దర్శనం & బోట్ సఫారీ'] },
    ta: { title: 'ராஜபோக / பிரீமியம்', rangeText: '₹6,000+ / ஒரு நாளைக்கு', description: 'சொகுசு ஜங்கிள் லாட்ஜ்கள், பிரைவேட் எஸ்யூவி கார், ராஜபோக உணவுகள்.', perks: ['சொகுசு எஸ்யூவி வாகனம்', 'வனவிலங்கு ரிசார்ட்டுகள்', 'விஐபி தரிசனம் & படகு சவாரி'] },
    ml: { title: 'രാജകീയ പ്രീമിയം', rangeText: '₹6,000+ / ദിവസം', description: 'ആഡംബര ജംഗിൾ ലോഡ്ജുകൾ, സ്വകാര്യ എസ്‌യുവി, പൈതൃക ഫൈൻ ഡൈനിംഗ്.', perks: ['സ്വകാര്യ എസ്‌യുവി കാർ', 'ആഡംബര ഫോറസ്റ്റ് ലോഡ്ജ്', 'വിഐപി ദർശനം, ബോട്ട് സഫാരി'] }
  },
  custom: {
    en: { title: 'Custom Amount', rangeText: 'Set your exact figure', description: 'Specify an exact total or daily INR budget tailored to your personal plan.', perks: ['Exact INR calculations', 'Flexible spend allocation', 'Custom group splitting'] },
    kn: { title: 'ನಿರ್ದಿಷ್ಟ ಮೊತ್ತ', rangeText: 'ನಿಮ್ಮದೇ ಮೊತ್ತ ನಿಗದಿಪಡಿಸಿ', description: 'ನಿಮ್ಮ ಯೋಜನೆಗೆ ತಕ್ಕಂತೆ ನಿಖರವಾದ ದೈನಂದಿನ ಅಥವಾ ಒಟ್ಟು ಮೊತ್ತವನ್ನು ನಮೂದಿಸಿ.', perks: ['ನಿಖರ ರೂಪಾಯಿ ಲೆಕ್ಕಾಚಾರ', 'ಹೊಂದಿಕೊಳ್ಳುವ ವೆಚ್ಚ ಹಂಚಿಕೆ', 'ಕಸ್ಟಮ್ ಗ್ರೂಪ್ ವಿಭಜನೆ'] },
    hi: { title: 'कस्टम बजट', rangeText: 'अपनी राशि तय करें', description: 'अपनी योजना के अनुसार सटीक दैनिक या कुल बजट राशि निर्दिष्ट करें।', perks: ['सटीक INR गणना', 'लचीला खर्च आवंटन', 'कस्टम ग्रुप विभाजन'] },
    te: { title: 'మీకు నచ్చిన మొత్తం', rangeText: 'మీ బడ్జెట్ నమోదు చేయండి', description: 'మీ ప్రణాళికకు అనుగుణంగా రోజువారీ లేదా మొత్తం బడ్జెట్ మొత్తాన్ని పేర్కొనండి.', perks: ['ఖచ్చితమైన రూపాయల గణన', 'సౌకర్యవంతమైన కేటాయింపు', 'కస్టమ్ గ్రూప్ విభజన'] },
    ta: { title: 'தனிப்பயன் தொகை', rangeText: 'தொகையை உள்ளிடவும்', description: 'உங்கள் திட்டத்திற்கேற்ப துல்லியமான தினசரி அல்லது மொத்த பட்ஜெட்டை குறிப்பிடவும்.', perks: ['துல்லியமான ரூபாய் கணக்கீடு', 'நெகிழ்வான செலவு ஒதுக்கீடு', 'குழு பிரிப்பு வசதி'] },
    ml: { title: 'ഇഷ്ടാനുസൃത തുക', rangeText: 'തുക രേഖപ്പെടുത്തുക', description: 'നിങ്ങളുടെ വ്യക്തിഗത പ്ലാനിന് അനുസരിച്ച് തുക കൃത്യമായി രേഖപ്പെടുത്തുക.', perks: ['കൃത്യമായ ചിലവ് കണക്കുകൂട്ടൽ', 'സൗകര്യപ്രദമായ വിഹിതം', 'ഗ്രൂപ്പ് ചിലവ് വിഭജനം'] }
  }
};

export const MULTILINGUAL_TRAVELERS: Record<string, Record<string, { title: string; description: string }>> = {
  solo: {
    en: { title: 'Solo Explorer', description: 'Freedom, off-beat trails, meeting friendly locals, and independent rhythm.' },
    kn: { title: 'ಏಕಾಂಗಿ ಪ್ರಯಾಣಿಕ', description: 'ಸ್ವಾತಂತ್ರ್ಯ, ಅಪರೂಪದ ತಾಣಗಳು, ಸ್ಥಳೀಯ ಜನರೊಂದಿಗೆ ಒಡನಾಟ ಮತ್ತು ಸ್ವತಂತ್ರ ವೇಗ.' },
    hi: { title: 'एकल यात्री (सोलो)', description: 'आज़ादी, अनछुए रास्ते, स्थानीय लोगों से मिलना और अपनी गति से यात्रा।' },
    te: { title: 'ఏకాంత యాత్రికుడు', description: 'స్వేచ్ఛ, కొత్త దారులు, స్థానికులతో పరిచయాలు మరియు స్వతంత్ర గమనం.' },
    ta: { title: 'தனிப்பயணி (சோலோ)', description: 'முழு சுதந்திரம், புதிய பாதைகள், உள்ளூர் மக்களுடன் தொடர்பு, சொந்த வேகம்.' },
    ml: { title: 'ഏകാംഗ യാത്രക്കാരൻ', description: 'പൂർണ്ണ സ്വാതന്ത്ര്യം, അപൂർവ്വ വഴികൾ, നാട്ടുകാരുമായുള്ള സൗഹൃദം, സ്വന്തം വേഗത.' }
  },
  couple: {
    en: { title: 'Couple', description: 'Romantic sunset viewpoints, cozy private estate stays, and scenic drives.' },
    kn: { title: 'ದಂಪತಿ', description: 'ರೋಮ್ಯಾಂಟಿಕ್ ಸೂರ್ಯಾಸ್ತ ತಾಣಗಳು, ಸುಂದರ ಕಾಫಿ ಎಸ್ಟೇಟ್ ಹೋಂಸ್ಟೇ ಮತ್ತು ರಮಣೀಯ ಡ್ರೈವ್.' },
    hi: { title: 'दंपति / युगल', description: 'रोमांटिक सूर्यास्त स्थल, शांत एस्टेट स्टे और खूबसूरत ड्राइव।' },
    te: { title: 'దంపతులు', description: 'శృంగారభరిత సూర్యాస్తమయ దృశ్యాలు, ఏకాంత ఎస్టేట్ బస మరియు సుందర ప్రయాణాలు.' },
    ta: { title: 'தம்பதியர்', description: 'அழகிய சூரிய அஸ்தமனக் காட்சிகள், அமைதியான எஸ்டேட் தங்குமிடம், இனிய பயணம்.' },
    ml: { title: 'ദമ്പതികൾ', description: 'റൊമാന്റിക് സൂര്യാസ്തമയങ്ങൾ, സ്വകാര്യതയുള്ള എസ്റ്റേറ്റ് താമസം, മനോഹര യാത്രകൾ.' }
  },
  friends: {
    en: { title: 'Friends', description: 'Beach bonfires, mountain treks, café hopping, and energetic adventure.' },
    kn: { title: 'ಸ್ನೇಹಿತರ ಗುಂಪು', description: 'ಬೀಚ್ ಬಾನ್‌ಫೈರ್, ಗಿರಿ ಪರ್ವತಗಳ ಚಾರಣ, ಕೆಫೆಗಳು ಮತ್ತು ಉತ್ಸಾಹಭರಿತ ಸಾಹಸ.' },
    hi: { title: 'दोस्तों का समूह', description: 'बीच बॉनफायर, माउंटेन ट्रेक, कैफे हॉपिंग और ऊर्जावान रोमांच।' },
    te: { title: 'స్నేహితుల బృందం', description: 'బీచ్ క్యాంప్‌ఫైర్, పర్వతారోహణ, కేఫ్‌ల సందర్శన మరియు ఉత్సాహవంతమైన సాహసాలు.' },
    ta: { title: 'நண்பர்கள் குழு', description: 'கடற்கரை கேம்ப்ஃபயர், மலை மலையேற்றம், கஃபே உலா மற்றும் உற்சாகமான சாகசம்.' },
    ml: { title: 'സുഹൃത്തുക്കളുടെ സംഘം', description: 'ബീച്ച് ക്യാമ്പ് ഫയർ, മലനിരകളിലെ ട്രെക്കിംഗ്, കഫേ സന്ദർശനം, സാഹസികത.' }
  },
  family: {
    en: { title: 'Family', description: 'Kid-friendly stops, safe hotels, balanced breaks, and multi-generational comfort.' },
    kn: { title: 'ಕುಟುಂಬ', description: 'ಮಕ್ಕಳು ಮತ್ತು ಹಿರಿಯರಿಗೆ ಸುರಕ್ಷಿತ ತಾಣಗಳು, ಉತ್ತಮ ಹೋಟೆಲ್‌ಗಳು ಮತ್ತು ಆರಾಮದಾಯಕ ವಿಶ್ರಾಂತಿ.' },
    hi: { title: 'परिवार', description: 'बच्चों के अनुकूल स्थल, सुरक्षित होटल, संतुलित विश्राम और सभी पीढ़ियों का आराम।' },
    te: { title: 'కుటుంబం', description: 'పిల్లలకు అనువైన ప్రదేశాలు, సురక్షిత హోటళ్ళు మరియు కుటుంబ సభ్యులందరికీ సౌకర్యం.' },
    ta: { title: 'குடும்பம்', description: 'குழந்தைகளுக்கு உகந்த இடங்கள், பாதுகாப்பான தங்குமிடம், அனைத்து தலைமுறையினருக்கும் வசதி.' },
    ml: { title: 'കുടുംബം', description: 'കുട്ടികൾക്കും മുതിർന്നവർക്കും അനുയോജ്യമായ സുരക്ഷിത ഹോട്ടലുകളും സുഖസൗകര്യങ്ങളും.' }
  },
  seniors: {
    en: { title: 'Senior Citizens', description: 'Comfort pace, minimal stairs, battery buggies at monuments, and elevator access.' },
    kn: { title: 'ಹಿರಿಯ ನಾಗರಿಕರು', description: 'ಆರಾಮದಾಯಕ ವೇಗ, ಕಡಿಮೆ ಮೆಟ್ಟಿಲುಗಳು, ಸ್ಮಾರಕಗಳಲ್ಲಿ ಇ-ಬಗ್ಗಿ ಮತ್ತು ಲಿಫ್ಟ್ ಸೌಲಭ್ಯ.' },
    hi: { title: 'वरिष्ठ नागरिक', description: 'आरामदायक गति, न्यूनतम सीढ़ियां, स्मारकों पर बैटरी कार और लिफ्ट की सुविधा।' },
    te: { title: 'సీనియర్ సిటిజన్లు', description: 'సులభమైన వేగం, తక్కువ మెట్లు, స్మారక చిహ్నాల వద్ద బ్యాటరీ బగ్గీలు మరియు లిఫ్ట్ సదుపాయం.' },
    ta: { title: 'மூத்த குடிமக்கள்', description: 'நிதானமான வேகம், குறைந்த படிக்கட்டுகள், பேட்டரி வாகனங்கள் மற்றும் லிப்ட் வசதி.' },
    ml: { title: 'മുതിർന്ന പൗരന്മാർ', description: 'സുഖകരമായ വേഗത, കുറഞ്ഞ പടികൾ, സ്മാരകങ്ങളിൽ ബാറ്ററി ബഗ്ഗി, ലിഫ്റ്റ് സൗകര്യം.' }
  },
  group: {
    en: { title: 'Large Group / Tour', description: 'Tempo Traveller / coach transport, unified dining, and coordinated visits.' },
    kn: { title: 'ದೊಡ್ಡ ಸಂಘ / ಪ್ರವಾಸ', description: 'ಟೆಂಪೋ ಟ್ರಾವೆಲರ್ / ಬಸ್ ಸಾರಿಗೆ, ಸಾಮೂಹಿಕ ಭೋಜನ ಮತ್ತು ಸಂಯೋಜಿತ ಭೇಟಿ.' },
    hi: { title: 'बड़ा समूह / टूर', description: 'टेंपो ट्रैवलर / बस, एक साथ भोजन और समन्वित पर्यटन स्थल।' },
    te: { title: 'పెద్ద బృందం / టూర్', description: 'టెంపో ట్రావెలర్ / కోచ్ బస్సు, సామూహిక భోజనం మరియు సమన్వయ దర్శనం.' },
    ta: { title: 'பெரிய குழு / டூர்', description: 'டெம்போ டிராவலர் / பேருந்து, ஒருங்கிணைந்த உணவு மற்றும் குழு உலா.' },
    ml: { title: 'വലിയ സംഘം / ടൂർ', description: 'ടെമ്പോ ട്രാവലർ / ടൂറിസ്റ്റ് ബസ്, ഒത്തൊരുമിച്ചുള്ള ഭക്ഷണം, കാഴ്ചകൾ.' }
  }
};

export function getLocalizedTransport(
  idOrItem: string | { id: string; title?: string; desc?: string }, 
  lang: string = 'en'
): { title: string; desc: string } {
  const id = typeof idOrItem === 'string' ? idOrItem : idOrItem.id;
  const fallback = typeof idOrItem === 'object' ? idOrItem : TRANSPORT_OPTIONS.find(t => t.id === id);
  const trans = MULTILINGUAL_TRANSPORT[id]?.[lang] || MULTILINGUAL_TRANSPORT[id]?.['en'];
  return {
    title: trans?.title || fallback?.title || id,
    desc: trans?.desc || fallback?.desc || ''
  };
}

export function getLocalizedPace(
  idOrItem: string | { id: string; title?: string; desc?: string }, 
  lang: string = 'en'
): { title: string; desc: string } {
  const id = typeof idOrItem === 'string' ? idOrItem : idOrItem.id;
  const fallback = typeof idOrItem === 'object' ? idOrItem : TRAVEL_PACES.find(p => p.id === id);
  const trans = MULTILINGUAL_PACES[id]?.[lang] || MULTILINGUAL_PACES[id]?.['en'];
  return {
    title: trans?.title || fallback?.title || id,
    desc: trans?.desc || fallback?.desc || ''
  };
}

export function getLocalizedAccessibility(
  idOrItem: string | { id: string; label?: string; sub?: string }, 
  lang: string = 'en'
): { label: string; sub: string } {
  const id = typeof idOrItem === 'string' ? idOrItem : idOrItem.id;
  const fallback = typeof idOrItem === 'object' ? idOrItem : ACCESSIBILITY_OPTIONS.find(a => a.id === id);
  const trans = MULTILINGUAL_ACCESSIBILITY[id]?.[lang] || MULTILINGUAL_ACCESSIBILITY[id]?.['en'];
  return {
    label: trans?.label || fallback?.label || id,
    sub: trans?.sub || fallback?.sub || ''
  };
}

export function getLocalizedCity(cityName: string, lang: string = 'en'): string {
  return MULTILINGUAL_CITIES[cityName]?.[lang] || cityName;
}

export function getLocalizedInterest(
  idOrItem: string | { id: string; title?: string; description?: string; tag?: string; kannadaTitle?: string }, 
  lang: string = 'en'
): { title: string; description: string; tag: string; subtitle: string } {
  const id = typeof idOrItem === 'string' ? idOrItem : idOrItem.id;
  const fallback = typeof idOrItem === 'object' ? idOrItem : WIZARD_INTERESTS.find(w => w.id === id);
  const trans = MULTILINGUAL_INTERESTS[id]?.[lang] || MULTILINGUAL_INTERESTS[id]?.['en'];
  return {
    title: trans?.title || fallback?.title || id,
    description: trans?.description || fallback?.description || '',
    tag: trans?.tag || fallback?.tag || '',
    subtitle: trans?.tag || fallback?.kannadaTitle || ''
  };
}

export function getLocalizedDuration(
  idOrItem: string | { id: string; title?: string; subtitle?: string; description?: string; badge?: string }, 
  lang: string = 'en'
): { title: string; subtitle: string; description: string; badge: string } {
  const id = typeof idOrItem === 'string' ? idOrItem : idOrItem.id;
  const fallback = typeof idOrItem === 'object' ? idOrItem : DURATION_OPTIONS.find(d => d.id === id);
  const trans = MULTILINGUAL_DURATIONS[id]?.[lang] || MULTILINGUAL_DURATIONS[id]?.['en'];
  return {
    title: trans?.title || fallback?.title || id,
    subtitle: trans?.subtitle || fallback?.subtitle || '',
    description: trans?.description || fallback?.description || '',
    badge: trans?.badge || fallback?.badge || ''
  };
}

export function getLocalizedBudget(
  idOrItem: string | { id: string; title?: string; rangeText?: string; description?: string; perks?: string[]; kannadaTitle?: string }, 
  lang: string = 'en'
): { title: string; rangeText: string; description: string; perks: string[]; subtitle: string } {
  const id = typeof idOrItem === 'string' ? idOrItem : idOrItem.id;
  const fallback = typeof idOrItem === 'object' ? idOrItem : BUDGET_PRESETS.find(b => b.id === id);
  const trans = MULTILINGUAL_BUDGETS[id]?.[lang] || MULTILINGUAL_BUDGETS[id]?.['en'];
  return {
    title: trans?.title || fallback?.title || id,
    rangeText: trans?.rangeText || fallback?.rangeText || '',
    description: trans?.description || fallback?.description || '',
    perks: trans?.perks || fallback?.perks || [],
    subtitle: fallback?.kannadaTitle || trans?.rangeText || ''
  };
}

export function getLocalizedTraveler(
  idOrItem: string | { id: string; title?: string; description?: string; kannadaTitle?: string }, 
  lang: string = 'en'
): { title: string; description: string; subtitle: string } {
  const id = typeof idOrItem === 'string' ? idOrItem : idOrItem.id;
  const fallback = typeof idOrItem === 'object' ? idOrItem : TRAVELER_GROUPS.find(g => g.id === id);
  const trans = MULTILINGUAL_TRAVELERS[id]?.[lang] || MULTILINGUAL_TRAVELERS[id]?.['en'];
  return {
    title: trans?.title || fallback?.title || id,
    description: trans?.description || fallback?.description || '',
    subtitle: fallback?.kannadaTitle || ''
  };
}

