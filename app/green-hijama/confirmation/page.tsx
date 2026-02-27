"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmationPage() {
  const params = useSearchParams();
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    const name = params.get("name");
    const date = params.get("date");
    const time = params.get("time");

    if (!name || !date || !time) return;

    const start = new Date(`${date}T${time}`);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    const formatDate = (d: Date) =>
      d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Hijama Appointment
DESCRIPTION:Appointment for ${name}
DTSTART:${formatDate(start)}
DTEND:${formatDate(end)}
END:VEVENT
END:VCALENDAR
    `.trim();

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);

    setDownloadUrl(url);
  }, [params]);

  return (
    <div className="w-full max-w-xl bg-white/10 rounded-2xl p-10 text-center">
      <h2 className="text-2xl font-bold mb-6">
        Booking Confirmed 🎉
      </h2>

      <p className="text-white/80 mb-8">
        Your appointment has been received.
        We will contact you shortly to confirm.
      </p>

      {downloadUrl && (
        <a
          href={downloadUrl}
          download="appointment.ics"
          className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold mb-4"
        >
          Add to Calendar
        </a>
      )}

      <div>
        <a
          href="/green-hijama"
          className="inline-block bg-white/20 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}