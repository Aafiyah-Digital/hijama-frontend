"use client";

import { useEffect, useState } from "react";

export default function ConfirmationPage() {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setId(params.get("id"));
  }, []);

  return (
    <div className="w-full max-w-xl bg-white/10 rounded-2xl p-10 text-center">
      <h2 className="text-2xl font-bold mb-6">
        Booking Confirmed 🎉
      </h2>

      <p className="text-white/80 mb-8">
        Your appointment has been received.
      </p>

      {id && (
        <a
          href={`/api/bookings/${id}/ics`}
          className="block mx-auto bg-white text-black px-6 py-3 rounded-lg font-semibold mb-4"
        >
          📅 Add to Calendar
        </a>
      )}

      <a
        href="/green-hijama"
        className="block mx-auto bg-white/20 text-white px-6 py-3 rounded-lg font-semibold mt-6"
      >
        Back to Home
      </a>
    </div>
  );
}