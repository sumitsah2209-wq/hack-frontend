import React from 'react';
import { 
  User, Bell, Shield, Wallet, Laptop, 
  ChevronRight, LogOut, Moon, Leaf, 
  CreditCard, RefreshCw, Zap, ShieldCheck,
  Smartphone, Lock, HelpCircle
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import SmartCard from '../components/common/SmartCard';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppDataContext';
import Loader from '../components/common/Loader';

const SettingItem = ({ icon: Icon, title, subtitle, toggle = false, active = false, onToggle }) => (
  <div className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
        <Icon size={20} />
      </div>
      <div>
        <h4 className="text-sm font-bold text-slate-800">{title}</h4>
        {subtitle && <p className="text-[10px] text-slate-500">{subtitle}</p>}
      </div>
    </div>
    {toggle ? (
      <button
        onClick={onToggle}
        className={`w-10 h-6 rounded-full relative transition-colors ${active ? 'bg-emerald-500' : 'bg-slate-200'}`}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${active ? 'left-5' : 'left-1'}`} />
      </button>
    ) : (
      <ChevronRight size={18} className="text-slate-300" />
    )}
  </div>
);

const Settings = () => {
  const { user, logout } = useAuth();
  const { userProfile, updateGlobalPreferences } = useAppData();
  const [saving, setSaving] = React.useState(false);
  const [prefs, setPrefs] = React.useState({
    autoPayEnabled: true,
    notificationsEnabled: true
  });

  React.useEffect(() => {
    if (!userProfile) return;
    setPrefs({
      autoPayEnabled: userProfile?.appSettings?.autoPayEnabled ?? true,
      notificationsEnabled: userProfile?.appSettings?.notificationsEnabled ?? true
    });
  }, [userProfile]);

  const persistPreference = async (key, value) => {
    setSaving(true);
    const nextPrefs = { ...prefs, [key]: value };
    setPrefs(nextPrefs);
    await updateGlobalPreferences({
      preferences: { push: nextPrefs.notificationsEnabled },
      walletSettings: nextPrefs
    });
    setSaving(false);
  };

  if (!userProfile) {
    return (
      <div className="bg-slate-50 min-h-screen">
        <Navbar title="Settings" />
        <Loader text="Loading settings..." />
      </div>
    );
  }


  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar title="Settings" />

      <div className="p-4 space-y-6">
        {/* Profile */}
        <SmartCard className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl font-bold">
            {user?.name?.[0] || 'A'}
          </div>
          <div>
            <h3 className="font-bold text-slate-800">{user?.name || 'Aarav Sharma'}</h3>
            <p className="text-xs text-slate-500">{user?.email || 'aarav.sharma@email.com'}</p>
          </div>
        </SmartCard>

        {/* Groups */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">App Settings</h3>
          <SmartCard>
            <SettingItem
              icon={Zap}
              title="AutoPay"
              subtitle={`Status: ${prefs.autoPayEnabled ? 'Enabled' : 'Disabled'}`}
              toggle={true}
              active={prefs.autoPayEnabled}
              onToggle={() => persistPreference('autoPayEnabled', !prefs.autoPayEnabled)}
            />
            <SettingItem
              icon={Bell}
              title="Notifications"
              subtitle={`Push: ${prefs.notificationsEnabled ? 'On' : 'Off'}`}
              toggle={true}
              active={prefs.notificationsEnabled}
              onToggle={() => persistPreference('notificationsEnabled', !prefs.notificationsEnabled)}
            />
            <SettingItem icon={Lock} title="Security" subtitle="Biometric: Active" />
          </SmartCard>

          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Support</h3>
          <SmartCard>
            <SettingItem icon={HelpCircle} title="Help Center" />
            <SettingItem icon={Smartphone} title="Devices" />
          </SmartCard>
        </div>

        <button 
          onClick={logout}
          className="w-full py-4 bg-white text-red-500 font-bold text-sm rounded-xl border border-red-50 shadow-sm"
        >
          Log Out
        </button>


        <div className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest">
          {saving ? 'saving...' : 'v1.0.5'}
        </div>
      </div>
    </div>
  );
};

export default Settings;
