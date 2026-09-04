import React from 'react';

// Generates sleek monochrome 3D abstract art matching the inspiration screenshot
export default function MeshThumbnail({ theme = 'ribbon', className = 'w-full h-full' }) {
  switch (theme) {
    case 'ribbon':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#18181b] to-[#09090b] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover opacity-90">
            <defs>
              <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#a1a1aa" stopOpacity="0.6" />
                <stop offset="80%" stopColor="#27272a" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#09090b" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="ribbonLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#71717a" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* Background subtle glow */}
            <circle cx="200" cy="120" r="100" fill="radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" />
            
            {/* 3D Wave Ribbon Lines */}
            {Array.from({ length: 22 }).map((_, i) => {
              const offset = i * 6;
              const yStart = 40 + i * 5;
              const yMid1 = 180 - i * 4;
              const yMid2 = 30 + i * 6;
              const yEnd = 200 - i * 3;
              return (
                <path
                  key={i}
                  d={`M ${offset},${yStart} C ${100 + offset},${yMid1} ${240 - offset},${yMid2} ${380 - offset / 2},${yEnd}`}
                  fill="none"
                  stroke="url(#ribbonLineGrad)"
                  strokeWidth={i % 3 === 0 ? "1.8" : "0.9"}
                  opacity={0.3 + (i / 25) * 0.7}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
        </div>
      );

    case 'waves':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#141417] to-[#09090b] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            <defs>
              <radialGradient id="meshRadial" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#52525b" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="120" r="120" fill="url(#meshRadial)" />
            {/* Complex warped topography */}
            {Array.from({ length: 18 }).map((_, i) => {
              const radius = 25 + i * 8;
              return (
                <ellipse
                  key={i}
                  cx="200"
                  cy="120"
                  rx={radius * 1.5}
                  ry={radius * 0.75}
                  transform={`rotate(${-25 + i * 3} 200 120)`}
                  fill="none"
                  stroke="#e4e4e7"
                  strokeWidth="1.1"
                  strokeDasharray={i % 2 === 0 ? '4 2' : 'none'}
                  opacity={0.15 + (i / 20) * 0.55}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>
      );

    case 'cyber':
      return (
        <div className={`relative overflow-hidden bg-[#0c0c0e] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            {/* Humanoid robot silhouette & wireframe */}
            <defs>
              <linearGradient id="metalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#52525b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#18181b" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Head contour */}
            <path
              d="M 170,80 Q 200,60 230,80 Q 245,115 235,145 Q 200,165 165,145 Q 155,115 170,80 Z"
              fill="#18181b"
              stroke="#ffffff"
              strokeWidth="1.5"
              opacity="0.8"
            />
            {/* Visor slit glow */}
            <rect x="180" y="105" width="40" height="5" rx="2.5" fill="#ffffff" opacity="0.9" />
            {/* Shoulder armor lines */}
            <path
              d="M 140,170 Q 200,150 260,170 L 290,240 L 110,240 Z"
              fill="url(#metalGrad)"
              stroke="#a1a1aa"
              strokeWidth="1.2"
              opacity="0.6"
            />
            {/* Scanlines across torso */}
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={i}
                x1="120"
                y1={170 + i * 7}
                x2="280"
                y2={170 + i * 7}
                stroke="#ffffff"
                strokeWidth="0.8"
                opacity={0.15 + (i / 10) * 0.3}
              />
            ))}
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />
        </div>
      );

    case 'curved':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#111114] to-[#050505] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            {/* Sculptural hyperbolic curve */}
            <path
              d="M 20,220 C 140,200 260,40 380,20 C 350,120 220,230 20,220 Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              opacity="0.75"
            />
            {Array.from({ length: 14 }).map((_, i) => (
              <path
                key={i}
                d={`M ${40 + i * 12},220 C ${150 + i * 8},${190 - i * 6} ${250 - i * 6},${60 + i * 8} ${370 - i * 10},${30 + i * 10}`}
                fill="none"
                stroke="#a1a1aa"
                strokeWidth="1"
                opacity={0.15 + (i / 14) * 0.45}
              />
            ))}
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>
      );

    case 'lattice':
    default: {
      // Map named themes to subtle accent colors for visual variety
      const accentMap = {
        rose: '#f43f5e',
        blue: '#3b82f6',
        teal: '#14b8a6',
        violet: '#8b5cf6',
        orange: '#f97316',
        emerald: '#10b981',
        cyan: '#06b6d4',
        indigo: '#6366f1',
        purple: '#a855f7',
        amber: '#f59e0b',
        lattice: '#ffffff',
      };
      const accent = accentMap[theme] || '#ffffff';
      const accentOpacity = theme === 'lattice' ? '0.8' : '0.7';

      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-[#16161a] to-[#09090b] flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            {/* Neural network isometric lattice */}
            {Array.from({ length: 16 }).map((_, i) => {
              const x = 50 + (i % 4) * 90;
              const y = 40 + Math.floor(i / 4) * 50;
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="3" fill={accent} opacity={accentOpacity} />
                  {i < 12 && (
                    <line x1={x} y1={y} x2={x} y2={y + 50} stroke="#71717a" strokeWidth="0.8" opacity="0.3" />
                  )}
                  {i % 4 < 3 && (
                    <line x1={x} y1={y} x2={x + 90} y2={y} stroke="#71717a" strokeWidth="0.8" opacity="0.3" />
                  )}
                  {i < 12 && i % 4 < 3 && (
                    <line x1={x} y1={y} x2={x + 90} y2={y + 50} stroke={accent} strokeWidth="0.5" opacity="0.15" />
                  )}
                </g>
              );
            })}
          </svg>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>
      );
    }
  }
}
