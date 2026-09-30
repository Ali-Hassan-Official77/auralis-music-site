import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import PlayerBar from "@/components/PlayerBar";
import PlayerProvider from "@/components/PlayerProvider";
import { SITE } from "@/lib/site";
export const runtime = 'edge';
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  ...(SITE.url ? { metadataBase: new URL(SITE.url) } : {}),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s — ${SITE.name}` },
  description: SITE.description,
  openGraph: { title: `${SITE.name} — ${SITE.tagline}`, description: SITE.description, siteName: SITE.name, type: "website" },
  icons: { icon: "/favicon.svg" },
};
export const viewport: Viewport = { themeColor: "#060A13" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body">
        <PlayerProvider>
          <AppShell>{children}</AppShell>
          <PlayerBar />
        </PlayerProvider>

        <script src="https://cdn.zanderio.ai/widget/loader.js" data-id="wdg_tbyN8NK6M84cKjFZXIJY2W7k" defer></script>
      </body>
    </html>
  );
}
