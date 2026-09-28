"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TrackGrid from "@/components/TrackGrid";
import { getLikedTracksFromStorage, usePlayer } from "@/components/PlayerProvider";
import { EmptyOrbit } from "@/components/Art";
import { Track } from "@/lib/types";
export const runtime = 'edge';
export default function LibraryPage() {
  const { likedIds } = usePlayer();
  const [tracks, setTracks] = useState<Track[]>([]);
  useEffect(() => {
    const load = () => setTracks(getLikedTracksFromStorage().filter((t) => likedIds.includes(t.id)));
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, [likedIds]);

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.07] bg-panel p-7 sm:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet/30 blur-[80px]" />
        <p className="eyebrow relative">Saved on this device</p>
        <h1 className="h1 relative mt-2 text-[clamp(36px,5.5vw,64px)]">Your <span className="grad-text">Library</span></h1>
        <p className="relative mt-3 text-[15px] text-dim">{tracks.length} saved track{tracks.length === 1 ? "" : "s"}</p>
      </div>
      <section className="mt-8">
        {tracks.length ? <TrackGrid tracks={tracks} /> : (
          <div className="mx-auto flex max-w-sm flex-col items-center py-14 text-center"><EmptyOrbit className="h-28 w-28" /><p className="mt-5 font-display text-[26px] font-semibold tracking-[-.03em]">Nothing saved yet.</p><p className="mt-2 text-[14.5px] leading-7 text-dim">Tap the heart on any track and it will show up here, stored privately in this browser.</p><Link href="/search" className="btn-aurora mt-6">Explore music</Link></div>
        )}
      </section>
    </div>
  );
}
