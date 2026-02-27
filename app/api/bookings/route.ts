import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const body = await request.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { error } = await supabase.from("bookings").insert([
    {
      clinic_id: body.clinic_id,
      service_id: body.service_id, // ✅ FIXED
      full_name: body.full_name,
      phone: body.phone,
      booking_date: body.booking_date,
      booking_time: body.booking_time,
    },
  ]);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}