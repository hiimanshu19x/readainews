import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export default function NewsletterCta() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || isSubmitting) return;
    sound.playClick();
    setIsSubmitting(true);

    // 1. Client-side persistence safeguard
    try {
      const stored = localStorage.getItem('readainews_collected_subscribers');
      const list = stored ? JSON.parse(stored) : [];
      if (!list.includes(email)) {
        list.push({ email, timestamp: new Date().toISOString() });
        localStorage.setItem('readainews_collected_subscribers', JSON.stringify(list));
      }
    } catch (err) {}

    // 2. Dispatch to external endpoint if configured (e.g. Formspree, Loops, Beehiiv, Resend)
    const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT;
    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source: 'readainews_landing' })
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
    <section id="newsletter-section" className="py-12 md:py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Dark Container matching inspiration screenshot */}
        <div className="relative rounded-[28px] sm:rounded-[32px] bg-[#0c0c0f] border border-white/[0.12] p-6 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center relative z-10">
            
            {/* Left Column: Headline */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-zinc-400 uppercase mb-3 sm:mb-4">
                JOIN THOUSANDS OF READERS
              </span>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] sm:leading-[1.12] mb-3 sm:mb-4">
                Get the best AI news <br className="hidden sm:inline" />
                in your inbox.
              </h2>

              <p className="text-xs sm:text-base text-zinc-400 leading-relaxed max-w-lg">
                A short, focused newsletter with the most important AI and tech stories, delivered daily.
              </p>
            </div>

            {/* Right Column: Email Subscription Form */}
            <div className="lg:col-span-5 flex flex-col">
              {subscribed ? (
                <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm">
                  <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                  <span>You're in! Today's top 5 AI brief has been dispatched.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                  <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl sm:rounded-full bg-zinc-900/90 border border-white/15 p-1.5 focus-within:border-white/40 transition-colors shadow-inner gap-2 sm:gap-0">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full bg-transparent px-3.5 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="flex-shrink-0 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl sm:rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    >
                      <span>Subscribe</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-zinc-500 px-2 sm:px-4 text-center sm:text-left">
                    No spam. Unsubscribe anytime.
                  </span>
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
