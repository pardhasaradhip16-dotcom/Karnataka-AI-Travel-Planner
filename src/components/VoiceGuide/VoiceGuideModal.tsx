import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Square, 
  Volume2, 
  Globe2, 
  Sparkles, 
  Mic, 
  MicOff, 
  Send, 
  Scroll, 
  Landmark, 
  BookOpen, 
  Compass, 
  ExternalLink, 
  Info,
  History
} from 'lucide-react';
import type { 
  Destination, 
  VoiceGuideLanguage, 
  NarrationMode 
} from '../../types';
import { 
  SUPPORTED_VOICE_LANGUAGES 
} from '../../data/voiceGuideData';
import { 
  VoiceGuideService, 
  type VoicePlayerStatus 
} from '../../services/voiceGuideService';
import { AudioWaveVisualizer } from './AudioWaveVisualizer';
import { getLocalizedDestination, t } from '../../i18n/translations';

interface VoiceGuideModalProps {
  destination: Destination | null;
  onClose: () => void;
  initialLanguage?: VoiceGuideLanguage;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'guide';
  text: string;
  category?: string;
  citation?: string;
  timestamp: string;
}

export const VoiceGuideModal: React.FC<VoiceGuideModalProps> = ({
  destination,
  onClose,
  initialLanguage = 'en'
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<VoiceGuideLanguage>(initialLanguage);
  const [voiceStatusMsg, setVoiceStatusMsg] = useState<string>('');
  const [isNativeVoiceAvailable, setIsNativeVoiceAvailable] = useState<boolean>(true);

  // Update Voice Status on Language Change
  const checkVoiceStatus = useCallback((lang: VoiceGuideLanguage) => {
    const match = VoiceGuideService.matchVoiceForLanguage(lang);
    setVoiceStatusMsg(match.statusMessage);
    setIsNativeVoiceAvailable(match.isNativeVoice);
  }, []);

  // Sync selectedLanguage immediately when destination opens or customer preferred language updates
  useEffect(() => {
    if (destination) {
      const validLang = ['en', 'kn', 'hi', 'te', 'ta', 'ml'].includes(initialLanguage)
        ? (initialLanguage as VoiceGuideLanguage)
        : 'en';
      setSelectedLanguage(validLang);
      checkVoiceStatus(validLang);
      setPlayerStatus('idle');
      setProgressPercent(0);
      setActiveSectionIndex(0);
    }
  }, [destination, initialLanguage, checkVoiceStatus]);

  const loc = destination ? getLocalizedDestination(destination, selectedLanguage) : null;
  const [narrationMode, setNarrationMode] = useState<NarrationMode>('standard');
  const [playerStatus, setPlayerStatus] = useState<VoicePlayerStatus>('idle');
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  
  // Follow-up Conversation State ("Ask About This Place")
  const [chatInput, setChatInput] = useState('');
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Initialize Voices on Mount
  useEffect(() => {
    VoiceGuideService.initVoices(() => {
      checkVoiceStatus(selectedLanguage);
    });
    checkVoiceStatus(selectedLanguage);

    return () => {
      // Ensure audio stops if modal closes
      VoiceGuideService.stop();
      VoiceGuideService.stopSpeechRecognition();
    };
  }, [checkVoiceStatus, selectedLanguage]);

  // Keyboard navigation and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        VoiceGuideService.stop();
        onClose();
      }
    };

    if (destination) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
      VoiceGuideService.stop();
    };
  }, [destination, onClose]);

  // Load Destination Voice Guide Data
  const voiceData = useMemo(() => {
    if (!destination) return null;
    return VoiceGuideService.getDestinationData(destination.id, selectedLanguage);
  }, [destination, selectedLanguage]);

  // Load Current Narration Script
  const currentScript = useMemo(() => {
    if (!destination) return null;
    return VoiceGuideService.getNarrationScript(destination.id, selectedLanguage, narrationMode);
  }, [destination, selectedLanguage, narrationMode]);

  // Handle Language Switching
  const handleLanguageChange = (lang: VoiceGuideLanguage) => {
    if (playerStatus === 'speaking' || playerStatus === 'paused') {
      VoiceGuideService.stop();
    }
    setPlayerStatus('idle');
    setProgressPercent(0);
    setActiveSectionIndex(0);
    setSelectedLanguage(lang);
    checkVoiceStatus(lang);
  };

  // Handle Narration Mode Switching
  const handleModeChange = (mode: NarrationMode) => {
    if (playerStatus === 'speaking' || playerStatus === 'paused') {
      VoiceGuideService.stop();
    }
    setPlayerStatus('idle');
    setProgressPercent(0);
    setActiveSectionIndex(0);
    setNarrationMode(mode);
  };

  // Playback Control: Play or Resume
  const handlePlay = () => {
    if (!currentScript) return;

    if (playerStatus === 'paused') {
      VoiceGuideService.resume();
      setPlayerStatus('speaking');
      return;
    }

    setPlayerStatus('speaking');
    VoiceGuideService.speak({
      text: currentScript.fullText,
      language: selectedLanguage,
      rate: playbackRate,
      onStart: () => {
        setPlayerStatus('speaking');
      },
      onBoundary: (charIndex, textLength) => {
        const pct = Math.min(100, Math.round((charIndex / textLength) * 100));
        setProgressPercent(pct);

        // Find active section
        if (currentScript.sections && currentScript.sections.length > 0) {
          let currentIdx = 0;
          for (let i = 0; i < currentScript.sections.length; i++) {
            if (pct >= currentScript.sections[i].startPercent) {
              currentIdx = i;
            }
          }
          setActiveSectionIndex(currentIdx);
        }
      },
      onEnd: () => {
        setPlayerStatus('completed');
        setProgressPercent(100);
      },
      onError: (err) => {
        console.warn('Speech playback message:', err);
        setPlayerStatus('idle');
      }
    });
  };

  // Playback Control: Pause
  const handlePause = () => {
    VoiceGuideService.pause();
    setPlayerStatus('paused');
  };

  // Playback Control: Stop
  const handleStop = () => {
    VoiceGuideService.stop();
    setPlayerStatus('idle');
    setProgressPercent(0);
    setActiveSectionIndex(0);
  };

  // Playback Control: Restart
  const handleRestart = () => {
    handleStop();
    setTimeout(() => {
      handlePlay();
    }, 150);
  };

  // Speed Control
  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (playerStatus === 'speaking') {
      // Re-trigger with new speed from current section
      handlePlay();
    }
  };

  // Play a specific section directly
  const handlePlaySection = (sectionIndex: number) => {
    if (!currentScript || !currentScript.sections[sectionIndex]) return;
    setActiveSectionIndex(sectionIndex);
    const section = currentScript.sections[sectionIndex];
    setPlayerStatus('speaking');
    VoiceGuideService.speak({
      text: `${section.title}. ${section.text}`,
      language: selectedLanguage,
      rate: playbackRate,
      onEnd: () => {
        setPlayerStatus('idle');
      }
    });
  };

  // Conversation Mode: Send Question
  const handleSendQuestion = (textToSend?: string) => {
    const query = (textToSend || chatInput).trim();
    if (!query || !destination) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    // Query Answering Engine
    const ans = VoiceGuideService.answerQuestion(destination.id, query, selectedLanguage);

    setTimeout(() => {
      const guideMsg: ChatMessage = {
        id: `g-${Date.now()}`,
        sender: 'guide',
        text: ans.answerText,
        category: ans.category,
        citation: ans.sourceCitation,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, guideMsg]);
      setTimeout(() => {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

      // Automatically speak the answer in customer's preferred language
      VoiceGuideService.speak({
        text: ans.answerText,
        language: selectedLanguage,
        rate: playbackRate
      });
    }, 400);
  };

  // Read message aloud
  const handleSpeakAnswer = (text: string) => {
    VoiceGuideService.speak({
      text,
      language: selectedLanguage,
      rate: playbackRate
    });
  };

  // Toggle Voice Input (Mic)
  const handleToggleMic = () => {
    if (isListeningMic) {
      VoiceGuideService.stopSpeechRecognition();
      setIsListeningMic(false);
      return;
    }

    if (!VoiceGuideService.isSpeechRecognitionSupported()) {
      alert(t('vg_speech_not_supported', selectedLanguage));
      return;
    }

    setIsListeningMic(true);
    VoiceGuideService.startSpeechRecognition({
      language: selectedLanguage,
      onResult: (transcript) => {
        setIsListeningMic(false);
        setChatInput(transcript);
        handleSendQuestion(transcript);
      },
      onError: (err) => {
        setIsListeningMic(false);
        console.warn(err);
      },
      onEnd: () => {
        setIsListeningMic(false);
      }
    });
  };

  if (!destination || !voiceData || !currentScript) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-guide-title"
    >
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-900/30 my-6 flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* =========================================================================
            HEADER BANNER WITH DESTINATION HERO & VOICE GUIDE BRANDING
           ========================================================================= */}
        <div className="relative h-48 sm:h-56 w-full bg-[#062A20] flex-shrink-0 overflow-hidden">
          <img
            src={destination.heroImage}
            alt={destination.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = destination.fallbackImage;
            }}
            className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#062A20] via-[#062A20]/80 to-transparent" />

          {/* Top Close Button */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => {
                VoiceGuideService.stop();
                onClose();
              }}
              className="w-11 h-11 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-colors"
              aria-label="Close Voice Guide"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Branding & Destination Info */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider mb-2">
                <Mic className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
                <span>{t('vg_modal_title', selectedLanguage)}</span>
              </div>

              <div className="flex items-baseline space-x-3 flex-wrap">
                <h2 id="voice-guide-title" className="text-2xl sm:text-4xl font-extrabold text-white font-royal tracking-wide">
                  {selectedLanguage === 'en' ? destination.name : (loc?.name || destination.name)}
                </h2>
                {selectedLanguage !== 'en' && loc?.name !== destination.name && (
                  <span className="text-amber-200 text-base sm:text-xl font-semibold">
                    ({destination.name})
                  </span>
                )}
                <span className="text-amber-300 text-lg sm:text-2xl font-bold">
                  {destination.kannadaName}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-emerald-200/90 mt-0.5">
                {loc?.district || destination.district} District • {destination.region}
              </p>
            </div>

            {/* Audio Wave Badge */}
            <div className="bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-emerald-500/30 flex items-center space-x-3 self-start sm:self-auto">
              <AudioWaveVisualizer 
                isSpeaking={playerStatus === 'speaking'} 
                isPaused={playerStatus === 'paused'}
                barCount={10}
                heightClass="h-6"
              />
              <span className="text-xs font-bold text-amber-300">
                {playerStatus === 'speaking' ? t('vg_speaking', selectedLanguage) : playerStatus === 'paused' ? t('vg_paused', selectedLanguage) : currentScript.estimatedDuration}
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            LANGUAGE & NARRATION MODE SELECTOR BAR
           ========================================================================= */}
        <div className="bg-[#0B3B2C] text-white p-3 sm:px-6 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-emerald-800">
          
          {/* 6 Native Languages Selector */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-xs font-bold uppercase text-amber-300 flex items-center space-x-1 whitespace-nowrap">
              <Globe2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('vg_language_label', selectedLanguage)}:</span>
            </span>

            <div className="flex items-center space-x-1.5">
              {SUPPORTED_VOICE_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 whitespace-nowrap ${
                    selectedLanguage === lang.code
                      ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-white/50'
                      : 'bg-emerald-950/70 text-emerald-100 hover:bg-emerald-900 border border-emerald-700/50'
                  }`}
                  aria-label={`Select narration language ${lang.englishLabel}`}
                >
                  <span className="text-sm">{lang.nativeName}</span>
                  <span className="text-[10px] opacity-75 font-normal">({lang.englishLabel})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tour Length Mode (Quick, Standard, Deep History) */}
          <div className="flex items-center space-x-1.5 self-end md:self-auto">
            <span className="text-xs text-emerald-200 hidden lg:inline">{t('vg_tour_label', selectedLanguage)}:</span>
            <button
              onClick={() => handleModeChange('quick')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                narrationMode === 'quick'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              {t('vg_mode_quick', selectedLanguage)}
            </button>
            <button
              onClick={() => handleModeChange('standard')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                narrationMode === 'standard'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              {t('vg_mode_standard', selectedLanguage)}
            </button>
            <button
              onClick={() => handleModeChange('deep_history')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                narrationMode === 'deep_history'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              {t('vg_mode_deep', selectedLanguage)}
            </button>
          </div>
        </div>

        {/* =========================================================================
            VOICE ENGINE STATUS & TRANSPARENCY NOTICE
           ========================================================================= */}
        {voiceStatusMsg && (
          <div className={`px-4 sm:px-6 py-2 text-xs flex items-center justify-between border-b ${
            isNativeVoiceAvailable 
              ? 'bg-emerald-50 text-emerald-900 border-emerald-100' 
              : 'bg-amber-50 text-amber-950 border-amber-200'
          }`}>
            <div className="flex items-center space-x-2">
              <Info className={`w-3.5 h-3.5 flex-shrink-0 ${isNativeVoiceAvailable ? 'text-emerald-700' : 'text-amber-600'}`} />
              <span className="leading-tight">{voiceStatusMsg}</span>
            </div>
            <span className="text-[10px] font-semibold opacity-80 hidden sm:inline">
              SpeechSynthesis Web API v2
            </span>
          </div>
        )}

        {/* =========================================================================
            MODAL SCROLLABLE CONTENT AREA
           ========================================================================= */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#FCFBF7]">
          
          {/* =======================================================================
              PLAYER CONTROLLER DASHBOARD
             ======================================================================= */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-md">
            
            {/* Top row: Status, Wave, and Timer */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-emerald-800" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {currentScript.languageNativeName} {t('vg_voice_tour', selectedLanguage)}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {narrationMode === 'quick' ? t('vg_quick_overview', selectedLanguage) : narrationMode === 'standard' ? t('vg_standard_guide', selectedLanguage) : t('vg_deep_history_title', selectedLanguage)}
                  </p>
                </div>
              </div>

              {/* Playback Speed Controls */}
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
                {[0.75, 1.0, 1.25].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      playbackRate === speed
                        ? 'bg-white text-[#062A20] shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1 mb-5">
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-600 to-amber-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>{progressPercent}{t('vg_complete_pct', selectedLanguage)}</span>
                <span>{t('vg_target_duration', selectedLanguage)}{currentScript.estimatedDuration}</span>
              </div>
            </div>

            {/* Big Accessible Controls Bar */}
            <div className="flex items-center justify-center space-x-3 sm:space-x-4">
              {/* Restart Button */}
              <button
                type="button"
                onClick={handleRestart}
                className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-2xs"
                title="Restart narration from beginning"
                aria-label="Restart audio tour"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              {/* Main Play / Pause Button */}
              {playerStatus === 'speaking' ? (
                <button
                  type="button"
                  onClick={handlePause}
                  className="px-8 py-3.5 rounded-2xl font-extrabold text-base bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg flex items-center space-x-2 transition-all transform active:scale-95"
                  aria-label="Pause narration"
                >
                  <Pause className="w-6 h-6 fill-current" />
                  <span>{t('vg_btn_pause', selectedLanguage)}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePlay}
                  className="px-8 py-3.5 rounded-2xl font-extrabold text-base bg-[#062A20] hover:bg-[#0B3B2C] text-amber-300 shadow-lg flex items-center space-x-2 transition-all transform active:scale-95 ring-2 ring-emerald-500/40"
                  aria-label="Play narration"
                >
                  <Play className="w-6 h-6 fill-current text-amber-400" />
                  <span>{playerStatus === 'paused' ? t('vg_btn_resume', selectedLanguage) : t('vg_btn_play', selectedLanguage)}</span>
                </button>
              )}

              {/* Stop Button */}
              <button
                type="button"
                onClick={handleStop}
                className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 flex items-center justify-center transition-colors shadow-2xs"
                title="Stop narration"
                aria-label="Stop audio tour"
              >
                <Square className="w-5 h-5" />
              </button>
            </div>

          </div>

          {/* =======================================================================
              SYNCHRONIZED TRANSCRIPT WITH SECTION TRACKING
             ======================================================================= */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#062A20] font-royal flex items-center space-x-2">
                <Scroll className="w-4 h-4 text-emerald-700" />
                <span>{t('vg_transcript_title', selectedLanguage)} ({currentScript.languageNativeName})</span>
              </h3>
              <span className="text-xs text-slate-500">
                {t('vg_transcript_hint', selectedLanguage)}
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {currentScript.sections.map((section, idx) => {
                const isActive = activeSectionIndex === idx && playerStatus === 'speaking';
                return (
                  <div
                    key={idx}
                    onClick={() => handlePlaySection(idx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-50/90 border-amber-300 shadow-sm ring-1 ring-amber-400/50'
                        : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        isActive ? 'text-amber-900' : 'text-slate-600'
                      }`}>
                        {t('vg_section', selectedLanguage)} {idx + 1}: {section.title}
                      </span>
                      {isActive && (
                        <span className="text-[10px] bg-amber-400 text-slate-950 font-extrabold px-2 py-0.5 rounded-full flex items-center space-x-1">
                          <Volume2 className="w-3 h-3" />
                          <span>{t('vg_now_playing', selectedLanguage)}</span>
                        </span>
                      )}
                    </div>
                    <p className={`text-sm leading-relaxed ${
                      isActive ? 'text-slate-900 font-medium' : 'text-slate-700'
                    }`}>
                      {section.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =======================================================================
              INTERACTIVE HISTORICAL TIMELINE
             ======================================================================= */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[#062A20] font-royal flex items-center space-x-2">
              <History className="w-5 h-5 text-amber-600" />
              <span>{t('vg_timeline_title', selectedLanguage)}</span>
            </h3>

            <div className="relative pl-6 border-l-2 border-emerald-600/40 space-y-6 pt-2">
              {voiceData.historicalTimeline.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Pin Dot */}
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-700 border-2 border-white shadow-sm" />

                  <div className="bg-[#FCFBF7] p-4 rounded-2xl border border-slate-200">
                    <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                      <span className="text-xs font-extrabold text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-md">
                        {item.yearOrEra}
                      </span>
                      <span className="text-xs font-semibold text-slate-600">
                        {item.rulerOrDynasty}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm mt-1">
                      {item.event}
                    </h4>

                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.details}
                    </p>

                    <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center space-x-1.5 text-[11px] text-emerald-800 font-semibold">
                      <span>{t('vg_documented_badge', selectedLanguage)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =======================================================================
              ARCHITECTURE HIGHLIGHTS & DISTINCTIVE FEATURES
             ======================================================================= */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-[#062A20] font-royal flex items-center space-x-2">
              <Landmark className="w-5 h-5 text-emerald-700" />
              <span>{t('vg_architecture_title', selectedLanguage)}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {voiceData.architectureHighlights.map((arch, idx) => (
                <div key={idx} className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                    {arch.periodOrStyle}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {arch.feature}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {arch.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* =======================================================================
              DOCUMENTED HISTORY VS FOLKLORE & LEGENDS
             ======================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Documented History */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <h4 className="font-bold text-emerald-950 text-sm flex items-center space-x-1.5">
                <Scroll className="w-4 h-4 text-emerald-700" />
                <span>{t('vg_facts_title', selectedLanguage)}</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600">
                {voiceData.documentedHistoryFacts.map((fact, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Folklore and Traditional Lore */}
            <div className="bg-amber-50/60 p-5 rounded-3xl border border-amber-200 shadow-sm space-y-2">
              <h4 className="font-bold text-amber-950 text-sm flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{t('vg_folklore_title', selectedLanguage)}</span>
              </h4>
              <ul className="space-y-2 text-xs text-amber-900/90">
                {voiceData.folkloreAndLegends.map((legend, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-amber-600 font-bold">✦</span>
                    <span>{legend}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* =======================================================================
              "ASK ABOUT THIS PLACE" — INTERACTIVE FOLLOW-UP CONVERSATION
             ======================================================================= */}
          <div className="bg-gradient-to-br from-[#062A20] to-[#041B14] rounded-3xl p-5 sm:p-6 text-white shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white font-royal flex items-center space-x-2">
                  <Compass className="w-5 h-5 text-amber-400" />
                  <span>{t('vg_ask_title', selectedLanguage).replace('{name}', loc?.name || destination.name)}</span>
                </h3>
                <p className="text-xs text-emerald-200/90 mt-0.5">
                  {t('vg_ask_subtitle', selectedLanguage)}
                </p>
              </div>

              <div className="text-xs text-amber-300 font-semibold bg-white/10 px-2.5 py-1 rounded-xl">
                {t('vg_ai_guide_badge', selectedLanguage)}
              </div>
            </div>

            {/* Suggested Question Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                t('vg_suggested_q1', selectedLanguage),
                t('vg_suggested_q2', selectedLanguage),
                t('vg_suggested_q3', selectedLanguage),
                t('vg_suggested_q4', selectedLanguage)
              ].map((suggestion, sIdx) => (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => handleSendQuestion(suggestion)}
                  className="bg-white/10 hover:bg-white/20 text-emerald-100 text-xs px-3 py-1.5 rounded-xl border border-white/15 transition-all text-left"
                >
                  💬 {suggestion}
                </button>
              ))}
            </div>

            {/* Chat Messages Feed */}
            {chatMessages.length > 0 && (
              <div className="max-h-60 overflow-y-auto space-y-3 bg-black/30 p-4 rounded-2xl border border-white/10">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-400 text-slate-950 font-semibold'
                        : 'bg-emerald-950/90 text-emerald-100 border border-emerald-500/30'
                    }`}>
                      <p>{msg.text}</p>
                      {msg.citation && (
                        <p className="mt-1 text-[10px] text-amber-300 opacity-80 border-t border-white/20 pt-1">
                          Source: {msg.citation}
                        </p>
                      )}
                    </div>
                    {msg.sender === 'guide' && (
                      <button
                        onClick={() => handleSpeakAnswer(msg.text)}
                        className="mt-1 text-[11px] text-amber-300 hover:text-white flex items-center space-x-1"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>{selectedLanguage === 'kn' ? 'ಧ್ವನಿಯಲ್ಲಿ ಆಲಿಸಿ' : selectedLanguage === 'te' ? 'వినండి' : selectedLanguage === 'hi' ? 'सुनें' : selectedLanguage === 'ta' ? 'கேட்கவும்' : selectedLanguage === 'ml' ? 'കേൾക്കുക' : 'Read Aloud'}</span>
                      </button>
                    )}
                  </div>
                ))}
                <div ref={chatBottomRef} />
              </div>
            )}

            {/* Chat Input Box */}
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendQuestion()}
                placeholder={t('vg_ask_placeholder', selectedLanguage).replace('{name}', loc?.name || destination.name)}
                className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-emerald-300/60 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />

              {/* Voice Mic Input Toggle */}
              <button
                type="button"
                onClick={handleToggleMic}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                  isListeningMic 
                    ? 'bg-rose-500 text-white animate-pulse' 
                    : 'bg-white/10 hover:bg-white/20 text-amber-300 border border-white/20'
                }`}
                title={isListeningMic ? "Listening... click to stop" : "Speak your question"}
              >
                {isListeningMic ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              {/* Send Button */}
              <button
                type="button"
                onClick={() => handleSendQuestion()}
                disabled={!chatInput.trim()}
                className="w-11 h-11 rounded-2xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 flex items-center justify-center font-bold transition-all"
                aria-label="Send question"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* =======================================================================
              HISTORICAL SOURCES & FURTHER READING PANEL
             ======================================================================= */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-3">
            <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>Historical Sources & Academic Citations</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {voiceData.sourcesAndReferences.map((src, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900">{src.title}</div>
                  <div className="text-emerald-800 font-semibold text-[11px] mt-0.5">{src.authority}</div>
                  <p className="text-slate-600 text-[11px] mt-1">{src.description}</p>
                  {src.url && (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-emerald-700 font-bold text-[11px] mt-2 hover:underline"
                    >
                      <span>Official Reference</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* =========================================================================
            MODAL FOOTER
           ========================================================================= */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Language: </span>
            <span>{currentScript.languageNativeName} ({selectedLanguage.toUpperCase()})</span>
            <span className="mx-2">•</span>
            <span className="font-semibold text-slate-700">Tour Mode: </span>
            <span className="capitalize">{narrationMode.replace('_', ' ')}</span>
          </div>

          <button
            onClick={() => {
              VoiceGuideService.stop();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl font-bold text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
