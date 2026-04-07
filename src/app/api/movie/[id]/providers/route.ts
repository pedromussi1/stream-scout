import { NextResponse } from "next/server";
import { getWatchProviders } from "@/lib/tmdb";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const movieId = parseInt(id);

  if (isNaN(movieId)) {
    return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 });
  }

  try {
    const data = await getWatchProviders(movieId);
    const usProviders = data.results?.US || null;
    return NextResponse.json(
      { id: data.id, providers: usProviders },
      {
        headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch providers" },
      { status: 502 }
    );
  }
}
