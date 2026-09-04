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
import { getUniqueDailyArticles, resetSeenArticlesToday } from './utils/dailyTracker';
import { getDailyRefreshedArticles } from './utils/dailyRefresh';
import { sound } from './utils/audio';
import { smoothScrollTo } from './utils/scroll';

export default function App() {
  const [activeTab, setActiveTab] = useState('today');
  
  // Initialize with top 5 distinct publication stories for today
  const [shuffleState, setShuffleState] = useState(() => {
    return {
      articles: allNewsArticles.slice(0, 5),
      isResetCycle: false,
      remainingUnseen: allNewsArticles.length - 5,
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

  // Load saved bookmarks & check daily refreshed shot from the web
  useEffect(() => {
    try {
      const stored = localStorage.getItem('readainews_saved_ids');
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Failed to parse bookmarks:', e);
    }

    // Purge all legacy caches from previous sessions
    try {
      if (typeof window !== 'undefined') {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (
            key.startsWith('readainews_today_batch_2') || 
            key.startsWith('readainews_seen_2') ||
            (key.startsWith('readainews_today_batch_') && !key.includes('_v4_')) ||
            (key.startsWith('readainews_seen_') && !key.includes('_v4_'))
          )) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));
      }
    } catch (e) {}

    // Auto-check for fresh daily shot on mount
    getDailyRefreshedArticles(false).then((res) => {
      if (res && res.articles && res.articles.length >= 5) {
        setShuffleState(prev => ({
          ...prev,
          articles: res.articles
        }));
        setIsLiveWire(true);
      }
    });
  }, []);

  // Force live scrape refresh from web
  const handleLiveScrape = async () => {
    sound.playClick();
    setIsRefreshingLive(true);
    try {
      const res = await getDailyRefreshedArticles(true);
      if (res && res.articles) {
        setShuffleState(prev => ({
          ...prev,
          articles: res.articles
        }));
        setIsLiveWire(res.isLive);
      }
    } finally {
      setIsRefreshingLive(false);
    }
  };

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

  // Shuffle logic: GUARANTEED ZERO DUPLICATES FOR TODAY
  const handleShuffleToday = () => {
    const nextResult = getUniqueDailyArticles(allNewsArticles, 5);
    setShuffleState(nextResult);
  };

  const handleResetToday = () => {
    sound.playClick();
    resetSeenArticlesToday();
    const freshResult = getUniqueDailyArticles(allNewsArticles, 5);
    setShuffleState(freshResult);
  };

  const handleStartReading = () => {
    setActiveTab('today');
    smoothScrollTo('shuffle-deck');
  };

  const handleSeePreview = () => {
    setSelectedArticle(shuffleState.articles[0] || allNewsArticles[0]);
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
        />

        {/* Mobile-Only Sticky Tab Navigation Pill (Hidden on desktop/web view to avoid redundant stacked bars) */}
        <div className="md:hidden sticky top-14 z-30 bg-[#050505]/95 backdrop-blur-xl py-2 px-3 border-b border-white/[0.08] flex justify-center transition-all shadow-md">
          <div className="inline-flex p-1 rounded-full bg-zinc-900/90 border border-white/10 shadow-inner">
            <button
              onClick={() => {
                setActiveTab('today');
                smoothScrollTo('shuffle-deck');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                activeTab === 'today'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Today's Top 5
            </button>
            <button
              onClick={() => {
                setActiveTab('weekly');
                smoothScrollTo('weekly-collection');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                activeTab === 'weekly'
                  ? 'bg-white text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              This Week Collection
            </button>
          </div>
        </div>

        {/* Today's Top 5 Interactive Deck Section with ZERO Duplicate Guarantee & Live Auto-Refresh */}
        <ShuffleSection
          articles={shuffleState.articles}
          onShuffle={handleShuffleToday}
          onSelectArticle={(article) => setSelectedArticle(article)}
          savedIds={savedIds}
          onToggleBookmark={handleToggleBookmark}
          remainingUnseen={shuffleState.remainingUnseen}
          totalSeenToday={shuffleState.totalSeenToday}
          totalPoolSize={shuffleState.totalPoolSize}
          isResetCycle={shuffleState.isResetCycle}
          onResetTodayHistory={handleResetToday}
          isLiveWire={isLiveWire}
          isRefreshingLive={isRefreshingLive}
          onRefreshLiveWire={handleLiveScrape}
        />

        {/* This Week Collection Tab */}
        <WeeklyCollection
          articles={allNewsArticles}
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

      {/* Search & Saved Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        articles={allNewsArticles}
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
