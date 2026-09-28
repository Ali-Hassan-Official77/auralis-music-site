
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import TrackRail from "@/components/TrackRail";
import { TrackRow } from "@/components/TrackCard";
import FAQ from "@/components/FAQ";
import Icon from "@/components/Icon";
import Waveform from "@/components/Waveform";
import SafeImage from "@/components/SafeImage";
import SpotlightPlay from "@/components/SpotlightPlay";
import { GenreArt } from "@/components/Art";
import { getTrending } from "@/lib/audius";
import { GENRES } from "@/lib/genres";

export const revalidate = 60;

const features = [
  {
    icon: "search" as const,
    number: "01",
    title: "Find it fast",
    text: "Search artists, tracks and genres without getting buried in menus.",
  },
  {
    icon: "waveform" as const,
    number: "02",
    title: "Keep listening",
    text: "Move around Auralis without losing the track you're already playing.",
  },
  {
    icon: "heart" as const,
    number: "03",
    title: "Make it yours",
    text: "Save the music you love locally and build your own listening space.",
  },
];

export default async function HomePage() {
  const [trending, electronic, hiphop, pop, rnb, lofi] =
    await Promise.all([
      getTrending().catch(() => []),
      getTrending("Electronic").catch(() => []),
      getTrending("Hip-Hop/Rap").catch(() => []),
      getTrending("Pop").catch(() => []),
      getTrending("R&B").catch(() => []),
      getTrending("Lo-Fi").catch(() => []),
    ]);

  const spotlight = trending[0];
  const top = trending.slice(1, 6);

  return (
    <main className="overflow-hidden pb-16">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="px-3 pb-8 pt-2 sm:px-5 sm:pb-12 sm:pt-4 lg:px-6 lg:pb-20">
        <div className="relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-panel sm:rounded-[28px]">
          {/* Ambient lights */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-[280px] w-[280px] rounded-full bg-mint/[0.07] blur-[90px] sm:h-[400px] sm:w-[400px]" />

          <div className="pointer-events-none absolute -bottom-32 -left-20 h-[280px] w-[280px] rounded-full bg-violet/[0.06] blur-[100px] sm:h-[380px] sm:w-[380px]" />

          <div className="relative grid lg:grid-cols-[1.05fr_.95fr]">
            {/* =====================================================
                HERO COPY
            ====================================================== */}
            <div className="relative z-20 p-5 sm:p-8 md:p-10 lg:flex lg:min-h-[620px] lg:items-end lg:p-14 xl:p-16">
              <div className="w-full max-w-[720px]">
                <div className="mb-5 flex items-center gap-2.5 sm:mb-6">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-mint shadow-[0_0_14px_rgba(91,255,197,.7)]" />

                  <p className="eyebrow">
                    Independent music, live
                  </p>
                </div>

                <h1 className="max-w-4xl font-display text-[clamp(42px,11vw,94px)] font-semibold leading-[0.9] tracking-[-0.065em] text-snow sm:text-[clamp(52px,8vw,88px)]">
                  Music worth
                  <br />
                  <span className="grad-text">staying for.</span>
                </h1>

                <p className="mt-5 max-w-xl text-[14px] leading-6 text-dim sm:mt-6 sm:text-[16px] sm:leading-8">
                  Discover independent artists, find something unexpected,
                  and keep the music moving while you explore.
                </p>

                {/* Search */}
                <div className="mt-6 w-full max-w-2xl sm:mt-7">
                  <SearchBar />
                </div>

                {/* Genre pills */}
                <div className="mt-4 flex max-w-full flex-wrap gap-2 sm:mt-5">
                  {GENRES.slice(0, 5).map((genre) => (
                    <Link
                      key={genre.name}
                      href={`/search?genre=${encodeURIComponent(
                        genre.query
                      )}`}
                      className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-[11px] font-medium text-dim transition hover:border-mint/30 hover:bg-mint/[0.06] hover:text-snow sm:px-3.5 sm:py-2 sm:text-[12px]"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* =====================================================
                RESPONSIVE HERO VISUAL
            ====================================================== */}
            <div className="relative min-h-[370px] overflow-hidden sm:min-h-[430px] lg:min-h-[620px]">
              {/* Desktop divider */}
              <div className="absolute inset-y-12 left-0 hidden w-px bg-white/[0.06] lg:block" />

              {/* =================================================
                  EDITORIAL DISC
              ================================================== */}
              <div className="pointer-events-none absolute left-1/2 top-[46%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] bg-white/[0.012] sm:h-[360px] sm:w-[360px] lg:left-[58%] lg:top-1/2 lg:h-[400px] lg:w-[400px]">
                <div className="absolute inset-[25px] rounded-full border border-white/[0.045] sm:inset-[30px]" />

                <div className="absolute inset-[55px] rounded-full border border-white/[0.04] sm:inset-[65px]" />

                <div className="absolute inset-[85px] rounded-full border border-white/[0.035] sm:inset-[100px]" />

                {/* Center */}
                <div className="absolute inset-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08] bg-black/60 backdrop-blur-xl sm:h-20 sm:w-20 lg:h-24 lg:w-24">
                  <div className="absolute inset-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint shadow-[0_0_20px_rgba(91,255,197,.65)] sm:h-2.5 sm:w-2.5" />
                </div>

                {/* Notches */}
                <div className="absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 bg-mint/40 sm:h-8" />

                <div className="absolute bottom-0 left-1/2 h-6 w-px -translate-x-1/2 bg-white/10 sm:h-8" />
              </div>

              {/* =================================================
                  LIVE CATALOGUE CARD
              ================================================== */}
              <div className="absolute right-4 top-5 z-10 rounded-xl border border-white/[0.07] bg-black/45 px-3 py-2.5 backdrop-blur-xl sm:right-7 sm:top-7 sm:rounded-2xl sm:px-4 sm:py-3 lg:right-12 lg:top-16">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_12px_rgba(91,255,197,.8)]" />

                  <span className="text-[8px] font-medium uppercase tracking-[0.15em] text-white/45 sm:text-[10px]">
                    Live catalogue
                  </span>
                </div>

                <p className="mt-1.5 font-display text-[15px] font-semibold sm:mt-2 sm:text-[18px]">
                  Discover
                </p>

                <p className="text-[9px] text-white/35 sm:text-[11px]">
                  something unexpected
                </p>
              </div>

              {/* =================================================
                  FLOATING PLAYER
              ================================================== */}
              <div className="absolute bottom-5 left-4 right-4 z-20 rounded-[20px] border border-white/[0.08] bg-[#101214]/90 p-3 shadow-2xl backdrop-blur-2xl sm:bottom-7 sm:left-7 sm:right-auto sm:w-[360px] sm:rounded-[24px] sm:p-4 lg:bottom-14 lg:left-10">
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Artwork */}
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white/[0.05] sm:h-16 sm:w-16 sm:rounded-2xl">
                    {spotlight ? (
                      <SafeImage
                        src={spotlight.artwork}
                        alt={spotlight.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-mint/40 to-violet/30" />
                    )}
                  </div>

                  {/* Track info */}
                  <div className="min-w-0 flex-1">
                    <p className="text-[8px] font-medium uppercase tracking-[0.15em] text-mint sm:text-[10px]">
                      Listening now
                    </p>

                    <p className="mt-0.5 truncate font-display text-[13px] font-semibold text-snow sm:mt-1 sm:text-[15px]">
                      {spotlight?.title || "Discover something new"}
                    </p>

                    <p className="truncate text-[10px] text-white/40 sm:text-[12px]">
                      {spotlight?.artist || "Independent artists"}
                    </p>
                  </div>

                  {/* Play */}
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-[10px] text-black sm:h-9 sm:w-9">
                    <span className="ml-0.5">▶</span>
                  </div>
                </div>

                {/* Deterministic waveform */}
                <div className="mt-3 flex h-7 items-end gap-[2px] overflow-hidden sm:mt-5 sm:h-10 sm:gap-[3px]">
                  {Array.from({ length: 46 }).map((_, index) => {
                    const barHeight =
                      18 +
                      Math.abs(Math.sin(index * 0.72)) * 28 +
                      Math.abs(Math.cos(index * 0.31)) * 10;

                    return (
                      <span
                        key={index}
                        className="flex-1 rounded-full bg-white/[0.16]"
                        style={{
                          height: `${barHeight}%`,
                        }}
                      />
                    );
                  })}
                </div>

                <div className="mt-2 flex items-center justify-between text-[8px] text-white/25 sm:mt-3 sm:text-[10px]">
                  <span>0:00</span>
                  <span>—</span>
                  <span>4:12</span>
                </div>
              </div>

              {/* =================================================
                  EDITORIAL LABEL
              ================================================== */}
              <div className="absolute bottom-6 right-5 hidden text-right sm:block lg:bottom-16 lg:right-12">
                <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
                  AURALIS / 001
                </p>

                <p className="mt-1 text-[9px] text-white/20">
                  sound without friction
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TOP PICKS
      ========================================================== */}
      {top.length > 0 && (
        <section className="px-4 sm:px-6">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="eyebrow">Curated now</p>

              <h2 className="mt-1 font-display text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
                What people are playing
              </h2>
            </div>

            <Link
              href="/search"
              className="hidden items-center gap-2 text-[12px] font-medium text-dim transition hover:text-snow sm:flex"
            >
              View all
              <Icon name="arrow" size={14} />
            </Link>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-white/[0.07] bg-panel">
            <div className="divide-y divide-white/[0.05]">
              {top.map((track, index) => (
                <TrackRow
                  key={track.id}
                  track={track}
                  index={index + 1}
                  queue={top}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          SPOTLIGHT
      ========================================================== */}
      {spotlight && (
        <section className="px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-panel">
            <SafeImage
              src={spotlight.artwork}
              alt=""
              fill
              sizes="100vw"
              className="scale-110 object-cover opacity-[0.12] blur-3xl"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-panel via-panel/95 to-transparent" />

            <div className="relative grid gap-7 p-5 sm:p-8 md:grid-cols-[220px_1fr] md:items-center lg:grid-cols-[280px_1fr] lg:p-10">
              <div className="mx-auto w-full max-w-[220px] md:max-w-none">
                <div className="relative aspect-square overflow-hidden rounded-[22px] bg-black shadow-2xl">
                  <SafeImage
                    src={spotlight.artwork}
                    alt={spotlight.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 280px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint" />

                  <p className="eyebrow">Trending right now</p>
                </div>

                <Link
                  href={`/track/${spotlight.id}`}
                  className="mt-3 block max-w-3xl font-display text-[clamp(30px,5vw,58px)] font-semibold leading-[1] tracking-[-0.055em] transition hover:text-mint"
                >
                  {spotlight.title}
                </Link>

                <p className="mt-3 truncate text-[14px] text-dim sm:text-[15px]">
                  {spotlight.artist}
                  {spotlight.genre ? ` · ${spotlight.genre}` : ""}
                </p>

                <Waveform
                  id={spotlight.id}
                  count={64}
                  height={48}
                  progress={0}
                  className="mt-7 w-full max-w-2xl opacity-80"
                />

                <div className="mt-6">
                  <SpotlightPlay
                    track={spotlight}
                    queue={trending}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          GENRES
      ========================================================== */}
      <section className="px-4 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="eyebrow">Browse by mood</p>

            <h2 className="mt-1 font-display text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              Find your sound
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
          {GENRES.map((genre, index) => (
            <Link
              key={genre.name}
              href={`/search?genre=${encodeURIComponent(
                genre.query
              )}`}
              className="group relative h-[130px] overflow-hidden rounded-[22px] border border-white/[0.06] sm:h-[170px]"
            >
              <GenreArt
                index={index}
                from={genre.from}
                to={genre.to}
                className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                <span className="font-display text-[18px] font-semibold tracking-[-0.025em] text-night sm:text-[21px]">
                  {genre.name}
                </span>

                <span className="grid h-8 w-8 place-items-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100">
                  <Icon name="arrow" size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================
          MUSIC RAILS
      ========================================================== */}
      <div className="space-y-14 sm:space-y-16">
        <TrackRail
          eyebrow="Fresh rotation"
          title="Trending"
          tracks={trending}
          href="/search"
        />

        <TrackRail
          eyebrow="Pulse & texture"
          title="Electronic"
          tracks={electronic}
          href="/search?genre=Electronic"
        />

        <TrackRail
          eyebrow="Bars & bass"
          title="Hip-Hop"
          tracks={hiphop}
          href="/search?genre=Hip-Hop%2FRap"
        />

        <TrackRail
          eyebrow="Big hooks"
          title="Pop"
          tracks={pop}
          href="/search?genre=Pop"
        />

        <TrackRail
          eyebrow="After hours"
          title="R&B"
          tracks={rnb}
          href="/search?genre=R%26B"
        />

        <TrackRail
          eyebrow="Low and slow"
          title="Lo-Fi"
          tracks={lofi}
          href="/search?genre=Lo-Fi"
        />
      </div>

      {/* =========================================================
          EMPTY STATE
      ========================================================== */}
      {!trending.length && (
        <section className="px-4 sm:px-6">
          <div className="rounded-[24px] border border-dashed border-white/[0.12] bg-white/[0.015] px-6 py-14 text-center">
            <p className="font-display text-2xl font-semibold tracking-[-0.03em]">
              Nothing is playing yet.
            </p>

            <p className="mx-auto mt-2 max-w-md text-[14px] leading-6 text-dim">
              Search for an artist or track to start exploring the
              catalogue.
            </p>

            <div className="mx-auto mt-6 max-w-md">
              <SearchBar />
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          FEATURES
      ========================================================== */}
      <section className="px-4 pt-4 sm:px-6 sm:pt-8">
        <div className="border-y border-white/[0.06] py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="eyebrow">The Auralis approach</p>

              <h2 className="mt-3 max-w-md font-display text-[clamp(34px,4vw,52px)] font-semibold leading-[1] tracking-[-0.055em]">
                Less friction.
                <br />
                More music.
              </h2>

              <p className="mt-5 max-w-sm text-[14px] leading-7 text-dim">
                Auralis keeps the interface quiet so the music can stay
                loud.
              </p>
            </div>

            <div className="grid gap-0 sm:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="border-t border-white/[0.07] py-6 sm:border-l sm:border-t-0 sm:px-6 sm:first:border-l-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-mint text-night">
                      <Icon name={feature.icon} size={19} />
                    </span>

                    <span className="font-mono text-[10px] text-white/25">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-[18px] font-semibold tracking-[-0.025em]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-[13px] leading-6 text-dim">
                    {feature.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================== */}
      <section className="px-4 sm:px-6" id="faq">
        <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
          <div>
            <p className="eyebrow">Questions</p>

            <h2 className="mt-3 max-w-sm font-display text-[clamp(36px,4vw,54px)] font-semibold leading-[0.98] tracking-[-0.055em]">
              Before you press play.
            </h2>

            <p className="mt-4 max-w-sm text-[14px] leading-7 text-dim">
              A few quick answers about how Auralis works.
            </p>
          </div>

          <div className="min-w-0">
            <FAQ />
          </div>
        </div>
      </section>
    </main>
  );
}