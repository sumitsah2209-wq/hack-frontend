import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, ShieldCheck,
  AlertOctagon, Sparkles, ChevronRight
} from 'lucide-react';
import {
  AreaChart, Area, PieChart as RechartsPie, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useAppData } from '../context/AppDataContext';
import { formatCurrency } from '../utils/helpers';
import SmartCard from '../components/common/SmartCard';

// Fallback chart data
const fallbackMonthlySpend = [
  { month: 'Nov', amount: 11200 },
  { month: 'Dec', amount: 13400 },
  { month: 'Jan', amount: 12100 },
  { month: 'Feb', amount: 14800 },
  { month: 'Mar', amount: 18200 },
  { month: 'Apr', amount: 12900 },
];

const fallbackCategoryData = [
  { name: 'Utilities', value: 1930, color: '#f59e0b' },
  { name: 'Internet', value: 1400, color: '#8b5cf6' },
  { name: 'Telecom', value: 950, color: '#10b981' },
  { name: 'Entertainment', value: 750, color: '#ef4444' },
  { name: 'Health', value: 3000, color: '#f97316' },
  { name: 'Insurance', value: 5000, color: '#0891b2' },
];

const fallbackInsights = [
  { id: 'ai1', title: 'Potential Savings Detected', description: 'Switching NTC to a Rs. 399 bundle could save Rs. 101/month.', impact: 'Rs. 1,212/year', type: 'saving' },
  { id: 'ai2', title: 'Duplicate Service Alert', description: 'You pay for both DishHome and Worldlink. Consider bundling.', impact: 'Rs. 750/month', type: 'optimization' },
  { id: 'ai3', title: 'AutoPay Recommendation', description: 'Enable autopay for Water Supply. You\'ve paid on time 11/12 months.', impact: '99% on-time', type: 'recommendation' },
];

// ─── Custom Tooltip ──────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl px-3 py-2 shadow-lg border border-slate-100">
        <p className="text-[10px] text-slate-400 font-medium">{label}</p>
        <p className="text-[13px] font-bold text-emerald-600">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

// ─── Stat tile ───────────────────────────────────────────
const StatTile = ({ label, value, color, icon: Icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
    className="flex-1 bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100"
  >
    <div className={`w-8 h-8 rounded-xl ${color} flex items-center justify-center mb-2`}>
      <Icon size={15} className="text-white" />
    </div>
    <p className="text-[18px] font-bold text-slate-800 leading-tight">{value}</p>
    <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{label}</p>
  </motion.div>
);

const Dashboard = () => {
  const { analytics, recurringPayments, loading } = useAppData();

  if (loading || !analytics) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Crunching Numbers...</p>
      </div>
    );
  }

  const successRate = analytics.autopaySuccessRate ?? 100;
  const missedPrevented = analytics.missedPayments ?? 0;
  const totalAuto = recurringPayments.filter(p => p.autoPayEnabled).length;

  const categoryData = Object.entries(analytics.categoryBreakdown || {}).length > 0
    ? Object.entries(analytics.categoryBreakdown).map(([name, value], i) => ({
        name,
        value,
        color: ['#f59e0b', '#8b5cf6', '#10b981', '#ef4444', '#f97316', '#0891b2'][i % 6]
      }))
    : fallbackCategoryData;

  const monthlySpendData = analytics.walletForecast?.projections?.length > 0
    ? analytics.walletForecast.projections.slice(0, 6).map(f => ({
        month: new Date(f.date).toLocaleDateString('en-US', { month: 'short' }),
        amount: f.predictedBalance
      }))
    : fallbackMonthlySpend;

  const aiInsights = analytics.carbonImpact?.recommendations || fallbackInsights;

  return (
    <div className="pb-4">
      {/* ─── Header ─────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-100/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <BarChart3 size={18} className="text-emerald-500" />
          <h1 className="text-[17px] font-bold text-slate-800 font-[family-name:var(--font-display)]">
            Intelligence Dashboard
          </h1>
        </div>
        <p className="text-[11px] text-slate-400">Real-time predictive insights</p>
      </div>

      {/* ─── KPI Tiles ──────────────────────────────────────── */}
      <div className="px-4 mt-4 flex gap-2.5">
        <StatTile
          label="AutoPay Health"
          value={`${successRate}%`}
          color="bg-emerald-500"
          icon={ShieldCheck}
          delay={0.05}
        />
        <StatTile
          label="Failed Payments"
          value={missedPrevented}
          color="bg-rose-500"
          icon={AlertOctagon}
          delay={0.1}
        />
        <StatTile
          label="Managed Bills"
          value={totalAuto}
          color="bg-blue-500"
          icon={TrendingUp}
          delay={0.15}
        />
      </div>

      {/* ─── Monthly Spend Chart ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-4 mt-5 bg-white rounded-3xl p-4 shadow-sm border border-slate-100"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[13px] font-bold text-slate-800">Predicted Balance</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Wallet Forecast (6 Months)</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-slate-400">Current Spend</p>
            <p className="text-[14px] font-bold text-emerald-600">
              {formatCurrency(analytics.monthlyRecurringSpend)}
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <AreaChart data={monthlySpendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 9, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#10b981"
              strokeWidth={2.5}
              fill="url(#spendGrad)"
              dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ─── Category Donut ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        className="mx-4 mt-4 bg-white rounded-3xl p-4 shadow-sm border border-slate-100"
      >
        <p className="text-[13px] font-bold text-slate-800 mb-1">Deduction Distribution</p>
        <p className="text-[10px] text-slate-400 mb-3">Live category breakdown</p>

        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <ResponsiveContainer width={130} height={130}>
              <RechartsPie>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={62}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => [formatCurrency(val), '']}
                  contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 11 }}
                />
              </RechartsPie>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 space-y-1.5">
            {categoryData.slice(0, 5).map((cat) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-[11px] text-slate-600 font-medium truncate max-w-[80px]">{cat.name}</span>
                </div>
                <span className="text-[10px] font-bold text-slate-700">
                  Rs.{cat.value >= 1000 ? `${(cat.value / 1000).toFixed(1)}k` : cat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ─── Projected Deduction Card ──────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        className="mx-4 mt-4 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={14} className="text-emerald-400" />
          <p className="text-[12px] font-semibold text-white">Projected Monthly Load</p>
        </div>

        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-white/50 text-[10px]">Monthly total</p>
            <p className="text-white font-bold text-[22px] font-[family-name:var(--font-display)]">
              {formatCurrency(analytics.monthlyRecurringSpend)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/50 text-[10px]">AutoPay managed</p>
            <p className="text-emerald-400 font-bold text-[15px]">
              {formatCurrency(recurringPayments.filter(p => p.autoPayEnabled).reduce((a, b) => a + b.avgAmount, 0))}
            </p>
          </div>
        </div>

        {analytics.monthlyRecurringSpend > 0 && (
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (recurringPayments.filter(p => p.autoPayEnabled).reduce((a, b) => a + b.avgAmount, 0) / analytics.monthlyRecurringSpend) * 100)}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
            />
          </div>
        )}
      </motion.div>

      {/* ─── AI Insights ────────────────────────────────────── */}
      <div className="px-4 mt-5 mb-2 pb-8">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={15} className="text-violet-500" />
          <p className="text-[13px] font-bold text-slate-800">SmartPay Insights</p>
        </div>
        <div className="space-y-2.5">
          {aiInsights.slice(0, 3).map((insight, i) => (
            <SmartCard key={i} delay={0.4 + i * 0.08} className="p-3.5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                  <Sparkles size={14} className="text-violet-500" />
                </div>
                <div className="flex-1">
                  <p className="text-[12px] font-semibold text-slate-800">{insight.title || insight.type}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{insight.description || insight.message}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
                      {insight.impact || 'AI Detected'}
                    </span>
                    <button className="flex items-center gap-0.5 text-[10px] font-semibold text-emerald-600">
                      View <ChevronRight size={10} />
                    </button>
                  </div>
                </div>
              </div>
            </SmartCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
