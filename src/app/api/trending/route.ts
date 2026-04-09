import { NextResponse } from "next/server";
import { getTrendingMovies } from "@/lib/tmdb";

export async function GET() {
  try {
    const data = await getTrendingMovies();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch trending movies" },
      { status: 502 }
    );
  }
}
