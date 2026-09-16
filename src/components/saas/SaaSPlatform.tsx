import React, { useState } from 'react';
import { MetricsGrid } from './MetricsGrid';
import { RevenueChart } from './RevenueChart';
import { CustomerTable } from './CustomerTable';
import { AIInsightsWidget } from './AIInsightsWidget';
import { RetentionCohort } from './RetentionCohort';
import { INITIAL_SAAS_CUSTOMERS, REVENUE_HISTORY, RETENTION_COHORTS, INITIAL_AI_INSIGHTS } from '../../data/saasMockData';
import { Customer, AIInsight } from '../../types/saas';
import { LayoutDashboard, Users, CreditCard, Sparkles, Database, ShieldCheck, Activity, Bell, ExternalLink, SlidersHorizontal } from 'lucide-react';

export const SaaSPlatform: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_SAAS_CUSTOMERS);
  const [insights, setInsights] = useState<AIInsight[]>(INITIAL_AI_INSIGHTS);
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false);
  const [activeNav, setActiveNav] = useState<'dashboard' | 'subscribers' | 'ai_insights' | 'cohorts'>('dashboard');

  // Compute live MRR
  const totalMRR = customers
    .filter(c => c.status === 'Active' || c.status === 'Trial')
    .reduce((acc, c) => acc + c.mrr, 0);

  const activeSubscribersCount = customers.filter(c => c.status === 'Active').length;

  const handleAddCustomer = (newCustomer: Omit<Customer, 'id'>) => {
    const id = `CUST-${Math.floor(1000 + Math.random() * 9000)}`;
    setCustomers(prev => [
      {
        ...newCustomer,
        id
      },
      ...prev
    ]);
  };

  const handleUpdateStatus = (id: string, newStatus: Customer['status']) => {
    setCustomers(prev =>
      prev.map(c => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const handleGenerateNewInsights = () => {
    setIsGeneratingInsights(true);
    setTimeout(() => {
      const generatedInsight: AIInsight = {
        id: `INS-${Date.now()}`,
        type: 'opportunity',
        title: 'New Expansion Signal: High API Consumption',
        description: '3 Enterprise accounts have scaled API webhooks by 320%. Recommended custom SLA contract renewal.',
        impact: '+$14,200 ARR potential',
        timestamp: 'Just now'
      };
      setInsights(prev => [generatedInsight, ...prev.slice(0, 2)]);
      setIsGeneratingInsights(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row antialiased">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900/90 border-r border-slate-800 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 px-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-white tracking-tight block">Lumina SaaS</span>
              <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Next.js 14 + Supabase</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-2">
            {[
              { id: 'dashboard', label: 'Analytics Overview', icon: LayoutDashboard },
              { id: 'subscribers', label: 'Customers & MRR', icon: Users },
              { id: 'ai_insights', label: 'AI Growth Engine', icon: Sparkles },
              { id: 'cohorts', label: 'Retention Cohorts', icon: CreditCard }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Tech Stack Pills */}
          <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
              <span>Stack Status</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Connected
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold text-slate-400">
              <span className="px-2 py-0.5 bg-slate-800 rounded-md">Next.js 14</span>
              <span className="px-2 py-0.5 bg-slate-800 rounded-md">TypeScript</span>
              <span className="px-2 py-0.5 bg-slate-800 rounded-md">Supabase RLS</span>
              <span className="px-2 py-0.5 bg-slate-800 rounded-md">Tailwind</span>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div className="pt-6 border-t border-slate-800 flex items-center gap-3 px-1">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs border border-emerald-500/30">
            IH
          </div>
          <div className="truncate">
            <span className="text-xs font-bold text-white block truncate">Ivan H. (Lead Engineer)</span>
            <span className="text-[10px] text-slate-400 truncate block">vzopoiom-pixel</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto max-w-7xl mx-auto w-full">
        {/* Top bar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">AI SaaS Analytics & Subscription Platform</h1>
            <p className="text-xs text-slate-400 mt-1">
              Production dashboard tracking real-time MRR, customer cohorts, and automated Gemini AI optimization insights.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>PostgreSQL / Supabase</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>RLS Active</span>
            </div>
          </div>
        </header>

        {/* Main Content Render */}
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <MetricsGrid mrrTotal={totalMRR} activeCount={activeSubscribersCount} />

          {/* Revenue Chart + AI Insights Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RevenueChart data={REVENUE_HISTORY} />
            </div>
            <div className="lg:col-span-1">
              <AIInsightsWidget
                insights={insights}
                onGenerateNew={handleGenerateNewInsights}
                isGenerating={isGeneratingInsights}
              />
            </div>
          </div>

          {/* Customers Table + Retention Cohorts Row */}
          <div className="grid grid-cols-1 gap-6">
            <CustomerTable
              customers={customers}
              onAddCustomer={handleAddCustomer}
              onUpdateStatus={handleUpdateStatus}
            />

            <RetentionCohort cohorts={RETENTION_COHORTS} />
          </div>
        </div>
      </main>
    </div>
  );
};
