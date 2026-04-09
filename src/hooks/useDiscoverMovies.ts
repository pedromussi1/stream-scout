"use client";

import { useEffect, useRef, useState } from "react";
import type { Movie } from "@/types/tmdb";

export function useDiscoverMovies(providerId: number | null) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!providerId) {
      setMovies([]);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);

    fetch(`/api/discover?provider_id=${providerId}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data) => {
        setMovies(data.results || []);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [providerId]);

  return { movies, isLoading };
}
