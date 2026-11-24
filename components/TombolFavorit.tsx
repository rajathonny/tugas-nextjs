"use client";

import { useState } from "react";

function bacaFavorit(): number[] {
  if (typeof window === "undefined") return [];

  try {
    const simpan = JSON.parse(localStorage.getItem("favorit") ?? "[]");
    return Array.isArray(simpan)
      ? simpan.filter((x): x is number => typeof x === "number")
      : [];
  } catch {
    return [];
  }
}

export default function TombolFavorit({ id }: { id: number }) {
  const [favorit, setFavorit] = useState<boolean>(() =>
    bacaFavorit().includes(id),
  );

  function ubah() {
    const simpan = bacaFavorit();
    const baru = simpan.includes(id)
      ? simpan.filter((x) => x !== id)
      : [...simpan, id];

    localStorage.setItem("favorit", JSON.stringify(baru));
    setFavorit(baru.includes(id));
  }

  return (
    <button
      type="button"
      onClick={ubah}
      aria-label={favorit ? "Hapus favorit" : "Tambah favorit"}
    >
      {favorit ? "♥ favorit" : "♡ tombol favorit"}
    </button>
  );
}

//ha ha hahahahaha
