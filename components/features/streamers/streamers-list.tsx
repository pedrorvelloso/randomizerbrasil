import Link from "next/link";
import { getCachedStreamers } from "@/lib/twitch/cached";
import { StreamerCard } from "./streamer-card";

export async function StreamersList() {
  const streamers = await getCachedStreamers();

  return (
    <>
      <div className="mb-10 relative flex items-start justify-between gap-4">
        <div className="inline-flex items-center gap-4 relative">
          {streamers.length > 0 ? (
            <div className="relative">
              <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse-glow" />
              <div className="absolute inset-0 w-4 h-4 rounded-full bg-red-500 animate-ping" />
            </div>
          ) : (
            <div className="w-4 h-4 rounded-full bg-muted-foreground/40" />
          )}
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight font-syne uppercase bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
            Ao Vivo
          </h2>
          <div className="hidden md:block w-32 h-1 bg-gradient-to-r from-brand-cyan to-transparent rounded-full" />
        </div>
      </div>

      {streamers.length === 0 ? (
        <div className="relative border-2 border-dashed border-border rounded-2xl p-12 text-center min-h-[300px] flex flex-col items-center justify-center gap-4">
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-brand-cyan/30" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-brand-cyan/30" />
          <p className="text-muted-foreground text-lg font-dm-sans">
            Nenhum streamer ao vivo no momento com jogos randomizados.
          </p>
          <p className="text-sm text-muted-foreground/80 max-w-md">
            Quer aparecer aqui?{" "}
            <Link
              href="/about#aparecer-na-lista"
              className="text-brand-cyan hover:text-brand-cyan-light underline decoration-brand-cyan/30 hover:decoration-brand-cyan transition-colors font-medium"
            >
              Saiba como registrar sua stream
            </Link>
            {" "}na lista de streamers da comunidade.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {streamers.map((streamer, index) => (
            <StreamerCard key={streamer.id} streamer={streamer} priority={index < 4} />
          ))}
        </div>
      )}
    </>
  );
}
