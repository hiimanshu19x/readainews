import React, { useState, useEffect, useMemo } from 'react';
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
import { getDailyPreviewArticle } from './utils/dailyRefresh';
import { isTodayInTz, getUserTimeZone } from './utils/timeZone';
import { fetchTodayFreshNews, getBatchOfArticles } from './utils/clientNewsFetcher';
import { ensureStrictlyUniqueImages } from './utils/imageEngine';
import { sound } from './utils/audio';
import { smoothScrollTo } from './utils/scroll';

const DYNAMIC_ARTICLES_KEY = 'readainews_dynamic_articles_v17';
const POOL_STORAGE_KEY = 'readainews_fresh_pool_v17';
const REFRESH_TIMESTAMP_KEY = 'readainews_fresh_timestamp_v17';

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
            return ensureStrictlyUniqueImages(parsed);
          }
        }
      }
    } catch (e) {
      console.warn('Failed to load dynamic articles:', e);
    }
    return ensureStrictlyUniqueImages(allNewsArticles);
  });

  // Daily featured preview article for the Hero banner (defaults to today's #1 breaking story)
  const [dailyPreviewArticle, setDailyPreviewArticle] = useState(() => {
    return allNewsArticles[0] || getDailyPreviewArticle(allNewsArticles);
  });

  // Today's complete fresh pool (strictly articles published TODAY on current calendar date)
  const [freshPool, setFreshPool] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(POOL_STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const tz = getUserTimeZone();
            const todayOnly = parsed.filter(a => isTodayInTz(a.publishedEpoch, tz));
            if (todayOnly.length >= 5) {
              return ensureStrictlyUniqueImages(todayOnly);
            }
          }
        }
      }
    } catch (e) {}
    const tz = getUserTimeZone();
    const todayDefault = allNewsArticles.filter(a => isTodayInTz(a.publishedEpoch, tz));
    return ensureStrictlyUniqueImages(todayDefault.length >= 5 ? todayDefault : allNewsArticles.slice(0, 10));
  });

  // Track the current calendar hour to drive automatic hourly updates
  const [currentHour, setCurrentHour] = useState(() => new Date().getHours());
  
  // User manual shuffle offset (clicking Refresh cycles through batches of fresh stories)
  const [manualBatchOffset, setManualBatchOffset] = useState(0);

  // Total batches in the pool (e.g. 14 articles / 5 = 3 batches)
  const totalBatches = useMemo(() => {
    return Math.max(1, Math.ceil((freshPool.length || 5) / 5));
  }, [freshPool.length]);

  // Active batch index (1..totalBatches)
  // Default is Batch 1 (the 5 freshest breaking news stories of the day)
  // Clicking Refresh cycles through batches 2, 3, etc.
  // When a new hour arrives, manualBatchOffset resets to 0 to show the new hourly edition!
  const batchIndex = useMemo(() => {
    return (manualBatchOffset % totalBatches) + 1;
  }, [manualBatchOffset, totalBatches]);

  // The 5 active stories for the current batch
  const currentBatchArticles = useMemo(() => {
    return getBatchOfArticles(freshPool, batchIndex, 5);
  }, [freshPool, batchIndex]);

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchModalMode, setSearchModalMode] = useState('search');
  const [activeInfoModal, setActiveInfoModal] = useState(null);
  const [isLiveWire, setIsLiveWire] = useState(true);
  const [isRefreshingLive, setIsRefreshingLive] = useState(false);

  // Fetch & publish live AI articles onto the website
  const handleRefreshToday = async (force = true) => {
    setIsRefreshingLive(true);
    try {
      const freshArticlesPool = await fetchTodayFreshNews(force);
      
      if (Array.isArray(freshArticlesPool) && freshArticlesPool.length > 0) {
        setFreshPool(freshArticlesPool);

        // Update allArticles repository with full fresh pool
        setAllArticles(prev => {
          const prevFiltered = prev.filter(p => !freshArticlesPool.some(f => f.id === p.id || f.canonicalUrl === p.canonicalUrl));
          const combined = ensureStrictlyUniqueImages([...freshArticlesPool, ...prevFiltered]);
          try {
            localStorage.setItem(DYNAMIC_ARTICLES_KEY, JSON.stringify(combined));
          } catch (e) {}
          return combined;
        });

        // Update daily preview if new breaking #1 story arrived
        if (freshArticlesPool[0]) {
          setDailyPreviewArticle(freshArticlesPool[0]);
        }
      }
    } catch (err) {
      console.warn('Error refreshing fresh articles:', err);
    } finally {
      setIsRefreshingLive(false);
    }
  };


  // User manual click on "Refresh" / "Scan Wire": advances to next batch of 5 fresh stories immediately
  const handleUserShuffle = async () => {
    setManualBatchOffset(prev => prev + 1);
    await handleRefreshToday(true);
  };

  // Load saved bookmarks & manage automated hourly background refresh cycle
  useEffect(() => {
    try {
      const stored = localStorage.getItem('readainews_saved_ids');
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to parse bookmarks:', e);
    }

    // Clean up legacy storage keys from previous versions prior to v17
    try {
      if (typeof window !== 'undefined') {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (
            key.startsWith('readainews_today_batch_') ||
            key.startsWith('readainews_3hr_batch_') ||
            key.startsWith('readainews_fresh_today_') ||
            (key.startsWith('readainews_') && !key.includes('_v17') && !key.includes('readainews_saved_ids'))
          )) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));
      }
    } catch (e) {}

    // Unconditionally revalidate wire feed on page mount in background (SWR pattern)
    handleRefreshToday(true);

    // Auto-update to new stories whenever the hour changes or periodically
    const checkAndRefreshHourly = async () => {
      const thisHour = new Date().getHours();
      
      // Auto-update to new stories whenever the hour changes
      if (thisHour !== currentHour) {
        setCurrentHour(thisHour);
        setManualBatchOffset(0); // Reset manual offset so top breaking news of the new hour takes priority
        await handleRefreshToday(true);
        return;
      }

      // Revalidate wire feed in background every 15 minutes
      const now = Date.now();
      const lastTime = parseInt(localStorage.getItem(REFRESH_TIMESTAMP_KEY) || '0', 10);
      if ((now - lastTime) >= 15 * 60 * 1000) {
        await handleRefreshToday(false);
      }
    };

    // Check every 30 seconds to detect hour rollover and update hourly stories automatically
    const interval = setInterval(checkAndRefreshHourly, 30 * 1000);
    return () => clearInterval(interval);
  }, [currentHour]);


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
          articles={currentBatchArticles}
          onShuffle={handleUserShuffle}
          onSelectArticle={(article) => setSelectedArticle(article)}
          savedIds={savedIds}
          onToggleBookmark={handleToggleBookmark}
          batchIndex={batchIndex}
          totalBatches={totalBatches}
          remainingUnseen={Math.max(0, freshPool.length - (batchIndex * 5))}
          totalSeenToday={Math.min(freshPool.length, batchIndex * 5)}
          totalPoolSize={freshPool.length}
          isResetCycle={false}
          isLiveWire={isLiveWire}
          isRefreshingLive={isRefreshingLive}
          onRefreshLiveWire={handleUserShuffle}
          currentHour={currentHour}
        />

        {/* This Week Collection Tab (Rolling 7-Day Curated Archive) */}
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
