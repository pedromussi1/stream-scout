"use client";

import { useState } from "react";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { SearchBar } from "@/components/SearchBar";
import { MovieGrid } from "@/components/MovieGrid";
import { ProviderList } from "@/components/ProviderList";
import { Footer } from "@/components/Footer";

export default function Home() {
  const { query, setQuery, results, isLoading, error, hasSearched } =
    useMovieSearch();
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const selectedMovie = results.find((m) => m.id === selectedMovieId);

  function handleSelect(id: number) {
    setSelectedMovieId(selectedMovieId === id ? null : id);
  }

  return (
    <div className="flex flex-col min-h-full">
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Stream<span className="text-accent">Scout</span>
          </h1>
          <p className="text-muted text-lg">
            Find where to watch any movie
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 sm:mb-10">
          <SearchBar value={query} onChange={setQuery} isLoading={isLoading} />
        </div>

        {/* Error */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Welcome state */}
        {!hasSearched && !isLoading && (
          <div className="text-center py-16 sm:py-24">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-border"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
            <p className="text-muted">
              Search for a movie to see where it&apos;s streaming
            </p>
          </div>
        )}

        {/* Provider detail panel */}
        {selectedMovie && (
          <div className="mb-8 p-5 rounded-2xl bg-card border border-accent/30 animate-in fade-in duration-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">{selectedMovie.title}</h2>
                <p className="text-sm text-muted mt-0.5">
                  {selectedMovie.release_date?.split("-")[0] || "N/A"}
                  {selectedMovie.vote_count > 0 &&
                    ` · ★ ${selectedMovie.vote_average.toFixed(1)}`}
                </p>
              </div>
              <button
                onClick={() => setSelectedMovieId(null)}
                className="text-muted hover:text-foreground transition-colors p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {selectedMovie.overview && (
              <p className="text-sm text-muted mb-4 line-clamp-2">
                {selectedMovie.overview}
              </p>
            )}
            <ProviderList movieId={selectedMovie.id} />
          </div>
        )}

        {/* Results grid */}
        <MovieGrid
          movies={results}
          selectedId={selectedMovieId}
          onSelect={handleSelect}
          isLoading={isLoading}
          hasSearched={hasSearched}
        />
      </main>

      <Footer />
    </div>
  );
}
