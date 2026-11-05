"use client";
import { useEffect, useState } from "react";
import { rupiah, type Event } from "@/data/event";
import KartuEvent from "./KartuEvent";
import KontrolKatalog from "./KontrolKatalog";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState("tanggal");
  const [jumlahTampil, setJumlahTampil] = useState(4);
  const [hanyaTersedia, setHanyaTersedia] = useState(false);
  const [hargaMaksimal, setHargaMaksimal] = useState("");

  useEffect(() => {
    const savedUrut = localStorage.getItem("urut");
    if (savedUrut) setUrut(savedUrut);
  }, []);

  useEffect(() => {
    localStorage.setItem("urut", urut);
  }, [urut]);

  useEffect(() => {
    setJumlahTampil(4);
  }, [cari, kategori, urut, hanyaTersedia, hargaMaksimal]);

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
      <KontrolKatalog
        cari={cari}
        setCari={setCari}
        kategori={kategori}
        setKategori={setKategori}
        urut={urut}
        setUrut={setUrut}
        hanyaTersedia={hanyaTersedia}
        setHanyaTersedia={setHanyaTersedia}
        hargaMaksimal={hargaMaksimal}
        setHargaMaksimal={setHargaMaksimal}
        daftarKategori={daftarKategori}
      />

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
                Tampilkan lagi ({tersusun.length - jumlahTampil} lagi)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
