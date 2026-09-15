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
  RefreshCw,
  Clock
} from 'lucide-react';
import NewsCard from './NewsCard';
import { sound } from '../utils/audio';
import { formatLocalFullDate, getUserTimeZoneAbbr } from '../utils/timeZone';

const SCAN_STEPS = [
  { region: "North America" },
  { region: "Asia-Pacific" },
  { region: "Europe" },
  { region: "Americas" },
  { region: "Global Wire" }
];

export default function ShuffleSection({
  articles = [],
  onShuffle,
  onSelectArticle,
  savedIds = [],
  onToggleBookmark,
  batchIndex = 1,
  totalBatches = 3,
  remainingUnseen = 10,
  totalSeenToday = 5,
  totalPoolSize = 15,
  isResetCycle = false,
  onResetTodayHistory,
  isLiveWire = false,
  isRefreshingLive = false,
  onRefreshLiveWire,
  currentHour
}) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [dealtCount, setDealtCount] = useState(5);
  const [viewMode, setViewMode] = useState('spread'); // 'spread' | 'grid'
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const carouselRef = useRef(null);

  // Trigger Shuffle with World Map Zig-Zag Magnifier Scanning Animation + Sound
  const handleShuffle = () => {
    sound.playClick();
    setIsScanning(true);
    setScanStepIndex(0);
    setDealtCount(0);
    setActiveCardIndex(0);

    // Play scanner futuristic sound
    sound.playMagnifierScan();

    // Step through the scanner radar messages (460ms * 5 = 2.3s)
    const stepInterval = setInterval(() => {
      setScanStepIndex((prev) => {
        if (prev < SCAN_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 460);

    // Complete scan after 2.3 seconds, then deal cards one by one
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
        }, i * 160);
      }
    }, 2300);
  };

  const filteredArticles = articles;

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
    <section id="shuffle-deck" className="relative pt-3.5 pb-8 sm:py-16 md:py-20 bg-[#070709] border-t border-white/[0.06] overflow-hidden scroll-mt-28 md:scroll-mt-20">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-white/[0.02] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header & Control Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-6 sm:mb-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-zinc-300 uppercase">
                TODAY'S SELECTION • {formatLocalFullDate().toUpperCase()}
              </span>
              <span className="text-zinc-600">•</span>
              
              {/* 1-Hour Auto-Refresh Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                <Clock size={11} className="text-cyan-400" />
                <span>
                  {typeof currentHour === 'number'
                    ? `Hourly Edition (${String(currentHour).padStart(2, '0')}:00 ${getUserTimeZoneAbbr() || 'Local'}) • Auto-Sync Hourly`
                    : `Refreshed Every 1 Hour • ${getUserTimeZoneAbbr() || 'Local'}`}
                </span>
              </div>

              <span className="text-zinc-600">•</span>
              {/* Daily Deduplication Guarantee Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                <ShieldCheck size={11} className="text-emerald-400" />
                <span>Zero-Repeat Guarantee</span>
              </div>

              <span className="text-zinc-600">•</span>
              {/* Top Publications Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono text-zinc-200">
                <Globe size={11} className="text-emerald-400" />
                <span>15 Premier Outlets</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Top 5 AI Stories
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              Fresh AI news from the world's best 15 publications, automatically refreshed every 1 hour in your local time with zero duplicates.
            </p>
          </div>

          {/* Shuffle Action Button & Status Counter */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            
            {/* 5 Best AI Stories Curated Set Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-900 border border-white/10 text-xs text-zinc-300 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Curated Set: <strong className="text-white font-mono">{batchIndex} of {totalBatches}</strong></span>
              <span className="text-zinc-600">•</span>
              <span className="text-emerald-400 font-mono font-medium">5 Top Stories</span>
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

            {/* The Main Refresh Button - Prominent on Mobile & Desktop */}
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
              <span>{isScanning ? "Refreshing..." : "Refresh"}</span>
              <Sparkles size={13} className="text-amber-500 animate-pulse" />
            </button>

          </div>
        </div>

        {/* MINIMAL BLACK WORLD MAP WITH SINGLE MAGNIFIER SEARCH ANIMATION */}
        {isScanning && (
          <div className="relative w-full py-8 sm:py-12 px-4 sm:px-8 rounded-2xl sm:rounded-3xl bg-[#09090b] border border-white/10 flex flex-col items-center justify-center my-4 sm:my-6 overflow-hidden">
            
            <style>{`
              @keyframes minimalSearchZigZag {
                0% {
                  transform: translate(14%, 22%);
                }
                25% {
                  transform: translate(72%, 26%);
                }
                50% {
                  transform: translate(20%, 60%);
                }
                75% {
                  transform: translate(68%, 54%);
                }
                100% {
                  transform: translate(14%, 22%);
                }
              }
            `}</style>

            {/* Minimal World Map Vector Canvas */}
            <div className="relative w-full max-w-3xl h-52 sm:h-72 md:h-80 rounded-xl bg-black border border-white/10 overflow-hidden flex items-center justify-center">
              
              {/* Vector World Map SVG */}
              <svg 
                viewBox="0 0 920 440" 
                className="w-full h-full object-contain pointer-events-none select-none"
              >
                {/* Subtle Coordinate Grid Lines */}
                <g stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="3 3">
                  <line x1="0" y1="110" x2="920" y2="110" />
                  <line x1="0" y1="220" x2="920" y2="220" />
                  <line x1="0" y1="330" x2="920" y2="330" />
                  <line x1="230" y1="0" x2="230" y2="440" />
                  <line x1="460" y1="0" x2="460" y2="440" />
                  <line x1="690" y1="0" x2="690" y2="440" />
                </g>

                {/* Continents: Minimalist Dark Zinc Silhouettes */}
                <g fill="#18181b" stroke="#27272a" strokeWidth="1.2" strokeLinejoin="round">
                  {/* North America */}
                  <path d="M 60 70 Q 110 50 170 55 Q 230 40 270 70 Q 290 115 260 140 Q 230 145 200 185 Q 170 215 155 195 Q 140 165 140 135 Q 100 115 70 125 Q 50 100 60 70 Z" />
                  {/* Greenland */}
                  <path d="M 290 35 Q 340 30 330 65 Q 295 75 290 35 Z" />
                  
                  {/* South America */}
                  <path d="M 185 205 Q 240 215 255 255 Q 245 320 210 380 Q 185 410 175 390 Q 165 330 170 270 Q 160 225 185 205 Z" />
                  
                  {/* Europe & Scandinavia */}
                  <path d="M 405 75 Q 460 65 485 95 Q 480 135 440 150 Q 410 140 395 110 Q 395 85 405 75 Z" />
                  {/* UK & Ireland */}
                  <path d="M 375 80 Q 390 75 385 110 Q 370 105 375 80 Z" />
                  
                  {/* Africa */}
                  <path d="M 390 165 Q 480 160 505 210 Q 485 290 445 365 Q 415 370 390 310 Q 365 240 370 190 Q 375 165 390 165 Z" />
                  {/* Madagascar */}
                  <path d="M 520 310 Q 535 320 525 350 Q 515 340 520 310 Z" />
                  
                  {/* Eurasia / Asia Mainland */}
                  <path d="M 490 65 Q 670 50 770 90 Q 820 130 780 190 Q 720 220 640 230 Q 560 210 525 150 Q 490 135 490 65 Z" />
                  
                  {/* Indian Subcontinent */}
                  <path d="M 570 180 Q 625 185 605 255 Q 575 245 570 180 Z" />
                  
                  {/* Japan Archipelago */}
                  <path d="M 785 120 Q 810 130 800 165 Q 780 150 785 120 Z" />
                  
                  {/* Southeast Asia Islands */}
                  <path d="M 660 240 Q 695 245 680 270 Q 650 260 660 240 Z" />
                  <path d="M 700 240 Q 740 250 725 275 Q 690 265 700 240 Z" />
                  
                  {/* Australia & New Zealand */}
                  <path d="M 700 280 Q 795 270 815 320 Q 780 375 710 360 Q 680 325 700 280 Z" />
                  <path d="M 830 360 Q 845 365 835 390 Q 825 380 830 360 Z" />
                </g>
              </svg>

              {/* SINGLE MINIMAL MAGNIFYING GLASS SEARCHING IN ZIG-ZAG */}
              <div 
                className="absolute top-0 left-0 pointer-events-none z-20 w-12 h-12 sm:w-16 sm:h-16"
                style={{
                  animation: 'minimalSearchZigZag 2.3s ease-in-out infinite',
                  willChange: 'transform'
                }}
              >
                <div className="relative w-full h-full">
                  {/* Glass Lens Frame */}
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-white/80 bg-white/[0.06] backdrop-blur-[2px] shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center">
                    {/* Subtle Reflection */}
                    <div className="absolute top-1 left-2 w-3 sm:w-4 h-1 sm:h-1.5 rounded-full bg-white/40 rotate-[-45deg]" />
                    {/* Center Focus Reticle */}
                    <div className="w-1.5 h-1.5 rounded-full bg-white/90" />
                    <div className="absolute w-3 sm:w-4 h-[1px] bg-white/40" />
                    <div className="absolute h-3 sm:h-4 w-[1px] bg-white/40" />
                  </div>

                  {/* Sleek Minimal Handle at 45 degrees */}
                  <div 
                    className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-1.5 sm:w-2 h-5 sm:h-7 bg-zinc-300 rounded-full border border-white/20 shadow-sm"
                    style={{ transform: 'rotate(-45deg)', transformOrigin: 'top center' }}
                  />
                </div>
              </div>

            </div>

            {/* Minimal Status Caption & Progress */}
            <div className="flex flex-col items-center justify-center gap-2 mt-5 text-center">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>Searching global AI news...</span>
              </div>
              <p className="text-[11px] text-zinc-500 font-mono">
                Scanning verified dispatches across international publications
              </p>
              <div className="w-44 sm:w-60 h-1 bg-zinc-800 rounded-full overflow-hidden mt-1">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${((scanStepIndex + 1) / SCAN_STEPS.length) * 100}%` }}
                />
              </div>
            </div>

          </div>
        )}

        {/* EMPTY STATE: When no articles pass the 24-hour freshness filter */}
        {!isScanning && filteredArticles.length === 0 && (
          <div className="py-16 sm:py-24 px-4 text-center rounded-3xl bg-zinc-950/60 border border-white/10 max-w-xl mx-auto my-6 shadow-2xl">
            <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 mb-4">
              <Clock size={28} className="text-amber-400 animate-pulse" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
              Not enough major AI news yet. Check back later.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6 leading-relaxed">
              ReadAiNews enforces a strict 24-hour freshness standard across premier publications. We never backfill today's feed with old news.
            </p>
            <button
              onClick={handleShuffle}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <RotateCw size={14} />
              <span>Scan Wire Now</span>
            </button>
          </div>
        )}

        {/* THE CARDS SPREAD ACROSS SCREEN */}
        {!isScanning && filteredArticles.length > 0 && (
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
                <div className={`grid sm:grid-cols-2 ${
                  filteredArticles.length === 1 ? 'lg:grid-cols-1 max-w-md mx-auto' :
                  filteredArticles.length === 2 ? 'lg:grid-cols-2 max-w-2xl mx-auto' :
                  filteredArticles.length === 3 ? 'lg:grid-cols-3 max-w-4xl mx-auto' :
                  filteredArticles.length === 4 ? 'lg:grid-cols-4 max-w-5xl mx-auto' :
                  'lg:grid-cols-5'
                } gap-3.5 xl:gap-5`}>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6">
                  {filteredArticles.slice(0, 5).map((article, idx) => (
                    <div key={article.id} className={idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""}>
                      <NewsCard
                        article={article}
                        onSelect={onSelectArticle}
                        isBookmarked={savedIds.includes(article.id)}
                        onToggleBookmark={onToggleBookmark}
                        viewMode="grid"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom notification indicator */}
            <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 py-3.5 px-4 sm:px-5 rounded-2xl bg-zinc-950/80 border border-white/5 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                <span className="text-[11px] sm:text-xs">
                  Curated <strong>5 Premier AI Stories</strong> • <strong>Refreshed every 1 hour</strong>
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px] sm:text-[11px] text-zinc-500">
                <span className="text-zinc-400">Tap "Refresh" to rotate to next 5 stories</span>
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
