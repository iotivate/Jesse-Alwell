import Image from "next/image";
import { cn } from "@/lib/utils";
import type { WorkImage as WorkImageType } from "@/lib/content/types";
import { urlFor } from "@/sanity/image";

// Deterministic gradient from the slug — looks intentional, not random.
function gradientFor(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  const hue1 = Math.abs(h) % 60;
  const hue2 = (Math.abs(h) % 30) + 200;
  return `linear-gradient(135deg, oklch(0.45 0.12 ${20 + hue1}) 0%, oklch(0.22 0.03 ${hue2}) 100%)`;
}

type Props = {
  image: WorkImageType;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function WorkImage({ image, className, priority, sizes }: Props) {
  if (image.kind === "placeholder") {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className={cn(
          "relative w-full h-full bg-ink-700 overflow-hidden",
          className,
        )}
        style={{ background: gradientFor(image.seed) }}
      >
        <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.4),transparent_60%)]" />
      </div>
    );
  }

  // Sanity image — let Sanity's CDN do resizing, hand off to next/image for
  // loading/srcset behavior.
  const url = urlFor(image.asset).auto("format").fit("max").url();

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <Image
        src={url}
        alt={image.alt}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
