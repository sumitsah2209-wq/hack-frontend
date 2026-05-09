import React from 'react';
import { Eye, EyeOff, Plus, ArrowUpRight, TrendingUp, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppData } from '../../context/AppDataContext';
import { formatCurrency } from '../../utils/helpers';
import toast from 'react-hot-toast';

const WalletSummary = () => {
  const navigate = useNavigate();
  const { walletData, balanceVisible, toggleBalance, handleLoadFunds, handleManualPayment } = useAppData();

  const onLoadFunds = async () => {
    const amount = prompt('Enter amount to load:', '5000');
    if (!amount) return;
    if (isNaN(amount) || Number(amount) <= 0) {
      toast.error('Enter a valid top-up amount');
      return;
    }
    await handleLoadFunds(Number(amount));
  };

  const onSendMoney = async () => {
    const merchant = prompt('Enter recipient or merchant name:', 'Demo Merchant');
    const amount = prompt('Enter amount to send:', '500');
    if (!merchant || !amount) return;
    if (Number.isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error('Enter a valid payment amount');
      return;
    }
    await handleManualPayment({ merchant, amount: Number(amount) });
  };

  const actions = [
    { icon: ArrowUpRight, label: 'Send Money', color: 'bg-emerald-50 text-emerald-600', onClick: onSendMoney },
    { icon: Plus, label: 'Top Up', color: 'bg-blue-50 text-blue-600', onClick: onLoadFunds },
    { icon: Zap, label: 'Predict', color: 'bg-violet-50 text-violet-600', onClick: () => navigate('/analytics') }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-100">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-emerald-100 text-[11px] font-bold uppercase tracking-wider">eSewa Balance</p>
              <button onClick={toggleBalance} className="p-1">
                {balanceVisible ? <EyeOff size={12} /> : <Eye size={12} />}
              </button>
            </div>
            <h2 className="text-3xl font-bold">
              {balanceVisible ? formatCurrency(walletData.balance) : '••••••'}
            </h2>
          </div>
          <div className="bg-white/20 p-2 rounded-xl">
            <TrendingUp size={20} />
          </div>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <div className="flex gap-4">
            <div>
              <p className="text-emerald-100 text-[10px] uppercase font-bold">Projected</p>
              <p className="font-bold text-sm">{formatCurrency(walletData.balance - 5000)}</p>
            </div>
            <div>
              <p className="text-emerald-100 text-[10px] uppercase font-bold">Rewards</p>
              <p className="font-bold text-sm">450 pts</p>
            </div>
          </div>
          <button 
            onClick={onLoadFunds}
            className="bg-white text-emerald-600 px-4 py-2 rounded-xl font-bold text-xs"
          >
            Load Funds
          </button>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {actions.map((action, i) => (
          <button
            key={i}
            onClick={action.onClick}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl shrink-0 font-bold text-xs border border-transparent ${action.color}`}
          >
            <action.icon size={16} />
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};


export default WalletSummary;
