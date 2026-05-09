import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, ArrowRight, Bell, Zap, 
  ChevronRight, TrendingUp, Bot, ShieldCheck, 
  BellRing 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppDataContext';
import { formatCurrency } from '../utils/helpers';
import WalletSummary from '../components/dashboard/WalletSummary';
import CarbonImpactWidget from '../components/dashboard/CarbonImpactWidget';
import Navbar from '../components/common/Navbar';
import SmartCard from '../components/common/SmartCard';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { walletData, recurringPayments, loading } = useAppData();

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar showBell={true} />

      <div className="p-4 space-y-6">
        {/* Wallet Summary */}
        <WalletSummary />

        {/* AI Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-700 px-1">AI SmartPay</h3>
          <SmartCard 
            onClick={() => navigate('/smartpay')}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Bot size={24} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-800">SmartPay Engine</p>
              <p className="text-xs text-slate-500">{recurringPayments.length} recurring bills detected</p>
            </div>
            <ArrowRight size={18} className="text-slate-300" />
          </SmartCard>
        </div>

        {/* Merchants / Recurring */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-sm font-bold text-slate-700">Merchants</h3>
            <button 
              onClick={() => navigate('/smartpay')}
              className="text-xs font-bold text-emerald-600"
            >
              View All
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {loading ? (
              <p className="text-xs text-slate-400 px-1">Detecting recurring merchants...</p>
            ) : recurringPayments.length > 0 ? (
              (recurringPayments ?? []).map((p, i) => (
                <div key={i} className="flex flex-col items-center gap-1 shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                    <span className="text-xl font-bold text-emerald-600">{p.merchant?.charAt(0)}</span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-600">{p.merchant}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 px-1">No merchants detected yet.</p>
            )}
          </div>
        </div>

        {/* Upcoming Bills */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-700 px-1">Upcoming</h3>
          {loading && (
            <p className="text-center py-4 text-xs text-slate-400 bg-white rounded-2xl border border-dashed">Loading upcoming bills...</p>
          )}
          {!loading && (recurringPayments ?? []).filter(p => !p.isPaid).slice(0, 2).map((p, i) => (
            <SmartCard key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                  <Bell size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{p.merchant}</p>
                  <p className="text-[10px] text-slate-500 uppercase">Due: {new Date(p.nextDueDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800">{formatCurrency(p.avgAmount)}</p>
                {p.autoPayEnabled && (
                  <div className="flex items-center justify-end gap-1 text-[9px] font-bold text-emerald-600 uppercase">
                    <Zap size={10} /> Auto
                  </div>
                )}
              </div>
            </SmartCard>
          ))}
          {!loading && recurringPayments.filter(p => !p.isPaid).length === 0 && (
            <p className="text-center py-4 text-xs text-slate-400 bg-white rounded-2xl border border-dashed">No upcoming bills</p>
          )}
        </div>

        {/* Impact */}
        <CarbonImpactWidget />
      </div>
    </div>
  );
};

export default Home;
