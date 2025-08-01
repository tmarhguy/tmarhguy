/**
 * Utility function to get the correct base path for assets
 * Handles both local development and GitHub Pages deployment
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In production (GitHub Pages), add the basePath
  if (process.env.NODE_ENV === 'production') {
    return `/tmarhguy/${cleanPath}`;
  }
  
  // In development, use root path
  return `/${cleanPath}`;
}

/**
 * Get the base URL for the site
 */
export function getBaseUrl(): string {
  if (process.env.NODE_ENV === 'production') {
    return 'https://tmarhguy.github.io/tmarhguy';
  }
  
  return 'http://localhost:3005';
}
