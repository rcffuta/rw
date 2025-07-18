export const isEmpty = (value: unknown): boolean => {
    if (value == null) return true; // Covers null and undefined
    if (typeof value === "string") return value.trim().length === 0;
    if (typeof value === "number") return isNaN(value); // NaN is considered empty
    if (typeof value === "boolean") return false; // true/false are not empty
    if (Array.isArray(value)) return value.length === 0;
    if (value instanceof Map || value instanceof Set) return value.size === 0;
    if (typeof value === "object") return Object.keys(value).length === 0;
    
    return false; // For other types (functions, symbols, non-empty objects)
};

export async function wait(time: number) {
    return new Promise((res, rej)=>{
        setTimeout(()=>{
            res(null);
        }, time * 1000)
    })
}


/**
 * Formats a number as Nigerian Naira currency
 * @param amount - The number to format
 * @param decimalPlaces - Number of decimal places to show (default: 2)
 * @returns Formatted Nigerian Naira string
 */
export function formatNaira(amount: number | string, prefix="₦ ", decimalPlaces: number = 0): string {
  // Convert string input to number if needed
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Handle invalid numbers
  if (isNaN(numAmount)) {
    return `${prefix}0.00`;
  }

  // Format with Nigerian locale
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(numAmount)
    .replace('NGN', prefix) // Replace 'NGN' with '₦' symbol
    .replace(/\s+/g, '') // Remove any whitespace
    .replace('₦', prefix); // Replace 'NGN' with '₦' symbol
}

// Alternative simpler version without Intl.NumberFormat
export function simpleFormatNaira(amount: number | string, decimalPlaces: number = 2): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) {
    return '₦0.00';
  }

  return `₦${numAmount.toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}