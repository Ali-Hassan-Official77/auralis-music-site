import { NextRequest, NextResponse } from "next/server";
import { getStreamRedirectUrl } from "@/lib/audius";
export const runtime = 'edge';
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const streamUrl = await getStreamRedirectUrl(id);
    return NextResponse.redirect(streamUrl, 302);
  } catch {
    return NextResponse.json({ error: "Stream unavailable" }, { status: 502 });
  }
}
