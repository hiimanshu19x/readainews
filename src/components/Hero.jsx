import React from 'react';
import { ArrowRight, Bookmark, MoreHorizontal } from 'lucide-react';
import MeshThumbnail from './MeshThumbnail';
import { sound } from '../utils/audio';
import { formatCardDateBadges } from '../utils/timeZone';
import { decodeHtmlEntities } from '../utils/newsPipeline';

export default function Hero({ 
  onStartReading, 
  onSeePreview, 
  previewArticle,
  isBookmarked = false,
  onToggleBookmark
}) {
  const previewBadges = formatCardDateBadges(previewArticle?.publishedEpoch || previewArticle?.publishedDate);
  return (
    <section className="relative pt-6 pb-20 sm:pt-12 sm:pb-28 md:pt-16 md:pb-36 overflow-hidden bg-[#050505]">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[250px] sm:h-[300px] bg-white/[0.03] blur-[90px] sm:blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Subheading Badge */}
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-5">
              <span className="px-2.5 py-1 rounded-full bg-zinc-900 border border-white/10 text-[10px] sm:text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                AI NEWS, CURATED DAILY
              </span>
            </div>

            {/* Main Headline matching inspiration font & size */}
            <h1 className="text-[34px] xs:text-[38px] sm:text-5xl lg:text-[62px] font-extrabold text-white tracking-tight leading-[1.1] sm:leading-[1.08] mb-4 sm:mb-6">
              The most important <br className="hidden sm:inline" />
              AI & tech news. <br />
              <span className="text-zinc-400">Nothing else.</span>
            </h1>

            {/* Body Description */}
            <p className="text-sm sm:text-base md:text-lg text-zinc-400 font-normal leading-relaxed max-w-xl mb-6 sm:mb-8">
              We read everything, so you don't have to. ReadAiNews uses AI to find, filter, and summarize the most important stories in AI and technology. No noise, no clickbait, just what matters.
            </p>

            {/* Pill Buttons: Mobile-First Responsive Stack */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
              <button
                onClick={() => {
                  sound.playClick();
                  onStartReading();
                }}
                className="group flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 active:scale-95 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                <span>Start reading - it's free</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onSeePreview(previewArticle);
                }}
                className="flex items-center justify-center h-12 px-6 rounded-full bg-black/60 text-zinc-300 font-medium text-sm border border-zinc-700/80 hover:border-zinc-500 hover:text-white active:scale-95 transition-all backdrop-blur-sm cursor-pointer"
              >
                See a preview
              </button>
            </div>

            {/* Social Proof Avatars */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2 overflow-hidden flex-shrink-0">
                <img
                  className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-black object-cover filter grayscale contrast-125"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="User avatar 1"
                />
                <img
                  className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-black object-cover filter grayscale contrast-125"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="User avatar 2"
                />
                <img
                  className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-black object-cover filter grayscale contrast-125"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                  alt="User avatar 3"
                />
                <img
                  className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-black object-cover filter grayscale contrast-125"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                  alt="User avatar 4"
                />
              </div>
              <span className="text-[11px] sm:text-xs text-zinc-400 font-medium">
                Join <strong className="text-zinc-200">1,000+</strong> builders, researchers and curious minds
              </span>
            </div>

          </div>

          {/* Right Column: Floating Device Card Mockup + Annotation Arrow */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-4 lg:mt-0">
            
            {/* Hand-drawn Annotation Arrow & Text matching inspiration image */}
            <div className="hidden sm:flex absolute -top-8 -right-4 lg:-right-6 flex-col items-center z-20 pointer-events-none">
              <span className="font-serif italic text-zinc-300 text-sm tracking-wide transform -rotate-6">
                Focused<br />on what<br />moves AI<br />forward.
              </span>
              <svg className="w-12 h-14 text-zinc-400 mt-1 transform -rotate-12" viewBox="0 0 50 60" fill="none">
                <path
                  d="M 40,5 C 45,25 25,45 8,48 M 8,48 L 18,44 M 8,48 L 14,56"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Mobile / Modern Phone Mockup Card (Daily Featured Preview Article) */}
            <div 
              onClick={() => { sound.playClick(); onSeePreview(previewArticle); }}
              className="relative w-full max-w-[310px] sm:max-w-[360px] rounded-[28px] sm:rounded-[32px] p-2.5 sm:p-3 bg-gradient-to-b from-zinc-800/80 to-zinc-950/90 border border-white/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9),0_0_1px_1px_rgba(255,255,255,0.15)] transform lg:rotate-1 hover:rotate-0 transition-transform duration-500 cursor-pointer group"
            >
              
              {/* Phone Inner Container */}
              <div className="w-full rounded-[22px] sm:rounded-[24px] bg-[#09090b] overflow-hidden border border-white/10 p-3.5 sm:p-4 flex flex-col">
                
                {/* Mockup Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-white/5 mb-3 text-xs text-zinc-400">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-zinc-800 border border-white/20 flex items-center justify-center shrink-0">
                      <span className="font-bold text-[9px] sm:text-[10px] text-white">
                        {previewArticle?.source ? previewArticle.source.charAt(0) : 'A'}
                      </span>
                    </div>
                    <span className="font-medium text-white text-[10px] sm:text-[11px] truncate">
                      {previewArticle?.source || 'Premier AI Wire'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500 shrink-0">
                    <span className="text-[10px] font-mono">
                      {previewBadges.timeAgo || '15m ago'}
                    </span>
                    <MoreHorizontal size={13} />
                  </div>
                </div>

                {/* Article Image Preview */}
                <div className="w-full h-36 sm:h-44 rounded-xl overflow-hidden mb-3 border border-white/10 shadow-inner bg-zinc-950">
                  {previewArticle?.imageUrl ? (
                    <img 
                      src={previewArticle.imageUrl} 
                      alt={previewArticle.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy"
                    />
                  ) : (
                    <MeshThumbnail theme={previewArticle?.meshTheme || 'ribbon'} className="w-full h-full" />
                  )}
                </div>

                {/* Daily Preview Story Badge (No green category tag) */}
                <div className="mb-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span className="text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider text-cyan-300 uppercase">
                    DAILY PREVIEW STORY
                  </span>
                </div>

                {/* Headline */}
                <h3 className="text-sm sm:text-base font-bold text-white leading-snug mb-2 line-clamp-2 group-hover:text-zinc-100 transition-colors">
                  {decodeHtmlEntities(previewArticle?.title || 'Frontier Labs Introduce Unified Air-Gap Protocols for Autonomous Coding Agents')}
                </h3>

                {/* Snippet */}
                <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                  {decodeHtmlEntities(previewArticle?.summary || 'Leading frontier artificial intelligence laboratories agreed on unified hardware isolation rules to prevent experimental autonomous software from escaping research sandboxes.')}
                </p>

                {/* Card Footer */}
                <div className="mt-auto pt-2 flex items-center justify-between border-t border-white/5 text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-zinc-200 group-hover:text-white text-xs">
                    <span>Read full story</span>
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </span>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      sound.playClick(); 
                      if (onToggleBookmark && previewArticle?.id) {
                        onToggleBookmark(previewArticle.id);
                      }
                    }}
                    className="text-zinc-400 hover:text-white p-1 cursor-pointer"
                    title={isBookmarked ? "Remove Bookmark" : "Save Story"}
                  >
                    <Bookmark size={14} className={isBookmarked ? "fill-white text-white" : ""} />
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Earth Horizon Curved Arc Glow at the bottom of the hero section */}
      <div className="horizon-arc -bottom-[480px]" />
    </section>
  );
}
