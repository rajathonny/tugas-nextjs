import Link from "next/link";
import type { Saringan } from "@/data/saring";
import { alamatHalaman } from "@/data/saring";

export default function Halaman({ s, hal, jumlah }: { s: Saringan; hal: number; jumlah: number }) {
  if (jumlah <= 1) return null;

  const nomor = Array.from({ length: jumlah }, (_, i) => i + 1);

  return (
    <nav className="mt-6 flex items-center justify-center gap-2 text-sm">
      {hal > 1 && (
        <Link href={alamatHalaman(s, hal - 1)} className="rounded border px-3 py-1 hover:bg-slate-100">
          « Sebelumnya
        </Link>
      )}

      {nomor.map((n) => (
        <Link
          key={n}
          href={alamatHalaman(s, n)}
          className={
            n === hal
              ? "rounded bg-blue-600 px-3 py-1 font-bold text-white"
              : "rounded border px-3 py-1 hover:bg-slate-100"
          }
        >
          {n}
        </Link>
      ))}

      {hal < jumlah && (
        <Link href={alamatHalaman(s, hal + 1)} className="rounded border px-3 py-1 hover:bg-slate-100">
          Berikutnya »
        </Link>
      )}
    </nav>
  );
}
