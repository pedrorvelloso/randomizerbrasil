/**
 * Get the base URL for the application
 * Uses Vercel environment variables when available
 */
export function getBaseUrl(): string {
  // In production environment, use the production URL
  if (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  // For preview/development deployments on Vercel, use the deployment-specific URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Local development fallback
  return "http://localhost:3000";
}
