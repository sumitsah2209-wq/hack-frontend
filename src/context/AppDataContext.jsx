import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getTransactions, executePayment } from '../api/paymentApi';
import { getRecurringPayments, enableAutopay, detectRecurring } from '../api/schedulerApi';
import { getNotifications, markAsRead, deleteNotification } from '../api/notificationApi';
import { getDashboardAnalytics } from '../api/predictionApi';
import { getUserProfile, loadFunds as apiLoadFunds, updatePreferences as apiUpdatePreferences } from '../api/userApi';
import { getGreenRoundAnalytics, getUserContributionStats } from '../api/greenRoundApi';
import { DEMO_USER_ID } from '../utils/constants';
import toast from 'react-hot-toast';



const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [walletData, setWalletData] = useState({ transactions: [], balance: 0 });
  const [recurringPayments, setRecurringPayments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [greenRoundStats, setGreenRoundStats] = useState(null);

  const fetchWalletData = async () => {
    try {
      const res = await getTransactions(DEMO_USER_ID);
      if (res.success) {
        setWalletData(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch wallet data', err);
    }
  };

  const fetchRecurringPayments = async () => {
    try {
      const res = await getRecurringPayments(DEMO_USER_ID);
      if (res.success) setRecurringPayments(res.data);
    } catch (err) {
      console.error('Failed to fetch recurring payments', err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await getNotifications(DEMO_USER_ID);
      if (res.success) setNotifications(res.data);
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await getDashboardAnalytics(DEMO_USER_ID);
      if (res.success) setAnalytics(res.data);
    } catch (err) {
      console.error('Failed to fetch analytics', err);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const res = await getUserProfile();
      if (res.success) setUserProfile(res.data);
    } catch (err) {
      console.error('Failed to fetch user profile', err);
    }
  };

  const fetchGreenRoundStats = async () => {
    try {
      const res = await getUserContributionStats();
      if (res.success) setGreenRoundStats(res.data);
    } catch (err) {
      console.error('Failed to fetch GreenRound stats', err);
    }
  };

  const refreshAllData = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchWalletData(),
        fetchRecurringPayments(),
        fetchNotifications(),
        fetchAnalytics(),
        fetchUserProfile(),
        fetchGreenRoundStats()
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleAutopayStatus = async (paymentId, status) => {
    try {
      const res = await enableAutopay({ userId: DEMO_USER_ID, recurringId: paymentId, enable: status });
      if (res.success) {
        await fetchRecurringPayments();
        toast.success(status ? 'AutoPay enabled' : 'AutoPay disabled');
      } else {
        toast.error(res.message || 'Failed to update AutoPay');
      }
      return res;
    } catch (err) {
      console.error('Failed to toggle autopay', err);
      return { success: false, message: 'API connection failed', err   };
    }
  };

  const markNotificationAsRead = async (id) => {
    try {
      const res = await markAsRead(id);
      if (res.success) await fetchNotifications();
    } catch (err) {
      console.error('Failed to mark notification as read', err);
    }
  };

  const removeNotification = async (id) => {
    try {
      const res = await deleteNotification(id);
      if (res.success) {
        await fetchNotifications();
        toast.success('Notification removed');
      } else {
        toast.error(res.message || 'Failed to delete notification');
      }
      return res;
    } catch (err) {
      return { success: false, message: 'Failed to delete notification', err };
    }
  };

  const handleManualPayment = async (data) => {
    try {
      const res = await executePayment({ ...data, userId: DEMO_USER_ID });
      if (res.success) {
        await Promise.all([fetchWalletData(), fetchRecurringPayments(), fetchAnalytics(), fetchNotifications(), fetchGreenRoundStats()]);
        toast.success('Payment sent successfully');
      } else {
        toast.error(res.message || 'Payment failed');
      }
      return res;
    } catch (err) {
      return { success: false, message: 'Payment failed', err };
    }
  };

  const runRecurringDetection = async () => {
    try {
      const res = await detectRecurring({ userId: DEMO_USER_ID });
      if (res.success) {
        await fetchRecurringPayments();
        toast.success('Recurring scan completed');
      } else {
        toast.error(res.message || 'Recurring scan failed');
      }
      return res;
    } catch (err) {
      return { success: false, message: 'Recurring scan failed', err };
    }
  };

  const handleLoadFunds = async (amount) => {
    try {
      const res = await apiLoadFunds({ userId: DEMO_USER_ID, amount });
      if (res.success) {
        await Promise.all([fetchWalletData(), fetchAnalytics()]);
        toast.success(`Rs. ${Number(amount).toLocaleString()} added to wallet`);
      } else {
        toast.error(res.message || 'Failed to load funds');
      }
      return res;
    } catch (err) {
      return { success: false, message: 'Failed to load funds', err };
    }
  };

  const updateGlobalPreferences = async (data) => {
    try {
      const res = await apiUpdatePreferences({ userId: DEMO_USER_ID, ...data });
      if (res.success) {
        await fetchUserProfile();
        toast.success('Preferences saved');
      } else {
        toast.error(res.message || 'Failed to update preferences');
      }
      return res;
    } catch (err) {
      return { success: false, message: 'Failed to update preferences', err };
    }
  };

  const toggleBalance = () => setBalanceVisible(!balanceVisible);



  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  const unreadCount = notifications.filter(n => !n.readStatus).length;

  return (
    <AppDataContext.Provider value={{
      walletData,
      recurringPayments,
      notifications,
      analytics,
      userProfile,
      greenRoundStats,
      loading,
      balanceVisible,
      unreadCount,
      refreshAllData,
      fetchWalletData,
      fetchRecurringPayments,
      fetchNotifications,
      fetchAnalytics,
      fetchUserProfile,
      fetchGreenRoundStats,
      toggleAutopayStatus,
      markNotificationAsRead,
      removeNotification,
      toggleBalance,
      handleManualPayment,
      runRecurringDetection,
      handleLoadFunds,
      updateGlobalPreferences,
      DEMO_USER_ID
    }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) throw new Error('useAppData must be used within AppDataProvider');
  return context;
};

