import React, { useState, useEffect } from 'react';
import { TrendingUp, PieChart } from 'lucide-react';
import { getUserContributionStats } from '../../api/greenRoundApi';
import toast from 'react-hot-toast';

const ContributionStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const res = await getUserContributionStats();
      if (res.success) {
        setStats(res.data);
      }
    } catch (error) {
      toast.error('Failed to load contribution stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-slate-500 py-8">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Overall Impact */}
      <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-emerald-100 mb-2">Your Total Impact</p>
            <h2 className="text-3xl font-bold">Rs. {stats?.totalDonated || 0}</h2>
            <p className="text-sm text-emerald-100 mt-2">
              Rank: #{stats?.rank || 'N/A'} globally
            </p>
          </div>
          <TrendingUp size={48} className="opacity-50" />
        </div>
      </div>

      {/* Contributions by Cause */}
      {stats?.donationsByCause?.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
            <PieChart size={16} /> Donations by Cause
          </h3>
          <div className="space-y-2">
            {stats.donationsByCause.map((cause) => (
              <div key={cause._id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-700">{cause._id}</span>
                  <span className="text-sm font-bold text-emerald-600">
                    Rs. {cause.amount}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full"
                    style={{
                      width: `${
                        (cause.amount /
                          stats.donationsByCause.reduce((sum, c) => sum + c.amount, 0)) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">{cause.count} donations</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contributions by Province */}
      {stats?.donationsByProvince?.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-3">Donations by Province</h3>
          <div className="grid grid-cols-2 gap-2">
            {stats.donationsByProvince.map((province) => (
              <div key={province._id} className="bg-emerald-50 rounded-lg p-3">
                <h4 className="font-bold text-slate-800 text-sm">{province._id}</h4>
                <p className="text-emerald-600 font-bold text-lg">Rs. {province.amount}</p>
                <p className="text-xs text-slate-500">{province.count} donations</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Monthly Trend */}
      {stats?.monthlyDonations?.length > 0 && (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-3">Monthly Donations</h3>
          <div className="space-y-2">
            {stats.monthlyDonations.map((month) => (
              <div
                key={`${month._id.year}-${month._id.month}`}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-slate-600">
                  {new Date(month._id.year, month._id.month - 1).toLocaleDateString(
                    'en-US',
                    {
                      month: 'short',
                      year: 'numeric',
                    }
                  )}
                </span>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">Rs. {month.amount}</p>
                  <p className="text-xs text-slate-500">{month.count} donations</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributionStats;
