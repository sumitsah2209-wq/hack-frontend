import React, { useState, useEffect } from 'react';
import { Leaf, Award, TrendingUp, Users, Target } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import DonationCards from '../components/greenround/DonationCards';
import DonationHistory from '../components/greenround/DonationHistory';
import ProvinceLeaderboard from '../components/greenround/ProvinceLeaderboard';
import ContributionStats from '../components/greenround/ContributionStats';
import { getGreenRoundAnalytics, getGreenRoundSettings, toggleGreenRound as apiToggleGreenRound } from '../api/greenRoundApi';
import toast from 'react-hot-toast';

const GreenRound = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [greenRoundEnabled, setGreenRoundEnabled] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      const [analyticsRes, settingsRes] = await Promise.all([
        getGreenRoundAnalytics(),
        getGreenRoundSettings()
      ]);

      if (analyticsRes.success) {
        setStats(analyticsRes.data);
      }

      if (settingsRes.success) {
        setGreenRoundEnabled(settingsRes.data.greenRoundEnabled);
      }
    } catch (error) {
      console.error('Failed to load platform data:', error);
      toast.error('Failed to connect to GreenRound services');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleGreenRound = async () => {
    try {
      const response = await apiToggleGreenRound(!greenRoundEnabled);
      if (response.success) {
        setGreenRoundEnabled(!greenRoundEnabled);
        toast.success(
          greenRoundEnabled
            ? 'GreenRound disabled'
            : 'GreenRound enabled'
        );
      } else {
        toast.error(response.message || 'Failed to update settings');
      }
    } catch (error) {
      console.error('Failed to toggle GreenRound:', error);
      toast.error('Failed to update settings');
    }
  };

  return (
    <div className="bg-gradient-to-b from-emerald-50 to-slate-50 min-h-screen pb-20">
      <Navbar title="eSewa GreenRound" />

      {/* Hero Section */}
      <div className="p-4 space-y-4">
        <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Save the Planet</h2>
              <p className="text-sm text-emerald-100">
                Round up your payments and donate to environmental causes across Nepal
              </p>
            </div>
            <Leaf size={40} className="opacity-80" />
          </div>
        </div>

        {/* Quick Stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white rounded-lg p-3 text-center shadow-sm border border-emerald-100">
              <div className="text-emerald-600 font-bold text-lg">
                Rs. {stats.platformStats?.totalDonated || 0}
              </div>
              <div className="text-xs text-slate-500">Total Donated</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm border border-emerald-100">
              <div className="text-emerald-600 font-bold text-lg">
                {stats.platformStats?.totalDonations || 0}
              </div>
              <div className="text-xs text-slate-500">Donations</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm border border-emerald-100">
              <div className="text-emerald-600 font-bold text-lg">
                {stats.platformStats?.contributorCount || 0}
              </div>
              <div className="text-xs text-slate-500">Contributors</div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 px-3 rounded text-xs font-bold transition-all ${
              activeTab === 'overview'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Target size={14} className="inline mr-1" /> Overview
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 py-2 px-3 rounded text-xs font-bold transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award size={14} className="inline mr-1" /> Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 px-3 rounded text-xs font-bold transition-all ${
              activeTab === 'history'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <TrendingUp size={14} className="inline mr-1" /> My Impact
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <DonationCards stats={stats} />

            {/* Settings */}
            <div className="bg-white rounded-lg p-4 border border-emerald-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-800">Auto Round-Up</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Automatically round up payments to nearest 5 or 10
                  </p>
                </div>
                <button
                  onClick={handleToggleGreenRound}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    greenRoundEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      greenRoundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <ProvinceLeaderboard stats={stats} />
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            <ContributionStats />
            <DonationHistory />
          </div>
        )}
      </div>
    </div>
  );
};

export default GreenRound;
