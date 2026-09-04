import React, { useState } from 'react';
import { Search, X, Bookmark, ArrowRight, Clock } from 'lucide-react';
import { sound } from '../utils/audio';

export default function SearchModal({ 
  isOpen, 
  onClose, 
  articles = [], 
  onSelectArticle,
  savedIds = [],
  mode = 'search' // 'search' | 'saved'
}) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredArticles = mode === 'saved'
    ? articles.filter(a => savedIds.includes(a.id))
    : articles.filter(a => 
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.category.toLowerCase().includes(query.toLowerCase()) ||
        a.summary.toLowerCase().includes(query.toLowerCase()) ||
        a.source.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={() => { sound.playClick(); onClose(); }} />

      <div className="relative w-full max-w-xl rounded-3xl bg-[#0e0e12] border border-white/20 shadow-2xl overflow-hidden z-10">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search size={18} className="text-zinc-400 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={mode === 'saved' ? "Filter your saved stories..." : "Search breakthrough AI models, robotics, papers..."}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X size={17} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {mode === 'saved' && (
            <div className="px-2 pb-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
              <Bookmark size={13} className="text-white fill-white" />
              <span>Your Saved Stories ({filteredArticles.length})</span>
            </div>
          )}

          {filteredArticles.length === 0 ? (
            <div className="py-12 text-center text-sm text-zinc-500">
              {mode === 'saved' 
                ? "You haven't bookmarked any AI news stories yet. Click the bookmark icon on any card!" 
                : "No matching AI stories found. Try searching 'OpenAI', 'Claude', 'Robotics', or 'DeepSeek'."}
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  sound.playClick();
                  onSelectArticle(article);
                  onClose();
                }}
                className="group flex items-center justify-between p-3.5 rounded-2xl hover:bg-zinc-800/60 transition-colors cursor-pointer border border-transparent hover:border-white/10"
              >
                <div className="flex flex-col gap-1 min-w-0 pr-3">
                  <div className="flex items-center gap-2 text-[10px] text-zinc-400 uppercase font-semibold">
                    <span className="text-zinc-300">{article.category}</span>
                    <span>•</span>
                    <span className="text-zinc-500">{article.source}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-200 group-hover:text-white line-clamp-1">
                    {article.title}
                  </h4>
                </div>

                <div className="text-zinc-500 group-hover:text-white flex-shrink-0">
                  <ArrowRight size={15} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="py-2.5 px-4 bg-zinc-950/60 border-t border-white/5 text-[11px] text-zinc-500 flex items-center justify-between">
          <span>ReadAiNews Curation Engine</span>
          <span>ESC to exit</span>
        </div>

      </div>
    </div>
  );
}
