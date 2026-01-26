import { VodCard } from "./vod-card";
import { getCachedHighlights } from "@/lib/twitch/cached";

interface HighlightsListProps {
  userId: string;
}

export async function HighlightsList({ userId }: HighlightsListProps) {
  const highlights = await getCachedHighlights(userId, 8).catch((error) => {
    console.error('Error fetching highlights:', error);
    return [];
  });

  if (highlights.length === 0) {
    return null;
  }

  return (
    <>
      {/* Section header with editorial styling */}
      <div className="mb-10 relative">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-syne">
          Assista mais de <span className="text-brand-cyan">Rando Brasil</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {highlights.map((video, index) => (
          <VodCard key={video.id} video={video} priority={index < 4} />
        ))}
      </div>
    </>
  );
}
