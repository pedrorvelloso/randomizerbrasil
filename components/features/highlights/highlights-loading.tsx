export function HighlightsLoading() {
  return (
    <>
      {/* Section header matching the loaded state */}
      <div className="mb-10 relative">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-syne">
          Assista mais de <span className="text-brand-cyan">Rando Brasil</span>
        </h2>
      </div>

      {/* Cards grid matching the loaded state */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="block h-full overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm animate-pulse"
          >
            {/* Image skeleton */}
            <div className="relative aspect-video bg-muted/50" />

            {/* Content skeleton */}
            <div className="p-4 relative space-y-3">
              {/* Name skeleton */}
              <div className="h-5 bg-muted/50 rounded w-2/3" />

              {/* Title skeleton */}
              <div className="h-4 bg-muted/50 rounded w-full" />

              {/* Views skeleton */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-muted/50 rounded" />
                <div className="h-3 bg-muted/50 rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
