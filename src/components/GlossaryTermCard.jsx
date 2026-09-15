import React, { useState } from 'react';
import { BookOpen, Sparkles, Lightbulb, Compass, X } from 'lucide-react';
import { AI_GLOSSARY } from '../data/aiGlossary';
import { sound } from '../utils/audio';

export default function GlossaryTermCard({ termKey, matchedText, onClose }) {
  const info = AI_GLOSSARY[termKey.toLowerCase()] || {
    term: matchedText,
    category: "Technical Concept",
    simpleDef: "Advanced algorithmic or engineering architecture utilized in contemporary AI computation.",
    context: "Essential technical component shaping how modern foundation models process information.",
    analogy: "A specialized tool in an engineer's workshop designed for a particular high-precision task."
  };

  return (
    <div 
      className="relative w-full max-w-sm rounded-2xl bg-[#0f0f14] border border-white/20 p-4 sm:p-5 shadow-2xl text-left text-zinc-200 z-50 animate-deal backdrop-blur-xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 mb-2.5 pb-2.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <BookOpen size={13} />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              {info.category}
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white leading-tight">
              {info.term}
            </h4>
          </div>
        </div>
        
        {onClose && (
          <button 
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Plain English Meaning */}
      <div className="mb-3">
        <div className="text-[10px] uppercase font-mono text-zinc-400 font-bold mb-1 flex items-center gap-1">
          <Sparkles size={11} className="text-amber-400" />
          <span>Plain-English Meaning</span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-100 font-medium leading-relaxed bg-black/40 p-2.5 rounded-xl border border-white/5">
          {info.simpleDef}
        </p>
      </div>

      {/* Real-World Context */}
      <div className="mb-3 text-[11px] sm:text-xs text-zinc-300 leading-relaxed">
        <span className="text-zinc-500 font-mono uppercase text-[9px] block font-bold mb-0.5">Industry Context:</span>
        {info.context}
      </div>

      {/* Mental Analogy */}
      {info.analogy && (
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 leading-snug flex items-start gap-2">
          <Lightbulb size={13} className="text-amber-400 shrink-0 mt-0.5" />
          <span><strong className="text-amber-300">Think of it like:</strong> {info.analogy}</span>
        </div>
      )}
    </div>
  );
}

/**
 * Text renderer that scans paragraphs for glossary terms and makes them interactive.
 */
export function HighlightedArticleBody({ text, onSelectTerm }) {
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
    const matchStart = match.index;
    const matchEnd = matchStart + matchedTerm.length;

    // Add preceding text
    if (matchStart > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, matchStart) });
    }

    // Add matched term
    parts.push({
      type: 'term',
      content: matchedTerm,
      termKey: matchedTerm.toLowerCase()
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
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 hover:text-emerald-200 font-medium text-inherit cursor-pointer transition-all duration-150 group align-baseline"
            title="Click to view technical meaning & context"
          >
            <span className="underline decoration-emerald-500/50 decoration-dotted underline-offset-4 group-hover:decoration-emerald-400">
              {part.content}
            </span>
            <span className="text-[10px] opacity-70 text-emerald-400">ℹ</span>
          </button>
        );
      })}
    </span>
  );
}
