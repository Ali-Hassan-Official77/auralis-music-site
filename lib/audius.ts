import { Track } from "./types";
import { SITE } from "./site";

const APP_NAME = process.env.AUDIUS_APP_NAME || SITE.name;
const API_KEY = process.env.AUDIUS_API_KEY || "";
const BEARER = process.env.AUDIUS_BEARER_TOKEN || "";
const FALLBACK_HOST = "https://discoveryprovider.audius.co";
let cachedHost: { url: string; expires: number } | null = null;

async function resolveHost(): Promise<string> {
  if (cachedHost && cachedHost.expires > Date.now()) return cachedHost.url;
  try {
    const res = await fetch("https://api.audius.co", { signal: AbortSignal.timeout(2500), cache: "no-store" });
    if (res.ok) {
      const hosts: string[] = (await res.json())?.data || [];
      const host = hosts.find(Boolean);
      if (host) {
        cachedHost = { url: host.replace(/\/$/, ""), expires: Date.now() + 15 * 60 * 1000 };
        return cachedHost.url;
      }
    }
  } catch {}
  cachedHost = { url: FALLBACK_HOST, expires: Date.now() + 2 * 60 * 1000 };
  return FALLBACK_HOST;
}

function authHeaders(): HeadersInit {
  const headers: Record<string, string> = {};
  if (API_KEY) headers["X-API-KEY"] = API_KEY;
  if (BEARER) headers.Authorization = `Bearer ${BEARER}`;
  return headers;
}

async function audiusGet(path: string, params: Record<string, string | number> = {}) {
  const host = await resolveHost();
  const url = new URL(host + path);
  url.searchParams.set("app_name", APP_NAME);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  const res = await fetch(url.toString(), { headers: authHeaders(), signal: AbortSignal.timeout(7000), next: { revalidate: 30 } });
  if (!res.ok) throw new Error(`Audius request failed: ${res.status}`);
  return res.json();
}

function artworkOf(raw: any): string {
  const art = raw?.artwork || {};
  return art["480x480"] || art["1000x1000"] || art["150x150"] || "/artwork-fallback.svg";
}

function mapTrack(raw: any): Track {
  return {
    id: raw.id,
    title: raw.title || "Untitled",
    artist: raw.user?.name || raw.user?.handle || "Unknown Artist",
    artistId: raw.user?.id,
    artwork: artworkOf(raw),
    duration: Number(raw.duration) || 0,
    genre: raw.genre,
    playCount: raw.play_count,
    mood: raw.mood,
    releaseDate: raw.release_date,
    album: raw.album || raw.album_title || undefined,
    description: raw.description || undefined,
    tags: Array.isArray(raw.tags) ? raw.tags : typeof raw.tags === "string" && raw.tags ? raw.tags.split(",") : undefined,
  };
}

export async function getTrending(genre?: string): Promise<Track[]> {
  const params: Record<string, string> = { limit: "24", time: "week" };
  if (genre) params.genre = genre;
  const json = await audiusGet("/v1/tracks/trending", params);
  return (json.data || []).map(mapTrack);
}

export async function searchTracks(query: string, limit = 30): Promise<Track[]> {
  if (!query.trim()) return [];
  const json = await audiusGet("/v1/tracks/search", { query: query.trim(), limit, sort_method: "relevant" });
  return (json.data || []).slice(0, limit).map(mapTrack);
}

export async function getTrack(id: string): Promise<Track | null> {
  try {
    const json = await audiusGet(`/v1/tracks/${encodeURIComponent(id)}`);
    return json.data ? mapTrack(json.data) : null;
  } catch {
    return null;
  }
}

export async function getStreamRedirectUrl(id: string): Promise<string> {
  const host = await resolveHost();
  const url = new URL(`${host}/v1/tracks/${encodeURIComponent(id)}/stream`);
  url.searchParams.set("app_name", APP_NAME);
  if (API_KEY) url.searchParams.set("api_key", API_KEY);
  return url.toString();
}
