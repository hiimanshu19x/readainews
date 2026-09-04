import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Globe, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

export default function AboutSection({ onExploreToday }) {
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    const handleNav = (e) => {
      if (e.detail?.id === 'about') {
        setHighlighted(true);
        setTimeout(() => setHighlighted(false), 2200);
      }
    };
    window.addEventListener('section-navigated', handleNav);
    return () => window.removeEventListener('section-navigated', handleNav);
  }, []);

  return (
    <section 
      id="about" 
      className="py-16 sm:py-24 bg-[#050505] border-t border-white/[0.08] relative overflow-hidden scroll-mt-28 sm:scroll-mt-32 md:scroll-mt-36"
    >
      
      {/* Background radial glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-white/[0.03] blur-[140px] rounded-full pointer-events-none transition-opacity duration-700 ${
        highlighted ? 'opacity-100' : 'opacity-30'
      }`} />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Content Box with highlight ring */}
        <div className={`rounded-[28px] sm:rounded-3xl bg-gradient-to-b from-[#0c0c11] to-[#07070a] border p-6 sm:p-12 shadow-2xl transition-all duration-700 ${
          highlighted ? 'border-white/40 ring-1 ring-white/30 shadow-[0_0_60px_rgba(255,255,255,0.1)]' : 'border-white/[0.1]'
        }`}>
          
          <div className="max-w-3xl">
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-[11px] font-mono font-semibold text-zinc-300 uppercase tracking-widest mb-4">
              <Sparkles size={12} className="text-cyan-400" />
              <span>ABOUT READAINEWS</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Autonomous Daily Intelligence for Builders & Investors
            </h2>

            <p className="text-xs sm:text-base text-zinc-300 leading-relaxed mb-6 font-normal">
              In an era where thousands of speculative tweets, vendor marketing claims, and recycled newsletters drown out genuine innovation, ReadAiNews isolates the signal. Every morning, our engine curates the 5 most consequential artificial intelligence breakthroughs directly from premier newsrooms—synthesizing them into 220+ word technical briefings with key takeaways, strategic context, and direct canonical links to the original investigative pieces.
            </p>

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/[0.08] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center text-cyan-400 shrink-0">
                  <Globe size={15} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">5 Stories Daily</div>
                  <div className="text-[10px] text-zinc-400">Zero duplicate repeats</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/[0.08] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck size={15} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Direct Sourcing</div>
                  <div className="text-[10px] text-zinc-400">100% canonical links</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/[0.08] flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
                  <CheckCircle2 size={15} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">De-hyped Analysis</div>
                  <div className="text-[10px] text-zinc-400">Built for engineers</div>
                </div>
              </div>
            </div>

            {/* 15 Premier Outlets Across 4 Tiers */}
            <div className="mb-8 p-4 rounded-2xl bg-black/40 border border-white/[0.08]">
              <div className="text-[11px] font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                Monitored Intelligence Outlets (15 Premier Sources Across 4 Tiers)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-[11px]">
                <div className="space-y-1">
                  <div className="text-zinc-300 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>Breaking / Important</span>
                  </div>
                  <div className="text-zinc-500 leading-snug">Reuters, Bloomberg, Financial Times, AP, WSJ</div>
                </div>
                <div className="space-y-1">
                  <div className="text-zinc-300 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>AI Industry</span>
                  </div>
                  <div className="text-zinc-500 leading-snug">TechCrunch, The Information, VentureBeat, The Verge</div>
                </div>
                <div className="space-y-1">
                  <div className="text-zinc-300 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    <span>Deep Analysis</span>
                  </div>
                  <div className="text-zinc-500 leading-snug">MIT Tech Review, WIRED, Ars Technica, IEEE Spectrum</div>
                </div>
                <div className="space-y-1">
                  <div className="text-zinc-300 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Research</span>
                  </div>
                  <div className="text-zinc-500 leading-snug">Nature, Science</div>
                </div>
              </div>
            </div>

            {/* Creator Attribution & CTA Footer */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center text-xs shadow-md">
                  HX
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Engineered & Curated by HX</div>
                  <div className="text-[10px] text-zinc-500">Autonomous AI Intelligence Platform</div>
                </div>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  if (onExploreToday) {
                    onExploreToday();
                  } else {
                    const el = document.getElementById('shuffle-deck');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 active:scale-95 transition-all shadow-md w-fit"
              >
                <span>Read Today's Top 5</span>
                <ArrowRight size={13} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
