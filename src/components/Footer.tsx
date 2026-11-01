import React from 'react';
import { 
  Compass, 
  Phone, 
  ShieldCheck, 
  TreePine, 
  Sparkles, 
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'planner' | 'explore') => void;
  onOpenSaved: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSaved }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#041D16] text-white pt-16 pb-12 border-t-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsible Tourism Banner */}
        <div className="bg-gradient-to-r from-[#0B3B2C] to-[#114B3A] rounded-3xl p-6 sm:p-8 border border-emerald-500/30 mb-14 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 flex-shrink-0">
                <TreePine className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <div className="inline-flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Responsible Tourism Pledge • ಪರಿಸರ ಜವಾಬ್ದಾರಿ</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-royal text-white">
                  Preserve the Splendour of Karnataka for Generations
                </h3>
                <p className="mt-1 text-emerald-100/80 text-sm max-w-2xl leading-relaxed">
                  Avoid single-use plastics in the fragile Western Ghats biosphere. Respect sacred dress codes in heritage temples and support local rural artisan communities.
                </p>
              </div>
            </div>

            <div className="bg-[#062A20] px-5 py-3.5 rounded-2xl border border-emerald-500/40 text-center sm:text-left flex-shrink-0">
              <p className="text-[11px] text-emerald-300 uppercase tracking-wider font-semibold">24x7 Tourist Helpline</p>
              <div className="flex items-center space-x-2 mt-0.5">
                <Phone className="w-4 h-4 text-amber-400" />
                <span className="text-xl font-extrabold text-amber-300 tracking-wide">1363 (Toll-Free)</span>
              </div>
              <p className="text-[10px] text-emerald-400">Karnataka State Tourism Police: 112</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-emerald-950/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-[#062A20] flex items-center justify-center font-extrabold shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold text-white font-royal">Karnataka Yatra AI</span>
                <span className="block text-xs text-amber-300">ಕರ್ನಾಟಕ ಯಾತ್ರೆ • One State Many Worlds</span>
              </div>
            </div>

            <p className="text-sm text-emerald-200/70 leading-relaxed max-w-sm">
              The AI-powered travel intelligence platform built to make Karnataka's 31 districts, UNESCO monuments, Western Ghat trails, and coastal beaches accessible and delightful for every traveller.
            </p>

            <div className="pt-2 text-xs text-emerald-400">
              <span className="font-semibold text-white">Hackathon Focus:</span> Tourism Innovation & Digital Inclusion
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-emerald-100/80">
              <li>
                <button 
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('explore')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Explore Karnataka
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('planner')}
                  className="hover:text-amber-300 transition-colors flex items-center space-x-1"
                >
                  <span>Plan My Trip</span>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenSaved}
                  className="hover:text-amber-300 transition-colors"
                >
                  Saved Trips
                </button>
              </li>
            </ul>
          </div>

          {/* Featured Circuits */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Popular Circuits
            </h4>
            <ul className="space-y-2 text-sm text-emerald-100/80">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('explore')}>
                Vijayanagara Heritage (Hampi)
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('explore')}>
                Royal Mysuru & Palaces
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('explore')}>
                Coorg & Western Ghats Coffee
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('explore')}>
                Gokarna & Karavali Coast
              </li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('explore')}>
                Badami, Aihole & Pattadakal
              </li>
            </ul>
          </div>

          {/* Travel Advisories & Accessibility */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              Accessibility & Safety
            </h4>
            <ul className="space-y-2 text-sm text-emerald-100/80">
              <li>Senior Citizen Friendly Routes</li>
              <li>Verified KSTDC Approved Guides</li>
              <li>Real-time Ghat Road Weather</li>
              <li>Multilingual Audio Guides (Upcoming)</li>
              <li>Emergency Contacts: 112 / 1363</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/60 gap-4">
          <div className="flex items-center space-x-1 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Karnataka Yatra AI. Built for the Karnataka Tourism Hackathon.</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-amber-300 transition-colors border border-emerald-800"
              aria-label="Back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
