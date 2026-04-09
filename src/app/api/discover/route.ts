import { NextRequest, NextResponse } from "next/server";
import { discoverByProvider } from "@/lib/tmdb";

export async function GET(request: NextRequest) {
  const providerId = request.nextUrl.searchParams.get("provider_id");
  const page = request.nextUrl.searchParams.get("page") || "1";

  if (!providerId || isNaN(parseInt(providerId))) {
    return NextResponse.json(
      { error: "Valid provider_id is required" },
      { status: 400 }
    );
  }

  try {
    const data = await discoverByProvider(parseInt(providerId), parseInt(page));
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to discover movies" },
      { status: 502 }
    );
  }
}
