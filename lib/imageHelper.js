/**
 * Get the full image URL
 * @param {string} url - The image URL (can be relative or absolute)
 * @returns {string} - The full image URL
 */
export const getImageUrl = (url) => {
  if (!url) return '/placeholder.svg';
  
  // If it's already a full URL, return it
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If it's a placeholder, return it as is
  if (url === '/placeholder.svg') return url;
  
  // For production, use Render URL
  if (process.env.NODE_ENV === 'production') {
    return `https://newssketch-api.onrender.com${url}`;
  }
  
  // For development, use localhost
  return `http://localhost:5000${url}`;
};