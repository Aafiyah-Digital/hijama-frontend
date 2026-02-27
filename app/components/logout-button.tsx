"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-green-600 hover:bg-green-500 text-black px-5 py-2 rounded-lg font-semibold transition"
    >
      Logout
    </button>
  );
}