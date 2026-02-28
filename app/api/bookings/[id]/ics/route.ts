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

  const { data: booking } = await supabase
    .from("bookings")
    .select(`
      full_name,
      booking_date,
      booking_time,
      services ( name )
    `)
    .eq("id", id)
    .single();

  if (!booking) {
    return new Response("Booking not found", { status: 404 });
  }

  const start = new Date(
    `${booking.booking_date}T${booking.booking_time}`
  );

  const end = new Date(start.getTime() + 60 * 60 * 1000);

  function format(date: Date) {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  }

  const serviceName = booking.services?.[0]?.name || "Appointment";

  const ics = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
UID:${id}
DTSTAMP:${format(new Date())}
DTSTART:${format(start)}
DTEND:${format(end)}
SUMMARY:${serviceName}
DESCRIPTION:Hijama appointment for ${booking.full_name}
END:VEVENT
END:VCALENDAR
`;

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar",
      "Content-Disposition": `attachment; filename=booking-${id}.ics`,
    },
  });
}