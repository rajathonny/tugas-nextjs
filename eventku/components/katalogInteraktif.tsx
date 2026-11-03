"use client";

import { useState } from "react";
import type { Event } from "@/data/event";
import KartuEvent from "./KartuEvent";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [hanyaTersedia, setHanyaTersedia] = useState(false);

  const daftarKategori = [
    "Semua",
    ...new Set(events.map((event) => event.kategori)),
  ];
  const hasil = events.filter(
    (e) =>
      e.judul.toLowerCase().includes(cari.toLowerCase()) &&
      (kategori === "Semua" || e.kategori === kategori) &&
      (!hanyaTersedia || e.terisi < e.kuota),
  );

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          placeholder="Cari event"
          className="rounded border px-3 py-2"
        />
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="rounded border px-3 py-2"
        >
          {daftarKategori.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          id="filter-tiket"
          checked={hanyaTersedia}
          onChange={(e) => setHanyaTersedia(e.target.checked)}
        />
        <label htmlFor="filter-tiket" className="cursor-pointer">
          Hanya tampilkan event yang tersedia
        </label>
      </div>
      {hasil.length === 0 ? (
        <p className="text-slate-600">Tidak ada event yang cocok</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {hasil.map((event) => (
            <KartuEvent key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
