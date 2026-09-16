import React, { useState } from 'react';
import { Calculator, Check, Copy, Clock, ArrowRight, CornerDownRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface TaskOption {
  id: string;
  name: string;
  description: string;
  price: number;
  timeHours: number;
}

export const QuickFixEstimator: React.FC = () => {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([
    'css-fix',
    'mobile-fix',
  ]);
  const [isExpress, setIsExpress] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const taskCatalog: TaskOption[] = [
    {
      id: 'css-fix',
      name: 'CSS Layout & Overflow Glitch Fix',
      description: 'Eliminate unwanted horizontal scrollbars, misaligned flex/grid items, z-index layering conflicts.',
      price: 25,
      timeHours: 2,
    },
    {
      id: 'mobile-fix',
      name: 'Mobile Responsive Adaptation',
      description: 'Refactor broken views to render perfectly across iOS Safari and Android Chrome displays.',
      price: 35,
      timeHours: 3,
    },
    {
      id: 'animation-fx',
      name: 'Interactive UI Animation & Physics',
      description: 'Implement 60fps micro-interactions, custom tilt mechanics, magnetic buttons, or modal transitions.',
      price: 45,
      timeHours: 4,
    },
    {
      id: 'js-interactivity',
      name: 'JavaScript Dynamic Logic & DOM Scripting',
      description: 'Filter systems, interactive calculators, live validation forms, API data fetching scripts.',
      price: 40,
      timeHours: 3,
    },
    {
      id: 'speed-optimization',
      name: 'Performance & 60 FPS Speed Audit',
      description: 'Reduce DOM re-renders, optimize CSS selectors, and remove layout thrashing.',
      price: 30,
      timeHours: 2,
    },
  ];

  const toggleTask = (id: string) => {
    sound.playClick();
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const basePrice = taskCatalog
    .filter((t) => selectedTasks.includes(t.id))
    .reduce((sum, t) => sum + t.price, 0);

  const baseHours = taskCatalog
    .filter((t) => selectedTasks.includes(t.id))
    .reduce((sum, t) => sum + t.timeHours, 0);

  const expressSurcharge = isExpress ? 20 : 0;
  const totalPrice = basePrice + expressSurcharge;
  const estimatedDays = isExpress ? 'Within 24 Hours' : '1 - 2 Business Days';

  const generatedBrief = `Upwork Project Brief for Ivan Huban:
=========================================
Selected Scope:
${taskCatalog
  .filter((t) => selectedTasks.includes(t.id))
  .map((t) => `[x] ${t.name} ($${t.price})`)
  .join('\n')}

Timeline: ${estimatedDays}
Estimated Investment: $${totalPrice} USD
Terms: Strict HTML5/CSS3/JavaScript delivery, zero layout regressions, mobile tested.`;

  const handleCopyBrief = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(generatedBrief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white inline-block"></span>
            <h2 className="font-display font-extrabold text-2xl text-white uppercase tracking-tight">
              Task Pricing & Scope Estimator
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 font-code mt-1">
            Transparent pricing for frontend fixes, responsive refactoring, and JavaScript logic.
          </p>
        </div>

        <button
          onClick={() => {
            sound.playSwitch();
            setIsExpress(!isExpress);
          }}
          className={`flex items-center gap-2 px-3 py-1.5 border rounded-none text-xs font-code uppercase tracking-wider transition-all ${
            isExpress
              ? 'bg-white text-black border-white font-bold'
              : 'bg-black text-neutral-400 border-neutral-700 hover:text-white'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>{isExpress ? 'Express 24h Active (+ $20)' : 'Enable 24h Express'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Task Selection Column (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <span className="text-[11px] font-code font-bold text-neutral-400 uppercase tracking-widest block">
            Select Scope Deliverables:
          </span>

          {taskCatalog.map((task) => {
            const isSelected = selectedTasks.includes(task.id);
            return (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-4 border rounded-none transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  isSelected
                    ? 'bg-[#121212] border-white shadow-sm'
                    : 'bg-[#0a0a0a] border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 w-4 h-4 rounded-none flex items-center justify-center border transition-colors ${
                      isSelected
                        ? 'bg-white border-white text-black'
                        : 'border-neutral-700 bg-black'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-code font-bold uppercase text-white tracking-wide">
                      {task.name}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      {task.description}
                    </p>
                  </div>
                </div>

                <div className="text-right whitespace-nowrap">
                  <span className="text-sm font-extrabold text-white font-code">
                    ${task.price}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-code block">~{task.timeHours}H</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary & Copy Brief (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-[#0a0a0a] border border-neutral-800 rounded-none space-y-5 sticky top-24">
          
          <div className="border-b border-neutral-800 pb-4">
            <span className="text-[10px] font-code text-neutral-400 uppercase tracking-widest block">
              TOTAL ESTIMATE
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-display font-extrabold text-4xl text-white">
                ${totalPrice}
              </span>
              <span className="text-xs text-neutral-400 font-code">USD (FIXED PRICE)</span>
            </div>
            <div className="mt-2 text-xs font-code text-neutral-300 flex items-center gap-1.5">
              <span>DELIVERY:</span>
              <strong className="text-white uppercase">{estimatedDays}</strong>
            </div>
          </div>

          <div className="space-y-2 text-xs font-code text-neutral-300">
            <div className="flex justify-between">
              <span className="text-neutral-500">SELECTED ITEMS:</span>
              <span className="text-white font-bold">{selectedTasks.length} MODULES</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">ESTIMATED DEV TIME:</span>
              <span className="text-white font-bold">~{baseHours} HOURS</span>
            </div>
            {isExpress && (
              <div className="flex justify-between text-neutral-300">
                <span>PRIORITY 24H:</span>
                <span className="text-white font-bold">+$20</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-neutral-800 text-[11px]">
              <span className="text-neutral-500">PLATFORM:</span>
              <span className="text-white">UPWORK ESCROW VERIFIED</span>
            </div>
          </div>

          {/* Action: Copy Project Brief */}
          <button
            onClick={handleCopyBrief}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-neutral-200 text-black font-code font-bold text-xs uppercase tracking-wider rounded-none border border-white transition-all active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4 text-black" />}
            <span>{copied ? 'BRIEF COPIED TO CLIPBOARD' : 'COPY BRIEF FOR UPWORK'}</span>
          </button>

          <p className="text-[10px] font-code text-neutral-500 text-center leading-relaxed uppercase">
            Click above to copy structured specs for your Upwork message or proposal.
          </p>

        </div>

      </div>

    </div>
  );
};
