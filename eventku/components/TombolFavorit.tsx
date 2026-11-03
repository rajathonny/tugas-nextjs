"use client";

import { useEffect, useState } from "react";

export default function TombolFavorit({ id }: { id: number }) {
  const [favorit, setFavorit] = useState(false);

  useEffect(() => {
    const simpan: number[] = JSON.parse(
      localStorage.getItem("favorit") ?? "[]",
    );
    setFavorit(simpan.includes(id));
  }, [id]);

  function ubah() {
    const simpan: number[] = JSON.parse(
      localStorage.getItem("favorit") ?? "[]",
    );
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
