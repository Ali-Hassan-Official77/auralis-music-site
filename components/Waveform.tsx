"use client";

import type { KeyboardEvent, MouseEvent } from "react";

export function makeBars(id: string, count = 48): number[] {
  let h = 2166136261;

  for (const c of id) {
    h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  }

  const out: number[] = [];

  for (let i = 0; i < count; i++) {
    h = (Math.imul(h, 1664525) + 1013904223) >>> 0;

    const r = (h >>> 8) / 16777216;

    const env =
      Math.sin((i / Math.max(1, count - 1)) * Math.PI) * 0.4 + 0.5;

    const value = r * 0.75 * env + 0.28 * env;

    out.push(Math.max(0.14, Math.min(1, value)));
  }

  return out;
}

type WaveformProps = {
  id: string;
  progress?: number;
  count?: number;
  height?: number;
  onSeek?: (fraction: number) => void;
  className?: string;
};

export default function Waveform({
  id,
  progress = 0,
  count = 48,
  height = 40,
  onSeek,
  className = "",
}: WaveformProps) {
  const bars = makeBars(id, count);
  const interactive = Boolean(onSeek);

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (!onSeek) return;

    const rect = event.currentTarget.getBoundingClientRect();

    if (rect.width <= 0) {
      return;
    }

    const fraction = (event.clientX - rect.left) / rect.width;

    onSeek(Math.max(0, Math.min(1, fraction)));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!onSeek) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      onSeek(Math.min(1, progress + 0.03));
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onSeek(Math.max(0, progress - 0.03));
    }
  }

  return (
    <div
      className={`flex items-center gap-[2px] ${
        interactive ? "cursor-pointer" : ""
      } ${className}`}
      style={{
        height: `${height}px`,
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={interactive ? "slider" : "img"}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? "Seek" : "Waveform"}
      aria-valuemin={interactive ? 0 : undefined}
      aria-valuemax={interactive ? 100 : undefined}
      aria-valuenow={
        interactive ? Math.round(progress * 100) : undefined
      }
    >
      {bars.map((bar, index) => {
        const isPlayed = index / count < progress;

        const barHeight = `${(bar * 100).toFixed(4)}%`;

        return (
          <span
            key={`${id}-${index}`}
            className={`flex-1 rounded-full transition-colors ${
              isPlayed ? "bg-mint" : "bg-white/[0.16]"
            }`}
            style={{
              height: barHeight,
              minWidth: "2px",
            }}
          />
        );
      })}
    </div>
  );
}