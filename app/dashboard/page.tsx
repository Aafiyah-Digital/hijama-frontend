export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/app/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">
          hijama<span className="text-green-500">.bio</span> Dashboard
        </h1>

        <form action="/auth/logout" method="post">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-500 text-black px-5 py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </form>
      </div>

      <div className="bg-white/5 border border-green-600/40 rounded-xl p-6">
        <p className="text-mint mb-2">
          Logged in as:
        </p>
        <p className="text-lg font-semibold">
          {user.email}
        </p>
      </div>
    </div>
  );
}