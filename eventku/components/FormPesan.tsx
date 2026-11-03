"use client";

import { useState } from "react";
import { rupiah, Event } from "@/data/event";

export default function FormPesan({ event }: { event: Event }) {
  const sisa = event.kuota - event.terisi;
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [email, setEmail] = useState("");
  const [pesan, setPesan] = useState("");
  const [berhasil, setBerhasil] = useState(false);

  function kirim(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      setPesan("Email tidak valid.");
      setBerhasil(false);
      return;
    }

    if (nama.trim().length < 3) {
      setPesan("Nama minimal 3 huruf.");
      setBerhasil(false);
      return;
    }

    if (jumlah < 1 || jumlah > sisa) {
      setPesan(`Jumlah tiket minimal 1 dan maksimal ${sisa}.`);
      setBerhasil(false);
      return;
    }

    setPesan("");
    setBerhasil(true);
  }

  if (sisa === 0) {
    return <p className="mt-6 font medium text-red-600">Tiket habis</p>;
  }

  return (
    <form onSubmit={kirim} className="mt-6 space-y-3 rounded border p-4">
      <h2 className="text-lg font-semibold">Pesan Tiket</h2>
      <input
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Nama pemesan"
        className="block w-full rounded border px-3 py-2"
      />

      <input
        type="number"
        value={jumlah}
        onChange={(e) => setJumlah(parseInt(e.target.value) || 1)}
        min="1"
        max={sisa}
        className="block w-full rounded border px-3 py-2"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Alamat Email"
        className="block w-full rounded border bg-white px-3 py-2"
      />
      <p>
        {" "}
        total : <b> {rupiah(event.harga * jumlah)}</b>
      </p>
      {pesan && <p className="text-red-600">{pesan}</p>}
      {berhasil && (
        <p className="text-green-600">
          Terima kasih {nama} sudah memesan {jumlah} tiket disimpan (belum
          tersimpan, ini masih latihan).
        </p>
      )}
      <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        pesan
      </button>
    </form>
  );
}
