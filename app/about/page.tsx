import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import FAQ from "@/components/FAQ";
export const runtime = 'edge';

export const metadata: Metadata = { title: "About", description: "The idea behind Auralis, and how it works." };

const values = [
  { icon: "compass" as const, title: "Discovery first", text: "Search, genres and trending are one connected surface, so finding something new never takes more than a tap." },
  { icon: "headphones" as const, title: "Uninterrupted listening", text: "One persistent player. Browse the whole product without ever losing your place in a track." },
  { icon: "shield" as const, title: "Private by default", text: "No account and no tracking profile. Your Library is stored on your own device." },
];
const roadmap = ["Artist pages with richer release presentation", "Editorial collections and curated playlists", "Sync for your Library across devices", "More catalogue sources over time"];

export default function AboutPage() {
  return (
    <div className="space-y-16 px-4 py-8 sm:px-6 sm:py-12">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/[0.07] bg-panel p-8 sm:p-14">
        <div className="pointer-events-none absolute -left-20 -top-24 h-80 w-80 animate-drift rounded-full bg-cyan/25 blur-[90px]" />
        <p className="eyebrow relative">About Auralis</p>
        <h1 className="h1 relative mt-3 max-w-3xl text-[clamp(38px,6vw,78px)]">Music discovery, <span className="grad-text">without the noise.</span></h1>
        <p className="relative mt-6 max-w-xl text-[17px] leading-8 text-dim">Auralis is a focused listening space for independent artists. We keep the catalogue at the centre and the interface out of the way.</p>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {values.map((v) => (
          <article key={v.title} className="card p-7">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.06] text-mint"><Icon name={v.icon} size={22} /></span>
            <h2 className="mt-5 font-display text-[22px] font-semibold tracking-[-.02em]">{v.title}</h2>
            <p className="mt-2 text-[14.5px] leading-7 text-dim">{v.text}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div><p className="eyebrow">What&rsquo;s next</p><h2 className="h1 mt-2 text-[clamp(30px,4vw,46px)]">Where we&rsquo;re heading.</h2></div>
        <ol className="space-y-3">
          {roadmap.map((r, i) => <li key={r} className="card flex items-center gap-4 p-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-aurora font-display text-[14px] font-bold text-night">{i + 1}</span><span className="text-[15px]">{r}</span></li>)}
        </ol>
      </section>

      <section className="mx-auto max-w-3xl">
        <p className="eyebrow">FAQ</p><h2 className="h1 mt-2 text-[clamp(30px,4vw,44px)]">Common questions.</h2>
        <div className="mt-6"><FAQ /></div>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/search" className="btn-aurora">Explore music</Link><Link href="/contact" className="btn-ghost">Contact us</Link></div>
      </section>
    </div>
  );
}
