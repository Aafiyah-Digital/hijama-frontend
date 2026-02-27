import { createServerSupabase } from "@/app/lib/supabase-server";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createServerSupabase();

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", params.id);

  if (error) {
    console.error(error);
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}