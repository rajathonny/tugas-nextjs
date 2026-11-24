import type { Metadata } from "next";
import FormEvent from "@/components/formEvent";

export const metadata: Metadata = { title: 'Event Baru' };

export default function Baru() {
    return (
        <div>
            <h1 className="mb-4 text-2xl font-bold">Event Baru</h1>
            <FormEvent />
        </div>
    )
}
