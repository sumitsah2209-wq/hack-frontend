import React from 'react';
import { Calendar, AlertCircle, ChevronRight, Zap, Bell } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { formatCurrency } from '../../utils/helpers';
import SmartCard from '../common/SmartCard';

const UpcomingPayments = () => {
  const { recurringPayments } = useAppData();

  const upcoming = (recurringPayments ?? []).map(p => ({
    id: p._id,
    name: p.merchant,
    amount: p.avgAmount,
    daysLeft: Math.max(0, Math.ceil((new Date(p.nextDueDate) - new Date()) / (1000 * 60 * 60 * 24))),
    autoPayEnabled: p.autoPayEnabled,
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-slate-400" />
          <h3 className="text-sm font-bold text-slate-800">Due Soon</h3>
        </div>
        <button className="text-xs text-emerald-600 font-medium">View All</button>
      </div>

      <div className="space-y-3">
        {upcoming.map((payment) => (
          <SmartCard
            key={payment.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                <Bell size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">{payment.name}</h4>
                <p className="text-[10px] text-slate-500 uppercase">{payment.daysLeft} days left</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800">{formatCurrency(payment.amount)}</p>
              {payment.autoPayEnabled && (
                <div className="flex items-center justify-end gap-1 text-[9px] font-bold text-emerald-600">
                  <Zap size={10} /> AUTOPAY
                </div>
              )}
            </div>
          </SmartCard>
        ))}
        {upcoming.length === 0 && (
          <p className="text-center py-4 text-xs text-slate-400 bg-white rounded-2xl border border-dashed">No upcoming payments</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingPayments;
