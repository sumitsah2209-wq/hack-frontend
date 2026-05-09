import React, { useState } from 'react';
import { Leaf, Heart, Globe, X, Check } from 'lucide-react';
import { createDonation } from '../../api/greenRoundApi';
import toast from 'react-hot-toast';

const DonationConfirmationModal = ({
  isOpen,
  onClose,
  transactionData,
  onDonationCreated,
}) => {
  const [selectedProvince, setSelectedProvince] = useState('Bagmati');
  const [selectedCause, setSelectedCause] = useState(
    'Environmental Sustainability'
  );
  const [loading, setLoading] = useState(false);

  const provinces = [
    'Koshi',
    'Madhesh',
    'Bagmati',
    'Gandaki',
    'Lumbini',
    'Karnali',
    'Sudurpashchim',
  ];

  const causes = [
    {
      id: 'Wildlife Conservation',
      title: 'Wildlife Conservation',
      icon: Leaf,
      color: 'from-blue-400 to-blue-600',
    },
    {
      id: 'Forest Preservation',
      title: 'Forest Preservation',
      icon: Leaf,
      color: 'from-green-400 to-green-600',
    },
    {
      id: 'Environmental Sustainability',
      title: 'Environmental Sustainability',
      icon: Globe,
      color: 'from-emerald-400 to-emerald-600',
    },
  ];

  const calculateRoundUp = (amount) => {
    const num = Number(amount);
    const remainder = num % 5;
    const roundedTo5 = remainder === 0 ? num : num + (5 - remainder);
    const roundedTo10 =
      num % 10 === 0 ? num : Math.ceil(num / 10) * 10;
    const rounded = roundedTo5 <= roundedTo10 ? roundedTo5 : roundedTo10;
    return {
      original: num,
      rounded,
      donated: rounded - num,
    };
  };

  const roundUp = calculateRoundUp(transactionData?.amount || 0);

  const handleDonate = async () => {
    if (!transactionData) return;

    try {
      setLoading(true);
      const res = await createDonation({
        amount: transactionData.amount,
        province: selectedProvince,
        cause: selectedCause,
        transactionId: transactionData.id,
      });

      if (res.success) {
        toast.success(`Donated Rs. ${roundUp.donated} to ${selectedCause}! 🌱`);
        if (onDonationCreated) {
          onDonationCreated(res.data);
        }
        onClose();
      } else {
        toast.error(res.message || 'Failed to create donation');
      }
    } catch (error) {
      toast.error('Failed to create donation');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
      <div className="w-full max-w-md bg-white rounded-t-2xl shadow-2xl animate-in slide-in-from-bottom">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Heart className="text-emerald-600" size={24} />
            Make an Impact
          </h2>
          <button
            onClick={handleSkip}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Round-up Summary */}
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
            <p className="text-xs text-slate-500 mb-2">
              Your payment will be rounded up
            </p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-slate-600">
                  Rs. {roundUp.original.toFixed(2)}
                </p>
                <p className="text-xs text-slate-500">Original amount</p>
              </div>
              <div className="text-2xl text-slate-300 font-bold">→</div>
              <div>
                <p className="text-sm font-bold text-emerald-600">
                  Rs. {roundUp.rounded.toFixed(2)}
                </p>
                <p className="text-xs text-slate-500">Rounded amount</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-emerald-200">
              <p className="text-lg font-bold text-emerald-600">
                🌱 Donate Rs. {roundUp.donated.toFixed(2)}
              </p>
              <p className="text-xs text-slate-600 mt-1">
                to environmental causes in Nepal
              </p>
            </div>
          </div>

          {/* Province Selection */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-3">
              Which province would you like to support?
            </label>
            <div className="space-y-2">
              {provinces.map((province) => (
                <button
                  key={province}
                  onClick={() => setSelectedProvince(province)}
                  className={`w-full py-3 px-4 rounded-lg font-bold text-sm transition-all ${
                    selectedProvince === province
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {selectedProvince === province && (
                    <Check size={16} className="inline mr-2" />
                  )}
                  {province}
                </button>
              ))}
            </div>
          </div>

          {/* Cause Selection */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-3">
              Which cause matters most to you?
            </label>
            <div className="space-y-2">
              {causes.map((cause) => {
                const Icon = cause.icon;
                return (
                  <button
                    key={cause.id}
                    onClick={() => setSelectedCause(cause.id)}
                    className={`w-full p-4 rounded-lg text-left transition-all border-2 ${
                      selectedCause === cause.id
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="text-emerald-600" size={20} />
                      <div>
                        <p className="font-bold text-slate-800 text-sm">
                          {cause.title}
                        </p>
                      </div>
                      {selectedCause === cause.id && (
                        <Check className="ml-auto text-emerald-600" size={20} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4">
            <button
              onClick={handleDonate}
              disabled={loading}
              className="w-full py-3 px-4 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating Donation...' : '🌿 Confirm & Donate'}
            </button>
            <button
              onClick={handleSkip}
              className="w-full py-3 px-4 bg-slate-100 text-slate-800 font-bold rounded-lg hover:bg-slate-200 transition-colors"
            >
              Skip for Now
            </button>
          </div>

          <p className="text-xs text-center text-slate-500 px-2">
            You can manage your donation preferences anytime in Settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationConfirmationModal;
