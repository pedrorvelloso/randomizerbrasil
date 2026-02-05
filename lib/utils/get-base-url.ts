/**
 * Get the base URL for the application
 * Uses Vercel environment variables when available
 */
export function getBaseUrl(): string {
  const env = process.env.VERCEL_ENV
  const isProductionUrl = env === 'production'
  const isPreviewUrl = env === 'preview' && process.env.VERCEL_GIT_COMMIT_REF === 'preview'

  // Production: use the production URL
  if (isProductionUrl && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (isPreviewUrl) {
    return `https://preview.${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  // Fallback to deployment-specific URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Local development fallback
  return "http://localhost:3000";
}
