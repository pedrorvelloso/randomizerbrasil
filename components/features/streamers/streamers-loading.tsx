export function StreamersLoading() {
  return (
    <>
      {/* Section header matching the loaded state */}
      <div className="mb-10 relative">
        <div className="inline-flex items-center gap-4 relative">
          <div className="w-4 h-4 rounded-full bg-muted animate-pulse" />
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight font-syne uppercase bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
            Ao Vivo
          </h2>
          <div className="hidden md:block w-32 h-1 bg-gradient-to-r from-brand-cyan/50 to-transparent rounded-full animate-pulse" />
        </div>
      </div>

      {/* Cards grid matching the loaded state - show 1 row at each breakpoint */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`h-full overflow-hidden rounded-2xl border-2 border-border bg-card animate-pulse ${
              i === 1 ? "hidden sm:block" : ""
            }${i === 2 ? "hidden lg:block" : ""}${i === 3 ? "hidden xl:block" : ""}`}
          >
            {/* Image skeleton */}
            <div className="relative aspect-video bg-muted/50" />

            {/* Content skeleton */}
            <div className="p-4 relative space-y-3">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-muted/20" />

              {/* Name skeleton */}
              <div className="h-5 bg-muted/50 rounded w-2/3" />

              {/* Title skeleton */}
              <div className="h-4 bg-muted/50 rounded w-full" />

              {/* Game name skeleton */}
              <div className="h-3 bg-muted/50 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
