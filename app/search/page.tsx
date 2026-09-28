"use client";

import { FormEvent, Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import TrackGrid from "@/components/TrackGrid";
import Icon from "@/components/Icon";
import { EmptyOrbit } from "@/components/Art";
import { Track } from "@/lib/types";
export const runtime = 'edge';
const genres = ["All", "Electronic", "Hip-Hop/Rap", "Pop", "R&B", "Lo-Fi", "House", "Rock", "Jazz"];

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="px-5 py-14 sm:px-8"><div className="h-11 w-64 animate-pulse rounded-2xl bg-panel" /></div>}>
      <SearchInner />
    </Suspense>
  );
}

function SearchInner() {
  const params = useSearchParams();
  const router = useRouter();
  const urlQuery = params.get("q") || "";
  const urlGenre = params.get("genre") || "";
  const inputRef = useRef<HTMLInputElement>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  useEffect(() => {
    const q = urlQuery.trim();
    const genre = urlGenre.trim();
    if (!q && !genre) { setTracks([]); setStatus("idle"); return; }
    const controller = new AbortController();
    setStatus("loading");
    (async () => {
      try {
        const endpoint = q ? `/api/audius/search?q=${encodeURIComponent(q)}` : `/api/audius/trending?genre=${encodeURIComponent(genre)}`;
        const res = await fetch(endpoint, { signal: controller.signal, cache: "no-store" });
        if (!res.ok) throw new Error("Search failed");
        const data = await res.json();
        if (controller.signal.aborted) return;
        setTracks(Array.isArray(data.tracks) ? data.tracks : []);
        setStatus("done");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (!controller.signal.aborted) { setTracks([]); setStatus("error"); }
      }
    })();
    return () => controller.abort();
  }, [urlQuery, urlGenre]);

  function submit(e: FormEvent) {
    e.preventDefault();
    const q = inputRef.current?.value.trim() || "";
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }
  const chooseGenre = (v: string) => router.push(v === "All" ? "/search" : `/search?genre=${encodeURIComponent(v)}`);
  const selected = urlGenre || "All";
  const heading = urlGenre ? urlGenre : urlQuery ? `Results for “${urlQuery}”` : "Explore";

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <p className="eyebrow px-1">{urlQuery ? "Search" : urlGenre ? "Genre" : "Catalogue"}</p>
      <h1 className="h1 mt-2 break-words px-1 text-[clamp(34px,5vw,60px)]">{heading}</h1>

      <form onSubmit={submit} role="search" className="glass mt-7 flex max-w-2xl items-center rounded-full p-1.5 pl-5 transition focus-within:border-mint/50">
        <Icon name="search" size={19} className="shrink-0 text-dim" />
        <input ref={inputRef} key={urlQuery} defaultValue={urlQuery} placeholder="Songs, artists, genres…" aria-label="Search music" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-[15px] outline-none placeholder:text-dim/70" />
        <button type="submit" className="btn-aurora !py-3">Search</button>
      </form>

      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by genre">
        {genres.map((g) => <button type="button" key={g} onClick={() => chooseGenre(g)} aria-pressed={selected === g} className={`pill ${selected === g ? "selected" : ""}`}>{g}</button>)}
      </div>

      <div className="mt-9">
        {status === "idle" && (
          <div className="flex flex-col items-center py-16 text-center"><EmptyOrbit className="h-28 w-28" /><p className="mt-5 font-display text-[26px] font-semibold tracking-[-.03em]">What are you in the mood for?</p><p className="mt-2 text-[14.5px] text-dim">Search an artist or title, or pick a genre above.</p></div>
        )}
        {status === "loading" && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" aria-busy="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="animate-pulse p-2.5"><div className="aspect-square rounded-2xl bg-panel" /><div className="mt-3 h-3.5 w-3/4 rounded-full bg-panel" /><div className="mt-2 h-3 w-1/2 rounded-full bg-panel" /></div>
            ))}
          </div>
        )}
        {status === "error" && <div className="py-16 text-center"><p className="font-display text-[26px] font-semibold">Signal lost.</p><p className="mt-2 text-[14.5px] text-dim">The catalogue didn&rsquo;t respond. Try again in a moment.</p></div>}
        {status === "done" && !tracks.length && <div className="py-16 text-center"><p className="font-display text-[26px] font-semibold">No matches.</p><p className="mt-2 text-[14.5px] text-dim">Try a broader title, another artist, or a different genre.</p></div>}
        {status === "done" && tracks.length > 0 && <TrackGrid tracks={tracks} />}
      </div>
    </div>
  );
}
