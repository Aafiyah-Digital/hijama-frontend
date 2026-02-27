export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/app/lib/supabase-server";
import { redirect } from "next/navigation";
import LogoutButton from "../components/logout-button";

export default async function Dashboard() {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 🔹 Fetch bookings
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-black text-white p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">
          hijama<span className="text-green-500">.bio</span> Dashboard
        </h1>

        <LogoutButton />
      </div>

      {/* User Info */}
      <div className="bg-white/5 border border-green-600/40 rounded-xl p-6 max-w-lg mb-10">
        <p className="mb-2 text-gray-400">Logged in as:</p>
        <p className="text-lg font-semibold">{user.email}</p>
      </div>

      {/* Bookings Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Bookings</h2>

        {!bookings || bookings.length === 0 ? (
          <p className="text-gray-400">No bookings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-green-600/40 rounded-lg overflow-hidden">
              <thead className="bg-green-600 text-black">
                <tr>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Phone</th>
                  <th className="text-left p-3">Service</th>
                  <th className="text-left p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking: any) => (
                  <tr
                    key={booking.id}
                    className="border-t border-green-600/20 hover:bg-white/5"
                  >
                    <td className="p-3">{booking.name}</td>
                    <td className="p-3">{booking.email}</td>
                    <td className="p-3">{booking.phone}</td>
                    <td className="p-3">{booking.service}</td>
                    <td className="p-3">{booking.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}