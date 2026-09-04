import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Trophy, 
  Bookmark, 
  ArrowRight, 
  ChevronDown, 
  Lock, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Bell, 
  RotateCcw 
} from 'lucide-react';
import MeshThumbnail from './MeshThumbnail';
import { sound } from '../utils/audio';

const WEEKS_DATA = [
  {
    id: '1st Week of Sept 2026',
    shortLabel: '1st Week of Sept',
    dateRange: 'Sept 1 - Sept 7, 2026',
    status: 'collected',
    isLocked: false,
    badgeText: 'Past Week · Collected',
    description: 'Autonomous AI synthesis of the top 5 highest-impact breakthroughs from 15 premier publications for the past week.'
  },
  {
    id: '2nd Week of Sept 2026',
    shortLabel: '2nd Week of Sept',
    dateRange: 'Sept 8 - Sept 14, 2026',
    status: 'locked',
    isLocked: true,
    badgeText: 'Upcoming · Locked',
    unlockDate: 'Sunday, Sept 14, 2026 at 23:59 UTC',
    progressPercent: 42,
    progressLabel: 'Ingesting Daily Wire Feeds',
    description: 'Currently collecting daily stories across Reuters, Bloomberg, TechCrunch, MIT Tech Review, and Nature. The final ranked edition unlocks when the 7-day cycle finishes.'
  },
  {
    id: '3rd Week of Sept 2026',
    shortLabel: '3rd Week of Sept',
    dateRange: 'Sept 15 - Sept 21, 2026',
    status: 'locked',
    isLocked: true,
    badgeText: 'Upcoming · Locked',
    unlockDate: 'Sunday, Sept 21, 2026 at 23:59 UTC',
    progressPercent: 0,
    progressLabel: 'Scheduled Pipeline',
    description: 'Upcoming third weekly edition for September 2026. Automated pipeline will activate following the completion of Week 2.'
  },
  {
    id: '4th Week of Sept 2026',
    shortLabel: '4th Week of Sept',
    dateRange: 'Sept 22 - Sept 28, 2026',
    status: 'locked',
    isLocked: true,
    badgeText: 'Upcoming · Locked',
    unlockDate: 'Sunday, Sept 28, 2026 at 23:59 UTC',
    progressPercent: 0,
    progressLabel: 'Scheduled Pipeline',
    description: 'Upcoming fourth weekly edition for September 2026. Will compile the month-end AI intelligence wrap-up.'
  }
];

export default function WeeklyCollection({ 
  articles = [], 
  onSelectArticle, 
  savedIds = [], 
  onToggleBookmark 
}) {
  const [selectedWeek, setSelectedWeek] = useState('1st Week of Sept 2026');

  // Always reset to the starting tab (1st Week of Sept collected best) when user clicks "This Week Collection"
  useEffect(() => {
    const handleNav = (e) => {
      if (e.detail?.id === 'weekly-collection') {
        setSelectedWeek('1st Week of Sept 2026');
      }
    };
    window.addEventListener('section-navigated', handleNav);
    return () => window.removeEventListener('section-navigated', handleNav);
  }, []);

  const currentWeekMeta = WEEKS_DATA.find(w => w.id === selectedWeek) || WEEKS_DATA[0];

  // Filter weekly best items (past collected week)
  const weeklyArticles = articles.filter(a => a.isWeeklyBest);
  const filtered = weeklyArticles;

  const handleScrollToNewsletter = () => {
    sound.playClick();
    const el = document.getElementById('newsletter-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.dispatchEvent(new CustomEvent('highlight-newsletter'));
      setTimeout(() => {
        const input = document.getElementById('newsletter-email-input');
        if (input) input.focus({ preventScroll: true });
      }, 500);
    }
  };

  return (
    <section id="weekly-collection" className="pt-3.5 pb-10 sm:py-16 md:py-20 bg-[#09090c] border-t border-white/[0.08] scroll-mt-28 md:scroll-mt-20">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header Banner */}
        <div className="rounded-[24px] sm:rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border border-white/10 p-5 sm:p-10 mb-8 sm:mb-10 relative overflow-hidden shadow-2xl">
          {/* Subtle curved arc background */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/10 text-[10px] sm:text-xs font-semibold text-zinc-200 mb-3 sm:mb-4">
                <Trophy size={12} className="text-amber-400" />
                <span>WEEKLY CURATION ARCHIVE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Read This Week Collection
              </h2>
              <p className="text-xs sm:text-base text-zinc-400 mt-1.5 sm:mt-2 max-w-xl">
                The absolute best AI breakthroughs picked and ranked by our autonomous curation pipeline. Cut through the noise with the top weekly archive.
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {/* Dropdown Edition Selector */}
              <div className="px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-black/50 border border-white/10 flex items-center gap-2.5 sm:gap-3 hover:border-white/25 transition-all">
                <Calendar size={15} className="text-zinc-400 shrink-0" />
                <div className="text-[10px] sm:text-xs flex flex-col">
                  <div className="text-zinc-500 font-mono text-[9px] sm:text-[10px]">SELECT EDITION</div>
                  <div className="relative flex items-center gap-1">
                    <select
                      value={selectedWeek}
                      onChange={(e) => {
                        sound.playClick();
                        setSelectedWeek(e.target.value);
                      }}
                      className="bg-transparent text-white font-medium focus:outline-none cursor-pointer pr-4 appearance-none text-xs sm:text-sm"
                    >
                      {WEEKS_DATA.map(w => (
                        <option key={w.id} value={w.id} className="bg-zinc-900 text-white">
                          {w.isLocked ? `🔒 ${w.shortLabel} (Locked)` : `✓ ${w.shortLabel} (Collected)`}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={12} className="text-zinc-400 pointer-events-none absolute right-0" />
                  </div>
                </div>
              </div>

              {/* Status Pill */}
              <div className="px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-black/50 border border-white/10 flex items-center gap-2.5 sm:gap-3">
                {currentWeekMeta.isLocked ? (
                  <>
                    <Lock size={15} className="text-amber-400 shrink-0" />
                    <div className="text-[10px] sm:text-xs">
                      <div className="text-amber-400 font-mono text-[9px] sm:text-[10px] font-semibold">STATUS: LOCKED</div>
                      <div className="text-zinc-300 font-medium">In Ingestion Cycle</div>
                    </div>
                  </>
                ) : (
                  <>
                    <Sparkles size={15} className="text-emerald-400 shrink-0" />
                    <div className="text-[10px] sm:text-xs">
                      <div className="text-emerald-400 font-mono text-[9px] sm:text-[10px] font-semibold">STATUS: ACTIVE</div>
                      <div className="text-white font-medium">Top {weeklyArticles.length} Best Stories</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Week Quick-Switch Navigation Tabs */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <span className="text-zinc-500 text-[11px] font-mono shrink-0 mr-1">EDITIONS:</span>
              {WEEKS_DATA.map((w) => {
                const isCurrent = selectedWeek === w.id;
                return (
                  <button
                    key={w.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedWeek(w.id);
                    }}
                    className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer border ${
                      isCurrent
                        ? 'bg-white text-black border-white font-semibold shadow-md'
                        : w.isLocked
                        ? 'bg-zinc-900/90 text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
                        : 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30 hover:bg-emerald-950/70'
                    }`}
                  >
                    {w.isLocked ? (
                      <Lock size={10} className={isCurrent ? "text-black" : "text-amber-400/90"} />
                    ) : (
                      <CheckCircle2 size={11} className={isCurrent ? "text-black" : "text-emerald-400"} />
                    )}
                    <span>{w.shortLabel}</span>
                    <span className={`text-[9px] font-mono ${isCurrent ? 'text-zinc-700' : 'text-zinc-500'}`}>
                      {w.isLocked ? '🔒' : '✓'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] text-zinc-400 font-mono shrink-0">
              {currentWeekMeta.dateRange}
            </div>
          </div>
        </div>

        {/* CONDITION 1: LOCKED PREVIEW STATE (For 2nd, 3rd, 4th Weeks of Sept 2026) */}
        {currentWeekMeta.isLocked ? (
          <div className="rounded-[28px] sm:rounded-3xl bg-[#0d0d12] border border-white/15 p-6 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl text-center flex flex-col items-center">
            
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/[0.04] blur-[100px] rounded-full pointer-events-none" />

            {/* Glowing Lock Icon */}
            <div className="relative mb-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-amber-500/20 to-zinc-900 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                <Lock size={32} className="animate-pulse" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-black border border-amber-500/40 text-[9px] font-mono text-amber-300 font-bold uppercase tracking-wider">
                LOCKED
              </div>
            </div>

            {/* Title & Dates */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-400 mb-3">
              <Calendar size={12} className="text-zinc-300" />
              <span>{currentWeekMeta.dateRange}</span>
            </div>

            <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-3 max-w-xl">
              {currentWeekMeta.id} Collection Is Currently Locked
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg leading-relaxed mb-6">
              {currentWeekMeta.description}
            </p>

            {/* Pipeline Ingestion Card */}
            <div className="w-full max-w-md p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/10 text-left mb-8 shadow-inner">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-zinc-300 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>{currentWeekMeta.progressLabel}</span>
                </span>
                <span className="text-amber-400 font-mono font-semibold">{currentWeekMeta.progressPercent}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden mb-3">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.max(8, currentWeekMeta.progressPercent)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1 border-t border-white/5">
                <span className="flex items-center gap-1 text-zinc-400">
                  <Clock size={11} />
                  <span>Release ETA:</span>
                </span>
                <span className="text-zinc-300 font-mono text-[10px]">{currentWeekMeta.unlockDate}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleScrollToNewsletter}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer w-full sm:w-auto"
              >
                <Bell size={14} />
                <span>Notify Me via Bi-Weekly Newsletter</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setSelectedWeek('1st Week of Sept 2026');
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-zinc-900 text-zinc-300 hover:text-white border border-white/10 hover:border-white/25 active:scale-95 transition-all text-xs sm:text-sm cursor-pointer w-full sm:w-auto"
              >
                <RotateCcw size={13} />
                <span>View 1st Week Collected Best</span>
              </button>
            </div>

          </div>
        ) : (
          /* CONDITION 2: UNLOCKED PAST WEEK COLLECTED ARTICLES GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((article, idx) => {
              const isSaved = savedIds.includes(article.id);
              return (
                <div
                  key={article.id}
                  onClick={() => { sound.playClick(); onSelectArticle(article); }}
                  className="group relative flex flex-col rounded-[22px] bg-[#0d0d10] hover:bg-[#131318] active:scale-[0.98] border border-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg"
                >
                  {/* Article Preview Image Header */}
                  <div className="relative w-full h-36 sm:h-44 overflow-hidden border-b border-white/5 flex-shrink-0 bg-zinc-950">
                    {article.imageUrl ? (
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                        loading="lazy"
                      />
                    ) : (
                      <MeshThumbnail theme={article.meshTheme} className="w-full h-full transform group-hover:scale-105 transition-transform duration-500" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-black/30 pointer-events-none" />
                    
                    {/* Rank Badge */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-bold text-white flex items-center gap-1.5 shadow-md">
                      <span className="text-amber-400 font-mono text-xs">#{article.weeklyRank || idx + 1}</span>
                      <span className="text-[9px] sm:text-[10px] text-zinc-400 font-normal">Week's Pick</span>
                    </div>

                    {/* Bookmark Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playClick();
                        onToggleBookmark(article.id);
                      }}
                      className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-zinc-300 hover:text-white active:scale-90 transition-colors shadow-md"
                    >
                      <Bookmark size={13} className={isSaved ? "fill-white text-white" : ""} />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                      <span>{article.category}</span>
                      <div className="flex items-center gap-1.5 text-zinc-400 font-mono">
                        <span className="text-zinc-300 font-medium">Sep 4, 2026</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-500 font-normal lowercase">{article.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-[13px] sm:text-base font-bold text-white leading-snug group-hover:text-zinc-100 transition-colors mb-2 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">
                      {article.summary}
                    </p>

                    {/* Bottom Source */}
                    <div className="mt-auto pt-2.5 border-t border-white/[0.06] flex items-center justify-between gap-2 text-xs">
                      <span 
                        className="text-[10px] sm:text-[11px] text-zinc-400 truncate min-w-0 flex-1"
                        title={`Source: ${article.source}`}
                      >
                        Source: <strong className="text-zinc-300 font-normal">{article.source}</strong>
                      </span>

                      <span className="shrink-0 whitespace-nowrap inline-flex items-center gap-1 font-medium text-[11px] sm:text-xs text-zinc-300 group-hover:text-white">
                        <span className="whitespace-nowrap">Full brief</span>
                        <ArrowRight size={12} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
