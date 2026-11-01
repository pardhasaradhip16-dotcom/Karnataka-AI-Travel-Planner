import React from 'react';

interface AudioWaveVisualizerProps {
  isSpeaking: boolean;
  isPaused: boolean;
  barCount?: number;
  heightClass?: string;
}

export const AudioWaveVisualizer: React.FC<AudioWaveVisualizerProps> = ({
  isSpeaking,
  isPaused,
  barCount = 12,
  heightClass = 'h-8'
}) => {
  // Pre-calculated heights for natural wave contour
  const baseHeights = [35, 60, 85, 100, 75, 45, 90, 65, 80, 50, 95, 40];

  return (
    <div 
      className={`flex items-center space-x-1 ${heightClass} px-1`}
      role="status"
      aria-label={isSpeaking ? "Audio narration active" : isPaused ? "Audio narration paused" : "Audio narration idle"}
    >
      {Array.from({ length: barCount }).map((_, index) => {
        const heightPct = baseHeights[index % baseHeights.length];
        const animationDelay = `${(index * 0.12).toFixed(2)}s`;
        const animationDuration = `${(0.7 + (index % 3) * 0.25).toFixed(2)}s`;

        return (
          <span
            key={index}
            className={`w-1 rounded-full transition-all duration-300 ${
              isSpeaking
                ? 'bg-amber-400 animate-pulse'
                : isPaused
                ? 'bg-amber-600/60'
                : 'bg-emerald-900/40'
            }`}
            style={{
              height: isSpeaking ? `${heightPct}%` : isPaused ? '30%' : '15%',
              animationDuration: isSpeaking ? animationDuration : '0s',
              animationDelay: isSpeaking ? animationDelay : '0s'
            }}
          />
        );
      })}
    </div>
  );
};
