/**
 * Formats currency
 * @param value number
 * @returns string
 */
export const formatCurrency = (value?: number) => {
  if (value === undefined) {
    return '$0';
  }
  const amount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
  return amount;
};