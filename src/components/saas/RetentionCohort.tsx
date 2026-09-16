import React from 'react';
import { CohortRow } from '../../types/saas';
import { Layers, HelpCircle } from 'lucide-react';

interface Props {
  cohorts: CohortRow[];
}

export const RetentionCohort: React.FC<Props> = ({ cohorts }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Customer Retention Heatmap</h3>
            <p className="text-xs text-slate-400">Cohort retention rate over 6-month lifecycle</p>
          </div>
        </div>

        <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
          Avg Retention: 84.2%
        </span>
      </div>

      {/* Cohort Heatmap Grid */}
      <div className="overflow-x-auto pt-2">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <th className="py-2.5 px-3">Subscription Tier</th>
              <th className="py-2.5 px-3 text-center">Month 0</th>
              <th className="py-2.5 px-3 text-center">Month 1</th>
              <th className="py-2.5 px-3 text-center">Month 2</th>
              <th className="py-2.5 px-3 text-center">Month 3</th>
              <th className="py-2.5 px-3 text-center">Month 4</th>
              <th className="py-2.5 px-3 text-center">Month 5</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 text-xs">
            {cohorts.map((c, idx) => (
              <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-3 font-semibold text-white">
                  {c.plan}
                </td>
                {[c.m0, c.m1, c.m2, c.m3, c.m4, c.m5].map((val, mIdx) => {
                  // Color intensity based on retention percentage
                  const isHigh = val >= 90;
                  const isMid = val >= 75 && val < 90;
                  const isLow = val < 75;

                  return (
                    <td key={mIdx} className="py-3 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold w-12 text-center transition-all ${
                          isHigh
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : isMid
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                        }`}
                      >
                        {val}%
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span>* Cohort calculations refreshed from Supabase events</span>
        <span className="text-slate-400">Industry top quartile &gt; 80%</span>
      </div>
    </div>
  );
};
