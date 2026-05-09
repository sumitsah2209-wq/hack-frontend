import React, { useState, useEffect, useCallback } from 'react';
import {
  FileText,
  ArrowDownRight,
  ArrowUpRight,
  Leaf,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  TrendingUp,
  Wallet,
  CalendarDays,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import SmartCard from '../components/common/SmartCard';
import { useAppData } from '../context/AppDataContext';
import { getPaymentHistory } from '../api/statementsApi';

const FILTERS = [
  { key: 'weekly', label: 'This Week' },
  { key: 'monthly', label: 'This Month' },
  { key: 'all', label: 'All Time' },
];

/* ── helper ──────────────────────────────────────────── */
const fmtCurrency = (n) =>
  `Rs. ${Number(n || 0).toLocaleString('en-NP', { minimumFractionDigits: 0 })}`;

const fmtDate = (d) => {
  const date = new Date(d);
  return date.toLocaleDateString('en-NP', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const statusConfig = {
  COMPLETED: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', label: 'Success' },
  FAILED: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', label: 'Failed' },
  PENDING: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', label: 'Pending' },
};

/* ── summary card ────────────────────────────────────── */
const SummaryCard = ({ summary }) => (
  <SmartCard className="relative overflow-hidden">
    {/* decorative gradient blob */}
    <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-gradient-to-br from-emerald-400/20 to-green-600/10 blur-2xl pointer-events-none" />

    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
      <FileText size={14} /> Statement Summary
    </p>

    <div className="grid grid-cols-3 gap-3">
      {/* total donated */}
      <div className="flex flex-col items-center text-center">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-2">
          <Leaf size={18} className="text-emerald-600" />
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase">Donated</p>
        <p className="text-sm font-black text-slate-800">{fmtCurrency(summary.totalDonated)}</p>
      </div>

      {/* total rounded payments */}
      <div className="flex flex-col items-center text-center">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-2">
          <TrendingUp size={18} className="text-blue-600" />
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase">Rounded</p>
        <p className="text-sm font-black text-slate-800">{summary.totalRoundedPayments}</p>
      </div>

      {/* monthly contribution */}
      <div className="flex flex-col items-center text-center">
        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center mb-2">
          <CalendarDays size={18} className="text-violet-600" />
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase">Monthly</p>
        <p className="text-sm font-black text-slate-800">{fmtCurrency(summary.monthlyContribution)}</p>
      </div>
    </div>
  </SmartCard>
);

/* ── single statement row ────────────────────────────── */
const StatementRow = ({ item, index }) => {
  const status = statusConfig[item.status] || statusConfig.COMPLETED;
  const StatusIcon = status.icon;
  const isDebit = item.type === 'DEBIT';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      <SmartCard className="flex items-center gap-3">
        {/* icon */}
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            item.isGreenRound
              ? 'bg-emerald-100 text-emerald-600'
              : isDebit
              ? 'bg-red-50 text-red-500'
              : 'bg-blue-50 text-blue-500'
          }`}
        >
          {item.isGreenRound ? (
            <Leaf size={18} />
          ) : isDebit ? (
            <ArrowUpRight size={18} />
          ) : (
            <ArrowDownRight size={18} />
          )}
        </div>

        {/* details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="font-bold text-sm text-slate-800 truncate">
              {item.merchant}
            </p>
            {item.isGreenRound && (
              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap">
                <Leaf size={9} /> GreenRound
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">{fmtDate(item.date)}</p>

          {/* GreenRound specific row */}
          {item.isGreenRound && (
            <div className="flex items-center gap-2 mt-1 text-[10px]">
              <span className="text-slate-400">Rounded:</span>
              <span className="font-bold text-emerald-600">{fmtCurrency(item.roundedAmount)}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-400">Donated:</span>
              <span className="font-bold text-emerald-600">{fmtCurrency(item.donatedAmount)}</span>
            </div>
          )}
        </div>

        {/* amount + status */}
        <div className="text-right shrink-0">
          <p
            className={`font-black text-sm ${
              isDebit ? 'text-red-500' : 'text-emerald-600'
            }`}
          >
            {isDebit ? '-' : '+'}{fmtCurrency(item.amount)}
          </p>
          <span
            className={`inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${status.bg} ${status.color}`}
          >
            <StatusIcon size={10} />
            {status.label}
          </span>
        </div>
      </SmartCard>
    </motion.div>
  );
};

/* ── page ─────────────────────────────────────────────── */
const Statements = () => {
  const { DEMO_USER_ID } = useAppData();
  const [filter, setFilter] = useState('all');
  const [history, setHistory] = useState([]);
  const [summary, setSummary] = useState({
    totalDonated: 0,
    totalRoundedPayments: 0,
    monthlyContribution: 0,
  });
  const [loading, setLoading] = useState(true);

  const loadHistory = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getPaymentHistory(DEMO_USER_ID, filter);
      if (res.success) {
        setHistory(res.data.history || []);
        setSummary(res.data.summary || {
          totalDonated: 0,
          totalRoundedPayments: 0,
          monthlyContribution: 0,
        });
      }
    } catch (err) {
      console.error('Failed to load payment history', err);
    } finally {
      setLoading(false);
    }
  }, [DEMO_USER_ID, filter]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <Navbar title="Statements" showBack />

      <div className="p-4 space-y-5">
        {/* ── Filter pills ──────────────────────────── */}
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <motion.button
              key={f.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f.key)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${
                filter === f.key
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                  : 'bg-white text-slate-500 border border-slate-100'
              }`}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        {/* ── Summary ───────────────────────────────── */}
        <SummaryCard summary={summary} />

        {/* ── History list ──────────────────────────── */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 px-1">
            <Filter size={12} /> Payment History
          </p>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <div className="w-8 h-8 border-3 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
              <p className="text-xs text-slate-400 font-bold">Loading statements…</p>
            </div>
          ) : history.length === 0 ? (
            <SmartCard className="text-center py-12">
              <FileText size={36} className="text-slate-200 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-400">No transactions found</p>
              <p className="text-xs text-slate-300 mt-1">
                Payments will appear here once you start transacting.
              </p>
            </SmartCard>
          ) : (
            <AnimatePresence>
              <div className="space-y-2">
                {history.map((item, idx) => (
                  <StatementRow key={item._id || idx} item={item} index={idx} />
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statements;
