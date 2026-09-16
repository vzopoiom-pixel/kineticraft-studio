import React, { useState } from 'react';
import { RevenueDataPoint } from '../../types/saas';
import { BarChart3, TrendingUp, Calendar } from 'lucide-react';

interface Props {
  data: RevenueDataPoint[];
}

export const RevenueChart: React.FC<Props> = ({ data }) => {
  const [activeMetric, setActiveMetric] = useState<'revenue' | 'mrr' | 'netProfit'>('revenue');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxValue = Math.max(...data.map(d => d[activeMetric])) * 1.15;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Revenue Growth & Expansion</h3>
              <p className="text-xs text-slate-400">Monthly recurring income & margin performance</p>
            </div>
          </div>
        </div>

        {/* Metric Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800 self-start sm:self-auto">
          {(['revenue', 'mrr', 'netProfit'] as const).map(key => {
            const labels = {
              revenue: 'Total Revenue',
              mrr: 'MRR',
              netProfit: 'Net Margin'
            };
            return (
              <button
                key={key}
                onClick={() => setActiveMetric(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeMetric === key
                    ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {labels[key]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Vector Chart */}
      <div className="mt-6">
        <div className="h-64 flex items-end justify-between gap-3 sm:gap-6 pt-8 pb-4 relative">
          {/* Horizontal grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="border-b border-slate-700 w-full" />
            <div className="border-b border-slate-700 w-full" />
            <div className="border-b border-slate-700 w-full" />
            <div className="border-b border-slate-700 w-full" />
          </div>

          {data.map((item, idx) => {
            const val = item[activeMetric];
            const heightPercent = Math.max(12, Math.round((val / maxValue) * 100));
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center h-full justify-end group relative z-10"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-12 bg-slate-950 border border-emerald-500/40 px-3 py-1.5 rounded-lg shadow-2xl text-center whitespace-nowrap z-30 animate-in fade-in zoom-in-95">
                    <span className="text-[11px] font-semibold text-slate-400 block">{item.month} 2026</span>
                    <span className="text-xs font-bold text-emerald-400">${val.toLocaleString('en-US')}</span>
                  </div>
                )}

                {/* Bar */}
                <div className="w-full max-w-[48px] bg-slate-800/80 hover:bg-slate-800 rounded-t-xl overflow-hidden flex items-end transition-all h-full">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-xl transition-all duration-500 ${
                      isHovered
                        ? 'bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-lg shadow-emerald-500/30'
                        : 'bg-gradient-to-t from-emerald-600/70 to-emerald-500/90 group-hover:from-emerald-500 group-hover:to-emerald-400'
                    }`}
                  />
                </div>

                {/* Month Label */}
                <span className={`mt-3 text-xs font-semibold transition-colors ${
                  isHovered ? 'text-emerald-400' : 'text-slate-400'
                }`}>
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block"></span>
              {activeMetric.toUpperCase()} (Stripe Verified)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-700 inline-block"></span>
              Infrastructure & Compute Costs
            </span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>Updated: Today, 14:50 UTC</span>
          </div>
        </div>
      </div>
    </div>
  );
};
