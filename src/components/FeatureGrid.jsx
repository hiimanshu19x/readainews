import React from 'react';
import { Zap, Target, FileText, Smartphone } from 'lucide-react';
import { sound } from '../utils/audio';

const features = [
  {
    icon: Zap,
    title: 'AI-curated',
    description: 'Latest and most important stories, filtered by AI.'
  },
  {
    icon: Target,
    title: 'Laser focused',
    description: 'Only AI and technology. No distractions.'
  },
  {
    icon: FileText,
    title: 'Clear summaries',
    description: 'Get the essence in seconds, not minutes.'
  },
  {
    icon: Smartphone,
    title: 'Read anywhere',
    description: 'A seamless experience across all your devices.'
  }
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-20 md:py-24 bg-white text-zinc-900 border-t border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx}
                onMouseEnter={() => sound.playClick()}
                className="group flex flex-col items-start p-6 rounded-2xl bg-zinc-50/50 hover:bg-zinc-100/80 border border-zinc-200/80 transition-all duration-300"
              >
                {/* Icon inside pill container matching screenshot */}
                <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200/90 shadow-sm flex items-center justify-center mb-5 text-zinc-900 group-hover:scale-110 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300">
                  <Icon size={20} strokeWidth={1.75} />
                </div>

                {/* Feature Title */}
                <h3 className="text-lg font-bold text-zinc-950 tracking-tight mb-2">
                  {feature.title}
                </h3>

                {/* Feature Description */}
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
