export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/app/lib/supabase-server";
import { redirect } from "next/navigation";
import LogoutButton from "../components/logout-button";

export default async function Dashboard() {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If not logged in → redirect
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">
          hijama<span className="text-green-500">.bio</span> Dashboard
        </h1>

        <LogoutButton />
      </div>

      {/* User Info Card */}
      <div className="bg-white/5 border border-green-600/40 rounded-xl p-6 max-w-lg">
        <p className="mb-2 text-gray-400">Logged in as:</p>
        <p className="text-lg font-semibold">{user.email}</p>
      </div>
    </div>
  );
}