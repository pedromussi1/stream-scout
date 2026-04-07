export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
  tagline: string;
  status: string;
}

export interface Provider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface CountryProviders {
  link: string;
  flatrate?: Provider[];
  rent?: Provider[];
  buy?: Provider[];
  free?: Provider[];
}

export interface WatchProvidersResponse {
  id: number;
  results: Record<string, CountryProviders>;
}
