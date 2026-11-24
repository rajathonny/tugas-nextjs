import { cache } from "react";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { Event } from "@/data/event";
import type { Pesanan } from "@/data/pesanan";

export async function ambilEvents(): Promise<Event[]> {
  const { data, error } = await supabaseAdmin.from("events").select("*").order("tanggal");
  if (error) throw new Error("Gagal memuat event: " + error.message);
  return data as Event[];
}

export const ambilEvent = cache(async (id: number): Promise<Event | null> => {
  if (!Number.isInteger(id)) return null;
  const { data, error } = await supabaseAdmin.from("events").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error("Gagal memuat event: " + error.message);
  return data as Event | null;
});

export async function ambilTerkait(event: Event): Promise<Event[]> {
  const { data, error } = await supabaseAdmin
    .from("events")
    .select("*")
    .eq("kategori", event.kategori)
    .neq("id", event.id)
    .order("tanggal");
  if (error) throw new Error("Gagal memuat event terkait: " + error.message);
  return data as Event[];
}

// Menghitung jumlah pesanan (transaksi) dan total tiket yang dipesan (penjumlahan kolom jumlah)
type ItemPesanan = { jumlah: number; [key: string]: unknown };

export async function hitungPesanan(eventId: number): Promise<{ jumlahPesanan: number; jumlahTiket: number; pesanan: ItemPesanan[] }> {
  const { data, error } = await supabaseAdmin
    .from("pesanan")
    .select("*, events(judul)") // embed judul dari tabel events via foreign key event_id
    .eq("event_id", eventId);
  if (error) throw new Error("Gagal menghitung pesanan: " + error.message);

  const jumlahPesanan = data?.length ?? 0;
  const jumlahTiket = data?.reduce((acc, curr) => acc + (Number(curr.jumlah) || 0), 0) ?? 0;

  return { jumlahPesanan, jumlahTiket, pesanan: data ?? [] };
}

export async function ambilPesanan(): Promise<Pesanan[]> {
  const { data, error } = await supabaseAdmin
    .from("pesanan")
    .select("*, events(judul)")
    .order("nomor", { ascending: false });

  if (error) throw new Error("gagal memuat pesanan :" + error.message);
  return data as Pesanan[];
}
