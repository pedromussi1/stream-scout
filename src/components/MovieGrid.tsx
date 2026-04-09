"use client";

import type { Movie } from "@/types/tmdb";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  isLoading: boolean;
  hasSearched: boolean;
}

function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-card border border-border animate-pulse">
      <div className="aspect-[2/3] bg-card-hover" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-card-hover rounded w-3/4" />
        <div className="h-3 bg-card-hover rounded w-1/2" />
      </div>
    </div>
  );
}

export function MovieGrid({
  movies,
  selectedId,
  onSelect,
  isLoading,
  hasSearched,
}: MovieGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (hasSearched && movies.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted text-lg">No movies found. Try a different search.</p>
      </div>
    );
  }

  if (movies.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {movies.map((movie, i) => (
        <div
          key={movie.id}
          className="animate-stagger-in"
          style={{ animationDelay: `${Math.min(i * 50, 500)}ms` }}
        >
          <MovieCard
            movie={movie}
            isSelected={selectedId === movie.id}
            onSelect={onSelect}
          />
        </div>
      ))}
    </div>
  );
}
