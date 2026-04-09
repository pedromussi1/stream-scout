import { useEffect, useRef, useState } from "react";
import { useDebounce } from "./useDebounce";
import type { Movie } from "@/types/tmdb";

export function useMovieSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setResults([]);
      setError(null);
      if (debouncedQuery.length === 0) setHasSearched(false);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    fetch(`/api/search?query=${encodeURIComponent(debouncedQuery)}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Search failed");
        return res.json();
      })
      .then((data) => {
        setResults(data.results || []);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError("Something went wrong. Please try again.");
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [debouncedQuery]);

  return { query, setQuery, results, isLoading, error, hasSearched, debouncedQuery };
}
