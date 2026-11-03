import { notFound } from "next/navigation";
import { events, rupiah, type Event } from "@/data/event";

export default async function DetailEvent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = events.find((item: Event) => item.id === Number(id));

  if (!event) {
    notFound();
  }

  const sisa = event.kuota - event.terisi;

  return (
    <article className="rounded-xl border bg-white p-6 shadow-sm">
      <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
        {event.kategori}
      </span>
      <h1 className="mt-2 text-3xl font-bold">{event.judul}</h1>
      <p className="mt-1 text-slate-500">
        {event.tanggal} · {event.lokasi}
      </p>
      <p className="mt-4 text-xl font-semibold">
        {rupiah(Number(event.harga))}
      </p>
      <p className="text-slate-600">
        Sisa {sisa} dari {event.kuota} tiket
      </p>
    </article>
  );
}
