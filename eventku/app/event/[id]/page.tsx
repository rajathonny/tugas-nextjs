import Link from "next/link";
import { notFound } from "next/navigation";
import { events, rupiah } from "@/data/event";
import FormPesan from "@/components/FormPesan";
import TombolFavorit from "@/components/TombolFavorit";

export default async function Detail({ params }: PageProps<"/event/[id]">) {
  const { id } = await params;
  const event = events.find((e) => e.id === Number(id));
  if (!event) notFound();

  const sisa = event.kuota - event.terisi;
  const eventTerkait = events.filter(
    (e) => e.kategori === event.kategori && e.id !== event.id,
  );

  return (
    <article className="rounded-xl border bg-white p-6">
      <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
        {event.kategori}
      </span>
      <h1 className="mt-2 text-3xl font-bold">{event.judul}</h1>
      <p className="mt-1 text-slate-500">
        {event.tanggal} · {event.lokasi}
      </p>
      <p className="mt-4 text-xl font-semibold">{rupiah(event.harga)}</p>
      <p className="text-slate-600">
        Sisa {sisa} dari {event.kuota} tiket
      </p>
      <TombolFavorit key={event.id} id={event.id} />
      <FormPesan event={event} />

      <section className="mt-6">
        <h2 className="mb-3 text-xl font-semibold">Event terkait</h2>

        {eventTerkait.length === 0 ? (
          <p className="text-slate-500">Belum ada event terkait.</p>
        ) : (
          <ul className="space-y-2">
            {eventTerkait.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/event/${item.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {item.judul}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
