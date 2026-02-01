import { NextResponse } from "next/server";
import { getRunnersWithSource } from "@/lib/supabase/runners";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const runners = await getRunnersWithSource();

    return NextResponse.json(
      {
        success: true,
        data: runners,
        count: runners.length,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching runners:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch runners" },
      { status: 500 }
    );
  }
}
