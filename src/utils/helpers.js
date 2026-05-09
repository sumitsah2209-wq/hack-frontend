/**
 * Format amount in Nepali Rupees
 */
export const formatCurrency = (amount) => {
  return `Rs. ${Number(amount).toLocaleString('en-NP', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Format a date string to a readable format
 */
export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Format relative date (e.g., "3 days left")
 */
export const formatDaysLeft = (daysLeft) => {
  if (daysLeft === 0) return 'Due today';
  if (daysLeft === 1) return 'Due tomorrow';
  if (daysLeft < 0) return `${Math.abs(daysLeft)} days overdue`;
  return `${daysLeft} days left`;
};

/**
 * Get urgency color class
 */
export const getUrgencyColor = (urgency) => {
  switch (urgency) {
    case 'high': return { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', dot: 'bg-red-500' };
    case 'medium': return { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', dot: 'bg-amber-500' };
    case 'low': return { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', dot: 'bg-emerald-500' };
    default: return { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', dot: 'bg-slate-500' };
  }
};

/**
 * Get confidence level label
 */
export const getConfidenceLabel = (confidence) => {
  if (confidence >= 95) return 'Very High';
  if (confidence >= 85) return 'High';
  if (confidence >= 70) return 'Medium';
  return 'Low';
};

/**
 * Get notification icon color
 */
export const getNotificationType = (type) => {
  switch (type) {
    case 'success': return { color: 'text-emerald-500', bg: 'bg-emerald-50' };
    case 'warning': return { color: 'text-amber-500', bg: 'bg-amber-50' };
    case 'error': return { color: 'text-red-500', bg: 'bg-red-50' };
    case 'info': return { color: 'text-blue-500', bg: 'bg-blue-50' };
    case 'reminder': return { color: 'text-violet-500', bg: 'bg-violet-50' };
    case 'eco': return { color: 'text-green-500', bg: 'bg-green-50' };
    default: return { color: 'text-slate-500', bg: 'bg-slate-50' };
  }
};

/**
 * Calculate days between two dates
 */
export const daysBetween = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = d2 - d1;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Truncate text with ellipsis
 */
export const truncate = (str, maxLength = 30) => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
};
