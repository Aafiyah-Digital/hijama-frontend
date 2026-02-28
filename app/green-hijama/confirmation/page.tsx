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

      <p>ID: {id ?? "NO ID FOUND"}</p>

      <a
        href={id ? `/api/bookings/${id}/ics` : "#"}
        className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold mt-6"
      >
        Add to Calendar
      </a>
    </div>
  );
}