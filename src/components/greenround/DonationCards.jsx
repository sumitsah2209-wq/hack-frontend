import React from 'react';
import { Leaf, Trees, Globe } from 'lucide-react';

const DonationCards = ({ stats }) => {
  const causes = [
    {
      title: 'Wildlife Conservation',
      icon: Leaf,
      color: 'from-blue-400 to-blue-600',
      description: 'Protect endangered species',
    },
    {
      title: 'Forest Preservation',
      icon: Trees,
      color: 'from-green-400 to-green-600',
      description: 'Restore and protect forests',
    },
    {
      title: 'Environmental Sustainability',
      icon: Globe,
      color: 'from-emerald-400 to-emerald-600',
      description: 'Build a sustainable future',
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-slate-800 text-sm">Support a Cause</h3>
      <div className="space-y-2">
        {causes.map((cause) => {
          const causeName = cause.title;
          const causeData = stats?.donationsByCause?.find(
            (c) => c._id === causeName
          );
          return (
            <div
              key={cause.title}
              className={`bg-gradient-to-br ${cause.color} rounded-lg p-4 text-white shadow-md transform hover:scale-105 transition-transform`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-sm">{cause.title}</h4>
                  <p className="text-xs text-white text-opacity-80 mt-1">
                    {cause.description}
                  </p>
                  {causeData && (
                    <p className="text-xs text-white text-opacity-70 mt-2">
                      Rs. {causeData.amount} • {causeData.count} donations
                    </p>
                  )}
                </div>
                <cause.icon size={32} className="opacity-80" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DonationCards;
