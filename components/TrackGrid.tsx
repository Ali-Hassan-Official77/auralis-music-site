"use client";

import { Track } from "@/lib/types";
import TrackCard from "./TrackCard";

export default function TrackGrid({ tracks }: { tracks: Track[] }) {
  if (!tracks.length) return null;
  return (
    <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 sm:gap-2 xl:grid-cols-4 2xl:grid-cols-5">
      {tracks.map((track) => <TrackCard key={track.id} track={track} queue={tracks} />)}
    </div>
  );
}
