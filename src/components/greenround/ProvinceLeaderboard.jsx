import React, { useState, useEffect } from 'react';
import { Award, Trophy, Zap } from 'lucide-react';
import { getProvinceLeaderboard } from '../../api/greenRoundApi';
import toast from 'react-hot-toast';

const ProvinceLeaderboard = ({ stats }) => {
  const [period, setPeriod] = useState('monthly');
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLeaderboard();
  }, [period]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const res = await getProvinceLeaderboard(period);
      if (res.success) {
        setLeaderboard(res.data?.leaderboard || []);
      }
    } catch (error) {
      toast.error('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="space-y-4">
      {/* Period Tabs */}
      <div className="flex gap-2 bg-white rounded-lg p-2 shadow-sm">
        {['weekly', 'monthly', 'alltime'].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`flex-1 py-2 px-3 rounded text-xs font-bold transition-all ${
              period === p
                ? 'bg-emerald-600 text-white'
                : 'text-slate-600 bg-slate-50'
            }`}
          >
            {p === 'alltime' ? 'All Time' : p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-lg overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-6 text-center text-slate-500">Loading...</div>
        ) : leaderboard.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {leaderboard.map((item, idx) => (
              <div
                key={item._id}
                className={`p-4 flex items-center justify-between ${
                  idx < 3 ? 'bg-emerald-50 border-l-4 border-emerald-600' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl w-8 text-center">
                    {idx < 3 ? medals[idx] : `${idx + 1}.`}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{item.province}</h4>
                    <p className="text-xs text-slate-500">
                      {item.contributorCount} contributors
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-600">
                    Rs. {item.totalDonated}
                  </div>
                  <p className="text-xs text-slate-500">{item.donationCount} donations</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-slate-500">
            No donations yet. Start contributing!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProvinceLeaderboard;
