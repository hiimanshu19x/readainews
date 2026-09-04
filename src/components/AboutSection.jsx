import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Cpu, 
  Globe, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Code2,
  Zap,
  FileText
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function AboutSection({ onExploreToday, onExploreWeekly }) {
  return (
    <section id="about" className="py-20 md:py-28 bg-[#070709] border-t border-white/[0.08] relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-white/[0.02] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Tag */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-300 mb-4">
            <Sparkles size={13} className="text-cyan-400" />
            <span>OUR PHILOSOPHY & ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-4">
            About ReadAiNews
          </h2>
          <p className="text-sm sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            In an era where thousands of AI papers, speculative hype cycles, and sponsored marketing drown out genuine signal, ReadAiNews filters the noise. 5 breakthrough stories each day. Nothing else.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Pillar 1 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0c10] border border-white/10 flex flex-col items-start hover:border-white/20 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-6 text-white shadow-inner">
              <Globe size={22} className="text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2.5">
              Autonomous Retrieval
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              We continuously scrape and monitor arXiv, GitHub, Hugging Face, Hacker News, and engineering blogs around each calendar date to detect authentic breakthroughs as they happen.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0c10] border border-white/10 flex flex-col items-start hover:border-white/20 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-6 text-white shadow-inner">
              <ShieldCheck size={22} className="text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2.5">
              Zero Marketing Fluff
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Our AI evaluation pipeline discards speculative claims, buzzword salad, and vendor press releases. If a story lacks verifiable benchmarks or architectural substance, it is discarded.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0c10] border border-white/10 flex flex-col items-start hover:border-white/20 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-6 text-white shadow-inner">
              <FileText size={22} className="text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2.5">
              Executive Synthesis & Takeaways
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Every story is synthesized into a 220+ word deep briefing complete with structured technical takeaways, primary source citations, and 'Why It Matters' strategic analysis for founders and builders.
            </p>
          </div>

        </div>

        {/* Deep Dive Narrative Box */}
        <div className="rounded-3xl bg-gradient-to-r from-zinc-900/90 via-zinc-950 to-zinc-900/90 border border-white/15 p-6 sm:p-12 mb-16 relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
              THE MISSION
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              Built for founders, researchers, and engineers who build the future.
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              <p>
                The pace of artificial intelligence has made traditional tech journalism obsolete. Reading 50 separate newsletters and wading through social media feeds takes hours every week. Most platforms profit from rage-bait or surface-level summaries that tell you <em>that</em> a model launched, without explaining <em>how</em> it works or <em>why</em> it matters.
              </p>
              <p>
                ReadAiNews was created with a strict guarantee: <strong>5 daily stories</strong>, meticulously vetted for technical significance, refreshed every day, and never repeated on the same date. Each briefing is paired with primary sources so you can dive into the raw code and research anytime.
              </p>
            </div>

            {/* Creator Badge */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white text-black font-bold flex items-center justify-center text-xs shadow-md">
                  HX
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Engineered & Curated by HX</div>
                  <div className="text-[11px] text-zinc-500">Autonomous AI Intelligence Platform</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    sound.playClick();
                    onExploreToday();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black font-semibold text-xs hover:bg-zinc-200 active:scale-95 transition-all shadow-sm"
                >
                  <span>Start Reading Today</span>
                  <ArrowRight size={13} />
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    onExploreWeekly();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-800 text-zinc-200 hover:text-white font-medium text-xs border border-white/10 active:scale-95 transition-all"
                >
                  <span>This Week Collection</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
