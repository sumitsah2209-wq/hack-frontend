import React from 'react';

const SmartCard = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl p-4 border border-slate-100 shadow-sm ${className} ${onClick ? 'cursor-pointer hover:bg-slate-50' : ''}`}
    >
      {children}
    </div>
  );
};

export default SmartCard;
