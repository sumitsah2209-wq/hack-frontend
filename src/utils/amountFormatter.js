/**
 * Format amount in Nepali Rupees (NPR)
 */
export const formatCurrency = (amount) => {
  return `Rs. ${Number(amount).toLocaleString('en-NP', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Abbreviate large numbers (e.g. 1000 -> 1k)
 */
export const abbreviateNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
};
