import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

function generateICS({
  full_name,
  booking_date,
  booking_time,
}: {
  full_name: string;
  booking_date: string;
  booking_time: string;
}) {
  const start = new Date(`${booking_date}T${booking_time}:00`);
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  const formatDate = (date: Date) =>
    date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  return `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Hijama Appointment
DESCRIPTION:Appointment for ${full_name}
DTSTART:${formatDate(start)}
DTEND:${formatDate(end)}
END:VEVENT
END:VCALENDAR
`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      clinic_id,
      service_id,
      full_name,
      phone,
      booking_date,
      booking_time,
    } = body;

    const { error } = await supabase.from("bookings").insert([
      {
        clinic_id,
        service_id,
        full_name,
        phone,
        booking_date,
        booking_time,
      },
    ]);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    const emailParams = {
      Destination: {
        ToAddresses: [process.env.ADMIN_EMAIL!],
      },
      Message: {
        Body: {
          Text: {
            Data: `
New Booking:

Name: ${full_name}
Phone: ${phone}
Date: ${booking_date}
Time: ${booking_time}
`,
          },
        },
        Subject: {
          Data: "New Hijama Booking",
        },
      },
      Source: process.env.ADMIN_EMAIL!,
    };

    await ses.send(new SendEmailCommand(emailParams));

    const icsContent = generateICS({
      full_name,
      booking_date,
      booking_time,
    });

    return new NextResponse(icsContent, {
      headers: {
        "Content-Type": "text/calendar",
        "Content-Disposition": "attachment; filename=appointment.ics",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}