import React, { useState, useEffect } from 'react';
import { Leaf, ChevronRight } from 'lucide-react';
import { getUserDonations } from '../../api/greenRoundApi';
import toast from 'react-hot-toast';

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    loadDonations();
  }, [page]);

  const loadDonations = async () => {
    try {
      setLoading(true);
      const res = await getUserDonations(page, 10);
      if (res.success) {
        setDonations(res.data?.donations || []);
        setPagination(res.data?.pagination);
      }
    } catch (error) {
      toast.error('Failed to load donation history');
    } finally {
      setLoading(false);
    }
  };

  const causeColors = {
    'Wildlife Conservation': 'from-blue-400 to-blue-600',
    'Forest Preservation': 'from-green-400 to-green-600',
    'Environmental Sustainability': 'from-emerald-400 to-emerald-600',
  };

  const getCauseColor = (cause) => causeColors[cause] || 'from-slate-400 to-slate-600';

  if (loading) {
    return <div className="text-center text-slate-500 py-8">Loading...</div>;
  }

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-slate-800">Recent Donations</h3>

      {donations.length > 0 ? (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-100">
          <div className="divide-y divide-slate-100">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`bg-gradient-to-br ${getCauseColor(
                      donation.cause
                    )} rounded-lg p-2 text-white`}
                  >
                    <Leaf size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      {donation.cause}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      {donation.province} • {' '}
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">+Rs. {donation.donatedAmount}</p>
                  <p className="text-xs text-slate-500">
                    {donation.originalAmount} → {donation.roundedAmount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-6 text-center text-slate-500 shadow-sm">
          <Leaf size={32} className="mx-auto mb-2 opacity-20" />
          <p>No donations yet. Make a payment to start contributing!</p>
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.pages > 1 && (
        <div className="flex gap-2 justify-center mt-4">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-3 py-2 rounded bg-slate-100 text-slate-600 disabled:opacity-50 text-sm font-bold"
          >
            Previous
          </button>
          <span className="px-3 py-2 text-slate-600 text-sm font-bold">
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            onClick={() => setPage(Math.min(pagination.pages, page + 1))}
            disabled={page === pagination.pages}
            className="px-3 py-2 rounded bg-slate-100 text-slate-600 disabled:opacity-50 text-sm font-bold"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DonationHistory;
