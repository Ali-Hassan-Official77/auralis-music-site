import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SafeImage from "@/components/SafeImage";
import { TrackRow } from "@/components/TrackCard";
import TrackPageControls from "@/components/TrackPageControls";
import { getTrack, getTrending } from "@/lib/audius";
import { formatDuration, formatPlays } from "@/lib/format";
export const runtime = 'edge';
export const revalidate = 120;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const track = await getTrack(id);
  if (!track) return { title: "Track not found" };
  return { title: `${track.title} — ${track.artist}`, description: `Listen to ${track.title} by ${track.artist} on Auralis.` };
}

export default async function TrackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const track = await getTrack(id);
  if (!track) notFound();
  const related = (await getTrending(track.genre).catch(() => [])).filter((t) => t.id !== track.id).slice(0, 8);
  const stats: [string, string][] = [
    ["Genre", track.genre || "Independent"],
    ["Mood", track.mood || "—"],
    ["Length", formatDuration(track.duration)],
    ["Plays", formatPlays(track.playCount)],
  ];

  return (
    <div>
      <section className="relative overflow-hidden">
        <SafeImage src={track.artwork} alt="" fill sizes="100vw" className="scale-150 object-cover opacity-25 blur-[80px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/20 via-night/60 to-night" />
        <div className="relative grid gap-8 px-5 pb-10 pt-10 sm:px-8 sm:pt-14 md:grid-cols-[300px_1fr] md:items-end lg:gap-12">
          <div className="relative mx-auto aspect-square w-full max-w-[300px] overflow-hidden rounded-[2rem] shadow-[0_40px_90px_-25px_rgba(0,0,0,.95)]"><SafeImage src={track.artwork} alt={`${track.title} cover art`} fill sizes="300px" className="object-cover" priority /></div>
          <div className="min-w-0">
            <p className="eyebrow">{track.genre || "Independent"}</p>
            <h1 className="h1 mt-2 break-words text-[clamp(32px,5.4vw,72px)]">{track.title}</h1>
            <p className="mt-3 text-[18px] text-dim">{track.artist}</p>
            <TrackPageControls track={track} queue={[track, ...related]} />
          </div>
        </div>
      </section>

      <div className="space-y-12 px-5 pb-6 sm:px-8">
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map(([k, v]) => <div key={k} className="card p-5"><p className="text-[12px] font-medium text-dim">{k}</p><p className="mt-1 truncate font-display text-[22px] font-semibold tracking-[-.02em]">{v}</p></div>)}
        </section>
        {(track.description || (track.tags && track.tags.length > 0)) && (
          <section className="card max-w-3xl p-6">
            <h2 className="font-display text-[20px] font-semibold tracking-[-.02em]">About this track</h2>
            {track.description && <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-dim">{track.description}</p>}
            {track.tags && track.tags.length > 0 && <ul className="mt-4 flex flex-wrap gap-2">{track.tags.slice(0, 8).map((t) => <li key={t} className="rounded-full bg-white/[0.06] px-3 py-1 text-[12px] text-dim">#{t.trim()}</li>)}</ul>}
          </section>
        )}
        {related.length > 0 && (
          <section>
            <p className="eyebrow">Keep listening</p><h2 className="h2 mt-1">More like this</h2>
            <div className="mt-4 grid gap-x-8 lg:grid-cols-2">{related.map((t, i) => <TrackRow key={t.id} track={t} index={i + 1} queue={related} />)}</div>
          </section>
        )}
      </div>
    </div>
  );
}
