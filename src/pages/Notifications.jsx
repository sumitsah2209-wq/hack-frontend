import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, CheckCircle2, AlertCircle, Info, 
  Trash2, Filter, MoreVertical, Search,
  ArrowRight, ShieldCheck, Zap, Bot
} from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { formatCurrency } from '../utils/helpers';
import Navbar from '../components/common/Navbar';
import SmartCard from '../components/common/SmartCard';

const Notifications = () => {
  const { notifications, loading, markNotificationAsRead, removeNotification } = useAppData();
  const [activeTab, setActiveTab] = React.useState('All');

  const filteredNotifications = React.useMemo(() => {
    if (activeTab === 'All') return notifications;
    if (activeTab === 'Alerts') return notifications.filter(n => n.type === 'ALERT');
    if (activeTab === 'Payments') return notifications.filter(n => ['SUCCESS', 'REMINDER'].includes(n.type));
    if (activeTab === 'Security') return notifications.filter(n => n.title.toLowerCase().includes('security') || n.title.toLowerCase().includes('shield'));
    return notifications;
  }, [notifications, activeTab]);

  const getIcon = (type) => {
    switch (type) {
      case 'SUCCESS': return <CheckCircle2 className="text-emerald-500" size={20} />;
      case 'ALERT': return <AlertCircle className="text-red-500" size={20} />;
      case 'REMINDER': return <Zap className="text-amber-500" size={20} />;
      case 'INFO': return <Info className="text-blue-500" size={20} />;
      default: return <Bell className="text-slate-400" size={20} />;
    }
  };


  const getBg = (type) => {
    switch (type) {
      case 'SUCCESS': return 'bg-emerald-50';
      case 'ALERT': return 'bg-red-50';
      case 'REMINDER': return 'bg-amber-50';
      case 'INFO': return 'bg-blue-50';
      default: return 'bg-slate-50';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar title="Intelligence Center" showBack={true} showBell={false} />

      <div className="p-4 space-y-6">
        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {['All', 'Alerts', 'Payments', 'Security'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest whitespace-nowrap border transition-all ${
                activeTab === tab ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200' : 'bg-white text-slate-400 border-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {loading && (
            <div className="text-center py-6 text-xs font-bold text-slate-400">Loading notifications...</div>
          )}
          {filteredNotifications.length > 0 ? (
            (filteredNotifications ?? []).map((n, i) => (

              <motion.div
                key={n._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <SmartCard 
                  onClick={() => !n.readStatus && markNotificationAsRead(n._id)}
                  className={`flex gap-4 items-start ${!n.readStatus ? 'border-l-4 border-l-emerald-500 shadow-md' : 'opacity-70'}`}
                >
                  <div className={`w-12 h-12 rounded-2xl ${getBg(n.type)} flex items-center justify-center shrink-0`}>
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-black text-slate-800 leading-tight">{n.title}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase">{new Date(n.date).toLocaleDateString()}</span>
                        <button
                          onClick={async (e) => {
                            e.stopPropagation();
                            await removeNotification(n._id);
                          }}
                          className="text-slate-300 hover:text-rose-500"
                          aria-label="Delete notification"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      {n.message}
                    </p>
                    {!n.readStatus && (
                      <div className="pt-1 flex items-center gap-1 text-[9px] font-black text-emerald-600 uppercase tracking-tighter">
                        Mark as read <ArrowRight size={10} />
                      </div>
                    )}
                  </div>
                </SmartCard>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell size={32} className="text-slate-300" />
              </div>
              <p className="text-sm font-bold text-slate-400">All caught up!</p>
              <p className="text-xs text-slate-400 mt-1">No new notifications for you.</p>
            </div>
          )}
        </div>

        {/* AI Security Widget */}
        <SmartCard className="bg-slate-900 border-none relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck size={80} className="text-white" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Bot size={16} className="text-emerald-400" />
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">AI Security Shield</p>
            </div>
            <p className="text-white font-bold text-sm mb-1">Your payments are protected</p>
            <p className="text-slate-400 text-[10px] leading-relaxed max-w-[200px]">
              Our machine learning models continuously monitor for unusual activity in your recurring bills.
            </p>
          </div>
        </SmartCard>
      </div>
    </div>
  );
};



export default Notifications;
