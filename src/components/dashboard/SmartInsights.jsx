import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingDown, TrendingUp, Lightbulb, AlertTriangle } from 'lucide-react';
import SmartCard from '../common/SmartCard';

const iconMap = {
  saving: { icon: TrendingDown, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  optimization: { icon: Lightbulb, color: 'text-violet-500', bg: 'bg-violet-50' },
  recommendation: { icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50' },
  warning: { icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50' },
};

const fallbackInsights = [
  { id: 'ai1', title: 'Potential Savings Detected', description: 'Switching NTC to a Rs. 399 bundle could save Rs. 101/month.', impact: 'Rs. 1,212/year', type: 'saving' },
  { id: 'ai2', title: 'Duplicate Service Alert', description: 'You pay for both DishHome and Worldlink. Consider bundling.', impact: 'Rs. 750/month', type: 'optimization' },
  { id: 'ai3', title: 'AutoPay Recommendation', description: 'Enable autopay for Water Supply. You\'ve paid on time 11/12 months.', impact: '99% on-time', type: 'recommendation' },
  { id: 'ai4', title: 'Budget Trend Warning', description: 'Your utility spending increased 15% vs last quarter.', impact: '+Rs. 1,800', type: 'warning' },
];

const SmartInsights = () => {
  const aiInsights = fallbackInsights;

  return (
    <div className="px-4 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={16} className="text-violet-500" />
        <h3 className="text-sm font-semibold text-slate-800">AI Insights</h3>
      </div>

      <div className="space-y-2.5">
        {(aiInsights ?? []).map((insight, index) => {
          const config = iconMap[insight.type] || iconMap.recommendation;
          const Icon = config.icon;

          return (
            <SmartCard key={insight.id} delay={index * 0.08} className="p-3.5">
              <div className="flex gap-3">
                <div className={`w-9 h-9 rounded-xl ${config.bg} flex items-center justify-center shrink-0`}>
                  <Icon size={16} className={config.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-slate-800 mb-0.5">{insight.title}</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{insight.description}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold ${config.color} ${config.bg} px-2 py-0.5 rounded-full`}>
                      {insight.impact}
                    </span>
                  </div>
                </div>
              </div>
            </SmartCard>
          );
        })}
      </div>
    </div>
  );
};

export default SmartInsights;
