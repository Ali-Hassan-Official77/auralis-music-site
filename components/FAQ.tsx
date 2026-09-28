"use client";
import { useState } from "react";
import Icon from "./Icon";

const items: [string, string][] = [
  ["What is Auralis?", "Auralis is a listening space for independent artists. Search the catalogue, jump into a genre, and keep playing while you browse — the player never leaves the screen."],
  ["Where does the music come from?", "Tracks are streamed from Audius, an open platform where artists release their own music. Each track shows its artist and links to its own page here."],
  ["Do I need to sign up?", "No account needed. Save tracks to your Library with the heart button — they're stored privately in your browser."],
  ["Will my Library sync across devices?", "Not at the moment. Your Library lives in the browser you saved it from, so clearing site data will empty it."],
  ["I'm an artist or a platform — can we work together?", "Absolutely. Take a look at the Plans page, then send us a message about what you have in mind."],
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-2.5">
      {items.map(([q, a], i) => (
        <div key={q} className={`rounded-2xl border transition ${open === i ? "border-mint/30 bg-panel" : "border-white/[0.07] bg-panel/50"}`}>
          <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
            <span className="text-[15.5px] font-semibold">{q}</span>
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/[0.06] transition ${open === i ? "rotate-45 text-mint" : ""}`}><Icon name="plus" size={15} /></span>
          </button>
          {open === i && <p className="px-5 pb-5 text-[14.5px] leading-7 text-dim">{a}</p>}
        </div>
      ))}
    </div>
  );
}
