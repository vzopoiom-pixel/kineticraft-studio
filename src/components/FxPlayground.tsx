import React, { useState, useRef } from 'react';
import { 
  Sliders, 
  Copy, 
  Check, 
  Layers, 
  Rotate3d, 
  Zap, 
  Code2, 
  CornerDownRight,
  Maximize2,
  MousePointer
} from 'lucide-react';
import { sound } from '../utils/audio';

export const FxPlayground: React.FC = () => {
  // Depth & Glass parameters
  const [blur, setBlur] = useState<number>(12);
  const [opacity, setOpacity] = useState<number>(40);
  const [borderWidth, setBorderWidth] = useState<number>(1);
  const [contrastLevel, setContrastLevel] = useState<string>('light'); // light or deep
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // 3D Tilt Card State
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Micro-interaction state
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const [activeTabCode, setActiveTabCode] = useState<'css' | 'tailwind'>('css');

  // Copy handler with sound feedback
  const handleCopy = (text: string, type: string) => {
    sound.playSuccess();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  // 3D Tilt calculation
  const handleMouseMoveTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, glareX, glareY });
  };

  const handleMouseLeaveTilt = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  // Magnetic button physics
  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setMagneticOffset({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMagneticLeave = () => {
    setMagneticOffset({ x: 0, y: 0 });
  };

  // Clean Minimalist CSS & Tailwind Code
  const generatedCss = `/* Monochrome Brutalist Glass CSS */
background: rgba(18, 18, 18, ${(opacity / 100).toFixed(2)});
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: ${borderWidth}px solid rgba(255, 255, 255, 0.15);
border-radius: 0px;
box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.7);`;

  const generatedTailwind = `bg-neutral-900/${opacity} backdrop-blur-[${blur}px] border-[${borderWidth}px] border-white/15 rounded-none shadow-2xl`;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* SECTION 1: Asymmetrical Glassmorphism & Depth Studio */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white inline-block"></span>
              <h2 className="font-display font-extrabold text-2xl text-white uppercase tracking-tight">
                Depth & Optical Transmission Lab
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-code mt-1">
              Real-time backdrop filters, sharp geometry, and mathematical blur calculations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(generatedCss, 'css')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-neutral-900 border border-neutral-700 text-xs font-code font-bold uppercase tracking-wider text-white transition-colors rounded-none"
            >
              {copiedType === 'css' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === 'css' ? 'COPIED CSS' : 'COPY CSS'}</span>
            </button>
            <button
              onClick={() => handleCopy(generatedTailwind, 'tailwind')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-neutral-200 text-black text-xs font-code font-bold uppercase tracking-wider transition-colors rounded-none border border-white"
            >
              {copiedType === 'tailwind' ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === 'tailwind' ? 'COPIED TAILWIND' : 'COPY TAILWIND'}</span>
            </button>
          </div>
        </div>

        {/* Bento Grid Layout - Different Sizes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 p-5 sm:p-6 bg-[#0a0a0a] border border-neutral-800 rounded-none space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className="font-code text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-neutral-400" />
                <span>Engine Parameters</span>
              </span>
              <span className="text-[10px] font-code text-neutral-500">LIVE_SYNC</span>
            </div>

            {/* Blur slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-code text-neutral-300">
                <span className="uppercase">Backdrop Blur</span>
                <span className="text-white font-bold">{blur}PX</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={blur}
                onChange={(e) => {
                  sound.playClick();
                  setBlur(Number(e.target.value));
                }}
                className="w-full accent-white cursor-pointer"
              />
            </div>

            {/* Opacity slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-code text-neutral-300">
                <span className="uppercase">Surface Density</span>
                <span className="text-white font-bold">{opacity}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                value={opacity}
                onChange={(e) => {
                  sound.playClick();
                  setOpacity(Number(e.target.value));
                }}
                className="w-full accent-white cursor-pointer"
              />
            </div>

            {/* Border width */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-code text-neutral-300">
                <span className="uppercase">Border Width</span>
                <span className="text-white font-bold">{borderWidth}PX</span>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                value={borderWidth}
                onChange={(e) => {
                  sound.playClick();
                  setBorderWidth(Number(e.target.value));
                }}
                className="w-full accent-white cursor-pointer"
              />
            </div>

            {/* Code Tab Switcher */}
            <div className="pt-3 border-t border-neutral-900">
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTabCode('css')}
                    className={`text-[10px] font-code uppercase px-2 py-1 border transition-colors ${
                      activeTabCode === 'css' ? 'bg-white text-black border-white font-bold' : 'bg-black text-neutral-400 border-neutral-800'
                    }`}
                  >
                    CSS Output
                  </button>
                  <button
                    onClick={() => setActiveTabCode('tailwind')}
                    className={`text-[10px] font-code uppercase px-2 py-1 border transition-colors ${
                      activeTabCode === 'tailwind' ? 'bg-white text-black border-white font-bold' : 'bg-black text-neutral-400 border-neutral-800'
                    }`}
                  >
                    Tailwind Utility
                  </button>
                </div>
              </div>
              <pre className="text-[11px] font-code text-neutral-300 bg-black p-3.5 border border-neutral-800 overflow-x-auto leading-relaxed">
                {activeTabCode === 'css' ? generatedCss : generatedTailwind}
              </pre>
            </div>
          </div>

          {/* Big Live Interactive Preview Stage (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[360px] bg-[#000000] border border-neutral-800 p-6 sm:p-8 flex items-center justify-center overflow-hidden bg-tech-grid rounded-none">
            
            {/* Geometric technical background blocks to prove blur */}
            <div className="absolute top-8 left-8 w-28 h-28 border border-neutral-700 bg-neutral-900 pointer-events-none" />
            <div className="absolute bottom-6 right-8 w-44 h-24 border border-neutral-600 bg-neutral-800 pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white pointer-events-none opacity-20" />

            {/* The Sharp Glass Component */}
            <div
              className="relative z-10 w-full max-w-md p-6 sm:p-7 transition-all duration-150 rounded-none shadow-2xl"
              style={{
                background: `rgba(18, 18, 18, ${opacity / 100})`,
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                border: `${borderWidth}px solid rgba(255, 255, 255, 0.2)`,
              }}
            >
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <span className="font-code text-[11px] font-bold uppercase tracking-wider text-white">
                  PREVIEW // SHARP_CONTAINER
                </span>
                <span className="text-[10px] font-code text-neutral-400 uppercase">
                  60 FPS RENDER
                </span>
              </div>

              <h4 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-2">
                Geometric Surface
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed">
                Notice the mathematical background refraction through this container. 
                Pure monochrome precision without unnecessary gradients or colored noise.
              </p>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => sound.playClick()}
                  className="px-4 py-2 bg-white text-black font-code font-bold text-xs uppercase tracking-wider rounded-none hover:bg-neutral-200 transition-colors active:scale-95"
                >
                  Primary Action
                </button>
                <button
                  onClick={() => sound.playClick()}
                  className="px-4 py-2 bg-black text-white font-code text-xs uppercase tracking-wider rounded-none border border-neutral-700 hover:border-neutral-500 transition-colors"
                >
                  Secondary Action
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: 3D Tilt Physics & Technical Micro-Interactions */}
      <section className="space-y-6">
        <div className="border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white inline-block"></span>
            <h2 className="font-display font-extrabold text-2xl text-white uppercase tracking-tight">
              Calculated 3D Tilt & Magnetic Physics
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 font-code mt-1">
            Zero-dependency cursor perspective calculation mapping vector coordinates into spatial matrix angles.
          </p>
        </div>

        {/* Asymmetrical 2-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Left: 3D Tilt Stage (7 cols) */}
          <div className="md:col-span-7 flex flex-col items-center justify-center p-6 sm:p-10 bg-[#0a0a0a] border border-neutral-800 rounded-none min-h-[380px]">
            <div
              ref={cardRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseMove={handleMouseMoveTilt}
              onMouseLeave={handleMouseLeaveTilt}
              className="relative w-full max-w-sm p-6 sm:p-7 transition-transform duration-75 ease-out cursor-pointer select-none rounded-none border border-neutral-700"
              style={{
                transformStyle: 'preserve-3d',
                transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                background: '#121212',
                boxShadow: isHovered 
                  ? '0 30px 60px -15px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.2)' 
                  : '0 10px 30px -5px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Dynamic Glare Reflection */}
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                style={{
                  opacity: isHovered ? 0.25 : 0,
                  background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.7) 0%, transparent 60%)`,
                }}
              />

              <div className="relative z-10 space-y-4" style={{ transform: 'translateZ(25px)' }}>
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div className="w-8 h-8 bg-white text-black font-code font-bold text-xs flex items-center justify-center">
                    3D
                  </div>
                  <span className="font-code text-[11px] text-neutral-400 uppercase">
                    X: {tilt.rotateX.toFixed(1)}° / Y: {tilt.rotateY.toFixed(1)}°
                  </span>
                </div>

                <div>
                  <h4 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                    Interactive Perspective
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1 font-code">
                    Matrix transform calculation
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Hover over this module to tilt the plane. Mathematical coordinate mapping translates clientX and clientY into responsive pitch and yaw.
                </p>

                <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-code text-neutral-400">
                  <span className="px-2 py-1 bg-black border border-neutral-800">HARDWARE_ACCELERATED</span>
                  <span className="px-2 py-1 bg-black border border-neutral-800">60 FPS</span>
                </div>
              </div>
            </div>

            <span className="text-[11px] text-neutral-500 font-code mt-5 flex items-center gap-1.5 uppercase">
              <MousePointer className="w-3.5 h-3.5" />
              <span>Hover and drag cursor across surface</span>
            </span>
          </div>

          {/* Right: Technical Micro-Interactions & Magnetic Block (5 cols) */}
          <div className="md:col-span-5 p-6 sm:p-7 bg-[#0a0a0a] border border-neutral-800 rounded-none flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                <h3 className="font-display font-bold text-base text-white uppercase tracking-wide">
                  Magnetic Physics & States
                </h3>
                <span className="font-code text-[10px] text-neutral-500">MODULE_02</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-code">
                Interactive haptic feedback for primary calls-to-action. Element tracks cursor vicinity with ease-out springs.
              </p>
            </div>

            {/* Magnetic Button Testing Arena */}
            <div className="p-6 bg-black border border-neutral-800 flex flex-col items-center justify-center space-y-4">
              <span className="text-[10px] font-code text-neutral-500 uppercase tracking-wider">
                Hover to attract element:
              </span>
              
              <button
                onMouseMove={handleMagneticMove}
                onMouseLeave={handleMagneticLeave}
                onClick={() => sound.playSuccess()}
                style={{
                  transform: `translate(${magneticOffset.x}px, ${magneticOffset.y}px)`,
                  transition: magneticOffset.x === 0 ? 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
                }}
                className="px-6 py-3 bg-white text-black font-code font-bold text-xs uppercase tracking-widest rounded-none border border-white hover:bg-neutral-200 active:scale-95 select-none shadow-sm"
              >
                <span>Magnetic Trigger</span>
              </button>
            </div>

            {/* Audio Synthesis Info Block */}
            <div className="p-4 bg-neutral-950 border border-neutral-800">
              <div className="flex items-center justify-between text-xs font-code mb-1">
                <span className="text-white uppercase font-bold">Web Audio Synthesis</span>
                <span className="text-neutral-400">ACTIVE</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Oscillator synthesizes procedural clicks (320Hz–640Hz) without loading external MP3 files.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
