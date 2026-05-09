import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import SmartCard from '../common/SmartCard';
import { formatCurrency } from '../../utils/helpers';
import { useAppData } from '../../context/AppDataContext';
import toast from 'react-hot-toast';

const LowBalanceAlert = () => {
  const { walletData, recurringPayments, handleLoadFunds } = useAppData();
  const monthlyTotal = recurringPayments.reduce((acc, curr) => acc + (curr.avgAmount || 0), 0);
  const currentBalance = walletData?.balance || 0;

  if (currentBalance >= monthlyTotal) return null;

  const gap = monthlyTotal - currentBalance;

  const onLoadFunds = async () => {
    const amount = prompt('Enter amount to load:', gap.toString());
    if (!amount) return;
    if (isNaN(amount) || Number(amount) <= 0) {
      toast.error('Enter a valid amount');
      return;
    }
    await handleLoadFunds(Number(amount));
  };

  return (
    <div className="px-4 mt-6">
      <SmartCard 
        className="bg-gradient-to-br from-amber-500 to-orange-600 p-0 border-none shadow-xl shadow-orange-200 overflow-hidden relative group"
      >
        {/* Animated Background Pulse */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute inset-0 bg-white rounded-full blur-3xl -translate-y-12 translate-x-12"
        />

        <div className="p-5 flex flex-col gap-4 relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white border border-white/20 backdrop-blur-md">
                <AlertCircle size={24} className="animate-bounce" />
              </div>
              <div>
                <p className="text-[15px] font-black text-white">Action Required</p>
                <p className="text-[11px] font-bold text-white/80">AutoPay risk detected</p>
              </div>
            </div>
            <div className="bg-white/20 px-2 py-1 rounded-lg border border-white/10 text-[9px] font-black text-white uppercase tracking-widest">
              Urgent
            </div>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
            <p className="text-[11px] text-white/90 font-medium leading-relaxed">
              Your projected monthly deductions <span className="font-black">({formatCurrency(monthlyTotal)})</span> exceed your current balance.
            </p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-white" />
                <span className="text-[10px] font-black text-white uppercase">Bank Fallback Active</span>
              </div>
              <p className="text-[12px] font-black text-white">Gap: {formatCurrency(gap)}</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLoadFunds}
            className="w-full bg-white text-orange-600 py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-black/5"
          >
            LOAD FUNDS NOW
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </SmartCard>
    </div>
  );

};

export default LowBalanceAlert;
