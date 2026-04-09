"use client";

import { useEffect, useState } from "react";
import type { MovieDetails } from "@/types/tmdb";

export function useMovieDetails(movieId: number | null) {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!movieId) {
      setDetails(null);
      return;
    }

    setIsLoading(true);

    fetch(`/api/movie/${movieId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data) => {
        setDetails(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [movieId]);

  return { details, isLoading };
}
