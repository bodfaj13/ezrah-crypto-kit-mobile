/**
 * Formats currency
 * @param value number
 * @returns string
 */
export const formatCurrency = (value?: number) => {
  if (value === undefined) {
    return '$0';
  }

  // Determine fraction digits based on value
  const fractionDigits = value >= 1 ? 2 : 5;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);

  return formattedPrice;
};
