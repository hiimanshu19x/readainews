import React, { useState } from 'react';
import { Search, Menu, X, Sparkles, Bookmark, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

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

  const handleNavClick = (id) => {
    sound.playClick();
    setActiveTab(id);
    setMobileMenuOpen(false);

    if (id === 'features' || id === 'about') {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'today') {
      const el = document.getElementById('shuffle-deck');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'weekly') {
      const el = document.getElementById('weekly-collection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#050505]/90 backdrop-blur-xl border-b border-white/[0.07] transition-all">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Logo */}
        <button 
          onClick={() => { sound.playClick(); setActiveTab('today'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 sm:gap-3 group text-left flex-shrink-0 active:scale-95 transition-transform"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-zinc-900 border border-white/20 flex items-center justify-center shadow-inner group-hover:border-white/50 transition-colors">
            <span className="font-bold text-white text-xs sm:text-sm tracking-tighter font-sans">N</span>
          </div>
          <span className="font-semibold text-white tracking-tight text-sm sm:text-lg group-hover:text-zinc-200 transition-colors">
            ReadAiNews
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors font-normal relative py-1 ${
                  isActive 
                    ? 'text-white font-medium' 
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full" />
                )}
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
            className="p-1.5 sm:p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/60 active:scale-90 transition-all border border-transparent hover:border-white/10"
            aria-label="Search"
          >
            <Search size={16} />
          </button>

          {/* Bookmarks Counter (Desktop) */}
          <button
            onClick={() => { sound.playClick(); onOpenSaved(); }}
            title="View Saved Stories"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 border border-white/10 hover:border-white/25 transition-all"
          >
            <Bookmark size={13} className={savedCount > 0 ? "fill-white text-white" : ""} />
            <span>Saved ({savedCount})</span>
          </button>

          {/* "Get started" Pill Button - scrolls to newsletter subscribe box properly framed */}
          <button
            onClick={() => {
              sound.playClick();
              if (mobileMenuOpen) setMobileMenuOpen(false);
              const el = document.getElementById('newsletter-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                window.dispatchEvent(new CustomEvent('highlight-newsletter'));
                setTimeout(() => {
                  const input = document.getElementById('newsletter-email-input');
                  if (input) input.focus({ preventScroll: true });
                }, 500);
              }
            }}
            className="whitespace-nowrap px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] active:scale-95 flex-shrink-0 cursor-pointer"
          >
            Get started
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 active:scale-90 transition-all"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#09090c]/98 backdrop-blur-2xl px-4 py-4 flex flex-col gap-2 shadow-2xl animate-deal">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-left py-2.5 px-3.5 rounded-xl text-sm font-medium transition-all active:scale-98 ${
                activeTab === link.id
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              sound.playClick();
              const el = document.getElementById('newsletter-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                window.dispatchEvent(new CustomEvent('highlight-newsletter'));
                setTimeout(() => {
                  const input = document.getElementById('newsletter-email-input');
                  if (input) input.focus({ preventScroll: true });
                }, 500);
              }
            }}
            className="w-full text-center py-2.5 px-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all active:scale-98 mt-1 shadow-md cursor-pointer"
          >
            Get started — Subscribe Free
          </button>
          <div className="pt-2 mt-1 border-t border-white/10 flex items-center justify-between px-1">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenSaved(); }}
              className="flex items-center gap-2 py-2 px-3 rounded-lg text-xs text-zinc-300 hover:bg-zinc-900"
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
