"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function ConfirmationPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const [id, setId] = useState<string | null>(null);
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const bookingId = params.get("id");

    if (!bookingId) return;

    setId(bookingId);

    async function loadBooking() {
      const { data } = await supabase
        .from("bookings")
        .select(
          `
          id,
          booking_date,
          booking_time,
          services (
            name
          )
        `,
        )
        .eq("id", bookingId)
        .single();

      if (data) setBooking(data);
    }

    loadBooking();
  }, []);

  return (
    <div className="w-full max-w-xl bg-white/10 rounded-2xl p-10 text-center shadow-lg backdrop-blur">
      {/* Success Check */}

      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl shadow-lg">
          ✓
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-white">
        Booking Confirmed 🎉
      </h2>

      <p className="text-white/80 mb-8">
        Your appointment has been successfully booked.
      </p>

      {/* Booking details */}

      {booking && (
        <div className="bg-white/10 rounded-xl p-6 mb-8 space-y-2 text-white">
          <p className="text-lg font-semibold">{booking.services?.name}</p>

          <p className="text-white/80">{booking.booking_date}</p>

          <p className="text-white/80">{booking.booking_time}</p>
        </div>
      )}

      {/* Calendar */}

      {id && (
        <a
          href={`/api/bookings/${id}/ics`}
          className="block w-full bg-white text-black px-6 py-3 rounded-lg font-semibold mb-4 hover:opacity-90 transition"
        >
          📅 Add to Calendar
        </a>
      )}

      {/* Back */}

      <a
        href="/green-hijama"
        className="block w-full bg-white/20 text-white px-6 py-3 rounded-lg font-semibold mt-2 hover:bg-white/30 transition"
      >
        Back to Home
      </a>
    </div>
  );
}
