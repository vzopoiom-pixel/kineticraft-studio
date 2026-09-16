import { Customer, RevenueDataPoint, CohortRow, AIInsight } from '../types/saas';

export const INITIAL_SAAS_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-1041',
    name: 'Alex Rivera',
    email: 'alex@lumina.ai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    plan: 'Pro',
    status: 'Active',
    joinDate: 'Aug 14, 2026',
    mrr: 199,
    growthRate: 15.4
  },
  {
    id: 'CUST-1042',
    name: 'Sophia Chen',
    email: 'sophia@nexuscloud.io',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    plan: 'Enterprise',
    status: 'Active',
    joinDate: 'Jul 28, 2026',
    mrr: 1250,
    growthRate: 24.8
  },
  {
    id: 'CUST-1043',
    name: 'Marcus Vance',
    email: 'marcus@hypergrowth.co',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    plan: 'Growth',
    status: 'Active',
    joinDate: 'Aug 02, 2026',
    mrr: 499,
    growthRate: 8.2
  },
  {
    id: 'CUST-1044',
    name: 'Elena Rostova',
    email: 'elena@vortexlabs.tech',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    plan: 'Pro',
    status: 'Trial',
    joinDate: 'Aug 24, 2026',
    mrr: 199,
    growthRate: 0.0
  },
  {
    id: 'CUST-1045',
    name: 'David Kim',
    email: 'dkim@finscale.app',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    plan: 'Starter',
    status: 'Past Due',
    joinDate: 'Jun 19, 2026',
    mrr: 49,
    growthRate: -5.0
  },
  {
    id: 'CUST-1046',
    name: 'Chloe Bennett',
    email: 'chloe@aerodynamic.io',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    plan: 'Growth',
    status: 'Churned',
    joinDate: 'May 11, 2026',
    mrr: 499,
    growthRate: -100.0
  }
];

export const REVENUE_HISTORY: RevenueDataPoint[] = [
  { month: 'Mar', revenue: 42300, mrr: 38400, expenses: 14200, netProfit: 28100 },
  { month: 'Apr', revenue: 51800, mrr: 44200, expenses: 16800, netProfit: 35000 },
  { month: 'May', revenue: 64200, mrr: 56900, expenses: 19500, netProfit: 44700 },
  { month: 'Jun', revenue: 78900, mrr: 69100, expenses: 22400, netProfit: 56500 },
  { month: 'Jul', revenue: 94500, mrr: 83400, expenses: 26100, netProfit: 68400 },
  { month: 'Aug', revenue: 114280, mrr: 98650, expenses: 29800, netProfit: 84480 }
];

export const RETENTION_COHORTS: CohortRow[] = [
  { plan: 'Enterprise', m0: 100, m1: 98, m2: 97, m3: 95, m4: 95, m5: 94 },
  { plan: 'Growth ($499)', m0: 100, m1: 94, m2: 90, m3: 88, m4: 86, m5: 84 },
  { plan: 'Pro ($199)', m0: 100, m1: 91, m2: 85, m3: 81, m4: 78, m5: 76 },
  { plan: 'Starter ($49)', m0: 100, m1: 82, m2: 74, m3: 68, m4: 63, m5: 59 }
];

export const INITIAL_AI_INSIGHTS: AIInsight[] = [
  {
    id: 'INS-1',
    type: 'opportunity',
    title: 'High Expansion Potential in Pro Tier',
    description: '42 Pro tier accounts reached 85%+ monthly compute quotas. Recommending automated 1-click upgrade banner to Growth plan.',
    impact: '+$8,400 MRR potential',
    timestamp: '12m ago'
  },
  {
    id: 'INS-2',
    type: 'optimization',
    title: 'Trial Conversion Velocity Spike',
    description: 'Onboarding walkthrough updates increased 7-day conversion rate by +14.2% across North American enterprise signups.',
    impact: '+22.4% ARR trajectory',
    timestamp: '1h ago'
  },
  {
    id: 'INS-3',
    type: 'risk',
    title: 'Payment Retry Alert (Past Due)',
    description: '3 high-value accounts encountered card expiry webhook failures. Dunning sequence #2 triggered via Stripe.',
    impact: '$1,247 recoverable ARR',
    timestamp: '3h ago'
  }
];
