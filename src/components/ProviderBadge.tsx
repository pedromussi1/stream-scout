import Image from "next/image";
import type { Provider } from "@/types/tmdb";
import { providerLogoUrl } from "@/lib/constants";

interface ProviderBadgeProps {
  provider: Provider;
}

export function ProviderBadge({ provider }: ProviderBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 group" title={provider.provider_name}>
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-card-hover border border-border group-hover:border-accent/50 transition-colors">
        <Image
          src={providerLogoUrl(provider.logo_path)}
          alt={provider.provider_name}
          width={56}
          height={56}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-[10px] sm:text-xs text-muted text-center leading-tight max-w-[56px] truncate">
        {provider.provider_name}
      </span>
    </div>
  );
}
