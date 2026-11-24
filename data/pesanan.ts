export type Pesanan = {
  nomor: number;
  eventId: number;
  nama: string;
  email: string;
  jumlah: number;
  total: number;
  dibuat: string;
  events?: { judul: string | null } | null;
  event?: { judul: string | null } | null;
};

export const pesanan: Pesanan[] = [];

let nomorTerrakhir = 0;

export function tambahPesanan(data: Omit<Pesanan, "nomor">) {
  nomorTerrakhir += 1;
  pesanan.unshift({ nomor: nomorTerrakhir, ...data });
  return nomorTerrakhir;
}
