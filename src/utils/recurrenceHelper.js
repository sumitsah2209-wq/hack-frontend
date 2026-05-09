/**
 * Helper to determine recurrence labels and logic
 */
export const getRecurrenceLabel = (frequency) => {
  switch (frequency.toLowerCase()) {
    case 'monthly': return 'Per Month';
    case 'quarterly': return 'Every 3 Months';
    case 'yearly': return 'Per Year';
    default: return 'Recurring';
  }
};

/**
 * Calculate next billing date based on frequency
 */
export const calculateNextBilling = (lastDate, frequency) => {
  const date = new Date(lastDate);
  if (frequency === 'monthly') date.setMonth(date.getMonth() + 1);
  return date.toISOString().split('T')[0];
};
