"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { useTrendingMovies } from "@/hooks/useTrendingMovies";
import { useDiscoverMovies } from "@/hooks/useDiscoverMovies";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { useMovieDetails } from "@/hooks/useMovieDetails";
import { SearchBar } from "@/components/SearchBar";
import { MovieGrid } from "@/components/MovieGrid";
import { ProviderList } from "@/components/ProviderList";
import { ServiceFilter } from "@/components/ServiceFilter";
import { RecentSearches } from "@/components/RecentSearches";
import { ShareButton } from "@/components/ShareButton";
import { Footer } from "@/components/Footer";
import { backdropUrl } from "@/lib/constants";
import { STREAMING_SERVICES } from "@/lib/provider-filters";
import type { Movie } from "@/types/tmdb";

export default function Home() {
  const {
    query,
    setQuery,
    results,
    isLoading,
    error,
    hasSearched,
    debouncedQuery,
  } = useMovieSearch();

  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [activeServiceId, setActiveServiceId] = useState<number | null>(null);

  const { movies: trendingMovies, isLoading: trendingLoading } =
    useTrendingMovies();
  const { movies: discoverMovies, isLoading: discoverLoading } =
    useDiscoverMovies(activeServiceId);
  const { searches, addSearch, clearSearches } = useRecentSearches();
  const { details: movieDetails } = useMovieDetails(selectedMovieId);

  // Track searches for recent searches feature
  const lastRecordedQuery = useRef("");
  useEffect(() => {
    if (
      hasSearched &&
      debouncedQuery.trim().length >= 2 &&
      debouncedQuery !== lastRecordedQuery.current
    ) {
      lastRecordedQuery.current = debouncedQuery;
      addSearch(debouncedQuery);
    }
  }, [hasSearched, debouncedQuery, addSearch]);

  // Determine which movies to display
  const displayMovies: Movie[] = activeServiceId
    ? discoverMovies
    : hasSearched
      ? results
      : trendingMovies;
  const displayLoading = activeServiceId
    ? discoverLoading
    : hasSearched
      ? isLoading
      : trendingLoading;

  const selectedMovie = displayMovies.find((m) => m.id === selectedMovieId);

  // Section heading
  const activeName = STREAMING_SERVICES.find(
    (s) => s.id === activeServiceId
  )?.name;
  const sectionTitle = activeServiceId
    ? `Streaming on ${activeName}`
    : !hasSearched
      ? "Trending This Week"
      : null;

  function handleQueryChange(value: string) {
    setQuery(value);
    if (value.length > 0) setActiveServiceId(null);
  }

  function handleServiceSelect(id: number | null) {
    setActiveServiceId(id);
    setQuery("");
    setSelectedMovieId(null);
  }

  function handleSelect(id: number) {
    setSelectedMovieId(selectedMovieId === id ? null : id);
  }

  function handleRecentSelect(q: string) {
    setActiveServiceId(null);
    setQuery(q);
  }

  // Format runtime
  const runtime = movieDetails?.runtime;
  const runtimeStr = runtime
    ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
    : null;

  return (
    <div className="flex flex-col min-h-full">
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Stream<span className="text-accent">Scout</span>
          </h1>
          <p className="text-muted text-lg">Find where to watch any movie</p>
        </div>

        {/* Search */}
        <div className="mb-4">
          <SearchBar
            value={query}
            onChange={handleQueryChange}
            isLoading={isLoading}
          />
        </div>

        {/* Recent searches */}
        {query.length === 0 && !hasSearched && !activeServiceId && (
          <div className="mb-6 animate-fade-in-up">
            <RecentSearches
              searches={searches}
              onSelect={handleRecentSelect}
              onClear={clearSearches}
            />
          </div>
        )}

        {/* Service filter */}
        <div className="mb-8">
          <ServiceFilter
            selectedId={activeServiceId}
            onSelect={handleServiceSelect}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Provider detail panel */}
        {selectedMovie && (
          <div className="mb-8 p-5 rounded-2xl bg-card/90 backdrop-blur-sm border border-accent/30 animate-slide-down relative overflow-hidden">
            {/* Backdrop hero */}
            {selectedMovie.backdrop_path && (
              <div className="absolute inset-0 -z-10">
                <Image
                  src={backdropUrl(selectedMovie.backdrop_path)!}
                  alt=""
                  fill
                  className="object-cover opacity-20"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-card/40" />
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">
                  {selectedMovie.title}
                </h2>
                {movieDetails?.tagline && (
                  <p className="text-sm italic text-muted/80 mt-0.5">
                    &ldquo;{movieDetails.tagline}&rdquo;
                  </p>
                )}
                <p className="text-sm text-muted mt-0.5">
                  {selectedMovie.release_date?.split("-")[0] || "N/A"}
                  {runtimeStr && ` · ${runtimeStr}`}
                  {selectedMovie.vote_count > 0 &&
                    ` · ★ ${selectedMovie.vote_average.toFixed(1)}`}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <ShareButton movie={selectedMovie} />
                <button
                  onClick={() => setSelectedMovieId(null)}
                  className="text-muted hover:text-foreground transition-colors p-1"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {selectedMovie.overview && (
              <p className="text-sm text-muted mb-3 line-clamp-2">
                {selectedMovie.overview}
              </p>
            )}

            {/* Genre pills from detail endpoint */}
            {movieDetails?.genres && movieDetails.genres.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {movieDetails.genres.map((g) => (
                  <span
                    key={g.id}
                    className="text-xs px-2 py-0.5 rounded-full bg-card-hover/50 text-muted border border-border"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <ProviderList movieId={selectedMovie.id} />
          </div>
        )}

        {/* Section heading */}
        {sectionTitle && displayMovies.length > 0 && (
          <h2 className="text-lg font-semibold text-muted mb-4 animate-fade-in-up">
            {sectionTitle}
          </h2>
        )}

        {/* Results grid */}
        <MovieGrid
          movies={displayMovies}
          selectedId={selectedMovieId}
          onSelect={handleSelect}
          isLoading={displayLoading}
          hasSearched={hasSearched}
        />
      </main>

      <Footer />
    </div>
  );
}
