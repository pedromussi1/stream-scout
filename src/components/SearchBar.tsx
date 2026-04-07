"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  isLoading: boolean;
}

export function SearchBar({ value, onChange, isLoading }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for a movie..."
        className="w-full h-14 pl-12 pr-12 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted text-lg outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
        autoFocus
      />
      {isLoading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="w-5 h-5 border-2 border-muted border-t-accent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
