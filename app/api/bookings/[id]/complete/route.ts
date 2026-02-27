import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase
    .from("bookings")
    .update({ status: "completed" })
    .eq("id", id);

  if (error) {
    console.error(error);
    return new Response("Error updating booking", { status: 500 });
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}