"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "streamscout_recent_searches";
const MAX_ITEMS = 8;

export function useRecentSearches() {
  const [searches, setSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSearches(JSON.parse(stored));
    } catch {
      // SSR or localStorage unavailable
    }
  }, []);

  function addSearch(query: string) {
    const trimmed = query.trim();
    if (trimmed.length < 2) return;

    setSearches((prev) => {
      const filtered = prev.filter(
        (s) => s.toLowerCase() !== trimmed.toLowerCase()
      );
      const updated = [trimmed, ...filtered].slice(0, MAX_ITEMS);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }

  function clearSearches() {
    setSearches([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  return { searches, addSearch, clearSearches };
}
