import Link from "next/link";
import Image from "next/image";
import { Eye } from "lucide-react";
import { Streamer } from "@/lib/types";

interface StreamerCardProps {
  streamer: Streamer;
  priority?: boolean;
}

export function StreamerCard({ streamer, priority = false }: StreamerCardProps) {
  return (
    <Link
      href={streamer.twitchUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full overflow-hidden rounded-2xl border-2 border-border bg-card transition-all duration-300 hover:scale-[1.02] hover:border-brand-cyan/50 hover:shadow-[0_0_30px_rgba(0,217,255,0.15)]"
    >
      <div className="relative overflow-hidden bg-muted aspect-video">
        {/* Image */}
        <Image
          src={streamer.thumbnailUrl}
          alt={`${streamer.displayName} stream`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Viewer count */}
        <div className="absolute top-3 left-3 bg-black/90 backdrop-blur-sm px-3 py-1.5 font-mono text-xs font-medium text-white border border-white/10 rounded-lg flex items-center gap-1.5">
          <Eye className="w-3 h-3" />
          {streamer.viewerCount.toLocaleString()}
        </div>

        {/* Duration (computed server-side in Twitch mapping) */}
        <div className="absolute top-3 right-3 bg-black/90 backdrop-blur-sm px-3 py-1.5 font-mono text-xs font-medium text-white border border-white/10 rounded-lg">
          {streamer.liveDuration}
        </div>

      </div>

      <div className="p-4 relative">
        <h3 className="mb-1 font-bold text-foreground group-hover:text-brand-cyan transition-colors font-syne">
          {streamer.displayName}
        </h3>
        <p className="text-sm line-clamp-1 mb-2 text-foreground/90 font-dm-sans" title={streamer.streamTitle}>
          {streamer.streamTitle}
        </p>
        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wide line-clamp-1" title={streamer.gameName}>
          {streamer.gameName}
        </p>
      </div>
    </Link>
  );
}
