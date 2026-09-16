import React, { useState, useEffect } from 'react';
import { 
  X, 
  Bookmark, 
  ExternalLink, 
  Share2, 
  Check, 
  Sparkles, 
  Clock, 
  FileText, 
  CheckCircle2, 
  Eye, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import ContextualThumbnail from './ContextualThumbnail';
import MeshThumbnail from './MeshThumbnail';
import { sound } from '../utils/audio';
import { formatLocalShortDate, formatCardDateBadges } from '../utils/timeZone';
import { decodeHtmlEntities } from '../utils/newsPipeline';
import GlossaryTermCard, { HighlightedArticleBody } from './GlossaryTermCard';

export default function ArticleModal({ 
  article, 
  onClose, 
  isBookmarked = false, 
  onToggleBookmark 
}) {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [activeGlossaryTerm, setActiveGlossaryTerm] = useState(null);
  const { dayLabel, timeAgo } = formatCardDateBadges(article?.publishedEpoch || article?.publishedDate);

  // Lock background page scroll while article modal is open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevTouchAction = document.body.style.touchAction;
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.touchAction = prevTouchAction;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

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
    return article?.canonicalUrl || article?.originalUrl || article?.sourceUrl || '#';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden animate-deal">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0" 
        onClick={() => { sound.playClick(); onClose(); }} 
      />

      {/* Modal Dialog with Unified Smooth Scrolling */}
      <div className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[88vh] rounded-t-[28px] sm:rounded-3xl bg-[#0d0d12] border-t sm:border border-white/20 shadow-2xl overflow-y-auto overscroll-contain z-10 flex flex-col scroll-smooth">
        
        {/* Sticky Floating Controls Layer */}
        <div className="sticky top-0 left-0 right-0 z-30 pointer-events-none p-3 sm:p-4 flex items-center justify-between">
          {/* Source Outlet Badge */}
          <a
            href={getDirectOriginalUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { e.stopPropagation(); sound.playClick(); }}
            title={`Open original article on ${article.source}`}
            className="pointer-events-auto px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs text-white font-semibold flex items-center gap-1.5 shadow-xl hover:bg-black hover:border-white/30 transition-all group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{article.source}</span>
            <ExternalLink size={10} className="text-zinc-400 group-hover:text-white transition-colors" />
          </a>

          {/* Action Buttons: Share, Bookmark, Close */}
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Share article"
              className="p-2 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-zinc-300 hover:text-white active:scale-90 transition-all shadow-xl cursor-pointer"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
            </button>

            <button
              onClick={() => { sound.playClick(); onToggleBookmark(article.id); }}
              title={isBookmarked ? "Remove bookmark" : "Save story"}
              className="p-2 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-zinc-300 hover:text-white active:scale-90 transition-all shadow-xl cursor-pointer"
            >
              <Bookmark size={14} className={isBookmarked ? "fill-white text-white" : ""} />
            </button>

            <button
              onClick={() => { sound.playClick(); onClose(); }}
              className="p-2 rounded-full bg-black/80 backdrop-blur-md text-zinc-300 hover:text-white border border-white/15 hover:bg-black active:scale-90 transition-all shadow-xl cursor-pointer"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* iOS Drag Handle on Mobile */}
        <div className="sm:hidden w-12 h-1.5 rounded-full bg-white/25 mx-auto -mt-2 mb-2 cursor-pointer z-20" onClick={() => onClose()} />

        {/* Complete Hero Preview Image - Scrolls up naturally with the article */}
        <div className="relative w-full aspect-video max-h-[380px] sm:max-h-[440px] bg-black border-b border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center -mt-14 sm:-mt-16">
          {!imgError && article.imageUrl ? (
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              onError={() => setImgError(true)}
              className="w-full h-full object-contain bg-black" 
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          ) : (
            <ContextualThumbnail context={article.context || 'frontier_models'} theme={article.meshTheme} className="w-full h-full" />
          )}
        </div>

        {/* Modal Content - Scrolls together with image smoothly */}
        <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
          
          {/* Mobile-Optimized Modern Metadata Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-semibold text-white truncate max-w-[130px] xs:max-w-none">
                {article.source}
              </span>
              <span className="text-zinc-600 font-mono shrink-0">•</span>
              <span className="text-zinc-300 font-mono text-[11px] sm:text-xs shrink-0 whitespace-nowrap">
                {dayLabel}
              </span>
              <span className="text-zinc-600 font-mono shrink-0 hidden sm:inline">•</span>
              <span className="text-zinc-400 font-mono text-[11px] sm:text-xs shrink-0 hidden sm:inline whitespace-nowrap">
                {timeAgo}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-zinc-400 font-mono text-[11px] sm:hidden whitespace-nowrap">
                {timeAgo}
              </span>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-zinc-900 border border-white/10 text-[10px] sm:text-[11px] font-mono text-zinc-300">
                <Clock size={11} className="text-zinc-400" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold text-white leading-tight tracking-tight">
            {decodeHtmlEntities(article.title)}
          </h2>

          {/* Executive Summary Callout */}
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-white/10">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-300 uppercase tracking-wider mb-2">
              <Sparkles size={13} className="text-cyan-400" />
              <span>Executive Briefing</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">
              {decodeHtmlEntities(article.summary)}
            </p>
          </div>

          {/* FULL IN-DEPTH 180-200 WORD ARTICLE BODY WITH INTERACTIVE GLOSSARY */}
          <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-normal relative">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-400 pt-1 pb-1">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-white" />
                <span>In-Depth Reporting ({article.source})</span>
              </div>
              <span className="text-[10px] font-mono font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 flex items-center gap-1">
                <Sparkles size={10} className="text-amber-400" />
                <span>Tap underlined terms for meanings</span>
              </span>
            </div>

            {(() => {
              const seenTerms = new Set();
              return article.content.replace(/\\n/g, '\n').split(/\n\s*\n/).map((paragraph, idx) => (
                <p key={idx} className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                  <HighlightedArticleBody 
                    text={paragraph.trim()} 
                    seenTerms={seenTerms}
                    onSelectTerm={(termKey, matchedText) => {
                      setActiveGlossaryTerm({ termKey, matchedText });
                    }}
                  />
                </p>
              ));
            })()}
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
              <span className="text-[11px] text-zinc-500">Opens original article on {article.source}</span>
            </div>

            <a
              href={getDirectOriginalUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-6 rounded-full bg-white text-black font-semibold text-sm hover:bg-zinc-200 active:scale-95 transition-all shadow-md"
            >
              <span>Read Original on {article.source}</span>
              <ExternalLink size={13} />
            </a>
          </div>

        </div>

      </div>

      {/* Premium Vocabulary Explainer Modal Popup with Backdrop Blur */}
      {activeGlossaryTerm && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-deal"
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick();
            setActiveGlossaryTerm(null);
          }}
        >
          <div 
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <GlossaryTermCard 
              termKey={activeGlossaryTerm.termKey}
              matchedText={activeGlossaryTerm.matchedText}
              onClose={() => setActiveGlossaryTerm(null)}
            />
          </div>
        </div>
      )}

    </div>
  );
}
