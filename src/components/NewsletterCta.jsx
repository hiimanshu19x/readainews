import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Mail, ShieldCheck, Zap } from 'lucide-react';
import { sound } from '../utils/audio';

export default function NewsletterCta() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTargeted, setIsTargeted] = useState(false);

  useEffect(() => {
    // Listen for custom trigger from 'Get started' button
    const handleTarget = () => {
      setIsTargeted(true);
      setTimeout(() => setIsTargeted(false), 2000);
    };
    window.addEventListener('highlight-newsletter', handleTarget);
    return () => window.removeEventListener('highlight-newsletter', handleTarget);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || isSubmitting) return;
    sound.playClick();
    setIsSubmitting(true);

    // 1. Client-side persistence safeguard
    try {
      const stored = localStorage.getItem('readainews_collected_subscribers');
      const list = stored ? JSON.parse(stored) : [];
      if (!list.some(item => (typeof item === 'string' ? item : item.email) === email)) {
        list.push({ email, timestamp: new Date().toISOString(), schedule: 'bi-weekly' });
        localStorage.setItem('readainews_collected_subscribers', JSON.stringify(list));
      }
    } catch (err) {}

    // 2. Dispatch to external endpoint if configured
    const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT;
    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, frequency: '2x-weekly', source: 'readainews_landing' })
        });
      } catch (err) {
        console.warn('Newsletter webhook dispatch failed:', err);
      }
    }

    setIsSubmitting(false);
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  return (
    <section 
      id="newsletter-section" 
      className="py-12 md:py-24 bg-[#050505] relative overflow-hidden scroll-mt-20 sm:scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Dark Container matching inspiration screenshot with glow effect */}
        <div className={`relative rounded-[28px] sm:rounded-[32px] bg-[#0c0c0f] border transition-all duration-500 p-6 sm:p-12 lg:p-16 overflow-hidden shadow-2xl ${
          isTargeted ? 'border-white/50 ring-2 ring-white/20 shadow-[0_0_50px_rgba(255,255,255,0.15)]' : 'border-white/[0.12]'
        }`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center relative z-10">
            
            {/* Left Column: Headline & Description */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.15em] text-zinc-300 uppercase mb-3 sm:mb-4">
                <Mail size={12} className="text-cyan-400" />
                <span>BI-WEEKLY AI INTELLIGENCE DIGEST</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] sm:leading-[1.12] mb-3 sm:mb-4">
                The Best AI News, <br className="hidden sm:inline" />
                Automated by AI.
              </h2>

              <p className="text-xs sm:text-base text-zinc-300 leading-relaxed max-w-xl font-normal">
                Receive the best collection of high-impact AI breakthroughs from 15 premier global publications delivered straight to your inbox <strong className="text-white font-medium">two times a week</strong>. 100% automated by AI, completely signal-driven, zero marketing noise.
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-4 text-[11px] text-zinc-400">
                <span className="flex items-center gap-1">
                  <Zap size={12} className="text-amber-400" />
                  <span>2 Editions / Week</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  <span>15 Premier Publications</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Sparkles size={12} className="text-cyan-400" />
                  <span>Autonomous AI Curation</span>
                </span>
              </div>
            </div>

            {/* Right Column: Email Subscription Form */}
            <div className="lg:col-span-5 flex flex-col">
              {subscribed ? (
                <div className="flex items-center gap-2.5 p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm shadow-lg">
                  <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-white">You're subscribed!</div>
                    <div className="text-[11px] text-emerald-200 mt-0.5">
                      You'll receive the best collection 2x a week automated by AI.
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                  <div className={`relative flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl sm:rounded-full bg-zinc-900/95 border p-1.5 focus-within:border-white/50 transition-all shadow-inner gap-2 sm:gap-0 ${
                    isTargeted ? 'border-white/60 ring-2 ring-white/30' : 'border-white/20'
                  }`}>
                    <input
                      id="newsletter-email-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full bg-transparent px-3.5 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none"
                    />
                    <button
                      id="newsletter-subscribe-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-shrink-0 inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-xl sm:rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)] cursor-pointer"
                    >
                      <span>{isSubmitting ? 'Joining...' : 'Subscribe'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between px-2 sm:px-4 text-[10px] sm:text-[11px] text-zinc-400">
                    <span>Delivered twice a week.</span>
                    <span>No spam. Unsubscribe anytime.</span>
                  </div>
                </form>
              )}
            </div>

          </div>

          {/* Curved Horizon Arc Glow inside the bottom of the card matching inspiration */}
          <div className="horizon-arc-small -bottom-[190px]" />
        </div>

      </div>
    </section>
  );
}
