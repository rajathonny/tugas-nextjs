import { ambilEvent } from "@/data/ambil";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numericId = Number(id);

  // ambilEvent akan otomatis mengembalikan null jika bukan integer (seperti /abc)
  const event = await ambilEvent(numericId);

  if (!event) {
    return NextResponse.json(
      { pesan: "Event tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json(event);
}
