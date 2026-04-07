"use client";

import { useEffect, useState } from "react";
import type { CountryProviders } from "@/types/tmdb";
import { ProviderBadge } from "./ProviderBadge";

interface ProviderListProps {
  movieId: number;
}

function ProviderSection({
  title,
  providers,
  accent,
}: {
  title: string;
  providers: CountryProviders["flatrate"];
  accent?: boolean;
}) {
  if (!providers || providers.length === 0) return null;

  return (
    <div>
      <h4
        className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
          accent ? "text-accent" : "text-muted"
        }`}
      >
        {title}
      </h4>
      <div className="flex flex-wrap gap-3">
        {providers.map((p) => (
          <ProviderBadge key={p.provider_id} provider={p} />
        ))}
      </div>
    </div>
  );
}

export function ProviderList({ movieId }: ProviderListProps) {
  const [providers, setProviders] = useState<CountryProviders | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`/api/movie/${movieId}/providers`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setProviders(data.providers);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Could not load streaming info.");
        setIsLoading(false);
      });
  }, [movieId]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 py-4">
        <div className="w-4 h-4 border-2 border-muted border-t-accent rounded-full animate-spin" />
        <span className="text-sm text-muted">Loading streaming info...</span>
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-red-400 py-4">{error}</p>;
  }

  const hasAny =
    providers &&
    ((providers.flatrate && providers.flatrate.length > 0) ||
      (providers.rent && providers.rent.length > 0) ||
      (providers.buy && providers.buy.length > 0) ||
      (providers.free && providers.free.length > 0));

  if (!hasAny) {
    return (
      <p className="text-sm text-muted py-4">
        Not currently available on any US streaming service.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <ProviderSection title="Stream" providers={providers!.flatrate} accent />
      <ProviderSection title="Free" providers={providers!.free} accent />
      <ProviderSection title="Rent" providers={providers!.rent} />
      <ProviderSection title="Buy" providers={providers!.buy} />
      {providers!.link && (
        <a
          href={providers!.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-xs text-muted hover:text-accent transition-colors mt-2"
        >
          View on JustWatch →
        </a>
      )}
    </div>
  );
}
