import { NextResponse } from "next/server";
import { getOnlineStreamers } from "@/lib/twitch/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const streamers = await getOnlineStreamers();

    return NextResponse.json(
      {
        success: true,
        data: streamers,
        count: streamers.length,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching streamers:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch streamers" },
      { status: 500 }
    );
  }
}
