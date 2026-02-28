"use client";

import { useEffect, useState } from "react";

export default function ConfirmationPage() {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setId(params.get("id"));
  }, []);

  return (
    <div className="w-full max-w-xl bg-white/10 rounded-2xl p-10 text-center mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        Booking Confirmed 🎉
      </h2>

      <p className="text-white/80 mb-8">
        Your appointment has been received.
        You can add it to your calendar below.
      </p>

      <div className="flex flex-col items-center gap-4">
        {id && (
          <a
            href={`/api/bookings/${id}/ics`}
            className="w-full max-w-xs bg-white text-black py-3 rounded-lg font-semibold text-center"
          >
            📅 Add to Calendar
          </a>
        )}

        <a
          href="/green-hijama"
          className="w-full max-w-xs bg-white/20 text-white py-3 rounded-lg font-semibold text-center"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}