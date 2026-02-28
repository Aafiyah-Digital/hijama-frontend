"use client";

import { useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const params = useSearchParams();
  const id = params.get("id");

  return (
    <div className="w-full max-w-xl bg-white/10 rounded-2xl p-10 text-center">
      <h2 className="text-2xl font-bold mb-6">
        Booking Confirmed 🎉
      </h2>

      <p className="text-white/80 mb-8">
        Your appointment has been received.
        You can add it to your calendar below.
      </p>

      {id && (
        <a
          href={`/api/bookings/${id}/ics`}
          className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold mb-4"
        >
          📅 Add to Calendar
        </a>
      )}

      <br />

      <a
        href="/green-hijama"
        className="inline-block bg-white/20 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Back to Home
      </a>
    </div>
  );
}