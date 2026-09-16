import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, CheckCircle2, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

export const ViewportTester: React.FC = () => {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const devices = [
    { id: 'mobile', name: 'Mobile (375px)', width: '375px', icon: Smartphone },
    { id: 'tablet', name: 'Tablet (768px)', width: '768px', icon: Tablet },
    { id: 'desktop', name: 'Desktop (Fluid)', width: '100%', icon: Monitor },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white inline-block"></span>
            <h2 className="font-display font-extrabold text-2xl text-white uppercase tracking-tight">
              Viewport & Responsive Simulator
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 font-code mt-1">
            Simulate fluid layout transformation across device constraints from 375px to 4K displays.
          </p>
        </div>

        {/* Device Switcher Buttons - Sharp & Technical */}
        <div className="flex items-center gap-1 bg-black p-1 border border-neutral-800 rounded-none">
          {devices.map((d) => {
            const Icon = d.icon;
            const isSelected = device === d.id;
            return (
              <button
                key={d.id}
                onClick={() => {
                  sound.playSwitch();
                  setDevice(d.id as 'mobile' | 'tablet' | 'desktop');
                }}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-code uppercase tracking-wider rounded-none transition-all ${
                  isSelected
                    ? 'bg-white text-black font-bold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{d.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Frame Preview Stage */}
      <div className="flex flex-col items-center justify-center p-4 sm:p-8 bg-[#0a0a0a] border border-neutral-800 rounded-none min-h-[460px] bg-tech-grid">
        
        {/* Device Frame Header */}
        <div className="w-full flex items-center justify-between mb-3 text-[11px] font-code text-neutral-400 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-neutral-600 inline-block" />
            <span className="text-white font-bold uppercase">
              TARGET_VIEWPORT: {device === 'mobile' ? '375PX (MOBILE)' : device === 'tablet' ? '768PX (TABLET)' : '100% (FULL FLUID)'}
            </span>
          </div>
          <span className="text-neutral-300 font-semibold uppercase">
            STATUS: 0PX_OVERFLOW
          </span>
        </div>

        {/* The Sharp Device Bezel */}
        <div
          className="transition-all duration-200 ease-out border border-neutral-700 bg-black rounded-none shadow-2xl overflow-hidden"
          style={{
            width: device === 'mobile' ? '375px' : device === 'tablet' ? '768px' : '100%',
            maxWidth: '100%',
          }}
        >
          {/* Virtual App Header */}
          <div className="p-3.5 border-b border-neutral-800 bg-[#0c0c0c] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white text-black font-code font-bold text-[10px] flex items-center justify-center">
                K
              </div>
              <span className="font-code font-bold text-xs text-white uppercase tracking-wider">
                Production_App
              </span>
            </div>
            <span className="text-[9px] font-code px-1.5 py-0.5 border border-neutral-700 text-neutral-300 uppercase">
              RESPONSIVE_OK
            </span>
          </div>

          {/* Virtual Responsive Content Grid */}
          <div className="p-5 space-y-4 bg-[#080808]">
            {/* Lead banner */}
            <div className="p-4 bg-[#111111] border border-neutral-800">
              <span className="text-[10px] font-code text-neutral-400 uppercase tracking-widest block mb-1">
                SYSTEM_GRID
              </span>
              <h4 className="font-display font-bold text-base text-white uppercase">
                CSS Grid & Flexbox Stacking
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Watch cards seamlessly collapse from 3-column desktop layout to clean vertical mobile stacks without broken alignments.
              </p>
            </div>

            {/* Asymmetrical Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { label: 'Auto-Fit Grid', detail: 'Adapts to screen boundary with minmax(280px, 1fr).' },
                { label: 'Fluid Type (Clamp)', detail: 'Continuous scaling from 14px to 18px.' },
                { label: '48px Touch Targets', detail: 'Thumb-accessible tap targets on mobile.' },
              ].map((card, i) => (
                <div key={i} className="p-3.5 bg-[#0e0e0e] border border-neutral-800 hover:border-neutral-600 transition-colors">
                  <span className="text-[9px] font-code text-neutral-400 border border-neutral-700 px-1 py-0.5 uppercase">
                    MOD_0{i + 1}
                  </span>
                  <h5 className="font-code font-bold text-xs text-white mt-2 uppercase">{card.label}</h5>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">{card.detail}</p>
                </div>
              ))}
            </div>

            {/* Simulated Action */}
            <div className="pt-2 flex items-center justify-between border-t border-neutral-800">
              <button
                onClick={() => sound.playClick()}
                className="px-4 py-2 bg-white text-black font-code font-bold text-xs uppercase tracking-wider rounded-none hover:bg-neutral-200 transition-colors active:scale-95"
              >
                Validate Breakpoint
              </button>
              <span className="text-[10px] font-code text-neutral-500 uppercase">
                Zero Layout Reflow
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
