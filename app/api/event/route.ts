import { ambilEvents } from "@/data/ambil";
import { NextResponse } from "next/server";

export async function GET() {
  const events = await ambilEvents();
  return NextResponse.json(events);
}
