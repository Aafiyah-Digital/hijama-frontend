export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: { name?: string; date?: string; time?: string };
}) {
  const { name, date, time } = searchParams;

  let downloadUrl: string | null = null;

  if (name && date && time) {
    const start = new Date(`${date}T${time}`);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Hijama Appointment
DESCRIPTION:Appointment for ${name}
DTSTART:${start.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTEND:${end.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
END:VEVENT
END:VCALENDAR
`;

    const base64 = Buffer.from(icsContent).toString("base64");
    downloadUrl = `data:text/calendar;base64,${base64}`;
  }

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
          className="block bg-white text-black px-6 py-3 rounded-lg font-semibold mb-4"
        >
          Add to Calendar
        </a>
      )}

      <a
        href="/green-hijama"
        className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold"
      >
        Back to Home
      </a>
    </div>
  );
}