"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function KolomCari({ defaultValue }: { defaultValue: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [, startTransition] = useTransition();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const params = new URLSearchParams(searchParams.toString());
        const nilai = e.target.value.trim();
        if (nilai) {
            params.set("cari", nilai);
        } else {
            params.delete("cari");
        }
        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`);
        });
    }

    return (
        <input
            type="search"
            name="cari"
            defaultValue={defaultValue}
            onChange={handleChange}
            placeholder="Cari judul event..."
            className="rounded border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
}
