/**
 * Format a date string to a human-readable format
 * @param {string|Date} date
 * @param {object} options - Intl.DateTimeFormat options
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric', month: 'short', day: 'numeric',
    ...options,
  };
  return new Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(date));
};

/**
 * Format a date with time
 */
export const formatDateTime = (date) =>
  formatDate(date, { hour: '2-digit', minute: '2-digit' });

/**
 * Truncate text to a given length, appending ellipsis
 */
export const truncate = (str, length = 100) =>
  str?.length > length ? `${str.slice(0, length)}…` : str;

/**
 * Capitalise first letter of each word
 */
export const titleCase = (str = '') =>
  str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());

/**
 * Convert a score (0–100) to a colour class
 */
export const scoreToColor = (score) => {
  if (score >= 75) return 'text-green-400';
  if (score >= 50) return 'text-yellow-400';
  if (score >= 25) return 'text-orange-400';
  return 'text-red-400';
};

/**
 * Convert a score to a badge variant
 */
export const scoreToBadge = (score) => {
  if (score >= 75) return 'badge-success';
  if (score >= 50) return 'badge-warning';
  return 'badge-danger';
};

/**
 * Map sentiment label to colour
 */
export const sentimentColor = (label) => {
  const map = {
    positive: '#10b981',
    neutral:  '#f59e0b',
    negative: '#ef4444',
  };
  return map[label?.toLowerCase()] || '#94a3b8';
};

/**
 * Parse API error to a readable message
 */
export const parseError = (error) => {
  if (error?.response?.data?.detail)    return error.response.data.detail;
  if (error?.response?.data?.message)   return error.response.data.message;
  if (error?.response?.data?.error)     return error.response.data.error;
  if (error?.message)                   return error.message;
  return 'An unexpected error occurred.';
};

/**
 * Delay helper (async sleep)
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generate a random ID (for mock keys)
 */
export const generateId = () => Math.random().toString(36).slice(2, 9);

/**
 * Format a number with commas
 */
export const formatNumber = (num) =>
  new Intl.NumberFormat('en-US').format(num);

/**
 * Clamp a number between min and max
 */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
