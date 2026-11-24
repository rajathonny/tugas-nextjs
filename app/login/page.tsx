import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NAMA_COOKIE, tokenSah } from "@/lib/sesi";
import FormMasuk from "@/components/formMasul";

export const metadata: Metadata = { title: "Masuk Admin" };

export default async function Login({ searchParams }: PageProps<"/login">) {
  const { dari } = await searchParams;

  if (await tokenSah((await cookies()).get(NAMA_COOKIE)?.value))
    redirect("/admin");
  return <FormMasuk dari={typeof dari === "string" ? dari : "/admin"} />;
}
