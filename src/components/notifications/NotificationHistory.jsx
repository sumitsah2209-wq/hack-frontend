import React from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle, AlertTriangle, AlertCircle, Info, Leaf, Clock, ChevronRight } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { getNotificationType } from '../../utils/helpers';
import SmartCard from '../common/SmartCard';

const iconMap = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
  reminder: Bell,
  eco: Leaf,
};

const NotificationHistory = () => {
  const { notifications, markNotificationAsRead } = useAppData();

  return (
    <div className="px-4 mt-8 pb-32">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
            <Clock size={18} />
          </div>
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Alert History</h3>
        </div>
        <span className="text-[10px] font-bold text-slate-400">{notifications.length} total</span>
      </div>

      <div className="space-y-3">
        {(notifications ?? []).map((notif, index) => {
          const typeConfig = getNotificationType(notif.type);
          const Icon = iconMap[notif.type] || Info;

          return (
            <SmartCard
              key={notif.id}
              delay={index * 0.05}
              onClick={() => markNotificationAsRead(notif._id || notif.id)}
              className={`relative ${!notif.read ? 'border-emerald-200' : ''}`}
            >
              <div className="p-4 flex gap-4">
                {!notif.read && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                )}

                <div className={`w-12 h-12 rounded-2xl ${typeConfig.bg} flex items-center justify-center shrink-0`}>
                  <Icon size={22} className={typeConfig.color} />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-0.5">
                    <p className={`text-[14px] font-bold ${notif.read ? 'text-slate-700' : 'text-slate-900'}`}>{notif.title}</p>
                    <span className="text-[10px] font-bold text-slate-300">{notif.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed pr-2 font-medium">{notif.body}</p>
                </div>
              </div>
            </SmartCard>
          );
        })}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full py-4 mt-6 text-[11px] font-black text-slate-400 uppercase tracking-widest border-2 border-dashed border-slate-100 rounded-3xl"
      >
        Load Older Alerts
      </motion.button>
    </div>
  );
};

export default NotificationHistory;
