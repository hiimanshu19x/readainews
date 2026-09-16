import React from 'react';
import { BookOpen, Sparkles, Lightbulb, X } from 'lucide-react';
import { AI_GLOSSARY } from '../data/aiGlossary';
import { sound } from '../utils/audio';

export default function GlossaryTermCard({ termKey, matchedText, onClose }) {
  const info = AI_GLOSSARY[termKey?.toLowerCase()] || {
    term: matchedText,
    category: "Technical Concept",
    simpleDef: "Advanced algorithmic or engineering architecture utilized in contemporary AI computation.",
    context: "Essential technical component shaping how modern foundation models process information.",
    analogy: "A specialized tool in an engineer's workshop designed for a particular high-precision task."
  };

  return (
    <div 
      className="relative w-full max-w-md rounded-3xl bg-[#0c0c10] border border-white/20 p-5 sm:p-7 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] text-left text-zinc-200 z-50 backdrop-blur-2xl animate-deal"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
            <BookOpen size={16} />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-amber-400/90 font-semibold mb-0.5 truncate">
              {info.category}
            </div>
            <h3 className="text-base sm:text-xl font-bold text-white tracking-tight leading-tight truncate">
              {info.term}
            </h3>
          </div>
        </div>
        
        {onClose && (
          <button 
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-all shrink-0 cursor-pointer"
            aria-label="Close"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Plain English Meaning */}
      <div className="mb-4">
        <div className="text-[10px] sm:text-[11px] uppercase font-mono text-zinc-400 font-bold mb-1.5 flex items-center gap-1.5">
          <Sparkles size={11} className="text-amber-400" />
          <span>Plain-English Meaning</span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-100 font-medium leading-relaxed bg-white/[0.04] p-3.5 rounded-2xl border border-white/5">
          {info.simpleDef}
        </p>
      </div>

      {/* Real-World Context */}
      <div className="mb-4 text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-3.5 rounded-2xl border border-white/5">
        <span className="text-zinc-500 font-mono uppercase text-[10px] block font-bold mb-1 tracking-wider">
          Industry Context:
        </span>
        {info.context}
      </div>

      {/* Mental Analogy */}
      {info.analogy && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs sm:text-sm text-amber-200/95 leading-relaxed flex items-start gap-2.5">
          <Lightbulb size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300 font-semibold">Think of it like: </strong>
            <span>{info.analogy}</span>
          </div>
        </div>
      )}

      {/* Footer Tap-to-dismiss hint */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
        <span>Vocabulary Insight</span>
        <span className="text-zinc-400">Tap anywhere outside to close</span>
      </div>
    </div>
  );
}

/**
 * Text renderer that scans paragraphs for glossary terms and makes them interactive.
 * Supports `seenTerms` Set to guarantee no term is ever repeated/tagged twice in the same article.
 */
export function HighlightedArticleBody({ text, onSelectTerm, seenTerms = null }) {
  if (!text) return null;

  // Build sorted regex pattern of terms
  const terms = Object.keys(AI_GLOSSARY).sort((a, b) => b.length - a.length);
  // Match whole words or phrases case-insensitively
  const pattern = new RegExp(`\\b(${terms.map(t => t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})\\b`, 'gi');

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    const matchedTerm = match[0];
    const termKey = matchedTerm.toLowerCase();
    const matchStart = match.index;
    const matchEnd = matchStart + matchedTerm.length;

    // If this term has already been introduced/highlighted in this article, keep as regular text
    if (seenTerms && seenTerms.has(termKey)) {
      continue;
    }

    // Add preceding text
    if (matchStart > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, matchStart) });
    }

    // Mark as seen so it's NEVER repeated
    if (seenTerms) {
      seenTerms.add(termKey);
    }

    // Add matched term
    parts.push({
      type: 'term',
      content: matchedTerm,
      termKey: termKey
    });

    lastIndex = matchEnd;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return (
    <span>
      {parts.map((part, i) => {
        if (part.type === 'text') {
          return <React.Fragment key={i}>{part.content}</React.Fragment>;
        }
        return (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              sound.playClick();
              onSelectTerm(part.termKey, part.content, e.currentTarget);
            }}
            className="inline-flex items-center gap-1 px-1.5 py-0.5 mx-0.5 rounded-md bg-white/[0.08] hover:bg-white/[0.14] border-b border-dashed border-amber-400/80 hover:border-amber-400 text-zinc-100 font-medium text-inherit cursor-pointer transition-all duration-150 group align-baseline"
            title="Tap to view vocabulary definition & real-world context"
          >
            <span className="group-hover:text-white transition-colors">
              {part.content}
            </span>
            <Sparkles size={9} className="text-amber-400/90 group-hover:text-amber-300 shrink-0" />
          </button>
        );
      })}
    </span>
  );
}
