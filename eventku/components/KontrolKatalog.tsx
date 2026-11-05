type Props = {
  cari: string;
  setCari: (value: string) => void;
  kategori: string;
  setKategori: (value: string) => void;
  urut: string;
  setUrut: (value: string) => void;
  hanyaTersedia: boolean;
  setHanyaTersedia: (value: boolean) => void;
  hargaMaksimal: string;
  setHargaMaksimal: (value: string) => void;
  daftarKategori: string[];
};

export default function KontrolKatalog({
  cari,
  setCari,
  kategori,
  setKategori,
  urut,
  setUrut,
  hanyaTersedia,
  setHanyaTersedia,
  hargaMaksimal,
  setHargaMaksimal,
  daftarKategori,
}: Props) {
  return (
    <div className="mb-4 flex flex-wrap gap-3">
      <input
        value={cari}
        onChange={(e) => setCari(e.target.value)}
        placeholder="Cari event..."
        className="rounded border bg-white px-3 py-2"
      />

      <select
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
        className="rounded border bg-white px-3 py-2"
      >
        {daftarKategori.map((k) => (
          <option key={k}>{k}</option>
        ))}
      </select>

      <select
        value={urut}
        onChange={(e) => setUrut(e.target.value)}
        className="rounded border bg-white px-3 py-2"
      >
        <option value="tanggal">Tanggal terdekat</option>
        <option value="murah">Harga termurah</option>
        <option value="mahal">Harga termahal</option>
        <option value="nama">Nama A-Z</option>
      </select>

      <label className="flex items-center gap-2 rounded border bg-white px-3 py-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={hanyaTersedia}
          onChange={(e) => setHanyaTersedia(e.target.checked)}
        />
        Hanya yang masih ada tiket
      </label>

      <input
        type="number"
        min="0"
        step="1000"
        value={hargaMaksimal}
        onChange={(e) => setHargaMaksimal(e.target.value)}
        placeholder="Harga maksimal"
        className="rounded border bg-white px-3 py-2"
      />
    </div>
  );
}
