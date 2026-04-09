"use client";

import { STREAMING_SERVICES } from "@/lib/provider-filters";

interface ServiceFilterProps {
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

export function ServiceFilter({ selectedId, onSelect }: ServiceFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap justify-center max-w-4xl mx-auto">
      {STREAMING_SERVICES.map((service) => (
        <button
          key={service.id}
          onClick={() =>
            onSelect(selectedId === service.id ? null : service.id)
          }
          className={`text-xs sm:text-sm px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
            selectedId === service.id
              ? "bg-accent text-background font-medium"
              : "bg-card border border-border text-muted hover:border-accent/50 hover:text-foreground"
          }`}
        >
          {service.shortName}
        </button>
      ))}
    </div>
  );
}
