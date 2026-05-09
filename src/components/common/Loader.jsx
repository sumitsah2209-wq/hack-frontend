import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="relative w-12 h-12">
        <motion.div
          className="absolute inset-0 rounded-full border-[3px] border-emerald-200"
        />
        <motion.div
          className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-emerald-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-[2px] border-transparent border-b-emerald-400"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <p className="text-sm text-slate-400 font-medium">{text}</p>
    </div>
  );
};

export default Loader;
