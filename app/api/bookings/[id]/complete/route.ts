import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: any
) {
  const id = params.id;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase
    .from("bookings")
    .update({ status: "completed" })
    .eq("id", id);

  if (error) {
    console.error("COMPLETE ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}