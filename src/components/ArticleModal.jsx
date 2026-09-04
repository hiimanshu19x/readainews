import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  ExternalLink, 
  Share2, 
  Check, 
  Sparkles, 
  Clock, 
  FileText
} from 'lucide-react';
import MeshThumbnail from './MeshThumbnail';
import { sound } from '../utils/audio';

export default function ArticleModal({ 
  article, 
  onClose, 
  isBookmarked, 
  onToggleBookmark 
}) {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleShare = () => {
    sound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${article.title} - Read on ReadAiNews: ${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getDirectOriginalUrl = () => {
    return article?.sourceUrl || '#';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden animate-deal">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0" 
        onClick={() => { sound.playClick(); onClose(); }} 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[88vh] rounded-t-[28px] sm:rounded-3xl bg-[#0d0d12] border-t sm:border border-white/20 shadow-2xl overflow-hidden z-10 flex flex-col">
        
        {/* iOS Drag Handle on Mobile */}
        <div className="sm:hidden w-12 h-1.5 rounded-full bg-white/25 mx-auto mt-2.5 mb-1 cursor-pointer" onClick={() => onClose()} />

        {/* Header Visual Mesh - compact on mobile */}
        <div className="relative w-full h-32 sm:h-56 overflow-hidden bg-zinc-950 border-b border-white/10 flex-shrink-0">
          <MeshThumbnail theme={article.meshTheme} className="w-full h-full" />
          
          {/* Close Button */}
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-black/70 backdrop-blur-md text-zinc-300 hover:text-white border border-white/10 hover:bg-black/90 active:scale-90 transition-all shadow-lg"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          {/* Source Outlet Badge (Direct Outbound Link) */}
          <a
            href={article.sourceUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { e.stopPropagation(); sound.playClick(); }}
            title={`Open original article on ${article.source}`}
            className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs text-white font-semibold flex items-center gap-1.5 shadow-md hover:bg-black hover:border-white/30 transition-all group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{article.source}</span>
            <ExternalLink size={10} className="text-zinc-400 group-hover:text-white transition-colors" />
          </a>

          {/* Quick Header Actions */}
          <div className="absolute bottom-2.5 right-3 sm:bottom-3 sm:right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Share article"
              className="p-2 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-zinc-300 hover:text-white active:scale-90 transition-all"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Share2 size={13} />}
            </button>

            <button
              onClick={() => { sound.playClick(); onToggleBookmark(article.id); }}
              title={isBookmarked ? "Remove bookmark" : "Save story"}
              className="p-2 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-zinc-300 hover:text-white active:scale-90 transition-all"
            >
              <Bookmark size={13} className={isBookmarked ? "fill-white text-white" : ""} />
            </button>
          </div>
        </div>

        {/* Modal Content - Scrollable Extensive 220+ Word Journalism */}
        <div className="p-5 sm:p-8 space-y-6 overflow-y-auto flex-1">
          
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-400 pb-2 border-b border-white/10">
            <span className="font-semibold text-white">{article.source}</span>
            <span className="hidden sm:inline">•</span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/20 text-[10px] font-bold text-emerald-300 uppercase">
              AI NEWS
            </span>
            <span>•</span>
            <span>{article.timeAgo}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-zinc-400">
              <Clock size={12} />
              {article.readTime}
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-white leading-tight tracking-tight">
            {article.title}
          </h2>

          {/* Executive Summary Callout */}
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-white/10">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-2">
              <Sparkles size={13} className="text-cyan-400" />
              <span>Executive Briefing</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">
              {article.summary}
            </p>
          </div>

          {/* FULL IN-DEPTH 220+ WORD ARTICLE BODY */}
          <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 pt-1 pb-1">
              <FileText size={14} className="text-white" />
              <span>In-Depth Reporting ({article.source})</span>
            </div>
            {article.content.replace(/\\n/g, '\n').split(/\n\s*\n/).map((paragraph, idx) => (
              <p key={idx} className="text-zinc-300 leading-relaxed">
                {paragraph.trim()}
              </p>
            ))}
          </div>

          {/* KEY TECHNICAL TAKEAWAYS */}
          {article.keyTakeaways && (
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Key Technical Takeaways
              </h3>
              <ul className="space-y-2.5">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-200">
                    <span className="w-5 h-5 rounded-full bg-zinc-800 border border-white/15 text-white flex-shrink-0 flex items-center justify-center text-[10px] font-mono mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* WHY IT MATTERS */}
          {article.whyItMatters && (
            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1.5">
                Why It Matters For Builders & Investors
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {article.whyItMatters}
              </p>
            </div>
          )}

          {/* PRIMARY SOURCE - clear link to original article */}
          <div className="pt-4 border-t border-white/10 space-y-3 pb-4">
            <div className="text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <span>Source:</span>
                <strong className="text-white font-semibold">{article.source}</strong>
              </div>
              <span className="text-[11px] text-zinc-500">Opens the AI section on {article.source}</span>
            </div>

            <a
              href={article.sourceUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 active:scale-95 transition-all shadow-md"
            >
              <span>Read on {article.source}</span>
              <ExternalLink size={13} />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
