import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
export const runtime = 'edge';
export const metadata: Metadata = { title: "Plans", description: "Ways to use Auralis as a listener, an artist or a platform." };

const plans = [
  { name: "Explore", icon: "headphones" as const, price: "Free", desc: "Everything you need to discover and save music.", items: ["Full catalogue search and genre browsing", "Persistent player", "Private Library on your device"], cta: "Start exploring", href: "/search" },
  { name: "Amplify", icon: "waveform" as const, price: "Custom", desc: "For artists who want a stronger release presence.", items: ["Featured placement in genre discovery", "Rich release presentation", "Direct contact with the Auralis team"], cta: "Talk to us", href: "/contact", featured: true },
  { name: "Orbit", icon: "globe" as const, price: "Custom", desc: "For platforms and brands building around music.", items: ["Custom-scoped music experience", "Integration planning", "Launch support"], cta: "Plan a project", href: "/contact" },
];

export default function PricingPage() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <section className="px-1 py-6 text-center sm:py-12">
        <p className="eyebrow">Plans</p>
        <h1 className="h1 mx-auto mt-3 max-w-3xl text-[clamp(38px,6vw,76px)]">Free to listen. <span className="grad-text">Built to grow with you.</span></h1>
        <p className="mx-auto mt-5 max-w-lg text-[16.5px] leading-8 text-dim">Listening is open to everyone. Artists and platforms can scope something bigger with us.</p>
      </section>
      <section className="mx-auto mt-6 grid max-w-6xl gap-4 lg:grid-cols-3">
        {plans.map((p) => (
          <article key={p.name} className={`relative flex flex-col rounded-[2rem] p-7 ${p.featured ? "bg-aurora p-[1.5px]" : "border border-white/[0.08] bg-panel"}`}>
            <div className={`flex flex-1 flex-col ${p.featured ? "rounded-[calc(2rem-1.5px)] bg-panel p-7" : ""}`}>
              <div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/[0.06] text-mint"><Icon name={p.icon} size={20} /></span>{p.featured && <span className="rounded-full bg-aurora px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-night">For artists</span>}</div>
              <h2 className="mt-6 font-display text-[28px] font-bold tracking-[-.03em]">{p.name}</h2>
              <p className="mt-2 text-[14.5px] leading-7 text-dim">{p.desc}</p>
              <p className="mt-5 font-display text-[36px] font-bold tracking-[-.04em]">{p.price}</p>
              <ul className="mt-5 flex-1 space-y-3">{p.items.map((i) => <li key={i} className="flex gap-3 text-[14.5px] leading-6"><Icon name="check" size={17} className="mt-0.5 shrink-0 text-mint" />{i}</li>)}</ul>
              <Link href={p.href} className={`mt-7 ${p.featured ? "btn-aurora" : "btn-ghost"}`}>{p.cta}</Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
