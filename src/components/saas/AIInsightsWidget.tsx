import React, { useState } from 'react';
import { AIInsight } from '../../types/saas';
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle2, RefreshCw, Zap } from 'lucide-react';

interface Props {
  insights: AIInsight[];
  onGenerateNew: () => void;
  isGenerating: boolean;
}

export const AIInsightsWidget: React.FC<Props> = ({ insights, onGenerateNew, isGenerating }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Gemini AI Business Insights
              <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                Live AI
              </span>
            </h3>
            <p className="text-xs text-slate-400">Autonomous churn prediction & MRR optimization</p>
          </div>
        </div>

        <button
          onClick={onGenerateNew}
          disabled={isGenerating}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-all border border-slate-700 disabled:opacity-50 active:scale-95"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin text-purple-400' : ''}`} />
          {isGenerating ? 'Analyzing Cohorts...' : 'Refresh Insights'}
        </button>
      </div>

      <div className="space-y-3 pt-2">
        {insights.map(ins => {
          const isOpp = ins.type === 'opportunity';
          const isRisk = ins.type === 'risk';

          return (
            <div
              key={ins.id}
              className={`p-4 rounded-xl border transition-all ${
                isOpp
                  ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/50'
                  : isRisk
                  ? 'bg-rose-950/20 border-rose-500/30 hover:border-rose-500/50'
                  : 'bg-blue-950/20 border-blue-500/30 hover:border-blue-500/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className={`mt-0.5 p-1 rounded-md ${
                    isOpp ? 'bg-emerald-500/20 text-emerald-400' : isRisk ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {isOpp ? <TrendingUp className="w-3.5 h-3.5" /> : isRisk ? <AlertTriangle className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{ins.title}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{ins.description}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full inline-block ${
                    isOpp ? 'bg-emerald-500/10 text-emerald-400' : isRisk ? 'bg-rose-500/10 text-rose-400' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {ins.impact}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">{ins.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
