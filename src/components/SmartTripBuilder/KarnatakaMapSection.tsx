import React, { useState } from 'react';
import { 
  Navigation, 
  Info, 
  Compass 
} from 'lucide-react';
import type { GeneratedItinerary, Destination } from '../../types';

interface KarnatakaMapSectionProps {
  itinerary: GeneratedItinerary;
  onSelectDestination: (dest: Destination) => void;
}

// Karnataka geographic boundary box for normalization
const KARNATAKA_BOUNDS = {
  minLat: 11.5,
  maxLat: 18.5,
  minLng: 74.0,
  maxLng: 78.6
};

export const KarnatakaMapSection: React.FC<KarnatakaMapSectionProps> = ({
  itinerary,
  onSelectDestination
}) => {
  const [activePinId, setActivePinId] = useState<string | null>(null);
  const [mapStyle, setMapStyle] = useState<'topography' | 'clean'>('topography');

  // Convert lat/lng to SVG percentage coordinates (0 to 100)
  const projectCoords = (lat: number, lng: number) => {
    // Latitude goes North to South (invert for SVG Y: 0 is top)
    const y = ((KARNATAKA_BOUNDS.maxLat - lat) / (KARNATAKA_BOUNDS.maxLat - KARNATAKA_BOUNDS.minLat)) * 82 + 9;
    // Longitude goes West to East (SVG X)
    const x = ((lng - KARNATAKA_BOUNDS.minLng) / (KARNATAKA_BOUNDS.maxLng - KARNATAKA_BOUNDS.minLng)) * 82 + 9;
    return { x: Math.max(8, Math.min(92, x)), y: Math.max(8, Math.min(92, y)) };
  };

  const startCoords = projectCoords(itinerary.startingCoordinates.lat, itinerary.startingCoordinates.lng);

  // Project destination coordinates
  const stops = itinerary.destinationsCovered.map((dest, idx) => ({
    destination: dest,
    order: idx + 1,
    ...projectCoords(dest.coordinates.lat, dest.coordinates.lng)
  }));

  // Build SVG path data connecting starting location to stops
  const allPoints = [{ x: startCoords.x, y: startCoords.y }, ...stops.map(s => ({ x: s.x, y: s.y }))];
  const polylinePath = allPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-md mb-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Compass className="w-4 h-4 text-emerald-700" />
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-royal text-[#062A20]">
              Karnataka Route Corridor Map
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Visualizing travel path from <span className="font-semibold text-emerald-800">{itinerary.startingLocation}</span> across {itinerary.destinationsCovered.length} destination regions.
          </p>
        </div>

        {/* Style switch */}
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-700">
            <button
              onClick={() => setMapStyle('topography')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                mapStyle === 'topography' ? 'bg-[#062A20] text-amber-300 shadow-2xs font-bold' : 'hover:text-slate-900'
              }`}
            >
              Forest & Ghats
            </button>
            <button
              onClick={() => setMapStyle('clean')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                mapStyle === 'clean' ? 'bg-[#062A20] text-amber-300 shadow-2xs font-bold' : 'hover:text-slate-900'
              }`}
            >
              Schematic
            </button>
          </div>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="relative mt-6 w-full h-[380px] sm:h-[460px] rounded-2xl overflow-hidden border border-slate-200 bg-[#0B2E24] shadow-inner select-none">
        
        {/* Subtle Map Topographic Background */}
        <div 
          className={`absolute inset-0 transition-opacity duration-300 ${
            mapStyle === 'topography' ? 'opacity-35' : 'opacity-15'
          }`}
          style={{
            backgroundImage: `radial-gradient(circle at 30% 60%, rgba(16, 185, 129, 0.4) 0%, transparent 60%),
                              radial-gradient(circle at 70% 30%, rgba(245, 158, 11, 0.25) 0%, transparent 50%),
                              linear-gradient(135deg, #062A20 0%, #041D16 100%)`
          }}
        />

        {/* Arabian Sea Coastal Indicator on Left */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs font-bold tracking-widest text-cyan-400/40 uppercase transform -rotate-90 origin-center pointer-events-none">
          ≈ Arabian Sea (Karavali Coast) ≈
        </div>

        {/* Deccan Plateau Indicator on Right */}
        <div className="absolute right-3 top-1/3 text-[10px] sm:text-xs font-bold tracking-widest text-amber-400/30 uppercase transform rotate-90 origin-center pointer-events-none">
          Deccan Plateau (North Karnataka)
        </div>

        {/* Western Ghats Indicator in Center-South */}
        <div className="absolute left-1/4 bottom-1/4 text-[10px] sm:text-xs font-bold tracking-wider text-emerald-300/40 uppercase pointer-events-none">
          ▲ Sahyadri Western Ghats ▲
        </div>

        {/* SVG Vector Layer for Routes & Corridors */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full absolute inset-0 pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Glowing Route Line */}
          <polyline
            points={polylinePath}
            fill="none"
            stroke="rgba(251, 191, 36, 0.4)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />

          <polyline
            points={polylinePath}
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="0.8"
            strokeDasharray="2, 1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Starting Location Pin */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group"
          style={{ left: `${startCoords.x}%`, top: `${startCoords.y}%` }}
        >
          <div className="w-6 h-6 rounded-full bg-amber-400 border-2 border-white text-slate-950 flex items-center justify-center font-bold text-[10px] shadow-lg animate-bounce">
            ★
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 bg-black/85 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-amber-300 whitespace-nowrap font-bold shadow-md border border-amber-400/30">
            Start: {itinerary.startingLocation}
          </div>
        </div>

        {/* Destination Pins */}
        {stops.map((stop) => {
          const isHovered = activePinId === stop.destination.id;

          return (
            <div
              key={stop.destination.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer"
              style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
              onMouseEnter={() => setActivePinId(stop.destination.id)}
              onMouseLeave={() => setActivePinId(null)}
              onClick={() => onSelectDestination(stop.destination)}
            >
              {/* Pulsing ring on active */}
              {isHovered && (
                <div className="absolute inset-0 w-8 h-8 -left-1 -top-1 rounded-full bg-emerald-400 animate-ping opacity-60" />
              )}

              {/* Pin Head */}
              <div className={`relative w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs shadow-xl transition-transform transform hover:scale-125 border-2 ${
                isHovered
                  ? 'bg-amber-400 text-slate-950 border-white ring-4 ring-amber-400/40'
                  : 'bg-emerald-600 text-white border-amber-300'
              }`}>
                {stop.order}
              </div>

              {/* Pin Badge Tooltip */}
              <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-1.5 transition-all ${
                isHovered ? 'scale-105 z-40' : 'opacity-90'
              }`}>
                <div className="bg-[#041D16]/95 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-xl border border-emerald-500/40 text-center whitespace-nowrap">
                  <span className="text-[11px] font-bold text-white block">
                    {stop.destination.name}
                  </span>
                  <span className="text-[10px] text-amber-300 block font-normal">
                    {stop.destination.kannadaName}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Map Legend Overlay */}
        <div className="absolute bottom-3 left-3 bg-[#041D16]/90 backdrop-blur-md p-3 rounded-2xl border border-emerald-500/30 text-[11px] text-slate-200 space-y-1.5 z-20 shadow-lg">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-amber-400 border border-white"></span>
            <span>Origin: {itinerary.startingLocation}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-emerald-600 border border-amber-300"></span>
            <span>Sequential Itinerary Stops (1, 2, 3...)</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-300">
            <Navigation className="w-3.5 h-3.5 text-amber-400" />
            <span>Optimal Road Corridors ({itinerary.transportLabel})</span>
          </div>
        </div>

        {/* Click to open note */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-[10px] text-emerald-200">
          💡 Click any destination pin to view detailed guide
        </div>

      </div>

      {/* Corridor Summary Strip */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-900">Total Circuit Reach:</span>
          <span>{itinerary.destinationsCovered.map(d => d.name).join(' ➔ ')}</span>
        </div>
        <div className="text-emerald-800 font-semibold flex items-center space-x-1">
          <Info className="w-3.5 h-3.5 text-emerald-700" />
          <span>Calculated considering Western Ghat road conditions & state highway limits.</span>
        </div>
      </div>

    </div>
  );
};
