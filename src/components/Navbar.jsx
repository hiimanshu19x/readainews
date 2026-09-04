import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Bookmark } from 'lucide-react';
import { sound } from '../utils/audio';
import { smoothScrollTo } from '../utils/scroll';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  savedCount = 0,
  onOpenSearch,
  onOpenSaved
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Today’s Top 5', id: 'today' },
    { name: 'This Week Collection', id: 'weekly' },
    { name: 'Features', id: 'features' },
    { name: 'About', id: 'about' }
  ];

  // Scroll spy: automatically sync active tab with viewport scroll position
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.pageYOffset + 140;
          const sections = [
            { id: 'today', el: document.getElementById('shuffle-deck') },
            { id: 'weekly', el: document.getElementById('weekly-collection') },
            { id: 'features', el: document.getElementById('features') },
            { id: 'about', el: document.getElementById('about') }
          ];

          for (let i = sections.length - 1; i >= 0; i--) {
            const { id, el } = sections[i];
            if (el && el.offsetTop <= scrollPos) {
              setActiveTab(id);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveTab]);

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);

    let targetId = id;
    if (id === 'today') targetId = 'shuffle-deck';
    else if (id === 'weekly') targetId = 'weekly-collection';

    smoothScrollTo(targetId, true);
  };

  const handleGetStarted = () => {
    sound.playClick();
    setMobileMenuOpen(false);
    smoothScrollTo('newsletter-section', false);
    window.dispatchEvent(new CustomEvent('highlight-newsletter'));
    setTimeout(() => {
      const input = document.getElementById('newsletter-email-input');
      if (input) input.focus({ preventScroll: true });
    }, 600);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050505]/95 backdrop-blur-2xl border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Logo */}
        <button 
          onClick={() => { sound.playClick(); setActiveTab('today'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 sm:gap-3 group text-left flex-shrink-0 active:scale-95 transition-transform cursor-pointer"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-zinc-900 border border-white/20 flex items-center justify-center shadow-inner group-hover:border-white/50 transition-colors">
            <span className="font-bold text-white text-xs sm:text-sm tracking-tighter font-sans">N</span>
          </div>
          <span className="font-semibold text-white tracking-tight text-sm sm:text-lg group-hover:text-zinc-200 transition-colors">
            ReadAiNews
          </span>
        </button>

        {/* Desktop Navigation Links with subtle pill highlight */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3 text-sm">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs lg:text-sm transition-all relative cursor-pointer font-medium ${
                  isActive 
                    ? 'bg-white text-black font-semibold shadow-sm' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3">

          {/* Search Trigger */}
          <button
            onClick={() => { sound.playClick(); onOpenSearch(); }}
            title="Search AI news"
            className="p-1.5 sm:p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/60 active:scale-90 transition-all border border-transparent hover:border-white/10 cursor-pointer"
            aria-label="Search"
          >
            <Search size={16} />
          </button>

          {/* Bookmarks Counter (Desktop) */}
          <button
            onClick={() => { sound.playClick(); onOpenSaved(); }}
            title="View Saved Stories"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 border border-white/10 hover:border-white/25 transition-all cursor-pointer"
          >
            <Bookmark size={13} className={savedCount > 0 ? "fill-white text-white" : ""} />
            <span>Saved ({savedCount})</span>
          </button>

          {/* "Get started" Pill Button - scrolls to newsletter subscribe box properly framed */}
          <button
            onClick={handleGetStarted}
            className="whitespace-nowrap px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] active:scale-95 flex-shrink-0 cursor-pointer"
          >
            Get started
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-90 transition-all cursor-pointer"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#09090c]/98 backdrop-blur-2xl px-4 py-4 flex flex-col gap-2 shadow-2xl animate-deal">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm transition-all active:scale-98 cursor-pointer ${
                  isActive
                    ? 'bg-zinc-800/90 text-white border border-white/20 font-semibold shadow-inner'
                    : 'text-zinc-400 hover:bg-zinc-900/80 hover:text-white border border-transparent'
                }`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-normal">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    <span>Active</span>
                  </span>
                )}
              </button>
            );
          })}
          <button
            onClick={handleGetStarted}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all active:scale-98 mt-2 shadow-[0_0_20px_rgba(255,255,255,0.15)] cursor-pointer"
          >
            <span>Get started — Subscribe Free</span>
          </button>
          <div className="pt-2 mt-1 border-t border-white/10 flex items-center justify-between px-1">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenSaved(); }}
              className="flex items-center gap-2 py-2 px-3 rounded-lg text-xs text-zinc-300 hover:bg-zinc-900 cursor-pointer"
            >
              <Bookmark size={14} className={savedCount > 0 ? "fill-white text-white" : ""} />
              <span>Saved Stories ({savedCount})</span>
            </button>
            <div className="text-[11px] text-zinc-500 font-mono">
              ReadAiNews Mobile
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
