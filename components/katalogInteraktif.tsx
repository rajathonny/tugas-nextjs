"use client";
import { useEffect, useState } from "react";
import { rupiah, type Event } from "@/data/event";
import KartuEvent from "./KartuEvent";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  // Baca urut dari localStorage saat pertama render (lazy initializer — tidak butuh useEffect)
  const [urut, setUrut] = useState(() => {
    if (typeof window === "undefined") return "tanggal";
    return localStorage.getItem("urut") ?? "tanggal";
  });
  const [jumlahTampil, setJumlahTampil] = useState(4);
  const [hanyaTersedia, setHanyaTersedia] = useState(false);
  const [hargaMaksimal, setHargaMaksimal] = useState("");

  // Wrapper setter yang otomatis reset jumlahTampil saat filter berubah
  function gantiCari(v: string) { setCari(v); setJumlahTampil(4); }
  function gantiKategori(v: string) { setKategori(v); setJumlahTampil(4); }
  function gantiUrut(v: string) { setUrut(v); setJumlahTampil(4); }
  function gantiHanyaTersedia(v: boolean) { setHanyaTersedia(v); setJumlahTampil(4); }
  function gantiHargaMaksimal(v: string) { setHargaMaksimal(v); setJumlahTampil(4); }


  useEffect(() => {
    localStorage.setItem("urut", urut);
  }, [urut]);

  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];

  const hasil = events.filter((e) => {
    const sisa = e.kuota - e.terisi;
    const cocokCari = e.judul.toLowerCase().includes(cari.toLowerCase());
    const cocokKategori = kategori === "Semua" || e.kategori === kategori;
    const cocokTiket = !hanyaTersedia || sisa > 0;
    const batasHarga =
      hargaMaksimal === "" ? Number.POSITIVE_INFINITY : Number(hargaMaksimal);
    const cocokHarga = e.harga <= batasHarga;

    return cocokCari && cocokKategori && cocokTiket && cocokHarga;
  });

  const tersusun = [...hasil].sort((a, b) => {
    switch (urut) {
      case "murah":
        return a.harga - b.harga;
      case "mahal":
        return b.harga - a.harga;
      case "nama":
        return a.judul.localeCompare(b.judul);
      case "tanggal":
      default:
        return new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime();
    }
  });

  const eventDitampilkan = tersusun.slice(0, jumlahTampil);

  const rataRataHarga =
    tersusun.length > 0
      ? rupiah(
        Math.round(
          tersusun.reduce((total, event) => total + event.harga, 0) /
          tersusun.length,
        ),
      )
      : rupiah(0);

  const totalSisaTiket =
    tersusun.reduce(
      (total, event) => total + (event.kuota - event.terisi),
      0,
    ) || 0;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          value={cari}
          onChange={(e) => gantiCari(e.target.value)}
          placeholder="Cari event..."
          className="rounded border bg-white px-3 py-2"
        />
        <select
          value={kategori}
          onChange={(e) => gantiKategori(e.target.value)}
          className="rounded border bg-white px-3 py-2"
        >
          {daftarKategori.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        <select
          value={urut}
          onChange={(e) => gantiUrut(e.target.value)}
          className="rounded border bg-white px-3 py-2"
        >
          <option value="tanggal">Tanggal terdekat</option>
          <option value="murah">Harga termurah</option>
          <option value="mahal">Harga termahal</option>
          <option value="nama">Nama A-Z</option>
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={hanyaTersedia}
            onChange={(e) => gantiHanyaTersedia(e.target.checked)}
          />
          Hanya yang masih ada tiket
        </label>
        <input
          type="number"
          min={0}
          value={hargaMaksimal}
          onChange={(e) => gantiHargaMaksimal(e.target.value)}
          placeholder="Harga maksimal"
          className="w-48 rounded border bg-white px-3 py-2"
        />
      </div>

      <p className="mb-1 text-sm text-slate-500">
        {tersusun.length} event ditemukan
      </p>
      <p className="mb-1 text-sm text-slate-500">
        Rata-rata harga {rataRataHarga}
      </p>
      <p className="mb-3 text-sm text-slate-500">
        Total sisa tiket {totalSisaTiket}
      </p>

      {tersusun.length === 0 ? (
        <p className="text-slate-500">Tidak ada event yang cocok.</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {eventDitampilkan.map((e) => (
              <KartuEvent key={e.id} event={e} />
            ))}
          </div>

          {jumlahTampil < tersusun.length && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setJumlahTampil((prev) => prev + 4)}
                className="rounded bg-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-300"
              >
                Tampil lagi ({tersusun.length - jumlahTampil} lagi)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
