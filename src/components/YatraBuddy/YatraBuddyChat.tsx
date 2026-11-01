import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  X, 
  Minimize2, 
  Maximize2, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  Volume2
} from 'lucide-react';
import { YatraBuddyService } from '../../services/yatraBuddyService';
import type { 
  YatraBuddyMessage, 
  YatraBuddyAction, 
  YatraBuddyLanguage, 
  YatraBuddyContext,
  Destination, 
  GeneratedItinerary, 
  TripBuilderPreferences 
} from '../../types';
import { getLocalizedDestination } from '../../i18n/translations';

interface YatraBuddyChatProps {
  itinerary: GeneratedItinerary | null;
  selectedDestination: Destination | null;
  savedDestinationIds: string[];
  destinations: Destination[];
  onUpdateBudgetPreferences?: (prefs: Partial<TripBuilderPreferences>) => void;
  onWizardSubmit?: (prefs: TripBuilderPreferences) => void;
  onReplaceDestination?: (oldId: string, newId: string) => void;
  onAddToItinerary?: (dest: Destination) => void;
  onSelectDestination?: (dest: Destination) => void;
  onOpenVoiceGuide?: (dest?: Destination) => void;
  onViewOnMap?: (dest: Destination) => void;
  onNavigate?: (view: 'home' | 'planner' | 'explore' | 'itinerary') => void;
  showToast: (msg: string) => void;
  currentLanguage?: string;
}

const QUICK_PROMPTS_EN = [
  'Make my trip cheaper.',
  'Find nature places nearby.',
  'Plan a family trip.',
  'I only have one day.',
  'Suggest local food.',
  'Replace this destination.'
];

const QUICK_PROMPTS_KN = [
  'ಬಜೆಟ್ ಕಡಿಮೆ ಮಾಡಿ.',
  'ಹತ್ತಿರದ ನಿಸರ್ಗ ತಾಣಗಳು.',
  'ಕುಟುಂಬ ಪ್ರವಾಸ ಯೋಜನೆ.',
  'ನನಗೆ ಒಂದೇ ದಿನ ಇದೆ.',
  'ಸ್ಥಳೀಯ ಆಹಾರ ಸಲಹೆ.',
  'ತಾಣ ಬದಲಾಯಿಸಿ.'
];

const QUICK_PROMPTS_HI = [
  'ट्रिप का बजट कम करें.',
  'आस-पास के प्राकृतिक स्थल.',
  'पारिवारिक यात्रा योजना.',
  'मेरे पास केवल 1 दिन है.',
  'स्थानीय प्रसिद्ध भोजन.',
  'यह स्थान बदलें.'
];

const QUICK_PROMPTS_TE = [
  'ట్రిప్ బడ్జెట్ తగ్గించండి.',
  'దగ్గరలోని ప్రకృతి దృశ్యాలు.',
  'కుటుంబ యాత్రా ప్లాన్.',
  'నాకు ఒక రోజు మాత్రమే ఉంది.',
  'స్థానిక ప్రసిద్ధ వంటకాలు.',
  'ఈ స్థలాన్ని మార్చండి.'
];

const QUICK_PROMPTS_TA = [
  'பயண செலவை குறைக்கவும்.',
  'அருகிலுள்ள இயற்கை இடங்கள்.',
  'குடும்ப சுற்றுலா திட்டம்.',
  'எனக்கு 1 நாள் மட்டுமே உள்ளது.',
  'உள்ளூர் சிறப்பு உணவு.',
  'இந்த இடத்தை மாற்றவும்.'
];

const QUICK_PROMPTS_ML = [
  'യാത്രാ ചിലവ് കുറയ്ക്കുക.',
  'സമീപത്തുള്ള പ്രകൃതിഭംഗിയുള്ള സ്ഥലങ്ങൾ.',
  'കുടുംബ യാത്രാ പദ്ധതി.',
  'എനിക്ക് 1 ദിവസം മാത്രമേ ഉള്ളൂ.',
  'നാടൻ ഭക്ഷണങ്ങൾ.',
  'ഈ സ്ഥലം മാറ്റുക.'
];

export const YatraBuddyChat: React.FC<YatraBuddyChatProps> = ({
  itinerary,
  selectedDestination,
  savedDestinationIds,
  destinations,
  onUpdateBudgetPreferences,
  onWizardSubmit,
  onReplaceDestination,
  onAddToItinerary,
  onSelectDestination,
  onOpenVoiceGuide,
  onViewOnMap,
  onNavigate,
  showToast,
  currentLanguage = 'en'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [language, setLanguage] = useState<YatraBuddyLanguage>(() => {
    return (['en', 'kn', 'hi', 'te', 'ta', 'ml'].includes(currentLanguage) ? currentLanguage : 'en') as YatraBuddyLanguage;
  });

  useEffect(() => {
    if (currentLanguage && ['en', 'kn', 'hi', 'te', 'ta', 'ml'].includes(currentLanguage)) {
      setLanguage(currentLanguage as YatraBuddyLanguage);
    }
  }, [currentLanguage]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechRecStop, setSpeechRecStop] = useState<(() => void) | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Initial welcome message
  const [messages, setMessages] = useState<YatraBuddyMessage[]>([
    {
      id: 'welcome_1',
      sender: 'buddy',
      text: `Namaskara! 🙏 I'm **Yatra Buddy**, your friendly AI travel assistant.

I can help you adjust your budget, explore hidden nature gems, plan family circuits, recommend authentic Karnataka food, and answer any questions about your journey!

Tap a quick prompt below or type your question:`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDemoFallback: true
    }
  ]);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, isMinimized]);

  // Cleanup speech recognition on unmount
  useEffect(() => {
    return () => {
      if (speechRecStop) {
        speechRecStop();
      }
    };
  }, [speechRecStop]);

  // Build real-time context
  const buildContext = (): YatraBuddyContext => ({
    currentLanguage: language,
    itinerary,
    selectedDestination,
    savedDestinationIds,
    destinations
  });

  // Handle sending a message
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMessage: YatraBuddyMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await YatraBuddyService.askBuddy(query, buildContext());
      setMessages(prev => [...prev, response]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'buddy',
          text: language === 'kn'
            ? 'ಕ್ಷಮಿಸಿ, ಸಂದೇಶ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುವಲ್ಲಿ ಸಣ್ಣ ಸಮಸ್ಯೆಯಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ.'
            : 'Sorry, I encountered an issue processing your request. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDemoFallback: true
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle quick prompt click
  const handleQuickPromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  // Toggle voice recognition
  const handleToggleVoiceInput = () => {
    if (isListening && speechRecStop) {
      speechRecStop();
      setIsListening(false);
      setSpeechRecStop(null);
      return;
    }

    setIsListening(true);
    const stopFn = YatraBuddyService.startSpeechRecognition(
      language,
      (transcript) => {
        setInputValue(transcript);
        setIsListening(false);
        setSpeechRecStop(null);
        handleSendMessage(transcript);
      },
      (err) => {
        setIsListening(false);
        setSpeechRecStop(null);
        showToast(err);
      }
    );

    setSpeechRecStop(() => stopFn.stop);
  };

  // Handle Action Button click
  const handleExecuteAction = (action: YatraBuddyAction) => {
    switch (action.type) {
      case 'make_cheaper':
        if (onUpdateBudgetPreferences && action.payload) {
          onUpdateBudgetPreferences(action.payload);
          showToast('⚡ Applied budget savings: switched to KSRTC transit & budget stays!');
        } else {
          showToast('Applied budget recommendations.');
        }
        break;

      case 'plan_family':
        if (onWizardSubmit && action.payload) {
          onWizardSubmit(action.payload);
          showToast('👨‍👩‍👧‍👦 Generated 3-Day Relaxed Family Heritage Circuit!');
        }
        break;

      case 'plan_one_day':
        if (onWizardSubmit && action.payload) {
          const payload = {
            interests: ['heritage', 'nature'],
            duration: '1-day',
            customDays: 1,
            budgetTier: 'comfortable',
            customBudgetAmount: 3500,
            budgetBasis: 'per_person',
            travelerType: 'solo',
            groupSize: 1,
            startingCity: 'bengaluru',
            isCustomCity: false,
            customCityName: '',
            startDate: '',
            endDate: '',
            transportPreference: 'cab_chauffeur',
            accommodationPreference: 'standard_hotel',
            accessibilityNeeds: [],
            pace: 'packed',
            ...action.payload
          };
          onWizardSubmit(payload as TripBuilderPreferences);
          showToast('📅 Generated 1-Day Express Itinerary!');
        }
        break;

      case 'replace_destination':
        if (onReplaceDestination && action.payload) {
          onReplaceDestination(action.payload.oldDestId, action.payload.newDestId);
          showToast('🔄 Swapped destination in itinerary!');
        }
        break;

      case 'add_destination':
        if (onAddToItinerary && action.payload) {
          onAddToItinerary(action.payload);
          showToast(`+ Added ${action.payload.name} to your itinerary!`);
        }
        break;

      case 'view_destination':
        if (onSelectDestination && action.payload) {
          onSelectDestination(action.payload);
        }
        break;

      case 'open_voice_guide':
        if (onOpenVoiceGuide) {
          onOpenVoiceGuide(action.payload);
        }
        break;

      case 'view_map':
        if (onViewOnMap && action.payload) {
          onViewOnMap(action.payload);
        }
        break;

      case 'navigate_planner':
        if (onNavigate) {
          onNavigate('planner');
        }
        break;

      default:
        showToast('Action processed.');
    }
  };

  // Toggle Language among 6 supported languages
  const handleToggleLanguage = (lang: YatraBuddyLanguage) => {
    setLanguage(lang);
    const greetingText = 
      lang === 'kn' ? `ನಮಸ್ಕಾರ! 🙏 ನಾನು **ಯಾತ್ರಾ ಬಡ್ಡೀ**, ನಿಮ್ಮ ಕರ್ನಾಟಕ ಪ್ರವಾಸದ ಸಹಾಯಕ.
ಬಜೆಟ್ ಕಡಿಮೆ ಮಾಡಲು, ಹೊಸ ನಿಸರ್ಗ ತಾಣಗಳನ್ನು ಅನ್ವೇಷಿಸಲು, ಅಥವಾ ಸ್ಥಳೀಯ ಆಹಾರದ ಬಗ್ಗೆ ತಿಳಿಯಲು ಕೆಳಗಿನ ಬಟನ್ ಒತ್ತಿ ಅಥವಾ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ:` :
      lang === 'hi' ? `नमस्ते! 🙏 मैं **यात्रा बडी** हूँ, आपका कर्नाटक टूर गाइड।
बजट कम करने, खूबसूरत प्राकृतिक स्थल देखने या भोजन के सुझाव के लिए नीचे टैप करें या सवाल पूछें:` :
      lang === 'te' ? `నమస్కారం! 🙏 నేను **యాత్రా బడ్డీని**, మీ కర్ణాటక ప్రయాణ మార్గదర్శిని.
బడ్జెట్ తగ్గించడానికి, ప్రకృతి అందాలను అన్వేషించడానికి లేదా ఆహార సలహాల కోసం ఏదైనా అడగండి:` :
      lang === 'ta' ? `வணக்கம்! 🙏 நான் **யாத்ரா படி**, உங்கள் கர்நாடக பயண வழிகாட்டி.
செலவை குறைக்க, இயற்கை இடங்களை பார்க்க அல்லது உணவு பரிந்துரைகளுக்கு கேள்வி கேட்கலாம்:` :
      lang === 'ml' ? `നമസ്കാരം! 🙏 ഞാൻ **യാത്രാ ബഡ്ഡി**, നിങ്ങളുടെ കർണാടക യാത്രാ സഹായി.
ചിലവ് കുറയ്ക്കാനും സുന്ദരമായ സ്ഥലങ്ങൾ അറിയാനും എന്നോട് ചോദിക്കൂ:` :
      `Namaskara! 🙏 I'm **Yatra Buddy**, your friendly AI travel companion.
Ask me anything or tap a quick prompt below to optimize your Karnataka journey:`;

    setMessages(prev => [
      ...prev,
      {
        id: `lang_switch_${Date.now()}`,
        sender: 'buddy',
        text: greetingText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDemoFallback: true
      }
    ]);
  };

  // Clear chat history
  const handleClearHistory = () => {
    setMessages([
      {
        id: `reset_${Date.now()}`,
        sender: 'buddy',
        text: language === 'kn'
          ? 'ಸಂಭಾಷಣೆಯನ್ನು ಮರುಹೊಂದಿಸಲಾಗಿದೆ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?'
          : 'Conversation cleared. How can I help you discover Karnataka today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isDemoFallback: true
      }
    ]);
    showToast('Yatra Buddy chat refreshed.');
  };

  return (
    <>
      {/* 1. FLOATING ASSISTANT BUTTON */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="group relative flex items-center space-x-3 px-4 py-3 rounded-full bg-gradient-to-r from-[#062A20] via-[#0B3B2C] to-[#114B3A] text-white border-2 border-amber-400 shadow-2xl hover:shadow-emerald-900/50 hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="Open Yatra Buddy Travel Assistant"
          >
            {/* Animated Pulsing Ring */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 to-emerald-400 opacity-40 blur-xs group-hover:opacity-75 animate-pulse transition duration-300"></span>

            <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-amber-400 text-slate-950 font-bold shadow-md">
              <Bot className="w-5 h-5 text-slate-900" />
            </div>

            <div className="relative text-left pr-1 hidden sm:block">
              <div className="flex items-center space-x-1.5">
                <span className="text-sm font-extrabold text-amber-300 tracking-tight">Yatra Buddy</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.2 rounded-full uppercase">AI</span>
              </div>
              <p className="text-[11px] text-emerald-200/90 font-medium">Ask Travel Questions</p>
            </div>
          </button>
        </div>
      )}

      {/* 2. CHAT PANEL MODAL / DRAWER */}
      {isOpen && (
        <div 
          className={`fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-50 transition-all duration-200 flex flex-col ${
            isMinimized 
              ? 'w-72 sm:w-80 h-16 rounded-2xl overflow-hidden shadow-xl border border-emerald-600/30' 
              : 'w-[94vw] sm:w-[410px] md:w-[440px] h-[85vh] max-h-[640px] rounded-3xl shadow-2xl border-2 border-emerald-600/40'
          } bg-[#FCFBF7] backdrop-blur-xl animate-in fade-in zoom-in-95`}
        >
          {/* A. HEADER */}
          <div className="bg-gradient-to-r from-[#062A20] via-[#0B3B2C] to-[#114B3A] text-white px-4 py-3 flex items-center justify-between shadow-md flex-shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="relative w-9 h-9 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-sm">
                <Bot className="w-5 h-5 text-slate-900" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#062A20] rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-extrabold text-sm text-amber-300 font-royal">
                    {language === 'kn' ? 'ಯಾತ್ರಾ ಬಡ್ಡೀ AI' : 'Yatra Buddy AI'}
                  </h3>
                  <span className="text-[9px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.2 rounded-full uppercase">
                    Live
                  </span>
                </div>
                <p className="text-[10px] text-emerald-200/80">
                  {language === 'kn' ? 'ನಿಮ್ಮ ಕರ್ನಾಟಕ ಪ್ರವಾಸ ಮಾರ್ಗದರ್ಶಿ' : 'Your Karnataka Travel Companion'}
                </p>
              </div>
            </div>

            {/* Header Right Controls: Language Selector, Minimize, Close */}
            <div className="flex items-center space-x-1.5">
              {/* Multilingual 6-Language Dropdown */}
              <select
                value={language}
                onChange={(e) => handleToggleLanguage(e.target.value as YatraBuddyLanguage)}
                className="bg-[#041E17] text-amber-300 text-xs font-bold rounded-lg px-2 py-1 border border-emerald-500/40 focus:outline-none cursor-pointer"
                title="Select Assistant Language"
              >
                <option value="en">English (EN)</option>
                <option value="kn">ಕನ್ನಡ (KN)</option>
                <option value="hi">हिन्दी (HI)</option>
                <option value="te">తెలుగు (TE)</option>
                <option value="ta">தமிழ் (TA)</option>
                <option value="ml">മലയാളം (ML)</option>
              </select>

              {/* Clear button */}
              <button
                onClick={handleClearHistory}
                className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition-colors"
                title="Restart conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Minimize/Maximize button */}
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition-colors"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* B. EXPANDED BODY */}
          {!isMinimized && (
            <>
              {/* Demo Mode / Offline Intelligence Banner */}
              <div className="bg-emerald-50 text-emerald-950 px-3.5 py-1.5 border-b border-emerald-100 flex items-center justify-between text-[11px] font-medium">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-emerald-800 font-semibold">
                    Local Intelligence & Rule Engine (Demo Mode)
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-normal">
                  Context-Aware
                </span>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1 animate-in fade-in slide-in-from-bottom-2`}
                    >
                      <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 px-1">
                        <span>{isUser ? 'You' : 'Yatra Buddy'}</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                        {msg.isDemoFallback && (
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1 rounded">
                            Verified Local AI
                          </span>
                        )}
                      </div>

                      <div 
                        className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-xs ${
                          isUser
                            ? 'bg-[#062A20] text-amber-200 rounded-tr-xs'
                            : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                        }`}
                      >
                        <div className="whitespace-pre-line space-y-1.5">
                          {msg.text}
                        </div>

                        {/* Embedded Destination Cards if any */}
                        {msg.suggestedDestinations && msg.suggestedDestinations.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                              Suggested Destinations:
                            </p>
                            <div className="space-y-1.5">
                              {msg.suggestedDestinations.map(d => (
                                <div 
                                  key={d.id}
                                  className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-300 transition-colors"
                                >
                                  <div className="flex items-center space-x-2">
                                    <img 
                                      src={d.heroImage} 
                                      alt={d.name} 
                                      className="w-10 h-10 rounded-lg object-cover" 
                                    />
                                    <div>
                                      <p className="font-bold text-xs text-slate-900">
                                        {language === 'en' ? d.name : getLocalizedDestination(d, language).name}
                                        {language !== 'en' && getLocalizedDestination(d, language).name !== d.name && (
                                          <span className="text-[10px] text-slate-500 font-normal ml-1">({d.name})</span>
                                        )}
                                      </p>
                                      <p className="text-[10px] text-slate-500">{getLocalizedDestination(d, language).district} • {d.estimatedBudget}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    {onSelectDestination && (
                                      <button
                                        onClick={() => onSelectDestination(d)}
                                        className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-bold hover:bg-emerald-200"
                                        title="View Details"
                                      >
                                        View
                                      </button>
                                    )}
                                    {onOpenVoiceGuide && (
                                      <button
                                        onClick={() => onOpenVoiceGuide(d)}
                                        className="p-1.5 rounded-lg bg-amber-400 text-slate-950 text-[10px] font-bold hover:bg-amber-300"
                                        title="Listen to Voice Guide"
                                      >
                                        <Volume2 className="w-3 h-3" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Embedded Action Buttons */}
                        {msg.actions && msg.actions.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                            {msg.actions.map(action => (
                              <button
                                key={action.id}
                                onClick={() => handleExecuteAction(action)}
                                className="inline-flex items-center px-3 py-1.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 hover:from-amber-300 hover:to-yellow-300 shadow-xs hover:shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                              >
                                <span>{action.label}</span>
                                <ArrowRight className="w-3 h-3 ml-1 text-slate-950" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center space-x-2 text-slate-400 text-xs px-2 animate-pulse">
                    <Bot className="w-4 h-4 text-emerald-600 animate-bounce" />
                    <span>{language === 'kn' ? 'ಯಾತ್ರಾ ಬಡ್ಡೀ ಯೋಚಿಸುತ್ತಿದೆ...' : 'Yatra Buddy is thinking...'}</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Strip */}
              <div className="px-3 py-2 bg-slate-50 border-t border-slate-200/80">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1.5">
                  <span className="flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>{language === 'kn' ? 'ತ್ವರಿತ ಪ್ರಾಂಪ್ಟ್‌ಗಳು:' : 'Quick Prompts:'}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {(
                    language === 'kn' ? QUICK_PROMPTS_KN :
                    language === 'hi' ? QUICK_PROMPTS_HI :
                    language === 'te' ? QUICK_PROMPTS_TE :
                    language === 'ta' ? QUICK_PROMPTS_TA :
                    language === 'ml' ? QUICK_PROMPTS_ML :
                    QUICK_PROMPTS_EN
                  ).map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickPromptClick(prompt)}
                      className="flex-shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 hover:border-emerald-300 shadow-2xs transition-all whitespace-nowrap"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* C. FOOTER INPUT BAR */}
              <div className="p-3 bg-white border-t border-slate-200">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center space-x-2"
                >
                  {/* Microphone Speech-To-Text Button */}
                  <button
                    type="button"
                    onClick={handleToggleVoiceInput}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isListening
                        ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                        : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border-slate-200'
                    }`}
                    title={isListening ? 'Listening... click to stop' : 'Tap to speak'}
                    aria-label="Microphone input"
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  {/* Text Input */}
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={
                        isListening
                          ? (language === 'kn' ? 'ಆಲಿಸಲಾಗುತ್ತಿದೆ... ಮಾತನಾಡಿ' : 'Listening... speak now')
                          : (language === 'kn' ? 'ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ...' : 'Ask Yatra Buddy anything...')
                      }
                      className="w-full pl-3 pr-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-[#062A20] to-[#0B3B2C] text-amber-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
