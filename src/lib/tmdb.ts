const TMDB_BASE = "https://api.themoviedb.org/3";

function headers() {
  const key = process.env.TMDB_API_KEY;
  if (!key) throw new Error("TMDB_API_KEY is not set");
  return {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

export async function searchMovies(query: string, page = 1) {
  const url = `${TMDB_BASE}/search/movie?query=${encodeURIComponent(query)}&page=${page}&include_adult=false&language=en-US`;
  const res = await fetch(url, { headers: headers() });
  if (!res.ok) throw new Error(`TMDB search failed: ${res.status}`);
  return res.json();
}

export async function getMovie(id: number) {
  const url = `${TMDB_BASE}/movie/${id}?language=en-US`;
  const res = await fetch(url, { headers: headers() });
  if (!res.ok) throw new Error(`TMDB movie fetch failed: ${res.status}`);
  return res.json();
}

export async function getWatchProviders(id: number) {
  const url = `${TMDB_BASE}/movie/${id}/watch/providers`;
  const res = await fetch(url, { headers: headers() });
  if (!res.ok) throw new Error(`TMDB providers fetch failed: ${res.status}`);
  return res.json();
}
