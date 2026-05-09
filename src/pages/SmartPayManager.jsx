import React from 'react';
import { 
  Zap, Plus, ListFilter, Filter, 
  Sparkles, TrendingUp, Info
} from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { formatCurrency } from '../utils/helpers';
import Navbar from '../components/common/Navbar';
import SmartCard from '../components/common/SmartCard';
import DetectedRecurringBills from '../components/scheduler/DetectedRecurringBills';
import AutoPayRuleForm from '../components/scheduler/AutoPayRuleForm';
import PaymentCalendar from '../components/scheduler/PaymentCalendar';
import RetryPolicyCard from '../components/scheduler/RetryPolicyCard';
import LowBalanceAlert from '../components/notifications/LowBalanceAlert';

const SmartPayManager = () => {
  const { recurringPayments, loading } = useAppData();
  
  const monthlyTotal = recurringPayments.reduce((acc, curr) => acc + (curr.avgAmount || 0), 0);
  const autoPayCount = recurringPayments.filter(p => p.autoPayEnabled).length;

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar title="SmartPay Engine" />

      <div className="p-4 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <SmartCard className="bg-emerald-600 border-none">
            <Zap size={20} className="mb-2 text-black" />
            <p className="text-2xl font-bold text-black">{formatCurrency(monthlyTotal)}</p>
            <p className="text-[10px] text-emerald-400 uppercase font-bold">Monthly Total</p>
          </SmartCard>

          
          <div className="space-y-3">
            <SmartCard className="py-3">
              <p className="text-lg font-bold text-slate-800">{autoPayCount}</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase">Active AutoPay</p>
            </SmartCard>
            <SmartCard className="py-3">
              <p className="text-lg font-bold text-slate-800">{recurringPayments.length}</p>
              <p className="text-[9px] text-slate-400 font-bold uppercase">Bills Detected</p>
            </SmartCard>
          </div>
        </div>

        {/* Alerts */}
        <LowBalanceAlert />

        {/* Sections */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-3 px-1">AI Bill Detection</h3>
            <DetectedRecurringBills />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-3 px-1">AutoPay Rules</h3>
            <AutoPayRuleForm />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-3 px-1">Calendar</h3>
            <PaymentCalendar />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-700 mb-3 px-1">Retry Policy</h3>
            <RetryPolicyCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartPayManager;
