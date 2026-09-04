import React, { useState } from 'react';
import { Sparkles, Calendar, Trophy, Bookmark, ArrowRight, Filter, ChevronDown } from 'lucide-react';
import MeshThumbnail from './MeshThumbnail';
import { sound } from '../utils/audio';

export default function WeeklyCollection({ 
  articles = [], 
  onSelectArticle, 
  savedIds = [], 
  onToggleBookmark 
}) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedWeek, setSelectedWeek] = useState('1st Week of Sept 2026');

  // Filter weekly best items
  const weeklyArticles = articles.filter(a => a.isWeeklyBest);

  const categories = ['ALL', 'AI MODELS', 'AI INDUSTRY', 'ROBOTICS', 'OPEN SOURCE', 'SCIENCE & AI'];

  const filtered = activeCategory === 'ALL'
    ? weeklyArticles
    : weeklyArticles.filter(a => a.category.toUpperCase().includes(activeCategory));

  return (
    <section id="weekly-collection" className="py-10 md:py-20 bg-[#09090c] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header Banner */}
        <div className="rounded-[24px] sm:rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border border-white/10 p-5 sm:p-10 mb-8 sm:mb-10 relative overflow-hidden">
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
              {/* EDITION PILL: 1st week, 2nd week of sept */}
              <div className="px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-black/50 border border-white/10 flex items-center gap-2.5 sm:gap-3 hover:border-white/25 transition-all">
                <Calendar size={15} className="text-zinc-400 shrink-0" />
                <div className="text-[10px] sm:text-xs flex flex-col">
                  <div className="text-zinc-500 font-mono text-[9px] sm:text-[10px]">EDITION</div>
                  <div className="relative flex items-center gap-1">
                    <select
                      value={selectedWeek}
                      onChange={(e) => {
                        sound.playClick();
                        setSelectedWeek(e.target.value);
                      }}
                      className="bg-transparent text-white font-medium focus:outline-none cursor-pointer pr-4 appearance-none"
                    >
                      <option value="1st Week of Sept 2026" className="bg-zinc-900 text-white">1st Week of Sept 2026</option>
                      <option value="2nd Week of Sept 2026" className="bg-zinc-900 text-white">2nd Week of Sept 2026</option>
                      <option value="4th Week of Aug 2026" className="bg-zinc-900 text-white">4th Week of Aug 2026</option>
                      <option value="3rd Week of Aug 2026" className="bg-zinc-900 text-white">3rd Week of Aug 2026</option>
                    </select>
                    <ChevronDown size={12} className="text-zinc-400 pointer-events-none absolute right-0" />
                  </div>
                </div>
              </div>

              {/* CURATION PILL: According to articles listed on our site */}
              <div className="px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-black/50 border border-white/10 flex items-center gap-2.5 sm:gap-3">
                <Sparkles size={15} className="text-amber-400 shrink-0" />
                <div className="text-[10px] sm:text-xs">
                  <div className="text-zinc-500 font-mono text-[9px] sm:text-[10px]">CURATION</div>
                  <div className="text-white font-medium">
                    Top {weeklyArticles.length} of {articles.length || 10} site stories
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 mt-6 pt-4 sm:mt-8 sm:pt-6 border-t border-white/10 overflow-x-auto no-scrollbar text-xs">
            <span className="text-zinc-500 flex items-center gap-1 mr-1 font-medium text-[11px] flex-shrink-0">
              <Filter size={12} /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { sound.playClick(); setActiveCategory(cat); }}
                className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all border text-[11px] sm:text-xs ${
                  activeCategory === cat
                    ? 'bg-white text-black border-white shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Weekly Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((article, idx) => {
            const isSaved = savedIds.includes(article.id);
            return (
              <div
                key={article.id}
                onClick={() => { sound.playClick(); onSelectArticle(article); }}
                className="group relative flex flex-col rounded-[22px] bg-[#0d0d10] hover:bg-[#131318] active:scale-[0.98] border border-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg"
              >
                {/* Ranking Trophy Pill & Mesh Header */}
                <div className="relative w-full h-36 sm:h-44 overflow-hidden border-b border-white/5 flex-shrink-0">
                  <MeshThumbnail theme={article.meshTheme} className="w-full h-full transform group-hover:scale-105 transition-transform duration-500" />
                  
                  {/* Rank Badge */}
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-bold text-white flex items-center gap-1.5 shadow-md">
                    <span className="text-amber-400 font-mono text-xs">#{idx + 1}</span>
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

      </div>
    </section>
  );
}
