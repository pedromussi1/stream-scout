"use client";

import { useState } from "react";
import type { Movie } from "@/types/tmdb";

interface ShareButtonProps {
  movie: Movie;
}

export function ShareButton({ movie }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const year = movie.release_date?.split("-")[0] || "";
  const shareText = `${movie.title}${year ? ` (${year})` : ""} — found on StreamScout`;

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({ title: movie.title, text: shareText });
      } else {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // User cancelled share or clipboard failed
    }
  }

  return (
    <button
      onClick={handleShare}
      className="text-muted hover:text-foreground transition-colors p-1 relative"
      title="Share"
    >
      {copied ? (
        <span className="text-xs text-accent font-medium">Copied!</span>
      ) : (
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
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      )}
    </button>
  );
}
