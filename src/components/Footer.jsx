import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/audio';
import { smoothScrollTo } from '../utils/scroll';

export default function Footer({ onNavigate, onOpenInfo }) {
  const handleNav = (id) => {
    onNavigate(id);
    const targetId = id === 'today' ? 'shuffle-deck' : id === 'weekly' ? 'weekly-collection' : id;
    smoothScrollTo(targetId, true);
  };

  const handleInfo = (key) => {
    sound.playClick();
    if (onOpenInfo) onOpenInfo(key);
  };

  return (
    <footer className="bg-[#050505] text-zinc-400 border-t border-white/[0.08] pt-16 pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/20 flex items-center justify-center">
                <span className="font-bold text-white text-sm">N</span>
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                ReadAiNews
              </span>
            </div>

            <p className="text-sm text-zinc-400 max-w-sm mb-4 leading-relaxed">
              AI and tech news, curated for a smarter tomorrow. The top 5 breakthrough stories delivered daily with verifiable facts and primary source citations.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs text-zinc-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Direct Wire Sourcing • No Hype</span>
            </div>
          </div>

          {/* Links Columns: Only Relevant and Major Pages */}
          <div className="md:col-span-7 grid grid-cols-3 gap-8">
            
            {/* Column 1: Product */}
            <div>
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">
                Product
              </h4>
              <ul className="space-y-3 text-xs">
                <li>
                  <button onClick={() => handleNav('today')} className="hover:text-white transition-colors text-left">
                    Today's Top 5
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('weekly')} className="hover:text-white transition-colors text-left">
                    This Week Collection
                  </button>
                </li>
                <li>
                  <a href="#newsletter-section" className="hover:text-white transition-colors">
                    Bi-Weekly Newsletter (2x/week)
                  </a>
                </li>
                <li>
                  <button onClick={() => handleNav('today')} className="hover:text-white transition-colors text-left text-zinc-500">
                    Live Wire Scraper
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Standards & Architecture */}
            <div>
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">
                Standards
              </h4>
              <ul className="space-y-3 text-xs">
                <li>
                  <button onClick={() => handleNav('about')} className="hover:text-white transition-colors text-left">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => handleInfo('editorial')} className="hover:text-white transition-colors text-left">
                    Editorial Standards
                  </button>
                </li>
                <li>
                  <button onClick={() => handleInfo('zero-repeat')} className="hover:text-white transition-colors text-left">
                    Zero-Repeat Engine
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div>
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">
                Legal
              </h4>
              <ul className="space-y-3 text-xs">
                <li>
                  <button onClick={() => handleInfo('privacy')} className="hover:text-white transition-colors text-left">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => handleInfo('terms')} className="hover:text-white transition-colors text-left">
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar with mandatory "build by HX" mention */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © 2026 ReadAiNews. All rights reserved.
          </div>

          {/* Prominent "build by HX" Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs tracking-wider">
              build by <strong className="text-white font-bold tracking-normal">HX</strong>
            </span>
          </div>

          <div className="text-zinc-500">
            A more focused internet.
          </div>
        </div>

      </div>
    </footer>
  );
}
