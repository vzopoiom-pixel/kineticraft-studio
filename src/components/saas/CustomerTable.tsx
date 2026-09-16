import React, { useState } from 'react';
import { Customer } from '../../types/saas';
import { Search, Filter, ArrowUpDown, UserCheck, ShieldAlert, Sparkles, Download, Plus } from 'lucide-react';

interface Props {
  customers: Customer[];
  onAddCustomer: (customer: Omit<Customer, 'id'>) => void;
  onUpdateStatus: (id: string, newStatus: Customer['status']) => void;
}

export const CustomerTable: React.FC<Props> = ({ customers, onAddCustomer, onUpdateStatus }) => {
  const [search, setSearch] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New customer form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPlan, setNewPlan] = useState<Customer['plan']>('Pro');
  const [newMrr, setNewMrr] = useState('199');

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.email.toLowerCase().includes(search.toLowerCase()) ||
                          c.id.toLowerCase().includes(search.toLowerCase());
    const matchesPlan = selectedPlan === 'All' || c.plan === selectedPlan;
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    onAddCustomer({
      name: newName.trim(),
      email: newEmail.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      plan: newPlan,
      status: 'Active',
      joinDate: 'Aug 28, 2026',
      mrr: Number(newMrr) || 199,
      growthRate: 10.0
    });

    setNewName('');
    setNewEmail('');
    setShowAddModal(false);
  };

  const exportCSV = () => {
    const headers = ['ID,Name,Email,Plan,Status,JoinDate,MRR'];
    const rows = filteredCustomers.map(c => `"${c.id}","${c.name}","${c.email}","${c.plan}","${c.status}","${c.joinDate}",$${c.mrr}`);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'saas_customers_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
      {/* Table Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Recent Customer Subscriptions</h3>
              <p className="text-xs text-slate-400">Supabase real-time sync & Stripe status</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-all border border-slate-700 active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-500/10 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        {/* Search */}
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by customer name, email, or ID..."
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-emerald-500 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none transition-all"
          />
        </div>

        {/* Plan Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedPlan}
            onChange={e => setSelectedPlan(e.target.value)}
            aria-label="Filter by subscription plan"
            className="bg-slate-950/80 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Plans</option>
            <option value="Starter">Starter ($49)</option>
            <option value="Pro">Pro ($199)</option>
            <option value="Growth">Growth ($499)</option>
            <option value="Enterprise">Enterprise ($1,250)</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            aria-label="Filter by account status"
            className="bg-slate-950/80 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Trial">Trial</option>
            <option value="Past Due">Past Due</option>
            <option value="Churned">Churned</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/40">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Account ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Subscription Tier</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Join Date</th>
              <th className="py-3 px-4 text-right">MRR Value</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  No customers found matching your filter criteria.
                </td>
              </tr>
            ) : (
              filteredCustomers.map(customer => {
                const isStatusActive = customer.status === 'Active';
                const isTrial = customer.status === 'Trial';
                const isPastDue = customer.status === 'Past Due';

                return (
                  <tr key={customer.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                      {customer.id}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={customer.avatar}
                          alt={customer.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <div className="font-semibold text-white">{customer.name}</div>
                          <div className="text-[11px] text-slate-400">{customer.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${
                        customer.plan === 'Enterprise'
                          ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                          : customer.plan === 'Growth'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : customer.plan === 'Pro'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {customer.plan}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        isStatusActive
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : isTrial
                          ? 'bg-amber-500/10 text-amber-400'
                          : isPastDue
                          ? 'bg-rose-500/10 text-rose-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isStatusActive ? 'bg-emerald-400' : isTrial ? 'bg-amber-400' : isPastDue ? 'bg-rose-400' : 'bg-slate-400'
                        }`} />
                        {customer.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-400">
                      {customer.joinDate}
                    </td>

                    <td className="py-3 px-4 text-right font-bold text-white">
                      ${customer.mrr.toLocaleString('en-US')}/mo
                    </td>

                    <td className="py-3 px-4 text-center">
                      <select
                        value={customer.status}
                        onChange={e => onUpdateStatus(customer.id, e.target.value as Customer['status'])}
                        aria-label={`Change status for ${customer.name}`}
                        className="bg-slate-900 border border-slate-700 text-slate-300 text-[11px] rounded-lg px-2 py-1 focus:outline-none focus:border-emerald-500 cursor-pointer"
                      >
                        <option value="Active">Set Active</option>
                        <option value="Trial">Set Trial</option>
                        <option value="Past Due">Set Past Due</option>
                        <option value="Churned">Set Churned</option>
                      </select>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h4 className="text-base font-bold text-white">Add New Subscriber</h4>
            <form onSubmit={handleCreateCustomer} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Jordan Miller"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  placeholder="e.g. jordan@startup.co"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Plan Tier</label>
                  <select
                    value={newPlan}
                    onChange={e => {
                      const p = e.target.value as Customer['plan'];
                      setNewPlan(p);
                      if (p === 'Starter') setNewMrr('49');
                      if (p === 'Pro') setNewMrr('199');
                      if (p === 'Growth') setNewMrr('499');
                      if (p === 'Enterprise') setNewMrr('1250');
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Starter">Starter ($49)</option>
                    <option value="Pro">Pro ($199)</option>
                    <option value="Growth">Growth ($499)</option>
                    <option value="Enterprise">Enterprise ($1,250)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Monthly MRR ($)</label>
                  <input
                    type="number"
                    value={newMrr}
                    onChange={e => setNewMrr(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md"
                >
                  Create Subscriber
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
