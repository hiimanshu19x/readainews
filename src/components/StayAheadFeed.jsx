import React from 'react';
import { ArrowRight, Bookmark } from 'lucide-react';
import MeshThumbnail from './MeshThumbnail';
import { sound } from '../utils/audio';

export default function StayAheadFeed({ 
  articles = [], 
  onSelectArticle,
  savedIds = [],
  onToggleBookmark,
  onExploreMore
}) {
  const displayStories = articles.slice(1, 4);

  return (
    <section className="py-20 md:py-28 bg-white text-zinc-950 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Button */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-4">
              STAY AHEAD
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight leading-[1.15] mb-6">
              For a faster, <br />
              smarter tomorrow.
            </h2>

            <p className="text-base text-zinc-600 leading-relaxed max-w-md mb-8">
              From AI breakthroughs to the technologies shaping our world, ReadAiNews helps you stay informed, inspired, and one step ahead.
            </p>

            <button
              onClick={() => {
                sound.playClick();
                onExploreMore();
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-zinc-950 text-white font-medium text-sm hover:bg-zinc-800 transition-all shadow-md active:scale-95 group"
            >
              <span>Explore latest news</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Column: News Rows matching screenshot */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {displayStories.map((article) => {
              const isSaved = savedIds.includes(article.id);
              return (
                <div
                  key={article.id}
                  onClick={() => {
                    sound.playClick();
                    onSelectArticle(article);
                  }}
                  className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-zinc-50 hover:bg-zinc-100/90 border border-zinc-200/80 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                    {/* Thumbnail matching screenshot */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border border-zinc-200 bg-zinc-900">
                      <MeshThumbnail theme={article.meshTheme} className="w-full h-full" />
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
                        <span className="px-2 py-0.5 rounded-md bg-zinc-200 text-[10px] font-semibold tracking-wider text-zinc-800 uppercase">
                          {article.category}
                        </span>
                        <span>•</span>
                        <span className="text-[11px] font-medium">{article.timeAgo}</span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-black transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h4>

                      <span className="text-[11px] text-zinc-500 mt-1">
                        Source: {article.source}
                      </span>
                    </div>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playClick();
                      onToggleBookmark(article.id);
                    }}
                    className="p-2 rounded-full text-zinc-400 hover:text-black hover:bg-zinc-200/60 transition-colors ml-3 flex-shrink-0"
                    title={isSaved ? "Remove Bookmark" : "Save Story"}
                  >
                    <Bookmark size={18} className={isSaved ? "fill-black text-black" : ""} />
                  </button>
                </div>
              );
            })}

            {/* Bottom Link: See all latest news -> */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onExploreMore();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:text-black group transition-colors"
              >
                <span>See all latest news</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
