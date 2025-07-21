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

/**
 * Truncates text to a specified length and adds ellipsis if truncated
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation (default: 50)
 * @param ellipsis - The ellipsis character(s) to use (default: '...')
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(
  text: string,
  maxLength: number = 50,
  ellipsis: string = '...'
): string {
  if (!text || typeof text !== 'string') return '';
  
  if (text.length <= maxLength) return text;
  
  // Find the last space before maxLength to avoid cutting words
  let truncated = text.substr(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > 0) {
    truncated = truncated.substr(0, lastSpace);
  }
  
  return truncated + ellipsis;
}


export function normalizeQuantity(quantity?: number, prev?:number): number {
  if (quantity === undefined) {
    if (prev) {
      return prev + 1;
    }
    return 1;
  };
  if (quantity < 0) return 0;
  return quantity;
}