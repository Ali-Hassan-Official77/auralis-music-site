"use client";
import type { CSSProperties } from "react";
import Link from "next/link";
import { usePlayer } from "./PlayerProvider";
import { formatDuration } from "@/lib/format";
import Icon from "./Icon";
import SafeImage from "./SafeImage";
import Waveform from "./Waveform";

export default function PlayerBar() {
  const { track, isPlaying, currentTime, duration, volume, togglePlay, seek, setVolume, next, prev, isLiked, toggleLike } = usePlayer();
  if (!track) return null;
  const progress = duration > 0 ? Math.min(1, currentTime / duration) : 0;
  const liked = isLiked(track.id);
  return (
    <div className="fixed inset-x-2 bottom-[62px] z-40 lg:bottom-4 lg:left-[264px] lg:right-4" role="region" aria-label="Player">
      <div className="glass overflow-hidden rounded-3xl shadow-[0_24px_60px_-20px_rgba(0,0,0,.9)]">
        <div className="flex items-center gap-3 p-2.5 pr-3 sm:gap-5 sm:p-3 sm:pr-5">
          <Link href={`/track/${track.id}`} className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl sm:h-14 sm:w-14"><SafeImage src={track.artwork} alt="" fill sizes="56px" className="object-cover" /></Link>
          <div className="min-w-0 flex-1 md:w-52 md:flex-none">
            <p className="truncate text-[14px] font-semibold">{track.title}</p>
            <p className="truncate text-[12.5px] text-dim">{track.artist}</p>
          </div>
          <div className="hidden min-w-0 flex-1 flex-col items-center gap-1.5 md:flex">
            <div className="flex items-center gap-2">
              <button onClick={prev} aria-label="Previous track" className="grid h-9 w-9 place-items-center rounded-full text-dim transition hover:text-snow"><Icon name="prev" size={18} /></button>
              <button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className="grid h-11 w-11 place-items-center rounded-full bg-snow text-night transition hover:scale-105"><Icon name={isPlaying ? "pause" : "play"} size={17} filled strokeWidth={1.2} /></button>
              <button onClick={next} aria-label="Next track" className="grid h-9 w-9 place-items-center rounded-full text-dim transition hover:text-snow"><Icon name="next" size={18} /></button>
            </div>
            <div className="flex w-full max-w-[640px] items-center gap-3 text-[11px] tabular-nums text-dim">
              <span className="w-9 text-right">{formatDuration(currentTime)}</span>
              <Waveform id={track.id} count={64} height={26} progress={progress} onSeek={(f) => seek(f * (duration || 0))} className="flex-1" />
              <span className="w-9">{formatDuration(duration)}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 md:w-52 md:justify-end">
            <button onClick={() => toggleLike(track)} aria-pressed={liked} aria-label={liked ? "Remove from Library" : "Save to Library"} className={`grid h-9 w-9 place-items-center rounded-full ${liked ? "text-[#FF7AC6]" : "text-dim hover:text-snow"}`}><Icon name="heart" size={17} filled={liked} /></button>
            <button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className="grid h-11 w-11 place-items-center rounded-full bg-snow text-night md:hidden"><Icon name={isPlaying ? "pause" : "play"} size={17} filled strokeWidth={1.2} /></button>
            <span className="ml-2 hidden text-dim xl:block"><Icon name="volume" size={16} /></span>
            <input aria-label="Volume" className="vol hidden w-20 xl:block" style={{ "--value": `${volume * 100}%` } as CSSProperties} type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
          </div>
        </div>
        <div className="h-[3px] bg-white/10 md:hidden"><div className="h-full bg-aurora" style={{ width: `${progress * 100}%` }} /></div>
      </div>
    </div>
  );
}
