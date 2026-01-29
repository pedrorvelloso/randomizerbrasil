import { intervalToDuration } from "date-fns";

/**
 * Format a stream "live duration" as H:MM based on a start timestamp.
 *
 * Note: Intended for server-side use (to avoid client hydration mismatches).
 */
export function formatLiveDuration(startedAt: string): string {
  const { hours = 0, minutes = 0 } = intervalToDuration({
    start: Date.parse(startedAt),
    end: Date.now(),
  });

  const mins = `00${minutes}`.slice(-2);
  return `${hours}:${mins}`;
}

