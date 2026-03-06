"use client";

import { useEffect, useState } from "react";

export default function ConfirmationPage() {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setId(params.get("id"));
  }, []);

  return (
    <div className="w-full max-w-xl bg-white/10 rounded-2xl p-10 text-center shadow-lg backdrop-blur">
      {/* Success Checkmark */}

      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl shadow-lg">
          ✓
        </div>
      </div>

      {/* Title */}

      <h2 className="text-2xl font-bold mb-4 text-white">
        Booking Confirmed 🎉
      </h2>

      <p className="text-white/80 mb-8">Your appointment has been received.</p>

      {/* Calendar Button */}

      {id && (
        <a
          href={`/api/bookings/${id}/ics`}
          className="block w-full bg-white text-black px-6 py-3 rounded-lg font-semibold mb-4 hover:opacity-90 transition"
        >
          📅 Add to Calendar
        </a>
      )}

      {/* Back Button */}

      <a
        href="/green-hijama"
        className="block w-full bg-white/20 text-white px-6 py-3 rounded-lg font-semibold mt-2 hover:bg-white/30 transition"
      >
        Back to Home
      </a>
    </div>
  );
}
