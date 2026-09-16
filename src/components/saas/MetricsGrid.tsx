import React from 'react';
import { DollarSign, TrendingUp, Users, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Props {
  mrrTotal: number;
  activeCount: number;
}

export const MetricsGrid: React.FC<Props> = ({ mrrTotal, activeCount }) => {
  const arrTotal = mrrTotal * 12;

  const metrics = [
    {
      title: 'Monthly Recurring Revenue (MRR)',
      value: `$${mrrTotal.toLocaleString('en-US')}`,
      change: '+18.4%',
      isPositive: true,
      period: 'vs last month',
      icon: DollarSign,
      color: 'emerald'
    },
    {
      title: 'Annual Run Rate (ARR)',
      value: `$${arrTotal.toLocaleString('en-US')}`,
      change: '+24.1%',
      isPositive: true,
      period: 'projected yearly',
      icon: TrendingUp,
      color: 'blue'
    },
    {
      title: 'Active Paid Subscriptions',
      value: activeCount.toLocaleString('en-US'),
      change: '+12 new',
      isPositive: true,
      period: 'past 30 days',
      icon: Users,
      color: 'violet'
    },
    {
      title: 'Net Revenue Retention (NRR)',
      value: '118.5%',
      change: '+3.2%',
      isPositive: true,
      period: 'industry benchmark: >110%',
      icon: CreditCard,
      color: 'teal'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg hover:border-slate-700 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">{m.title}</span>
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-white tracking-tight">{m.value}</span>
              <span
                className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
                  m.isPositive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}
              >
                {m.isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                {m.change}
              </span>
            </div>

            <p className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              {m.period}
            </p>
          </div>
        );
      })}
    </div>
  );
};
