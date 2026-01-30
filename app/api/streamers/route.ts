import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { getOnlineStreamers } from "@/lib/twitch/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const getCachedStreamersWithTimestamp = unstable_cache(
  async () => {
    const timestamp = new Date().toISOString();
    const streamers = await getOnlineStreamers();
    return { streamers, timestamp };
  },
  ["api-streamers"],
  {
    revalidate: 60,
    tags: ["api-streamers"],
  }
);

export async function GET() {
  try {
    const { streamers, timestamp } = await getCachedStreamersWithTimestamp();

    return NextResponse.json({
      success: true,
      data: streamers,
      count: streamers.length,
      timestamp,
    });
  } catch (error) {
    console.error("Error fetching streamers:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch streamers" },
      { status: 500 }
    );
  }
}
