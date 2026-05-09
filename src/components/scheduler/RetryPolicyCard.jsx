import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Building2, AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SmartCard from '../common/SmartCard';

const RetryStep = ({ icon: Icon, label, status, subtext, isLast }) => (
  <div className="flex gap-4 relative">
    {!isLast && (
      <div className="absolute left-[19px] top-10 bottom-0 w-[2px] bg-slate-100" />
    )}
    
    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 z-10 ${
      status === 'active' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-slate-100 text-slate-400'
    }`}>
      <Icon size={18} />
    </div>
    
    <div className="pb-8">
      <div className="flex items-center gap-2">
        <p className={`text-[13px] font-bold ${status === 'active' ? 'text-slate-800' : 'text-slate-400'}`}>{label}</p>
        {status === 'active' && <div className="w.1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />}
      </div>
      <p className="text-[10px] text-slate-400 font-medium mt-0.5">{subtext}</p>
    </div>
  </div>
);

const RetryPolicyCard = () => {
  const navigate = useNavigate();

  return (
    <SmartCard className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
          <RefreshCcw size={20} />
        </div>
        <div>
          <h4 className="text-[15px] font-black text-slate-800">Auto-Recovery Policy</h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ensuring 100% On-time</p>
        </div>
      </div>

      <div className="mt-4">
        <RetryStep 
          icon={ShieldCheck}
          label="1. Wallet Balance Check"
          status="active"
          subtext="AI verifies balance 24h before due date"
        />
        <RetryStep 
          icon={Building2}
          label="2. Bank Fallback"
          status="active"
          subtext="If wallet is low, attempt Global IME link"
        />
        <RetryStep 
          icon={RefreshCcw}
          label="3. Auto-Retry (T+24h)"
          status="pending"
          subtext="If both fail, retry after 24 hours"
          isLast={true}
        />
      </div>

      <div className="mt-2 p-4 bg-emerald-50 rounded-2xl border border-emerald-100/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle size={16} className="text-emerald-600" />
          <p className="text-[10px] font-bold text-emerald-800">Success Rate: 96.5%</p>
        </div>
        <button 
          onClick={() => navigate('/settings')}
          className="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase"
        >
          Settings <ArrowRight size={12} />
        </button>
      </div>
    </SmartCard>
  );
};


export default RetryPolicyCard;
