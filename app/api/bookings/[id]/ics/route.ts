import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: booking, error } = await supabase
    .from("bookings")
    .select(`
      full_name,
      booking_date,
      booking_time,
      services (
        name
      )
    `)
    .eq("id", id)
    .single();

  if (error || !booking) {
    return new Response("Booking not found", { status: 404 });
  }

  const serviceName =
    (booking.services as any)?.[0]?.name ||
    (booking.services as any)?.name ||
    "Hijama Service";

  const start = new Date(
    `${booking.booking_date}T${booking.booking_time}`
  );

  const end = new Date(start.getTime() + 60 * 60 * 1000);

  function formatDate(date: Date) {
    return date
      .toISOString()
      .replace(/[-:]/g, "")
      .split(".")[0] + "Z";
  }

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Hijama Appointment - ${serviceName}
DTSTART:${formatDate(start)}
DTEND:${formatDate(end)}
DESCRIPTION:Appointment for ${booking.full_name}
END:VEVENT
END:VCALENDAR`;

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar",
      "Content-Disposition": "attachment; filename=appointment.ics",
    },
  });
}