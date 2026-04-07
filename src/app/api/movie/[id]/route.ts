import { NextResponse } from "next/server";
import { getMovie } from "@/lib/tmdb";

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
    const data = await getMovie(movieId);
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch movie" },
      { status: 502 }
    );
  }
}
