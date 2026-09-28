"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import type { ReactNode } from "react";
import Logo from "./Logo";
import Icon from "./Icon";
import { GENRES } from "@/lib/genres";

const main = [
  { href: "/", label: "Home", icon: "compass" as const },
  { href: "/search", label: "Explore", icon: "search" as const },
  { href: "/library", label: "Library", icon: "library" as const },
];
const company = [
  { href: "/about", label: "About", icon: "globe" as const },
  { href: "/pricing", label: "Plans", icon: "sparkles" as const },
  { href: "/contact", label: "Contact", icon: "mail" as const },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [menu, setMenu] = useState(false);
  useEffect(() => setMenu(false), [pathname]);
  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  function submit(e: FormEvent) {
    e.preventDefault();
    const v = q.trim();
    router.push(v ? `/search?q=${encodeURIComponent(v)}` : "/search");
    setMenu(false);
  }

  const NavLink = ({ href, label, icon }: { href: string; label: string; icon: any }) => (
    <Link href={href} className={`group flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-[14px] font-medium transition ${active(href) ? "bg-white/[0.08] text-snow" : "text-dim hover:bg-white/[0.04] hover:text-snow"}`}>
      <span className={active(href) ? "text-mint" : "group-hover:text-mint"}><Icon name={icon} size={18} /></span>{label}
    </Link>
  );

  return (
    <div className="min-h-screen">
      {/* desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col border-r border-white/[0.06] bg-night px-4 py-6 lg:flex">
        <Link href="/" aria-label="Auralis home" className="px-2"><Logo /></Link>
        <form onSubmit={submit} role="search" className="relative mt-7">
          <Icon name="search" size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-dim" />
          <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search music" placeholder="Search…" className="w-full rounded-2xl border border-white/[0.08] bg-panel py-2.5 pl-10 pr-3 text-[14px] outline-none transition placeholder:text-dim/70 focus:border-mint/50" />
        </form>
        <nav className="mt-6 space-y-1" aria-label="Primary">{main.map((l) => <NavLink key={l.href} {...l} />)}</nav>
        <p className="mb-2 mt-8 px-3.5 text-[11px] font-semibold uppercase tracking-[.2em] text-dim/70">Genres</p>
        <div className="no-scrollbar -mx-1 flex-1 space-y-0.5 overflow-y-auto px-1">
          {GENRES.map((g) => (
            <Link key={g.name} href={`/search?genre=${encodeURIComponent(g.query)}`} className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-[13.5px] text-dim transition hover:bg-white/[0.04] hover:text-snow">
              <span className="h-2 w-2 rounded-full" style={{ background: g.dot, boxShadow: `0 0 10px ${g.dot}` }} />{g.name}
            </Link>
          ))}
        </div>
        <nav className="mt-4 space-y-1 border-t border-white/[0.06] pt-4" aria-label="Company">{company.map((l) => <NavLink key={l.href} {...l} />)}</nav>
      </aside>

      {/* mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/[0.06] bg-night/85 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Link href="/" aria-label="Auralis home"><Logo /></Link>
        <div className="flex items-center gap-1">
          <Link href="/search" aria-label="Search" className="grid h-10 w-10 place-items-center rounded-full text-snow hover:bg-white/[0.06]"><Icon name="search" size={20} /></Link>
          <button type="button" onClick={() => setMenu((v) => !v)} aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} className="grid h-10 w-10 place-items-center rounded-full text-snow hover:bg-white/[0.06]"><Icon name={menu ? "close" : "menu"} size={20} /></button>
        </div>
      </header>
      {menu && (
        <div className="fixed inset-x-0 bottom-0 top-[61px] z-20 overflow-y-auto bg-night px-4 pb-32 pt-5 lg:hidden">
          <form onSubmit={submit} role="search" className="relative">
            <Icon name="search" size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dim" />
            <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search music" placeholder="Search songs, artists…" className="w-full rounded-2xl border border-white/10 bg-panel py-3.5 pl-11 pr-4 text-[15px] outline-none focus:border-mint/50" />
          </form>
          <p className="mb-2 mt-7 text-[11px] font-semibold uppercase tracking-[.2em] text-dim/70">Genres</p>
          <div className="flex flex-wrap gap-2">{GENRES.map((g) => <Link key={g.name} href={`/search?genre=${encodeURIComponent(g.query)}`} className="pill">{g.name}</Link>)}</div>
          <p className="mb-2 mt-7 text-[11px] font-semibold uppercase tracking-[.2em] text-dim/70">Company</p>
          <div className="space-y-1">{company.map((l) => <NavLink key={l.href} {...l} />)}</div>
        </div>
      )}

      <div className="lg:pl-[248px]">
        <main className="pb-44 lg:pb-36">{children}</main>
        <footer className="border-t border-white/[0.06] px-5 py-8 sm:px-8">
          <div className="flex flex-col gap-3 text-[13px] text-dim sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Auralis. All rights reserved.</span>
            <span className="flex flex-wrap gap-x-5 gap-y-1"><Link href="/about" className="hover:text-snow">About</Link><Link href="/pricing" className="hover:text-snow">Plans</Link><Link href="/contact" className="hover:text-snow">Contact</Link><span>Music streamed from Audius</span></span>
          </div>
        </footer>
      </div>

      {/* mobile tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-[35] grid grid-cols-3 border-t border-white/[0.07] bg-night/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden" aria-label="Tabs">
        {main.map((l) => (
          <Link key={l.href} href={l.href} className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium ${active(l.href) ? "text-mint" : "text-dim"}`}><Icon name={l.icon} size={20} />{l.label}</Link>
        ))}
      </nav>
    </div>
  );
}
