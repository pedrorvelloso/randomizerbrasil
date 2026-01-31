/**
 * Get the base URL for the application
 * Uses Vercel environment variables when available
 */
export function getBaseUrl(): string {
  // Vercel production URL (e.g., "mysite.com")
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  // Vercel preview/development deployment URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Local development
  return "http://localhost:3000";
}
