import Link from "next/link";
import { Track } from "@/lib/types";
import TrackCard from "./TrackCard";
import Icon from "./Icon";

export default function TrackRail({ title, eyebrow, tracks, href }: { title: string; eyebrow?: string; tracks: Track[]; href?: string }) {
  if (!tracks.length) return null;
  return (
    <section className="animate-rise">
      <div className="mb-3 flex items-end justify-between gap-4 px-5 sm:px-8">
        <div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2 className="h2 mt-1">{title}</h2></div>
        {href && <Link href={href} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium text-dim transition hover:bg-white/[0.05] hover:text-snow">Show all <Icon name="arrow" size={14} /></Link>}
      </div>
      <div className="no-scrollbar flex snap-x gap-1 overflow-x-auto px-3 pb-2 sm:px-6">
        {tracks.map((t) => <div key={t.id} className="w-[168px] shrink-0 snap-start sm:w-[196px]"><TrackCard track={t} queue={tracks} /></div>)}
      </div>
    </section>
  );
}
