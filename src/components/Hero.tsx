import React, { useState } from 'react';
import { Sparkles, Code, Cpu, Eye, ArrowRight, Zap, Terminal, CornerDownRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeroProps {
  onExplore: () => void;
  onEstimate: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onEstimate }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden border-b border-neutral-800 bg-[#050505] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-tech-grid"
    >
      {/* Subtle monochrome cursor illumination */}
      <div 
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-20"
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.08), transparent 70%)`
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        
        {/* Minimalist Top Indicator */}
        <div className="flex items-center justify-center sm:justify-start mb-6">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-black border border-neutral-700 text-neutral-300 text-xs font-code uppercase tracking-widest rounded-none">
            <span className="w-2 h-2 bg-white inline-block"></span>
            <span>Frontend & Creative UI Lab</span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-400">Available For Contracts</span>
          </div>
        </div>

        {/* Main Headline - Sharp, High-Contrast Typography */}
        <div className="max-w-4xl text-left mb-8">
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] uppercase">
            ENGINEERING <span className="text-neutral-400">PRECISION</span> WEB INTERFACES & DYNAMIC INTERACTIONS.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-2xl font-normal leading-relaxed">
            Minimalist, high-performance web components built with pure HTML5, CSS3 and JavaScript. 
            Engineered by <strong className="text-white">Ivan Huban</strong> with zero layout jank, strict typography, and calibrated responsive architecture.
          </p>
        </div>

        {/* Action Buttons - Pure Monochrome & Sharp Geometric Blocks */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-14">
          <button
            onClick={() => {
              sound.playClick();
              onExplore();
            }}
            className="flex items-center gap-2.5 px-6 py-3.5 bg-white hover:bg-neutral-200 text-black font-code font-bold text-xs sm:text-sm uppercase tracking-wider rounded-none border border-white transition-all active:scale-95 shadow-sm"
          >
            <Terminal className="w-4 h-4" />
            <span>Launch FX Lab</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              sound.playSwitch();
              onEstimate();
            }}
            className="flex items-center gap-2.5 px-6 py-3.5 bg-black hover:bg-neutral-900 text-neutral-200 border border-neutral-700 font-code font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-none transition-all hover:border-neutral-500"
          >
            <span>Estimate Project ($25–$100)</span>
          </button>
        </div>

        {/* Asymmetrical Bento Grid - DIFFERENT SIZES AND HIERARCHIES */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          
          {/* Card 1: Dominant Lead Card (6 columns on desktop) */}
          <div className="sm:col-span-6 p-5 sm:p-6 bg-[#0a0a0a] border border-neutral-800 rounded-none flex flex-col justify-between hover:border-neutral-600 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-code font-bold text-sm">
                  <Code className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="font-code text-[11px] text-neutral-500 uppercase tracking-widest">
                  CORE_01
                </span>
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-white uppercase tracking-wide">
                Pixel-Calibrated CSS
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                Zero arbitrary CSS values. Strict typographic scale, fluid math with clamp(), and sub-pixel alignment for modern displays.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-900 flex items-center justify-between text-xs font-code text-neutral-400">
              <span>FLEXBOX / GRID / SUBGRID</span>
              <CornerDownRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
            </div>
          </div>

          {/* Card 2: Vertical Performance Card (3 columns on desktop) */}
          <div className="sm:col-span-3 p-5 bg-[#0a0a0a] border border-neutral-800 rounded-none flex flex-col justify-between hover:border-neutral-600 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-7 h-7 bg-neutral-900 border border-neutral-700 text-white flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="font-code text-[10px] text-neutral-500 uppercase">
                  60_FPS
                </span>
              </div>
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wide">
                Zero Jank Frame Rate
              </h4>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                Hardware-accelerated GPU transforms and composited layers only.
              </p>
            </div>
            <div className="pt-3 border-t border-neutral-900 font-code text-[10px] text-neutral-500">
              WILL-CHANGE: TRANSFORM
            </div>
          </div>

          {/* Card 3: Mobile & Breakpoints Card (3 columns on desktop) */}
          <div className="sm:col-span-3 p-5 bg-[#0a0a0a] border border-neutral-800 rounded-none flex flex-col justify-between hover:border-neutral-600 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-7 h-7 bg-neutral-900 border border-neutral-700 text-white flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </div>
                <span className="font-code text-[10px] text-neutral-500 uppercase">
                  MOBILE_1ST
                </span>
              </div>
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wide">
                Fluid Breakpoints
              </h4>
              <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                Native thumb zones (48px+) and validated viewport containment from 320px.
              </p>
            </div>
            <div className="pt-3 border-t border-neutral-900 font-code text-[10px] text-neutral-500">
              100% RESPONSIVE AUDIT
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
