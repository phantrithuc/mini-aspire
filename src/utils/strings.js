export const formatCurrency = input =>
  (input || 0).toLocaleString('us-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
