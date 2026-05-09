import React from 'react';
import { ShieldCheck, Info, Brain, ChevronRight, Zap, CreditCard } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import SmartCard from '../common/SmartCard';
import toast from 'react-hot-toast';

const DetectedRecurringBills = () => {
  const { recurringPayments, toggleAutopayStatus, runRecurringDetection } = useAppData();
  const [busyId, setBusyId] = React.useState(null);
  const [scanning, setScanning] = React.useState(false);

  const handleToggle = async (id, currentStatus) => {
    setBusyId(id);
    await toggleAutopayStatus(id, !currentStatus);
    setBusyId(null);
  };

  const handleScan = async () => {
    setScanning(true);
    await runRecurringDetection();
    setScanning(false);
    toast.success('AI scan complete');
  };

  if (recurringPayments.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-2xl border border-dashed border-slate-200">
        <p className="text-xs text-slate-400">No recurring bills detected yet.</p>
        <button 
          onClick={handleScan}
          disabled={scanning}
          className="mt-2 text-xs font-bold text-emerald-600"
        >
          {scanning ? 'SCANNING...' : 'SCAN TRANSACTIONS'}
        </button>
      </div>
    );
  }


  return (
    <div className="space-y-4">
      {(recurringPayments ?? []).map((p) => (
        <SmartCard key={p._id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-emerald-600">
              <CreditCard size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">{p.merchant}</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Confidence: {p.confidenceScore}%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {p.autoPayEnabled ? (
              <div 
                onClick={() => handleToggle(p._id, true)}
                className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer"
              >
                ACTIVE
              </div>
            ) : (
              <button 
                onClick={() => handleToggle(p._id, false)}
                disabled={busyId === p._id}
                className="text-emerald-600 text-[10px] font-bold border border-emerald-100 px-3 py-1 rounded-lg hover:bg-emerald-50"
              >
                {busyId === p._id ? 'UPDATING' : 'ENABLE'}
              </button>
            )}
            <ChevronRight size={16} className="text-slate-300" />
          </div>
        </SmartCard>
      ))}
    </div>
  );
};

export default DetectedRecurringBills;
