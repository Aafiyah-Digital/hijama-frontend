"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

function CancelContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const [booking, setBooking] = useState<any>(null);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function fetchBooking() {
      if (!token) return;

      const { data } = await supabase
        .from("bookings")
        .select(
          `
          full_name,
          booking_date,
          booking_time,
          services ( name )
        `,
        )
        .eq("cancel_token", token)
        .single();

      setBooking(data);
    }

    fetchBooking();
  }, [token]);

  async function cancelBooking() {
    if (!token) return;

    await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("cancel_token", token);

    setCancelled(true);
  }

  if (!booking) {
    return (
      <div className="w-full max-w-xl bg-white/10 rounded-2xl p-10 text-center text-white backdrop-blur">
        Loading booking...
      </div>
    );
  }

  const serviceName =
    booking.services?.name || booking.services?.[0]?.name || "Appointment";

  return (
    <div className="w-full max-w-xl bg-white/10 rounded-2xl p-10 text-center text-white backdrop-blur shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Cancel Appointment</h2>

      {cancelled ? (
        <>
          <p className="text-white/80 mb-8">
            Your appointment has been cancelled.
          </p>

          <a
            href="/green-hijama"
            className="block mx-auto bg-white text-black px-6 py-3 rounded-lg font-semibold"
          >
            Back to Home
          </a>
        </>
      ) : (
        <>
          <p className="text-white/80 mb-4">{booking.full_name}</p>

          <p className="text-white/80 mb-2">{serviceName}</p>

          <p className="text-white/80 mb-8">
            {booking.booking_date} at {booking.booking_time}
          </p>

          <button
            onClick={cancelBooking}
            className="w-full bg-white text-black py-3 rounded-lg font-semibold transition hover:opacity-90"
          >
            Cancel Appointment
          </button>
        </>
      )}
    </div>
  );
}

export default function CancelPage() {
  return (
    <Suspense
      fallback={<div className="text-white text-center mt-20">Loading...</div>}
    >
      <CancelContent />
    </Suspense>
  );
}
