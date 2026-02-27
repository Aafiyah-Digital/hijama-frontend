import { NextResponse } from "next/server";
import { createServerSupabase } from "@/app/lib/supabase-server";

export async function POST(request: Request) {
  const supabase = await createServerSupabase();

  await supabase.auth.signOut();

  return NextResponse.redirect(new URL("/login", request.url));
}