import { getCachedStreamers } from "@/lib/twitch/cached";
import { StreamersAutoRefresh } from "./streamers-auto-refresh";

export async function StreamersList() {
  const streamers = await getCachedStreamers();

  return <StreamersAutoRefresh initialData={streamers} />;
}
