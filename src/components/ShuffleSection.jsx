import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  Search, 
  Layers, 
  LayoutGrid, 
  ShieldCheck,
  Zap,
  CheckCircle2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Globe,
  RefreshCw
} from 'lucide-react';
import NewsCard from './NewsCard';
import { sound } from '../utils/audio';

const SCAN_STEPS = [
  "Connecting to global intelligence wire across 15 premier publications...",
  "Scanning Reuters, Bloomberg, Financial Times, AP & WSJ for breaking dispatches...",
  "Analyzing industry developments from TechCrunch, The Information, VentureBeat & The Verge...",
  "Synthesizing deep technical analyses from MIT Tech Review, WIRED, Ars Technica & IEEE Spectrum...",
  "Verifying peer-reviewed scientific breakthroughs in Nature & Science..."
];

export default function ShuffleSection({
  articles = [],
  onShuffle,
  onSelectArticle,
  savedIds = [],
  onToggleBookmark,
  remainingUnseen = 15,
  totalSeenToday = 5,
  totalPoolSize = 20,
  isResetCycle = false,
  onResetTodayHistory,
  isLiveWire = false,
  isRefreshingLive = false,
  onRefreshLiveWire
}) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [dealtCount, setDealtCount] = useState(5);
  const [viewMode, setViewMode] = useState('spread'); // 'spread' | 'grid'
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const carouselRef = useRef(null);

  // Trigger Shuffle with Coolest Magnifier Scanning Animation + Sound + Daily Deduplication
  const handleShuffle = () => {
    sound.playClick();
    setIsScanning(true);
    setScanStepIndex(0);
    setDealtCount(0);
    setActiveCardIndex(0);

    // Play scanner futuristic sound
    sound.playMagnifierScan();

    // Step through the scanner radar messages
    const stepInterval = setInterval(() => {
      setScanStepIndex((prev) => {
        if (prev < SCAN_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 260);

    // Complete scan after 1.35 seconds, then deal cards one by one
    setTimeout(() => {
      clearInterval(stepInterval);
      setIsScanning(false);
      onShuffle();

      // Reset scroll position on mobile carousel
      if (carouselRef.current) {
        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }

      // Deal 5 cards one by one with card snap sound
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          setDealtCount(i + 1);
          sound.playCardDeal(i);
        }, i * 180);
      }
    }, 1350);
  };

  const categories = ['ALL', 'BREAKING NEWS', 'AI INDUSTRY', 'DEEP ANALYSIS', 'RESEARCH'];

  const filteredArticles = filterCategory === 'ALL'
    ? articles
    : articles.filter(a => a.category.toUpperCase().includes(filterCategory) || filterCategory.includes(a.category.toUpperCase()));

  // Mobile carousel scroll tracker
  const handleCarouselScroll = (e) => {
    const el = e.target;
    const cardWidth = el.offsetWidth * 0.85;
    const index = Math.round(el.scrollLeft / cardWidth);
    if (index !== activeCardIndex && index >= 0 && index < 5) {
      setActiveCardIndex(index);
    }
  };

  const scrollToCard = (index) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth * 0.85;
      carouselRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
      setActiveCardIndex(index);
      sound.playClick();
    }
  };

  return (
    <section id="shuffle-deck" className="relative py-8 sm:py-16 md:py-20 bg-[#070709] border-t border-white/[0.06] overflow-hidden scroll-mt-28 sm:scroll-mt-32 md:scroll-mt-36">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-white/[0.02] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header & Control Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-6 sm:mb-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-zinc-300 uppercase">
                TODAY'S SELECTION • SEPTEMBER 4, 2026
              </span>
              <span className="text-zinc-600">•</span>
              
              {/* Daily Deduplication Guarantee Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                <ShieldCheck size={11} className="text-cyan-400" />
                <span>Zero-Repeat Guarantee</span>
              </div>

              <span className="text-zinc-600">•</span>
              {/* Top Publications Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono text-zinc-200">
                <Globe size={11} className="text-emerald-400" />
                <span>15 Premier Outlets Across 4 Tiers</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Top 5 AI Stories for Today
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              Curated and AI-synthesized across 15 premier outlets: Breaking News, AI Industry, Deep Analysis, and Research. Zero repeats guaranteed.
            </p>
          </div>

          {/* Shuffle Action Button & Status Counter */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            
            {/* Today's Seen Counter */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-xs text-zinc-400">
              <span>Seen today: <strong className="text-white font-mono">{totalSeenToday}</strong></span>
              <span className="text-zinc-600">/</span>
              <span>Remaining: <strong className="text-emerald-400 font-mono">{remainingUnseen}</strong></span>
            </div>

            {/* View Mode Toggle (Desktop) */}
            <div className="hidden sm:flex items-center p-1 rounded-full bg-zinc-900 border border-white/10 text-xs">
              <button
                onClick={() => { sound.playClick(); setViewMode('spread'); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                  viewMode === 'spread' 
                    ? 'bg-white text-black font-medium shadow-sm' 
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Spread Card Fan View"
              >
                <Layers size={13} />
                <span>Spread</span>
              </button>
              <button
                onClick={() => { sound.playClick(); setViewMode('grid'); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white text-black font-medium shadow-sm' 
                    : 'text-zinc-400 hover:text-white'
                }`}
                title="Clean Grid View"
              >
                <LayoutGrid size={13} />
                <span>Grid</span>
              </button>
            </div>

            {/* Live Web Scrape Refresh Button */}
            <button
              onClick={onRefreshLiveWire}
              disabled={isRefreshingLive}
              title="Scrape latest AI dispatches from internet & X"
              className="flex items-center gap-1.5 px-3.5 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-xs text-zinc-300 hover:text-white transition-all active:scale-95 flex-shrink-0"
            >
              <Globe size={13} className="text-cyan-400" />
              <span>{isRefreshingLive ? "Scraping Web..." : "Live Web Refresh"}</span>
              <RefreshCw size={11} className={isRefreshingLive ? "animate-spin text-cyan-400" : "text-zinc-500"} />
            </button>

            {/* The Main Shuffle Button - Prominent on Mobile */}
            <button
              onClick={handleShuffle}
              disabled={isScanning}
              className={`w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.15)] ${
                isScanning 
                  ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-zinc-200 hover:shadow-[0_0_35px_rgba(255,255,255,0.25)]'
              }`}
            >
              <RotateCw 
                size={15} 
                className={`transition-transform duration-700 ${isScanning ? 'animate-spin' : 'group-hover:rotate-180'}`} 
              />
              <span>{isScanning ? "Scanning Web..." : "Shuffle Today's Top 5"}</span>
              <Sparkles size={13} className="text-amber-500 animate-pulse" />
            </button>

          </div>
        </div>

        {/* Category Filter Pills & Mobile Stats */}
        <div className="flex items-center justify-between gap-3 pb-3 mb-6 overflow-x-auto no-scrollbar text-xs">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { sound.playClick(); setFilterCategory(cat); }}
                className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all border text-[11px] sm:text-xs ${
                  filterCategory === cat
                    ? 'bg-zinc-100 text-black border-white shadow-sm'
                    : 'bg-zinc-900/80 text-zinc-400 border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {totalSeenToday > 5 && (
            <button
              onClick={onResetTodayHistory}
              title="Reset seen stories for today"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-colors flex-shrink-0 text-[10px]"
            >
              <RotateCcw size={11} />
              <span>Reset today</span>
            </button>
          )}
        </div>

        {/* COOL MAGNIFIER HUD SCANNER ANIMATION */}
        {isScanning && (
          <div className="relative w-full py-12 sm:py-20 rounded-3xl bg-gradient-to-b from-zinc-950 via-[#0e0e12] to-zinc-950 border border-white/20 overflow-hidden shadow-2xl flex flex-col items-center justify-center my-4 sm:my-6">
            
            {/* Holographic Radar Scanner Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            {/* Rotating Cybernetic Magnifier Lens */}
            <div className="relative w-36 h-36 sm:w-56 sm:h-56 flex items-center justify-center mb-5">
              
              {/* Outer Pulsing Aura */}
              <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-40" />
              
              {/* Spinning Radar Sweeper */}
              <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-[spin_2.5s_linear_infinite]" />
              
              {/* Concentric Measurement Rings */}
              <div className="absolute inset-3 sm:inset-4 rounded-full border border-dashed border-white/40 animate-[spin_6s_linear_infinite_reverse]" />
              <div className="absolute inset-8 sm:inset-10 rounded-full border border-white/10" />

              {/* The Glowing Magnifying Glass / Target Reticle */}
              <div className="relative z-10 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-black/60 backdrop-blur-md border border-white/60 shadow-[0_0_40px_rgba(255,255,255,0.4)] flex items-center justify-center">
                <Search size={32} className="text-white animate-pulse sm:hidden" />
                <Search size={44} className="text-white animate-pulse hidden sm:inline" />
                
                {/* Laser Sweep line inside lens */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_15px_#22d3ee] animate-bounce" />
              </div>

              {/* Crosshair ticks */}
              <div className="absolute top-0 bottom-0 w-[1px] bg-white/30" />
              <div className="absolute left-0 right-0 h-[1px] bg-white/30" />
            </div>

            {/* Real-time Dynamic AI Scanner HUD Status */}
            <div className="relative z-10 text-center px-4 max-w-sm sm:max-w-md">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-[10px] sm:text-xs font-mono mb-2 sm:mb-3">
                <Zap size={11} className="animate-bounce text-cyan-400" />
                <span>RETRIEVAL ENGINE</span>
              </div>
              <h3 className="text-sm sm:text-lg font-bold text-white tracking-tight mb-1.5">
                {SCAN_STEPS[scanStepIndex]}
              </h3>
              <p className="text-[10px] sm:text-xs text-zinc-400 font-mono">
                Cross-checking today's ledger to guarantee 100% unique news
              </p>
            </div>

            {/* Scanning Progress Bar */}
            <div className="w-48 sm:w-80 h-1 bg-zinc-800 rounded-full mt-5 overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-white via-cyan-400 to-white transition-all duration-300 ease-out" 
                style={{ width: `${((scanStepIndex + 1) / SCAN_STEPS.length) * 100}%` }}
              />
            </div>

          </div>
        )}

        {/* THE 5 CARDS SPREAD ACROSS SCREEN */}
        {!isScanning && (
          <div className="relative">
            
            {/* MOBILE VIEW: Buttery Smooth Horizontal Touch Snap Carousel */}
            <div className="sm:hidden">
              <div 
                ref={carouselRef}
                onScroll={handleCarouselScroll}
                className="mobile-snap-carousel flex overflow-x-auto gap-4 pb-4 px-1 no-scrollbar items-stretch"
              >
                {filteredArticles.slice(0, 5).map((article, idx) => (
                  <div
                    key={article.id}
                    className="mobile-snap-item w-[84vw] max-w-[320px] flex-shrink-0 animate-deal"
                    style={{ animationDelay: `${idx * 90}ms` }}
                  >
                    <NewsCard
                      article={article}
                      onSelect={onSelectArticle}
                      isBookmarked={savedIds.includes(article.id)}
                      onToggleBookmark={onToggleBookmark}
                      viewMode="spread"
                    />
                  </div>
                ))}
              </div>

              {/* Mobile Carousel Indicators & Next/Prev Controls */}
              <div className="flex items-center justify-between px-2 pt-2 pb-1">
                <div className="flex items-center gap-1.5">
                  {filteredArticles.slice(0, 5).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToCard(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeCardIndex === i ? 'w-6 bg-white' : 'w-1.5 bg-zinc-700'
                      }`}
                      aria-label={`Go to card ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-zinc-400">
                    Card {activeCardIndex + 1} of {Math.min(5, filteredArticles.length)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => scrollToCard(Math.max(0, activeCardIndex - 1))}
                      disabled={activeCardIndex === 0}
                      className="p-1 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 disabled:opacity-30"
                      aria-label="Previous card"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      onClick={() => scrollToCard(Math.min(filteredArticles.length - 1, activeCardIndex + 1))}
                      disabled={activeCardIndex >= Math.min(4, filteredArticles.length - 1)}
                      className="p-1 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 disabled:opacity-30"
                      aria-label="Next card"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* DESKTOP / TABLET VIEW: 5-Card Grid & Fan View */}
            <div className="hidden sm:block">
              {viewMode === 'spread' ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3.5 xl:gap-5">
                  {filteredArticles.slice(0, 5).map((article, idx) => {
                    const isVisible = idx < dealtCount;
                    if (!isVisible) return (
                      <div 
                        key={article.id} 
                        className="hidden lg:flex h-96 rounded-[22px] border border-dashed border-white/10 bg-zinc-950/40 items-center justify-center"
                      >
                        <span className="text-xs text-zinc-600 font-mono">Dealing card #{idx + 1}...</span>
                      </div>
                    );

                    return (
                      <div
                        key={article.id}
                        className="transform transition-all duration-500 ease-out"
                        style={{ animationDelay: `${idx * 120}ms` }}
                      >
                        <NewsCard
                          article={article}
                          onSelect={onSelectArticle}
                          isBookmarked={savedIds.includes(article.id)}
                          onToggleBookmark={onToggleBookmark}
                          viewMode="spread"
                          animationDelay={idx * 100}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.map((article) => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      onSelect={onSelectArticle}
                      isBookmarked={savedIds.includes(article.id)}
                      onToggleBookmark={onToggleBookmark}
                      viewMode="grid"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Bottom notification indicator */}
            <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 py-3.5 px-4 sm:px-5 rounded-2xl bg-zinc-950/80 border border-white/5 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                <span className="text-[11px] sm:text-xs">
                  Showing <strong>{Math.min(dealtCount, filteredArticles.length)}</strong> distinct AI stories • <strong>Zero repeats today guaranteed</strong>
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px] sm:text-[11px] text-zinc-500">
                <span>{remainingUnseen} unseen stories available today</span>
                <span>•</span>
                <span>Tap card for full AI brief</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
