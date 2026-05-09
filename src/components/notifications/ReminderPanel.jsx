import React from 'react';
import { motion } from 'framer-motion';
import { Bell, BellRing, Clock, Calendar } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';
import { formatCurrency } from '../../utils/helpers';
import SmartCard from '../common/SmartCard';

const ReminderPanel = () => {
  const { notifications, markNotificationAsRead } = useAppData();
  const unreadNotifications = notifications.filter(n => !n.readStatus);

  return (
    <div className="px-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BellRing size={16} className="text-amber-500" />
          <h3 className="text-sm font-semibold text-slate-800">Active Reminders</h3>
        </div>
        <span className="text-[10px] font-bold text-slate-400">{unreadNotifications.length} NEW</span>
      </div>

      {unreadNotifications.length === 0 ? (
        <SmartCard className="p-6 text-center">
          <Bell size={24} className="text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-400">No active reminders</p>
        </SmartCard>
      ) : (
        <div className="space-y-2.5">
          {(unreadNotifications ?? []).map((notif, index) => {
            return (
              <motion.div
                key={notif._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => markNotificationAsRead(notif._id)}
                className="cursor-pointer"
              >
                <SmartCard className={`p-3.5 border ${notif.type === 'ALERT' ? 'border-rose-100 bg-rose-50/30' : 'border-slate-100'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${notif.type === 'ALERT' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'} flex items-center justify-center`}>
                      <BellRing size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] font-semibold text-slate-800">{notif.title}</p>
                      <p className="text-[11px] text-slate-500 leading-tight">{notif.message}</p>
                    </div>
                  </div>
                </SmartCard>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReminderPanel;
