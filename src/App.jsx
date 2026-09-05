import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ShuffleSection from './components/ShuffleSection';
import WeeklyCollection from './components/WeeklyCollection';
import FeatureGrid from './components/FeatureGrid';
import AboutSection from './components/AboutSection';
import NewsletterCta from './components/NewsletterCta';
import Footer from './components/Footer';
import ArticleModal from './components/ArticleModal';
import SearchModal from './components/SearchModal';
import InfoModal from './components/InfoModal';
import { allNewsArticles } from './data/newsData';
import { getDailyRefreshedArticles, getDailyPreviewArticle } from './utils/dailyRefresh';
import { fetchFreshLiveArticles } from './utils/liveScraper';
import { sound } from './utils/audio';
import { smoothScrollTo } from './utils/scroll';

const DYNAMIC_ARTICLES_KEY = 'readainews_dynamic_articles_v10';
const BATCH_STORAGE_KEY = 'readainews_1hr_batch_v10_';
const REFRESH_TIMESTAMP_KEY = 'readainews_last_refresh_time_v10';
const ONE_HOUR_MS = 60 * 60 * 1000;

export default function App() {
  const [activeTab, setActiveTab] = useState('today');

  // Master article repository on the website (persists and accumulates all dynamically fetched fresh stories)
  const [allArticles, setAllArticles] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(DYNAMIC_ARTICLES_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const existingIds = new Set(parsed.map(a => a.id));
            return [...parsed, ...allNewsArticles.filter(a => !existingIds.has(a.id))];
          }
        }
      }
    } catch (e) {
      console.warn('Failed to load dynamic articles:', e);
    }
    return allNewsArticles;
  });
  
  // Daily featured preview article that strictly updates once per day
  const [dailyPreviewArticle, setDailyPreviewArticle] = useState(() => {
    return getDailyPreviewArticle(allNewsArticles);
  });
  
  // Top 5 stories deck initialized with fresh cached batch or top 5 articles
  const [shuffleState, setShuffleState] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(BATCH_STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length >= 5) {
            return {
              articles: parsed.slice(0, 5),
              batchIndex: 1,
              totalBatches: 3,
              isResetCycle: false,
              remainingUnseen: 10,
              totalSeenToday: 5,
              totalPoolSize: allNewsArticles.length
            };
          }
        }
      }
    } catch (e) {}
    return {
      articles: allNewsArticles.slice(0, 5),
      batchIndex: 1,
      totalBatches: 3,
      isResetCycle: false,
      remainingUnseen: 10,
      totalSeenToday: 5,
      totalPoolSize: allNewsArticles.length
    };
  });
  
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchModalMode, setSearchModalMode] = useState('search');
  const [activeInfoModal, setActiveInfoModal] = useState(null);
  const [isLiveWire, setIsLiveWire] = useState(true);
  const [isRefreshingLive, setIsRefreshingLive] = useState(false);

  // Fetch & publish brand new live AI articles onto the website
  const handleRefreshToday = async () => {
    setIsRefreshingLive(true);
    try {
      const fresh = await fetchFreshLiveArticles(5);
      if (fresh && fresh.length > 0) {
        // Prepend and save onto website pool
        setAllArticles(prev => {
          const prevFiltered = prev.filter(p => !fresh.some(f => f.id === p.id));
          const combined = [...fresh, ...prevFiltered];
          try {
            const dynamicOnly = combined.filter(a => a.isLiveScraped || !allNewsArticles.some(base => base.id === a.id));
            localStorage.setItem(DYNAMIC_ARTICLES_KEY, JSON.stringify(dynamicOnly));
          } catch (e) {}
          return combined;
        });

        // Display fresh 5 stories on cards
        setShuffleState(prev => {
          const newBatchIndex = (prev.batchIndex % 10) + 1;
          return {
            articles: fresh,
            batchIndex: newBatchIndex,
            totalBatches: Math.max(prev.totalBatches || 3, newBatchIndex),
            isResetCycle: false,
            remainingUnseen: 0,
            totalSeenToday: (prev.totalSeenToday || 5) + fresh.length,
            totalPoolSize: (prev.totalPoolSize || allNewsArticles.length) + fresh.length
          };
        });

        // Update 1-hour interval timer & batch storage
        try {
          localStorage.setItem(REFRESH_TIMESTAMP_KEY, Date.now().toString());
          localStorage.setItem(BATCH_STORAGE_KEY, JSON.stringify(fresh));
        } catch (e) {}
      }
    } catch (err) {
      console.warn('Error refreshing live articles:', err);
    } finally {
      setIsRefreshingLive(false);
    }
  };

  // Load saved bookmarks & manage automated 1-hour background refresh cycle
  useEffect(() => {
    try {
      const stored = localStorage.getItem('readainews_saved_ids');
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to parse bookmarks:', e);
    }

    // Purge legacy caches from previous versions
    try {
      if (typeof window !== 'undefined') {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (
            key.startsWith('readainews_today_batch_') ||
            key.startsWith('readainews_3hr_batch_') ||
            (key.startsWith('readainews_seen_') && !key.includes('_v10')) ||
            (key.startsWith('readainews_1hr_batch_') && !key.includes('_v10'))
          )) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));
      }
    } catch (e) {}

    // Check if current batch is older than 1 hour or missing; if so, refresh
    const checkAndRefresh = async () => {
      const now = Date.now();
      const lastTime = parseInt(localStorage.getItem(REFRESH_TIMESTAMP_KEY) || '0', 10);
      const isExpired = (now - lastTime) >= ONE_HOUR_MS;
      
      if (isExpired || lastTime === 0) {
        await handleRefreshToday();
      }
    };

    checkAndRefresh();

    // Check every 60 seconds to auto-refresh exactly when 1 hour elapses
    const interval = setInterval(checkAndRefresh, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Toggle bookmark & sync with localStorage
  const handleToggleBookmark = (id) => {
    setSavedIds((prev) => {
      let updated;
      if (prev.includes(id)) {
        updated = prev.filter(item => item !== id);
      } else {
        updated = [...prev, id];
      }
      try {
        localStorage.setItem('readainews_saved_ids', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleStartReading = () => {
    setActiveTab('today');
    smoothScrollTo('shuffle-deck');
  };

  const handleSeePreview = (article = null) => {
    setSelectedArticle(article || dailyPreviewArticle || allArticles[0]);
  };

  const handleExploreMore = () => {
    setActiveTab('weekly');
    smoothScrollTo('weekly-collection');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col selection:bg-white selection:text-black">
      
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedIds.length}
        onOpenSearch={() => {
          setSearchModalMode('search');
          setSearchModalOpen(true);
        }}
        onOpenSaved={() => {
          setSearchModalMode('saved');
          setSearchModalOpen(true);
        }}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onStartReading={handleStartReading}
          onSeePreview={handleSeePreview}
          previewArticle={dailyPreviewArticle}
          isBookmarked={savedIds.includes(dailyPreviewArticle?.id)}
          onToggleBookmark={handleToggleBookmark}
        />

        {/* Mobile-Only Sticky Tab Navigation Pill */}
        <div className="md:hidden sticky top-14 z-30 bg-[#050505]/95 backdrop-blur-xl py-2 px-3 border-b border-white/[0.08] flex justify-center transition-all shadow-md">
          <div className="inline-flex p-1 rounded-full bg-zinc-900/90 border border-white/10 shadow-inner">
            <button
              onClick={() => {
                setActiveTab('today');
                smoothScrollTo('shuffle-deck');
              }}
              className={'px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 cursor-pointer ' + (
                activeTab === 'today'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              )}
            >
              Today's Top 5
            </button>
            <button
              onClick={() => {
                setActiveTab('weekly');
                smoothScrollTo('weekly-collection');
              }}
              className={'px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 cursor-pointer ' + (
                activeTab === 'weekly'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              )}
            >
              This Week Collection
            </button>
          </div>
        </div>

        {/* Today's Top 5 Interactive Deck Section with Live Refresh & 1-Hour Automated Cycle */}
        <ShuffleSection
          articles={shuffleState.articles}
          onShuffle={handleRefreshToday}
          onSelectArticle={(article) => setSelectedArticle(article)}
          savedIds={savedIds}
          onToggleBookmark={handleToggleBookmark}
          batchIndex={shuffleState.batchIndex || 1}
          totalBatches={shuffleState.totalBatches || 3}
          remainingUnseen={shuffleState.remainingUnseen}
          totalSeenToday={shuffleState.totalSeenToday}
          totalPoolSize={allArticles.length}
          isResetCycle={shuffleState.isResetCycle}
          isLiveWire={isLiveWire}
          isRefreshingLive={isRefreshingLive}
          onRefreshLiveWire={handleRefreshToday}
        />

        {/* This Week Collection Tab (Includes All Dynamic & Premier Articles) */}
        <WeeklyCollection
          articles={allArticles}
          onSelectArticle={(article) => setSelectedArticle(article)}
          savedIds={savedIds}
          onToggleBookmark={handleToggleBookmark}
        />

        {/* Premium Short Segment: Features */}
        <FeatureGrid />

        {/* Premium Short Segment: About */}
        <AboutSection onExploreToday={handleStartReading} />

        {/* Newsletter Dark CTA Card with Earth Horizon Curvature */}
        <NewsletterCta />
      </main>

      {/* Footer with "build by HX" mention */}
      <Footer 
        onNavigate={(tab) => setActiveTab(tab)} 
        onOpenInfo={(modalType) => setActiveInfoModal(modalType)}
      />

      {/* Full AI Article Breakdown Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          isBookmarked={savedIds.includes(selectedArticle.id)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {/* Search & Saved Modal (Searches across all dynamic and premier articles) */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        articles={allArticles}
        onSelectArticle={(article) => setSelectedArticle(article)}
        savedIds={savedIds}
        mode={searchModalMode}
      />

      {/* Information & Major Policy Modals */}
      <InfoModal
        modalType={activeInfoModal}
        onClose={() => setActiveInfoModal(null)}
      />

    </div>
  );
}
