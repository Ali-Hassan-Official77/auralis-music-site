"use client";
import { Track } from "@/lib/types";
import { usePlayer } from "./PlayerProvider";
import Icon from "./Icon";
import Waveform from "./Waveform";
import { formatDuration } from "@/lib/format";

export default function TrackPageControls({ track, queue }: { track: Track; queue?: Track[] }) {
  const { play, togglePlay, seek, track: current, isPlaying, currentTime, duration, toggleLike, isLiked } = usePlayer();
  const active = current?.id === track.id;
  const liked = isLiked(track.id);
  const total = active && duration ? duration : track.duration;
  const progress = active && total ? Math.min(1, currentTime / total) : 0;
  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-3">
        <button className="btn-aurora !px-8" onClick={() => (active ? togglePlay() : play(track, queue))}><Icon name={active && isPlaying ? "pause" : "play"} size={17} filled strokeWidth={1.4} />{active && isPlaying ? "Pause" : "Play"}</button>
        <button className="btn-ghost" onClick={() => toggleLike(track)} aria-pressed={liked}><Icon name="heart" size={17} filled={liked} className={liked ? "text-[#FF7AC6]" : ""} />{liked ? "Saved" : "Save"}</button>
      </div>
      <div className="mt-8 rounded-3xl border border-white/[0.07] bg-panel/70 p-5 backdrop-blur">
        <Waveform id={track.id} count={72} height={72} progress={progress} onSeek={active ? (f) => seek(f * total) : undefined} />
        <div className="mt-3 flex justify-between text-[12px] tabular-nums text-dim"><span>{formatDuration(active ? currentTime : 0)}</span><span>{formatDuration(total)}</span></div>
      </div>
    </div>
  );
}
