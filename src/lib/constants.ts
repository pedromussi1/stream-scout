export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";
export const POSTER_SIZE = "w342";
export const PROVIDER_LOGO_SIZE = "w92";
export const BACKDROP_SIZE = "w1280";

export function posterUrl(path: string | null): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${POSTER_SIZE}${path}`;
}

export function providerLogoUrl(path: string): string {
  return `${TMDB_IMAGE_BASE}/${PROVIDER_LOGO_SIZE}${path}`;
}
