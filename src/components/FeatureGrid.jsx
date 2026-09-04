import React, { useState, useEffect } from 'react';
import { Zap, ShieldCheck, ExternalLink, Cpu } from 'lucide-react';
import { sound } from '../utils/audio';

const features = [
  {
    icon: Zap,
    tag: 'INTELLIGENCE WIRE',
    title: '15-Publication Live Wire',
    description: 'Continuously monitors 15 premier outlets across 4 tiers (Reuters, Bloomberg, FT, TechCrunch, MIT Tech Review, Nature).'
  },
  {
    icon: Cpu,
    tag: 'EXECUTIVE SYNTHESIS',
    title: '220+ Word AI-Crafted Briefs',
    description: 'Every story is broken down into an executive summary, 3 technical takeaways, and "Why It Matters" for builders and investors.'
  },
  {
    icon: ExternalLink,
    tag: 'SOURCE VERIFIED',
    title: 'Direct Canonical Outbound Links',
    description: 'No paywalls or broken search pages. Click directly to the full original investigative piece on the publisher’s website.'
  },
  {
    icon: ShieldCheck,
    tag: 'DEDUPLICATION',
    title: 'Zero Duplicate Daily Ledger',
    description: 'Stateful browser registry ensures you never see the same article twice on the same calendar day.'
  }
];

export default function FeatureGrid() {
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    const handleNav = (e) => {
      if (e.detail?.id === 'features') {
        setHighlighted(true);
        setTimeout(() => setHighlighted(false), 2200);
      }
    };
    window.addEventListener('section-navigated', handleNav);
    return () => window.removeEventListener('section-navigated', handleNav);
  }, []);

  return (
    <section 
      id="features" 
      className="py-16 sm:py-24 bg-[#07070a] border-t border-white/[0.08] relative overflow-hidden scroll-mt-28 sm:scroll-mt-32 md:scroll-mt-36"
    >
      {/* Subtle background ambient glow */}
      <div className={`absolute top-0 right-1/4 w-96 h-64 bg-cyan-500/[0.04] blur-[140px] pointer-events-none transition-opacity duration-700 ${
        highlighted ? 'opacity-100' : 'opacity-40'
      }`} />
      
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with smooth highlight state */}
        <div className={`flex flex-col items-start mb-10 sm:mb-12 p-4 sm:p-6 -mx-4 sm:-mx-6 rounded-2xl transition-all duration-700 ${
          highlighted ? 'bg-cyan-950/20 ring-1 ring-cyan-500/30' : ''
        }`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-[11px] font-mono font-semibold text-zinc-300 uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>CORE ARCHITECTURE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-2 sm:mb-3">
            Built for Signal. Engineered Against Noise.
          </h2>
          <p className="text-xs sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            ReadAiNews combines autonomous ingestion with generative journalism to deliver the purest daily AI intelligence feed.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                onMouseEnter={() => sound.playClick()}
                className="group relative flex flex-col p-5 sm:p-6 rounded-2xl bg-[#0d0d12] hover:bg-[#13131a] border border-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-lg"
              >
                {/* Accent icon */}
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-4 text-white group-hover:border-cyan-500/40 group-hover:scale-105 transition-all shadow-inner">
                  <Icon size={18} className="text-zinc-300 group-hover:text-cyan-400 transition-colors" />
                </div>

                {/* Micro Tag */}
                <span className="text-[10px] font-mono tracking-wider font-semibold text-zinc-400 mb-1.5 uppercase">
                  {item.tag}
                </span>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-white mb-2 leading-snug group-hover:text-zinc-100 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
