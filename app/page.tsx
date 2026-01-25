import { Suspense } from "react";
import { StreamersList } from "@/components/features/streamers/streamers-list";
import { StreamersLoading } from "@/components/features/streamers/streamers-loading";
import { HighlightsList } from "@/components/features/highlights/highlights-list";
import { HighlightsLoading } from "@/components/features/highlights/highlights-loading";

export const revalidate = 60; // Revalidate every 60 seconds

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <main className="relative container mx-auto px-4 py-12 space-y-24">
        <section>
          <Suspense fallback={<StreamersLoading />}>
            <StreamersList />
          </Suspense>
        </section>

        <section>
          <Suspense fallback={<HighlightsLoading />}>
            <HighlightsList userId="530941879" />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
