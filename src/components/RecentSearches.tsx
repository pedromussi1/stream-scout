"use client";

interface RecentSearchesProps {
  searches: string[];
  onSelect: (query: string) => void;
  onClear: () => void;
}

export function RecentSearches({
  searches,
  onSelect,
  onClear,
}: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 justify-center max-w-2xl mx-auto">
      <span className="text-xs text-muted">Recent:</span>
      {searches.map((search) => (
        <button
          key={search}
          onClick={() => onSelect(search)}
          className="text-xs px-3 py-1 rounded-full bg-card border border-border text-muted hover:text-foreground hover:border-accent/50 transition-colors"
        >
          {search}
        </button>
      ))}
      <button
        onClick={onClear}
        className="text-xs text-muted hover:text-red-400 transition-colors ml-1"
      >
        Clear
      </button>
    </div>
  );
}
