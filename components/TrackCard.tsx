"use client";

import Link from "next/link";
import { Track } from "@/lib/types";
import { formatDuration } from "@/lib/format";
import { usePlayer } from "./PlayerProvider";
import Icon from "./Icon";
import SafeImage from "./SafeImage";
import Waveform from "./Waveform";

export default function TrackCard({ track, queue }: { track: Track; queue?: Track[] }) {
  const { play, togglePlay, track: current, isPlaying, toggleLike, isLiked } = usePlayer();
  const active = current?.id === track.id;
  const liked = isLiked(track.id);
  return (
    <article className="group w-full rounded-3xl border border-transparent p-2.5 transition duration-300 hover:border-white/[0.08] hover:bg-panel">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-panel-2 shadow-[0_18px_40px_-20px_rgba(0,0,0,.9)]">
        <Link href={`/track/${track.id}`} aria-label={`Open ${track.title}`} className="absolute inset-0 z-[1]" />
        <SafeImage src={track.artwork} alt={track.title} fill sizes="(max-width:640px) 44vw, 220px" className="object-cover transition duration-500 group-hover:scale-[1.05]" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
        {active && isPlaying && <span className="absolute left-2.5 top-2.5 z-[2] inline-flex items-end gap-[3px] rounded-full bg-night/70 px-2.5 py-2 backdrop-blur" aria-label="Playing"><i className="eq-bar" /><i className="eq-bar d1" /><i className="eq-bar d2" /></span>}
        <button type="button" onClick={() => toggleLike(track)} aria-pressed={liked} aria-label={liked ? `Remove ${track.title} from Library` : `Save ${track.title} to Library`} className={`absolute right-2.5 top-2.5 z-[2] grid h-9 w-9 place-items-center rounded-full bg-night/60 backdrop-blur transition ${liked ? "text-[#FF7AC6]" : "text-snow opacity-100 sm:opacity-0 sm:group-hover:opacity-100"}`}><Icon name="heart" size={16} filled={liked} /></button>
        <button type="button" onClick={() => (active ? togglePlay() : play(track, queue))} aria-label={active && isPlaying ? `Pause ${track.title}` : `Play ${track.title}`} className="absolute bottom-2.5 right-2.5 z-[2] grid h-12 w-12 place-items-center rounded-full bg-aurora text-night shadow-[0_8px_24px_-6px_rgba(92,242,192,.6)] transition hover:scale-105 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"><Icon name={active && isPlaying ? "pause" : "play"} size={18} filled strokeWidth={1.4} /></button>
      </div>
      <div className="mt-3 px-1">
        <Link href={`/track/${track.id}`} className="block truncate text-[15px] font-semibold tracking-[-.01em] transition hover:text-mint">{track.title}</Link>
        <p className="mt-0.5 truncate text-[13px] text-dim">{track.artist}</p>
        <div className="mt-3 flex items-center gap-3"><Waveform id={track.id} count={26} height={18} progress={active ? 1 : 0} className="flex-1 opacity-80" /><span className="text-[11px] tabular-nums text-dim">{formatDuration(track.duration)}</span></div>
      </div>
    </article>
  );
}

export function TrackRow({ track, index, queue }: { track: Track; index: number; queue?: Track[] }) {
  const { play, togglePlay, track: current, isPlaying, toggleLike, isLiked } = usePlayer();
  const active = current?.id === track.id;
  const liked = isLiked(track.id);
  return (
    <div className={`group flex items-center gap-3 rounded-2xl px-2.5 py-2 transition hover:bg-white/[0.05] ${active ? "bg-white/[0.06]" : ""}`}>
      <button type="button" onClick={() => (active ? togglePlay() : play(track, queue))} aria-label={active && isPlaying ? `Pause ${track.title}` : `Play ${track.title}`} className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
        <SafeImage src={track.artwork} alt="" fill sizes="48px" className="object-cover" />
        <span className={`absolute inset-0 grid place-items-center bg-night/60 text-snow transition ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}><Icon name={active && isPlaying ? "pause" : "play"} size={16} filled strokeWidth={1.2} /></span>
      </button>
      <span className="w-5 shrink-0 text-center text-[12px] tabular-nums text-dim">{index}</span>
      <Link href={`/track/${track.id}`} className="min-w-0 flex-1">
        <p className={`truncate text-[14px] font-semibold ${active ? "text-mint" : ""}`}>{track.title}</p>
        <p className="truncate text-[12.5px] text-dim">{track.artist}</p>
      </Link>
      <button type="button" onClick={() => toggleLike(track)} aria-pressed={liked} aria-label={liked ? "Remove from Library" : "Save to Library"} className={`grid h-8 w-8 place-items-center rounded-full ${liked ? "text-[#FF7AC6]" : "text-dim hover:text-snow"}`}><Icon name="heart" size={16} filled={liked} /></button>
      <span className="hidden w-10 text-right text-[12px] tabular-nums text-dim sm:block">{formatDuration(track.duration)}</span>
    </div>
  );
}
