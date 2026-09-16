import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Code2, Layers, Smartphone, Calculator, Send, ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
}) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'playground', label: 'Interactive FX', icon: Layers },
    { id: 'responsive', label: 'Device Inspector', icon: Smartphone },
    { id: 'estimator', label: 'Estimator', icon: Calculator },
    { id: 'contact', label: 'Contact', icon: Send },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-[#050505]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo - Sharp and Minimalist */}
        <div 
          onClick={() => {
            sound.playClick();
            setActiveTab('playground');
          }}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-none bg-white text-black flex items-center justify-center font-code font-bold text-sm group-hover:bg-neutral-200 transition-colors border border-white">
            IH
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base tracking-wider uppercase text-white group-hover:text-neutral-300 transition-colors">
                KinetiCraft
              </span>
              <span className="px-1.5 py-0.2 text-[9px] font-code font-bold bg-neutral-900 text-neutral-300 border border-neutral-700 uppercase tracking-widest">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 font-code tracking-wide">Ivan Huban • Creative Engineer</p>
          </div>
        </div>

        {/* Navigation Tabs - Sharp, technical */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-950 p-1 border border-neutral-800 rounded-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playSwitch();
                  setActiveTab(item.id);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-none text-xs font-code uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Info: Status + Sound + Sharp CTA */}
        <div className="flex items-center gap-2.5">
          
          {/* Live Clock & Status */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-300 font-code rounded-none">
            <span className="w-1.5 h-1.5 bg-white inline-block"></span>
            <span className="text-neutral-200 font-semibold tracking-wider uppercase">Open</span>
            <span className="text-neutral-600">|</span>
            <span>{time}</span>
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              sound.enabled = next;
              if (next) sound.playSuccess();
            }}
            title={soundEnabled ? 'Mute Audio FX' : 'Unmute Audio FX'}
            className={`p-2 border rounded-none transition-all ${
              soundEnabled
                ? 'bg-neutral-900 border-neutral-600 text-white hover:bg-neutral-800'
                : 'bg-black border-neutral-800 text-neutral-500 hover:text-neutral-300'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Direct CTA - Solid White, Sharp Corners */}
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('contact');
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-neutral-200 text-black font-code font-bold text-xs uppercase tracking-wider transition-all rounded-none border border-white active:scale-95"
          >
            <span>Hire Dev</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

      </div>

      {/* Mobile nav bar - Sharp and Thumb Friendly */}
      <div className="md:hidden grid grid-cols-4 border-t border-neutral-800 bg-[#050505]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playSwitch();
                setActiveTab(item.id);
              }}
              className={`flex flex-col items-center justify-center py-2.5 px-1 font-code text-[10px] tracking-wider uppercase transition-colors border-r last:border-r-0 border-neutral-800 ${
                isActive ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 mb-1" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
