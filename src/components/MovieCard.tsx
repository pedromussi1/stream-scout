"use client";

import Image from "next/image";
import type { Movie } from "@/types/tmdb";
import { TMDB_IMAGE_BASE, POSTER_SIZE } from "@/lib/constants";
import { genreNames } from "@/lib/genres";

interface MovieCardProps {
  movie: Movie;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export function MovieCard({ movie, isSelected, onSelect }: MovieCardProps) {
  const year = movie.release_date?.split("-")[0] || "N/A";
  const rating = movie.vote_average?.toFixed(1);
  const hasPoster = !!movie.poster_path;
  const genres = genreNames(movie.genre_ids);

  return (
    <button
      onClick={() => onSelect(movie.id)}
      className={`group text-left rounded-xl overflow-hidden bg-card border transition-all duration-200 hover:scale-[1.02] hover:border-accent/50 ${
        isSelected ? "border-accent ring-1 ring-accent" : "border-border"
      }`}
    >
      <div className="aspect-[2/3] relative bg-card-hover">
        {hasPoster ? (
          <Image
            src={`${TMDB_IMAGE_BASE}/${POSTER_SIZE}${movie.poster_path}`}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm text-foreground truncate group-hover:text-accent transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 mt-1 text-xs text-muted">
          <span>{year}</span>
          {movie.vote_count > 0 && (
            <>
              <span>·</span>
              <span className="text-yellow-500">★ {rating}</span>
            </>
          )}
        </div>
        {genres.length > 0 && (
          <div className="flex gap-1 mt-1.5 flex-wrap">
            {genres.map((g) => (
              <span
                key={g}
                className="text-[10px] px-1.5 py-0.5 rounded-full bg-card-hover text-muted border border-border"
              >
                {g}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
