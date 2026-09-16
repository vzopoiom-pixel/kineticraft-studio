import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FxPlayground } from './components/FxPlayground';
import { ViewportTester } from './components/ViewportTester';
import { QuickFixEstimator } from './components/QuickFixEstimator';
import { ContactSection } from './components/ContactSection';
import { ArrowUpRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('playground');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] flex flex-col selection:bg-white selection:text-black">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Hero Section */}
      <Hero
        onExplore={() => setActiveTab('playground')}
        onEstimate={() => setActiveTab('estimator')}
      />

      {/* Dynamic Content Views */}
      <main className="flex-1">
        {activeTab === 'playground' && <FxPlayground />}
        {activeTab === 'responsive' && <ViewportTester />}
        {activeTab === 'estimator' && <QuickFixEstimator />}
        {activeTab === 'contact' && <ContactSection />}
      </main>

      {/* Sleek Technical Monochrome Footer */}
      <footer className="border-t border-neutral-800 bg-black py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-code text-neutral-400">
          
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 bg-white text-black font-bold flex items-center justify-center text-[11px]">
              IH
            </div>
            <span className="font-bold text-white uppercase tracking-wider">
              KinetiCraft
            </span>
            <span className="text-neutral-600">/</span>
            <span>ENGINEERED BY IVAN HUBAN</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-neutral-500 hidden md:inline">PURE HTML5 / CSS3 / JAVASCRIPT</span>
            <span className="text-neutral-700 hidden md:inline">|</span>
            <button
              onClick={() => setActiveTab('contact')}
              className="text-white hover:text-neutral-300 font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
            >
              <span>AVAILABLE FOR HIRE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
}
