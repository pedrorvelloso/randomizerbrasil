/**
 * Get the base URL for the application
 * Uses Vercel environment variables when available
 */
export function getBaseUrl(): string {
  // Production: use the production URL
  if (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  // Preview: use branch URL (supports custom domains assigned to branches)
  if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_BRANCH_URL) {
    return `https://${process.env.VERCEL_BRANCH_URL}`;
  }

  // Fallback to deployment-specific URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Local development fallback
  return "http://localhost:3000";
}
