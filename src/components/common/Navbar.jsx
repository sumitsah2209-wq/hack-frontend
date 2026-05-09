import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronLeft, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ title, showBack = false, showBell = true }) => {
  const navigate = useNavigate();
  const { unreadCount } = useAppData();
  const { user } = useAuth();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 bg-[#f8fafc]/80 backdrop-blur-xl border-b border-slate-100/50 h-16 flex items-center"
    >
      <div className="flex items-center justify-between px-4 w-full">
        <div className="flex items-center gap-3">
          {showBack ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-700"
            >
              <ChevronLeft size={20} />
            </motion.button>
          ) : (
            <motion.div 
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/settings')}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-emerald-100 border-2 border-white">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="hidden min-[380px]:block">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Welcome back,</p>
                <p className="text-[14px] font-black text-slate-800 leading-none">{user?.name?.split(' ')[0] || 'Aarav'}</p>
              </div>
            </motion.div>
          )}
          {title && !showBack && (
            <h1 className="text-lg font-black text-slate-800 font-[family-name:var(--font-display)]">
              {title}
            </h1>
          )}
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/statements')}
            className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400"
          >
            <Search size={18} />
          </motion.button>
          
          {showBell && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/notifications')}
              className="relative w-10 h-10 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
