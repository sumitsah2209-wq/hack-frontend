import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Wind, Droplets, ArrowRight } from 'lucide-react';
import SmartCard from '../common/SmartCard';
import { useAppData } from '../../context/AppDataContext';

const CarbonImpactWidget = () => {
  const { analytics } = useAppData();

  const carbonSaved = analytics?.carbonImpact?.totalCarbonSaved ?? 12.8;
  const treesEquivalent = analytics?.carbonImpact?.treesEquivalent ?? 2.1;
  const paperlessBills = analytics?.carbonImpact?.paperlessBills ?? 142;

  return (
    <SmartCard 
      variant="glass" 
      className="p-6 relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl -translate-y-12 translate-x-12" />
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-100">
              <Leaf size={18} />
            </div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Eco Impact</h3>
          </div>
          <p className="text-[10px] font-bold text-emerald-600">You've saved {carbonSaved}kg CO₂</p>
        </div>
        <div className="text-right">
          <p className="text-[24px] font-black text-emerald-600 leading-none">{treesEquivalent}</p>
          <p className="text-[9px] font-bold text-slate-400 uppercase">TREES PLANTED</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-10">
        <div className="bg-white/60 backdrop-blur-md rounded-[1.5rem] p-4 border border-white/50">
          <div className="flex items-center gap-2 mb-2">
            <Wind size={14} className="text-emerald-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Paperless</span>
          </div>
          <p className="text-[16px] font-black text-slate-800">{paperlessBills}</p>
          <p className="text-[9px] font-bold text-slate-400 mt-0.5">Bills Automated</p>
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-[1.5rem] p-4 border border-white/50">
          <div className="flex items-center gap-2 mb-2">
            <Droplets size={14} className="text-blue-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Transport</span>
          </div>
          <p className="text-[16px] font-black text-slate-800">42km</p>
          <p className="text-[9px] font-bold text-slate-400 mt-0.5">Travel Saved</p>
        </div>
      </div>

      <motion.button
        whileHover={{ x: 5 }}
        className="mt-6 flex items-center gap-2 text-[11px] font-black text-emerald-600 group relative z-10"
      >
        VIEW FULL ECO REPORT
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </SmartCard>
  );
};

export default CarbonImpactWidget;
