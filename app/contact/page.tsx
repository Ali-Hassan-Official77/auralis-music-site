import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
export const runtime = 'edge';
export const metadata: Metadata = { title: "Contact", description: "Get in touch with the Auralis team." };

const topics = [
  { icon: "music" as const, title: "Artists", text: "Get a release featured or discuss placement." },
  { icon: "globe" as const, title: "Partners", text: "Build a music experience around your brand." },
  { icon: "message" as const, title: "Support", text: "Something broken or confusing? Tell us." },
];

export default function ContactPage() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <p className="eyebrow px-1">Contact</p>
      <h1 className="h1 mt-2 px-1 text-[clamp(36px,5.5vw,68px)]">Let&rsquo;s <span className="grad-text">talk.</span></h1>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
        <div className="card p-6 sm:p-9"><ContactForm /></div>
        <aside className="space-y-3">
          {topics.map((t) => (
            <div key={t.title} className="card flex gap-4 p-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/[0.06] text-mint"><Icon name={t.icon} size={20} /></span><div><h2 className="font-display text-[18px] font-semibold">{t.title}</h2><p className="mt-1 text-[14px] leading-6 text-dim">{t.text}</p></div></div>
          ))}
        </aside>
      </div>
    </div>
  );
}
