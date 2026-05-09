import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Leaf, FileText, Zap, Settings } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Zap, label: 'SmartPay', path: '/smartpay' },
    { icon: FileText, label: 'Statements', path: '/statements' },
    { icon: Leaf, label: 'GreenRound', path: '/greenround' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-100 flex justify-around items-center py-3 z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
            }`
          }
        >
          <item.icon size={22} />
          <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
