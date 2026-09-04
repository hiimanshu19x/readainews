import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

const testimonials = [
  {
    quote: "ReadAiNews saves me hours every week. It's the only AI news source I actually read end-to-end.",
    name: "Daniel V.",
    role: "Indie Hacker & AI Founder",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
  },
  {
    quote: "The shuffle mechanic is ridiculously satisfying. 5 high-impact stories without 50 tabs of noise.",
    name: "Sarah Chen",
    role: "Staff ML Engineer @ Scale",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
  },
  {
    quote: "Having the direct primary source links attached to every AI synthesis makes this our team's daily digest.",
    name: "Marcus Thorne",
    role: "AI Research Lead",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
  }
];

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    sound.playClick();
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    sound.playClick();
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const active = testimonials[currentIndex];

  return (
    <section className="py-20 md:py-28 bg-white text-zinc-950 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-5">
            <span className="text-[11px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-4 block">
              LOVED BY CURIOUS MINDS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight leading-[1.12]">
              A cleaner, smarter <br />
              way to stay informed.
            </h2>
          </div>

          {/* Right Column: Quote + Author + Navigation Buttons */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <blockquote className="text-xl sm:text-2xl font-normal text-zinc-800 leading-relaxed mb-8">
              "{active.quote}"
            </blockquote>

            <div className="flex items-center justify-between pt-6 border-t border-zinc-200">
              <div className="flex items-center gap-3">
                <img
                  src={active.avatar}
                  alt={active.name}
                  className="w-11 h-11 rounded-full object-cover filter grayscale"
                />
                <div>
                  <div className="font-bold text-sm text-zinc-950">{active.name}</div>
                  <div className="text-xs text-zinc-500">{active.role}</div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="p-2.5 rounded-full border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-100 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={next}
                  className="p-2.5 rounded-full border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-100 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
