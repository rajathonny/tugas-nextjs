import { events } from "@/data/event";

export async function GET() {
  return Response.json(events);
}
