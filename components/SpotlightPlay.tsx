"use client";
import Link from "next/link";
import { Track } from "@/lib/types";
import { usePlayer } from "./PlayerProvider";
import Icon from "./Icon";

export default function SpotlightPlay({ track, queue }: { track: Track; queue: Track[] }) {
  const { play, togglePlay, track: current, isPlaying } = usePlayer();
  const active = current?.id === track.id;
  return (
    <div className="mt-7 flex flex-wrap gap-3">
      <button className="btn-aurora !px-8" onClick={() => (active ? togglePlay() : play(track, queue))}><Icon name={active && isPlaying ? "pause" : "play"} size={17} filled strokeWidth={1.4} />{active && isPlaying ? "Pause" : "Play now"}</button>
      <Link href={`/track/${track.id}`} className="btn-ghost">View track</Link>
    </div>
  );
}
