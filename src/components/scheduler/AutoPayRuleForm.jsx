import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Bell, CreditCard, Save, Info, AlertTriangle } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import SmartCard from '../common/SmartCard';


const AutoPayRuleForm = () => {
  const { updateGlobalPreferences, userProfile } = useAppData();
  const [maxLimit, setMaxLimit] = useState(5000);
  const [useBankFallback, setUseBankFallback] = useState(true);
  const [notifyBefore, setNotifyBefore] = useState(true);
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    if (!userProfile?.appSettings) return;
    setMaxLimit(userProfile.appSettings.maxLimit ?? 5000);
    setUseBankFallback(userProfile.appSettings.useBankFallback ?? true);
    setNotifyBefore(userProfile.appSettings.notifyBefore ?? true);
  }, [userProfile]);

  const handleSave = async () => {
    setSaving(true);
    const res = await updateGlobalPreferences({
      walletSettings: { maxLimit, useBankFallback, notifyBefore },
      preferences: { push: notifyBefore }
    });
    setSaving(false);
  };

  return (
    <SmartCard className="p-6">
      <div className="space-y-8">
        {/* Max Limit Slider */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-emerald-500" />
              <p className="text-[14px] font-bold text-slate-800">AutoPay Safety Limit</p>
            </div>
            <span className="text-[14px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl">
              Rs. {maxLimit.toLocaleString()}
            </span>
          </div>
          
          <input
            type="range"
            min="500"
            max="20000"
            step="500"
            value={maxLimit}
            onChange={(e) => setMaxLimit(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <div className="flex justify-between mt-2">
            <span className="text-[9px] font-bold text-slate-400">Min: 500</span>
            <span className="text-[9px] font-bold text-slate-400">Max: 20k</span>
          </div>
          <p className="mt-3 text-[10px] text-slate-400 font-medium leading-relaxed">
            AI will only auto-deduct if the bill amount is within this safety limit.
          </p>
        </div>

        {/* Toggle Sections */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <CreditCard size={20} />
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-800">Bank Fallback</p>
                <p className="text-[10px] text-slate-400">Use Global IME if balance low</p>
              </div>
            </div>
            <button 
              onClick={() => setUseBankFallback(!useBankFallback)}
              className={`w-12 h-6 rounded-full transition-all relative ${useBankFallback ? 'bg-emerald-500' : 'bg-slate-200'}`}
            >
              <motion.div 
                animate={{ x: useBankFallback ? 24 : 4 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" 
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                <Bell size={20} />
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-800">Advanced Alerts</p>
                <p className="text-[10px] text-slate-400">Notify 2 days before deduction</p>
              </div>
            </div>
            <button 
              onClick={() => setNotifyBefore(!notifyBefore)}
              className={`w-12 h-6 rounded-full transition-all relative ${notifyBefore ? 'bg-emerald-500' : 'bg-slate-200'}`}
            >
              <motion.div 
                animate={{ x: notifyBefore ? 24 : 4 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" 
              />
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-amber-50 p-4 rounded-[1.5rem] border border-amber-100 flex gap-3">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
            By enabling AutoPay, you authorize eSewa SmartPay AI to deduct verified recurring amounts automatically. You can cancel at any time.
          </p>
        </div>

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={saving}
          className={`w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-slate-200 ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <Save size={18} />
          {saving ? 'SAVING...' : 'SAVE GLOBAL RULES'}
        </motion.button>

      </div>
    </SmartCard>
  );
};

export default AutoPayRuleForm;

