"use client";

import { useEffect, useState, startTransition } from "react";
import Link from "next/link";
import { Pause, Play } from "lucide-react";
import type { StreamerData } from "@/lib/twitch/types";
import { StreamerCard } from "./streamer-card";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface StreamersAutoRefreshProps {
  initialData: StreamerData[];
  refreshInterval?: number;
  showHeader?: boolean;
}

export function StreamersAutoRefresh({
  initialData,
  refreshInterval = 60000, // 60 seconds default
  showHeader = true,
}: StreamersAutoRefreshProps) {
  const [streamers, setStreamers] = useState(initialData);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState<boolean | undefined>(undefined);

  // Initialize auto-refresh preference from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('autoRefresh');
    startTransition(() => {
      setAutoRefreshEnabled(stored === 'true'); // Default to false
    });
  }, []);

  // Toggle auto-refresh and persist preference
  const toggleAutoRefresh = () => {
    const newValue = !autoRefreshEnabled;
    startTransition(() => {
      setAutoRefreshEnabled(newValue);
    });
    localStorage.setItem('autoRefresh', String(newValue));
  };

  useEffect(() => {
    // Don't start polling until we know the user's preference
    if (autoRefreshEnabled === undefined || !autoRefreshEnabled) return;

    const fetchStreamers = async () => {
      // Skip if tab is not visible
      if (document.hidden) return;

      try {
        const res = await fetch('/api/streamers');
        if (!res.ok) return; // Silently fail, keep showing last data

        const json = await res.json();
        if (json.success && json.data) {
          startTransition(() => {
            setStreamers(json.data);
          });
        }
      } catch (error) {
        // Silently fail, keep showing last data
        console.error('Failed to refresh streamers:', error);
      }
    };

    const interval = setInterval(fetchStreamers, refreshInterval);

    // Also listen for visibility changes to resume polling when tab becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchStreamers();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [refreshInterval, autoRefreshEnabled]);

  return (
    <>
      {showHeader && (
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

          {autoRefreshEnabled !== undefined && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleAutoRefresh}
                  aria-pressed={autoRefreshEnabled}
                  aria-label={autoRefreshEnabled ? 'Pausar atualização automática' : 'Ativar atualização automática'}
                  className={`mt-2 flex items-center justify-center p-2 rounded-lg border transition-colors cursor-pointer ${
                    autoRefreshEnabled
                      ? 'border-emerald-600/60 text-emerald-600/90 bg-emerald-600/5 hover:bg-emerald-600/10'
                      : 'border-border/40 text-muted-foreground bg-card/30 hover:bg-card/80 hover:text-foreground'
                  }`}
                >
                  {autoRefreshEnabled ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" sideOffset={8}>
                {autoRefreshEnabled ? 'Pausar atualização da lista' : 'Retomar atualização da lista (a cada 60s)'}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      )}

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
