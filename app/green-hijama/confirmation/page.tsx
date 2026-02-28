"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ConfirmationPage() {
  const params = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    if (id) {
      window.location.href = `/api/bookings/${id}/ics`;
    }
  }, [id]);

  return (
    <div className="w-full max-w-xl bg-white/10 rounded-2xl p-10 text-center">
      <h2 className="text-2xl font-bold mb-6">
        Booking Confirmed 🎉
      </h2>

      <p className="text-white/80 mb-8">
        Your appointment has been received.
        Your calendar download should begin automatically.
      </p>

      <a
        href="/green-hijama"
        className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold"
      >
        Back to Home
      </a>
    </div>
  );
}