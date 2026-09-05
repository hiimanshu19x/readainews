import React, { useState } from 'react';
import { Bookmark, ArrowRight, Clock, ExternalLink } from 'lucide-react';
import ContextualThumbnail from './ContextualThumbnail';
import MeshThumbnail from './MeshThumbnail';
import { sound } from '../utils/audio';
import { formatLocalShortDate } from '../utils/timeZone';

export default function NewsCard({ 
  article, 
  onSelect, 
  isBookmarked = false, 
  onToggleBookmark,
  viewMode = 'grid', // 'grid' | 'spread' | 'row'
  animationDelay = 0 
}) {
  const [imgError, setImgError] = useState(false);

  const handleBookmark = (e) => {
    e.stopPropagation();
    sound.playClick();
    onToggleBookmark(article.id);
  };

  if (viewMode === 'row') {
    return (
      <div 
        onClick={() => { sound.playClick(); onSelect(article); }}
        className="group flex items-center justify-between p-3.5 sm:p-5 rounded-2xl bg-[#0e0e11] hover:bg-[#15151a] active:bg-[#15151a] border border-white/[0.08] hover:border-white/20 transition-all duration-200 cursor-pointer gap-3 sm:gap-4 shadow-sm"
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          {/* Thumbnail */}
          <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 bg-zinc-950">
            {!imgError && article.imageUrl ? (
              <img 
                src={article.imageUrl} 
                alt="" 
                onError={() => setImgError(true)}
                className="w-full h-full object-cover" 
                loading="lazy" 
              />
            ) : (
              <ContextualThumbnail context={article.context || 'frontier_models'} theme={article.meshTheme} className="w-full h-full" />
            )}
          </div>

          <div className="flex flex-col gap-1 min-w-0">
            {/* Meta row */}
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-zinc-400">
              <span className="text-zinc-400">{article.timeAgo}</span>
            </div>

            {/* Headline */}
            <h4 className="text-xs sm:text-base font-bold text-white group-hover:text-zinc-100 transition-colors line-clamp-2 leading-snug">
              {article.title?.replace(/&#(\d+);/g, (_, c) => String.fromCharCode(Number(c))).replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&#39;/g, "'")}
            </h4>

            {/* Source mention at bottom (Direct Outbound Link) */}
            <a 
              href={article.sourceUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { e.stopPropagation(); sound.playClick(); }}
              className="text-[10px] sm:text-[11px] font-normal text-zinc-500 hover:text-white truncate flex items-center gap-1 transition-colors w-fit"
              title={`Open direct original article on ${article.source}`}
            >
              <span>Source:</span> <strong className="text-zinc-400 hover:text-white font-medium underline decoration-white/20 underline-offset-2">{article.source}</strong>
              <ExternalLink size={9} className="opacity-70" />
            </a>
          </div>
        </div>

        {/* Right action button */}
        <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
          <button
            onClick={handleBookmark}
            title={isBookmarked ? "Remove Bookmark" : "Save Story"}
            className="p-2 rounded-full text-zinc-400 hover:text-white active:scale-90 transition-all"
          >
            <Bookmark size={15} className={isBookmarked ? "fill-white text-white" : ""} />
          </button>
          <div className="p-1 text-zinc-500 group-hover:text-white transition-colors hidden sm:block">
            <ArrowRight size={15} />
          </div>
        </div>
      </div>
    );
  }

  // Card view (Grid & Spread deck)
  return (
    <div 
      onClick={() => { sound.playClick(); onSelect(article); }}
      style={{ animationDelay: `${animationDelay}ms` }}
      className={`group relative flex flex-col rounded-[22px] bg-[#0c0c0f] hover:bg-[#121217] active:scale-[0.98] border border-white/[0.08] hover:border-white/20 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg h-full`}
    >
      {/* Article Preview Image */}
      <div className="relative w-full h-36 sm:h-44 overflow-hidden bg-zinc-950 border-b border-white/5 flex-shrink-0">
        {!imgError && article.imageUrl ? (
          <img 
            src={article.imageUrl} 
            alt="" 
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
            loading="lazy"
          />
        ) : (
          <ContextualThumbnail 
            context={article.context || 'frontier_models'} 
            theme={article.meshTheme} 
            className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out" 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] via-transparent to-black/30 pointer-events-none" />
        
        {/* Source Badge Pill */}
        <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-medium text-zinc-300 flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
          <span className="truncate max-w-[130px]">{article.source}</span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          title={isBookmarked ? "Remove Bookmark" : "Save Story"}
          className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-zinc-300 hover:text-white active:scale-90 transition-all shadow-md"
        >
          <Bookmark size={13} className={isBookmarked ? "fill-white text-white" : ""} />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-3.5 sm:p-4 xl:p-4.5 flex flex-col flex-1">
        {/* Date & Time */}
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-400 mb-2">
          <span className="text-zinc-300 font-medium font-mono">
            {article.timeAgo?.includes('Today') ? 'Today' : formatLocalShortDate(article.publishedEpoch || article.publishedDate)}
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400 font-mono">
            {article.timeAgo?.replace('Today • ', '') || article.timeAgo}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[13px] sm:text-base font-bold text-white leading-snug group-hover:text-zinc-100 transition-colors mb-2 line-clamp-2">
          {article.title?.replace(/&#(\d+);/g, (_, c) => String.fromCharCode(Number(c))).replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16))).replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&#39;/g, "'")}
        </h3>

        {/* AI Crafted Summary */}
        <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">
          {article.summary}
        </p>

        {/* Bottom Metadata & Source Mention */}
        <div className="mt-auto pt-2.5 border-t border-white/[0.06] flex items-center justify-between gap-2 text-xs">
          <a 
            href={article.sourceUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { e.stopPropagation(); sound.playClick(); }}
            className="text-[10px] sm:text-[11px] text-zinc-500 hover:text-white truncate flex-1 min-w-0 flex items-center gap-1 transition-colors" 
            title={`Open direct article on ${article.source}`}
          >
            <span>Source:</span> <strong className="text-zinc-400 hover:text-white font-normal underline decoration-white/20 underline-offset-2">{article.source}</strong>
            <ExternalLink size={9} className="opacity-70 flex-shrink-0" />
          </a>

          <span className="shrink-0 whitespace-nowrap inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">
            <span className="whitespace-nowrap">Read brief</span>
            <ArrowRight size={12} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
