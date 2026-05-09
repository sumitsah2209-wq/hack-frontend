import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, BellRing, Calendar as CalendarIcon } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { formatCurrency } from '../../utils/helpers';
import SmartCard from '../common/SmartCard';

const PaymentCalendar = () => {
  const { recurringPayments } = useAppData();
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  // Build upcoming list from recurring payments
  const upcoming = (recurringPayments ?? []).map(p => ({
    name: p.merchant,
    amount: p.avgAmount,
    dueDate: new Date(p.nextDueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    daysLeft: Math.max(0, Math.ceil((new Date(p.nextDueDate) - new Date()) / (1000 * 60 * 60 * 24))),
  }));

  return (
    <SmartCard className="p-6">
      {/* Month Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-[18px] font-black text-slate-800">May 2026</h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{upcoming.length} Payments scheduled</p>
        </div>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
            <ChevronLeft size={16} />
          </button>
          <button className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Mini Grid */}
      <div className="grid grid-cols-7 gap-y-4 mb-8">
        {days.map((d, i) => (
          <div key={i} className="text-center text-[10px] font-black text-slate-300">{d}</div>
        ))}
        {dates.slice(0, 7).map((d) => (
          <div key={d} className="relative flex flex-col items-center">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-bold ${
              d === 5 ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'text-slate-700'
            }`}>
              {d}
            </div>
            {/* Event Dots */}
            <div className="flex gap-0.5 mt-1">
              {[8, 12, 15, 18, 20, 25].includes(d) && (
                <div className="w-1 h-1 rounded-full bg-emerald-500" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Horizontal Upcoming List */}
      <div className="space-y-4 pt-4 border-t border-slate-50">
        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upcoming Timeline</h5>
        
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {upcoming.slice(0, 4).map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="shrink-0 w-40 p-4 rounded-[1.75rem] bg-slate-50 border border-slate-100/50"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  {event.daysLeft <= 7 ? <Zap size={14} className="text-emerald-500" /> : <BellRing size={14} className="text-orange-500" />}
                </div>
                <span className="text-[10px] font-black text-slate-400">{event.dueDate}</span>
              </div>
              <p className="text-[12px] font-bold text-slate-800 truncate mb-0.5">{event.name}</p>
              <p className="text-[14px] font-black text-slate-900">{formatCurrency(event.amount)}</p>
            </motion.div>
          ))}
          {upcoming.length === 0 && (
            <p className="text-xs text-slate-400">No upcoming payments</p>
          )}
        </div>
      </div>
    </SmartCard>
  );
};

export default PaymentCalendar;
