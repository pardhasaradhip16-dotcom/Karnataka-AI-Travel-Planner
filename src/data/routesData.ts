import type { DestinationCoordinates } from '../types';

export interface RouteCorridor {
  fromId: string;
  toId: string;
  distanceKm: number;
  typicalTime: string;
  highway: string;
  roadQuality: 'Excellent Expressway' | 'Scenic Ghat Highway' | 'Standard State Highway';
}

export const STARTING_HUB_COORDINATES: Record<string, DestinationCoordinates> = {
  'Bengaluru (Kempegowda Int. Airport / KSR / Yesvantpur)': { lat: 12.9716, lng: 77.5946 },
  'Mysuru (South Karnataka Hub)': { lat: 12.2958, lng: 76.6394 },
  'Hubballi - Dharwad (North Karnataka Gateway)': { lat: 15.3647, lng: 75.1240 },
  'Mangaluru (Coastal Karavali & Airport)': { lat: 12.9141, lng: 74.8560 },
  'Belagavi (North-Western Karnataka)': { lat: 15.8497, lng: 74.4977 },
  'Shivamogga (Gateway to Malnad & Jog Falls)': { lat: 13.9299, lng: 75.5681 },
  'Kalaburagi (Kalyana Karnataka / Gulbarga)': { lat: 17.3297, lng: 76.8343 },
  'Ballari (Near Hampi & Vijayanagara)': { lat: 15.1394, lng: 76.9214 },
  'Udupi (Coastal Temple Town)': { lat: 13.3409, lng: 74.7421 },
  'Hassan (Gateway to Belur & Halebeedu)': { lat: 13.0068, lng: 76.1004 }
};

export const ROUTE_CORRIDORS: RouteCorridor[] = [
  {
    fromId: 'bengaluru',
    toId: 'mysuru',
    distanceKm: 145,
    typicalTime: '1 hr 45 min',
    highway: 'Bengaluru-Mysuru Access-Controlled Expressway (NH275)',
    roadQuality: 'Excellent Expressway'
  },
  {
    fromId: 'mysuru',
    toId: 'coorg',
    distanceKm: 118,
    typicalTime: '2 hr 45 min',
    highway: 'State Highway 88 via Kushalnagar',
    roadQuality: 'Scenic Ghat Highway'
  },
  {
    fromId: 'mysuru',
    toId: 'kabini',
    distanceKm: 75,
    typicalTime: '1 hr 50 min',
    highway: 'Mysuru-Mananthavadi Road',
    roadQuality: 'Standard State Highway'
  },
  {
    fromId: 'coorg',
    toId: 'kabini',
    distanceKm: 115,
    typicalTime: '2 hr 40 min',
    highway: 'Ghat Forest Corridor via Gonikoppal',
    roadQuality: 'Scenic Ghat Highway'
  },
  {
    fromId: 'bengaluru',
    toId: 'hampi',
    distanceKm: 340,
    typicalTime: '5 hr 45 min',
    highway: 'NH48 & NH50 via Chitradurga',
    roadQuality: 'Excellent Expressway'
  },
  {
    fromId: 'hampi',
    toId: 'badami',
    distanceKm: 138,
    typicalTime: '3 hr 10 min',
    highway: 'State Highway 14 via Ilkal & Guledgudda',
    roadQuality: 'Standard State Highway'
  },
  {
    fromId: 'bengaluru',
    toId: 'chikkamagaluru',
    distanceKm: 242,
    typicalTime: '4 hr 15 min',
    highway: 'NH75 via Hassan Bypass',
    roadQuality: 'Excellent Expressway'
  },
  {
    fromId: 'chikkamagaluru',
    toId: 'belur_halebeedu',
    distanceKm: 38,
    typicalTime: '45 min',
    highway: 'SH57 Coffee Belt Link',
    roadQuality: 'Standard State Highway'
  },
  {
    fromId: 'mangaluru',
    toId: 'udupi',
    distanceKm: 55,
    typicalTime: '1 hr 15 min',
    highway: 'NH66 Coastal Highway',
    roadQuality: 'Excellent Expressway'
  },
  {
    fromId: 'udupi',
    toId: 'gokarna',
    distanceKm: 178,
    typicalTime: '3 hr 30 min',
    highway: 'NH66 Arabian Coastal Corridor via Murudeshwar',
    roadQuality: 'Scenic Ghat Highway'
  },
  {
    fromId: 'shivamogga',
    toId: 'jogfalls',
    distanceKm: 102,
    typicalTime: '2 hr 15 min',
    highway: 'NH206 & Sagar Road',
    roadQuality: 'Scenic Ghat Highway'
  },
  {
    fromId: 'jogfalls',
    toId: 'gokarna',
    distanceKm: 88,
    typicalTime: '2 hr 10 min',
    highway: 'Ghat descent via Honnavar & NH66',
    roadQuality: 'Scenic Ghat Highway'
  }
];

export function getEstimatedCorridor(fromId: string, toId: string): RouteCorridor | null {
  const normFrom = fromId.toLowerCase();
  const normTo = toId.toLowerCase();

  const found = ROUTE_CORRIDORS.find(c => 
    (c.fromId === normFrom && c.toId === normTo) ||
    (c.fromId === normTo && c.toId === normFrom)
  );

  return found || null;
}
