import React, { useState } from 'react';
import { 
  Sparkles, 
  Sliders, 
  Navigation, 
  ArrowRight
} from 'lucide-react';

interface HowItWorksProps {
  onStartPlanning: () => void;
  currentLanguage?: string;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartPlanning, currentLanguage = 'en' }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const isKn = currentLanguage === 'kn';
  const isTe = currentLanguage === 'te';
  const isHi = currentLanguage === 'hi';
  const isTa = currentLanguage === 'ta';
  const isMl = currentLanguage === 'ml';

  const steps = [
    {
      step: 1,
      number: '01',
      title: 'Choose Your Preferences',
      kannadaTitle: 'ನಿಮ್ಮ ಆದ್ಯತೆಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      subtitle: 'Tell us your vibe, travel group, and comfortable budget.',
      description: 'Select whether you prefer peaceful Western Ghat coffee estates, ancient Vijayanagara boulder ruins, coastal beach shacks, or tiger reserves. Define your pace and budget.',
      icon: Sliders,
      badge: 'Step 1: Simple Inputs',
      previewDetails: {
        vibe: 'Coffee & Heritage Circuit',
        group: 'Family with Elders',
        duration: '4 Days / 3 Nights',
        budget: 'Comfort (₹3,000/day)'
      }
    },
    {
      step: 2,
      number: '02',
      title: 'Generate Your Journey',
      kannadaTitle: 'ಪ್ರವಾಸ ಯೋಜನೆಯನ್ನು ರಚಿಸಿ',
      subtitle: 'Intelligent sequencing adapted to topography & temple timings.',
      description: 'Our AI considers real Karnataka road conditions, ghat travel times, temple darshan windows, and seasonal weather to prevent rushed travel and fatigue.',
      icon: Sparkles,
      badge: 'Step 2: AI Sequencing',
      previewDetails: {
        algorithm: 'Western Ghat Topography Aware',
        darshanOptimized: 'Chamundi Hill morning slot',
        trafficAdjustment: 'Shiradi Ghat route factored',
        stops: 'Mysuru ➔ Coorg ➔ Belur'
      }
    },
    {
      step: 3,
      number: '03',
      title: 'Explore Karnataka',
      kannadaTitle: 'ಕರ್ನಾಟಕವನ್ನು ಅನ್ವೇಷಿಸಿ',
      subtitle: 'Clear day-by-day guidance with authentic local food stops.',
      description: 'Receive an easy-to-read, step-by-step travel companion with verified contact numbers, authentic local breakfast spots (like Mylari dosa), and 24x7 tourist police helpline support.',
      icon: Navigation,
      badge: 'Step 3: Stress-Free Travel',
      previewDetails: {
        features: 'Offline Map Accessible',
        foodTip: 'Guru Sweets Mysore Pak certified',
        emergencySupport: 'KSTDC 1363 Hotline integrated',
        satisfaction: '100% Transparent, No Hidden Fees'
      }
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0B3B2C] text-white relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>
              {isKn ? 'ಕರ್ನಾಟಕ ಯಾತ್ರಾ AI ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ' :
               isTe ? 'కర్ణాటక యాత్ర AI ఎలా పనిచేస్తుంది' :
               isHi ? 'कर्नाटक यात्रा AI कैसे काम करता है' :
               isTa ? 'கர்நாடகா யாத்ரா AI எவ்வாறு செயல்படுகிறது' :
               isMl ? 'കർണാടക യാത്ര AI എങ്ങനെ പ്രവർത്തിക്കുന്നു' :
               'How Karnataka Yatra AI Works'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-royal tracking-tight leading-tight">
            {isKn ? '೩ ಸುಲಭ ಹಂತಗಳಲ್ಲಿ ನಿಮ್ಮ ಕನಸಿನ ಕರ್ನಾಟಕ ಪ್ರವಾಸವನ್ನು ಯೋಜಿಸಿ' :
             isTe ? '3 సులభ దశల్లో మీ కలల కర్ణాటక ప్రయాణాన్ని ప్లాన్ చేసుకోండి' :
             isHi ? '3 आसान चरणों में अपनी सपनों की कर्नाटक यात्रा की योजना बनाएं' :
             isTa ? '3 எளிய படிகளில் உங்கள் கனவு கர்நாடக பயணத்தைத் திட்டமிடுங்கள்' :
             isMl ? '3 ലളിതമായ ഘട്ടങ്ങളിലൂടെ നിങ്ങളുടെ സ്വപ്ന കർണാടക യാത്ര പ്ലാൻ ചെയ്യുക' :
             'Plan Your Dream Karnataka Journey in 3 Easy Steps'}
          </h2>

          <p className="mt-4 text-emerald-100/90 text-base sm:text-lg">
            {isKn ? 'ಎಲ್ಲಾ ಪೀಳಿಗೆಯ ಪ್ರಯಾಣಿಕರಿಗೂ ಸರಳ, ನಿಖರ ಮತ್ತು ಸುಲಭವಾಗಿ ಲಭ್ಯವಾಗುವಂತೆ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.' :
             isTe ? 'అన్ని తరాల ప్రయాణీకులకు సరళంగా, అప్రయత్నంగా మరియు అందుబాటులో ఉండేలా రూపొందించబడింది.' :
             isHi ? 'सभी पीढ़ियों के यात्रियों के लिए सरल, सहज और सुलभ होने के लिए डिज़ाइन किया गया।' :
             isTa ? 'அனைத்து தலைமுறை பயணிகளுக்கும் எளிமையாகவும் அணுகக்கூடியதாகவும் வடிவமைக்கப்பட்டுள்ளது.' :
             isMl ? 'എല്ലാ തലമുറകളിലെയും സഞ്ചാരികൾക്കായി ലളിതവും അനായാസവുമായ രീതിയിൽ രൂപകൽപ്പന ചെയ്തത്.' :
             'Designed to be simple, effortless, and accessible for travellers of every generation.'}
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((item) => {
            const Icon = item.icon;
            const isCurrent = activeStep === item.step;

            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(item.step)}
                className={`cursor-pointer rounded-3xl p-7 sm:p-8 transition-all duration-300 relative flex flex-col justify-between border ${
                  isCurrent 
                    ? 'bg-[#062A20] border-amber-400 shadow-2xl ring-2 ring-amber-400/50 scale-[1.02]' 
                    : 'bg-[#062A20]/60 border-emerald-800/80 hover:bg-[#062A20] hover:border-emerald-600'
                }`}
              >
                <div>
                  {/* Step Header: Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-royal tracking-widest">
                      {item.number}
                    </span>

                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform ${
                      isCurrent ? 'bg-amber-400 text-[#062A20]' : 'bg-emerald-900/80 text-emerald-300'
                    }`}>
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  {/* Step Title & Kannada Translation */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-royal">
                    {item.title}
                  </h3>
                  <p className="text-xs text-amber-300/80 font-medium mt-0.5">
                    {item.kannadaTitle}
                  </p>

                  <p className="mt-3 text-sm text-emerald-100/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Step Indicator */}
                <div className="mt-6 pt-4 border-t border-emerald-900/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 flex items-center space-x-1">
                    <span>{isCurrent ? 'Active Step' : 'Click to inspect step'}</span>
                  </span>
                  <div className={`w-3 h-3 rounded-full ${isCurrent ? 'bg-amber-400' : 'bg-emerald-800'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Step Preview Panel */}
        <div className="mt-12 bg-[#062A20] border border-amber-400/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Live AI Simulation Demo
              </span>
              <h4 className="text-2xl font-bold text-white font-royal">
                Ready to experience your personalized Karnataka itinerary?
              </h4>
              <p className="text-sm text-emerald-200/80 max-w-xl">
                Takes less than 45 seconds to generate a complete day-by-day plan with travel timings, meal spots, and temple darshan slots.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <button
                onClick={onStartPlanning}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base bg-gradient-to-r from-amber-400 to-yellow-400 text-[#062A20] hover:from-amber-300 hover:to-yellow-300 shadow-gold transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-5 h-5 text-[#062A20]" />
                <span>Start Your Trip Plan Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
