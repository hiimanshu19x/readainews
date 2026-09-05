import React from 'react';

/**
 * Contextual procedural SVG generator that renders high-definition graphics
 * matching the exact semantic domain of the AI news article.
 */
export default function ContextualThumbnail({ context = 'frontier_models', theme = 'rose', className = 'w-full h-full' }) {
  switch (context) {
    case 'voice_audio':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#181119] via-[#0f0a12] to-[#08050a] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="voiceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
              </linearGradient>
              <radialGradient id="voiceRadial" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="120" r="110" fill="url(#voiceRadial)" />
            {/* Audio Waveform Spectrum Bars */}
            {Array.from({ length: 32 }).map((_, i) => {
              const x = 50 + i * 9.5;
              const height = 15 + Math.sin(i * 0.4) * 45 + Math.cos(i * 0.8) * 30;
              const y = 120 - height / 2;
              return (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width="4.5"
                  height={height}
                  rx="2.5"
                  fill="url(#voiceGrad)"
                  opacity={0.4 + (Math.sin(i * 0.3) + 1) * 0.3}
                />
              );
            })}
            {/* Voice Concentric Sound Waves */}
            <circle cx="200" cy="120" r="45" fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="200" cy="120" r="75" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.4" />
            <circle cx="200" cy="120" r="105" fill="none" stroke="#38bdf8" strokeWidth="0.75" strokeDasharray="4 4" opacity="0.3" />
          </svg>
          <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-black/60 border border-purple-500/30 text-[9px] font-mono text-purple-300">
            SPEECH & AUDIO
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
        </div>
      );

    case 'education_learning':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#0c1424] via-[#090d17] to-[#05070c] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="eduGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="120" r="90" fill="radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)" />
            {/* Knowledge Graph / Neural Learning Nodes */}
            <g stroke="#38bdf8" strokeWidth="1.2" opacity="0.5">
              <line x1="140" y1="90" x2="200" y2="60" />
              <line x1="200" y1="60" x2="260" y2="90" />
              <line x1="260" y1="90" x2="240" y2="150" />
              <line x1="240" y1="150" x2="160" y2="150" />
              <line x1="160" y1="150" x2="140" y2="90" />
              <line x1="200" y1="60" x2="200" y2="120" />
              <line x1="140" y1="90" x2="200" y2="120" />
              <line x1="260" y1="90" x2="200" y2="120" />
              <line x1="160" y1="150" x2="200" y2="120" />
              <line x1="240" y1="150" x2="200" y2="120" />
            </g>
            {[
              [140, 90], [200, 60], [260, 90], [240, 150], [160, 150], [200, 120]
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r={idx === 5 ? "6" : "4"} fill={idx === 5 ? "#ffffff" : "#38bdf8"} />
            ))}
          </svg>
          <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-black/60 border border-sky-500/30 text-[9px] font-mono text-sky-300">
            EDUCATION & LEARNING
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
        </div>
      );

    case 'robotics_humanoids':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#1a1714] via-[#100e0c] to-[#080706] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="robotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#78350f" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="120" r="90" fill="radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)" />
            {/* Robotic Arm / Cybernetic Joint Mesh */}
            <path d="M 120,160 L 170,110 L 220,130 L 270,75 L 290,85" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
            <circle cx="120" cy="160" r="7" fill="#27272a" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="170" cy="110" r="8" fill="#27272a" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="220" cy="130" r="8" fill="#27272a" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="270" cy="75" r="7" fill="#27272a" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="290" cy="85" r="4" fill="#ffffff" />
          </svg>
          <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-black/60 border border-amber-500/30 text-[9px] font-mono text-amber-300">
            ROBOTICS & EMBODIED
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
        </div>
      );

    case 'chips_hardware':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#14181f] via-[#0b0e14] to-[#06080b] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="chipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <rect x="150" y="70" width="100" height="100" rx="10" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
            <rect x="165" y="85" width="70" height="70" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 2" />
            {[-25, -15, -5, 5, 15, 25].map((off, i) => (
              <g key={i} stroke="#06b6d4" strokeWidth="1.2" opacity="0.6">
                <line x1="150" y1={120 + off} x2="110" y2={120 + off} />
                <circle cx="108" cy={120 + off} r="2" fill="#06b6d4" />
                <line x1="250" y1={120 + off} x2="290" y2={120 + off} />
                <circle cx="292" cy={120 + off} r="2" fill="#06b6d4" />
                <line x1={200 + off} y1="70" x2={200 + off} y2="35" />
                <circle cx={200 + off} cy="33" r="2" fill="#06b6d4" />
                <line x1={200 + off} y1="170" x2={200 + off} y2="205" />
                <circle cx={200 + off} cy="207" r="2" fill="#06b6d4" />
              </g>
            ))}
          </svg>
          <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-black/60 border border-cyan-500/30 text-[9px] font-mono text-cyan-300">
            CHIPS & SILICON
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
        </div>
      );

    case 'cybersecurity_safety':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#180f14] via-[#0f090e] to-[#070406] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#881337" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="120" r="85" fill="radial-gradient(circle, rgba(244,63,94,0.15) 0%, transparent 70%)" />
            <path d="M 200,55 L 245,75 C 245,130 200,165 200,175 C 200,165 155,130 155,75 Z" fill="url(#shieldGrad)" stroke="#f43f5e" strokeWidth="2" />
            <circle cx="200" cy="105" r="8" fill="#ffffff" />
            <polygon points="196,108 204,108 206,128 194,128" fill="#ffffff" />
          </svg>
          <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-black/60 border border-rose-500/30 text-[9px] font-mono text-rose-300">
            CYBERSECURITY & SAFETY
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
        </div>
      );

    case 'datacenter_energy':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#0b1716] via-[#070e0e] to-[#030707] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="dcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {[-70, -25, 20, 65].map((xOffset, idx) => (
              <g key={idx}>
                <rect x={180 + xOffset} y="45" width="36" height="150" rx="3" fill="#0f172a" stroke="#10b981" strokeWidth="1.2" opacity="0.8" />
                {Array.from({ length: 9 }).map((_, rIdx) => (
                  <circle key={rIdx} cx={188 + xOffset} cy={60 + rIdx * 15} r="2" fill={rIdx % 3 === 0 ? "#34d399" : "#059669"} />
                ))}
              </g>
            ))}
          </svg>
          <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-black/60 border border-emerald-500/30 text-[9px] font-mono text-emerald-300">
            COMPUTE & DATACENTERS
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
        </div>
      );

    case 'law_policy_ethics':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#191512] via-[#0e0c0a] to-[#070605] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            <circle cx="200" cy="120" r="90" fill="radial-gradient(circle, rgba(217,119,6,0.15) 0%, transparent 70%)" />
            <line x1="200" y1="50" x2="200" y2="180" stroke="#d97706" strokeWidth="3" />
            <line x1="140" y1="80" x2="260" y2="80" stroke="#d97706" strokeWidth="2.5" />
            <path d="M 140,80 L 115,130 L 165,130 Z" fill="#292524" stroke="#d97706" strokeWidth="1.5" />
            <path d="M 260,80 L 235,130 L 285,130 Z" fill="#292524" stroke="#d97706" strokeWidth="1.5" />
          </svg>
          <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-black/60 border border-amber-500/30 text-[9px] font-mono text-amber-300">
            LAW & POLICY
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
        </div>
      );

    case 'biology_medicine':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#0e171b] via-[#090f12] to-[#040708] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            <circle cx="200" cy="120" r="95" fill="radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)" />
            {Array.from({ length: 12 }).map((_, i) => {
              const y = 50 + i * 12;
              const x1 = 170 + Math.sin(i * 0.6) * 35;
              const x2 = 230 - Math.sin(i * 0.6) * 35;
              return (
                <g key={i}>
                  <line x1={x1} y1={y} x2={x2} y2={y} stroke="#14b8a6" strokeWidth="1.5" opacity="0.6" />
                  <circle cx={x1} cy={y} r="3" fill="#2dd4bf" />
                  <circle cx={x2} cy={y} r="3" fill="#38bdf8" />
                </g>
              );
            })}
          </svg>
          <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-black/60 border border-teal-500/30 text-[9px] font-mono text-teal-300">
            BIOMEDICAL & GENOMICS
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
        </div>
      );

    case 'coding_dev':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#13161c] via-[#0b0c10] to-[#060608] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            <rect x="110" y="50" width="180" height="140" rx="8" fill="#090a0f" stroke="#3b82f6" strokeWidth="1.5" />
            <circle cx="125" cy="65" r="3" fill="#ef4444" />
            <circle cx="135" cy="65" r="3" fill="#eab308" />
            <circle cx="145" cy="65" r="3" fill="#22c55e" />
            <line x1="125" y1="90" x2="200" y2="90" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
            <line x1="140" y1="110" x2="240" y2="110" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
            <line x1="140" y1="130" x2="210" y2="130" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
            <line x1="125" y1="150" x2="160" y2="150" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-black/60 border border-blue-500/30 text-[9px] font-mono text-blue-300">
            SOFTWARE & DEVELOPER
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
        </div>
      );

    default:
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#141419] via-[#0c0c11] to-[#060608] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            <circle cx="200" cy="120" r="100" fill="radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)" />
            {Array.from({ length: 18 }).map((_, i) => (
              <circle
                key={i}
                cx={100 + (i * 37) % 200}
                cy={40 + (i * 29) % 160}
                r="3"
                fill="#ffffff"
                opacity={0.3 + (i % 5) * 0.15}
              />
            ))}
            <path d="M 100,50 Q 180,120 280,70 T 260,190 T 120,160 Z" fill="none" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          </svg>
          <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-black/60 border border-white/20 text-[9px] font-mono text-zinc-300">
            AI FRONTIER WIRE
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
        </div>
      );
  }
}
