"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "./Icon";

export default function SearchBar({ placeholder = "Search songs, artists, genres…" }: { placeholder?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  function submit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }
  return (
    <form onSubmit={submit} role="search" className="glass flex w-full items-center rounded-full p-1.5 pl-5 transition focus-within:border-mint/50">
      <Icon name="search" size={19} className="shrink-0 text-dim" />
      <label htmlFor="hero-search" className="sr-only">Search Auralis</label>
      <input id="hero-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent px-3 py-3 text-[15px] outline-none placeholder:text-dim/70" />
      <button type="submit" className="btn-aurora !px-6 !py-3">Search</button>
    </form>
  );
}
