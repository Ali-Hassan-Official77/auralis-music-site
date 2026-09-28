"use client";
import { FormEvent, useState } from "react";
import { SITE } from "@/lib/site";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const email = SITE.contactEmail;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    const f = new FormData(e.currentTarget);
    const subject = `[${SITE.name}] ${f.get("topic")} — ${f.get("name")}`;
    const body = `${f.get("message")}\n\n—\n${f.get("name")}\n${f.get("email")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block"><span className="mb-2 block text-[13px] font-medium text-dim">Name</span><input name="name" required className="field" autoComplete="name" /></label>
        <label className="block"><span className="mb-2 block text-[13px] font-medium text-dim">Email</span><input name="email" type="email" required className="field" autoComplete="email" /></label>
      </div>
      <label className="block"><span className="mb-2 block text-[13px] font-medium text-dim">Topic</span>
        <select name="topic" className="field"><option className="bg-panel">General question</option><option className="bg-panel">Artist feature</option><option className="bg-panel">Label / partnership</option><option className="bg-panel">Report a problem</option></select>
      </label>
      <label className="block"><span className="mb-2 block text-[13px] font-medium text-dim">Message</span><textarea name="message" required rows={6} className="field resize-y" /></label>
      <button type="submit" disabled={!email} className="btn-aurora disabled:cursor-not-allowed disabled:opacity-40">Send message</button>
      {!email && <p className="text-[13px] text-dim">The contact form is not connected yet. Set <code className="text-mint">NEXT_PUBLIC_CONTACT_EMAIL</code> to enable it.</p>}
      {sent && <p role="status" className="text-[14px] text-dim">Your email app should open with the message ready to send.</p>}
    </form>
  );
}
