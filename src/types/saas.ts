export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: 'Starter' | 'Pro' | 'Growth' | 'Enterprise';
  status: 'Active' | 'Trial' | 'Churned' | 'Past Due';
  joinDate: string;
  mrr: number; // in USD (e.g. 49, 199, 499, 1200)
  growthRate: number; // e.g. +12%
}

export interface MetricCardData {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  period: string;
  iconName: string;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  mrr: number;
  expenses: number;
  netProfit: number;
}

export interface CohortRow {
  plan: string;
  m0: number;
  m1: number;
  m2: number;
  m3: number;
  m4: number;
  m5: number;
}

export interface AIInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'optimization';
  title: string;
  description: string;
  impact: string;
  timestamp: string;
}
