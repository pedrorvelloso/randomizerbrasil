import Link from "next/link";
import Image from "next/image";
import { Play, Eye } from "lucide-react";
import type { VideoData } from "@/lib/twitch/types";

interface VodCardProps {
  video: VideoData;
  priority?: boolean;
}

function formatDuration(duration: string): string {
  // Duration format: "1h2m3s" or "2m30s" or "45s"
  const hours = duration.match(/(\d+)h/);
  const minutes = duration.match(/(\d+)m/);
  const seconds = duration.match(/(\d+)s/);

  const h = hours ? parseInt(hours[1]) : 0;
  const m = minutes ? parseInt(minutes[1]) : 0;
  const s = seconds ? parseInt(seconds[1]) : 0;

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function formatViewCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

export function VodCard({ video, priority = false }: VodCardProps) {
  const duration = formatDuration(video.duration);
  const views = formatViewCount(video.viewCount);

  return (
    <Link
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-accent/30 hover:bg-card hover:shadow-[0_0_20px_rgba(0,229,255,0.1)]"
    >
      <div className="relative overflow-hidden bg-muted aspect-video">
        {/* Image */}
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
          priority={priority}
        />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/90 backdrop-blur-sm px-2.5 py-1 font-mono text-xs font-medium text-white border border-white/10 rounded-md">
          {duration}
        </div>

        {/* Play icon overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-brand-cyan/90 backdrop-blur-sm flex items-center justify-center border-2 border-white/20 shadow-lg opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300" style={{ willChange: 'transform, opacity' }}>
            <Play className="w-8 h-8 text-background fill-background ml-1" />
          </div>
        </div>
      </div>

      <div className="p-4 relative">
        <h3 className="mb-1 font-bold text-foreground group-hover:text-accent transition-colors font-syne line-clamp-1">
          {video.displayName}
        </h3>
        <p className="text-sm line-clamp-1 mb-2 text-foreground/80 font-dm-sans" title={video.title}>
          {video.title}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <Eye className="w-3 h-3" />
          <span>{views}</span>
        </div>
      </div>
    </Link>
  );
}
