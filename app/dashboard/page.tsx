export const dynamic = "force-dynamic";

import { createServerSupabase } from "@/app/lib/supabase-server";
import { redirect } from "next/navigation";
import LogoutButton from "../components/logout-button";

export default async function Dashboard() {
  const supabase = await createServerSupabase();

  // Get logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get clinic owned by this user
  const { data: clinic } = await supabase
    .from("clinics")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!clinic) {
    return <div>No clinic found for this user.</div>;
  }

  // Fetch only this clinic's bookings
  const { data: bookings } = await supabase
    .from("bookings")
    .select(`
      id,
      full_name,
      phone,
      booking_date,
      booking_time,
      status,
      services (
        name
      )
    `)
    .eq("clinic_id", clinic.id)
    .order("booking_date", { ascending: true });

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">
          hijama<span className="text-green-500">.bio</span> Dashboard
        </h1>
        <LogoutButton />
      </div>

      <div className="bg-white/5 border border-green-600/40 rounded-xl p-6 max-w-lg mb-12">
        <p className="mb-2 text-gray-400">Logged in as:</p>
        <p className="text-lg font-semibold">{user.email}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Bookings</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-green-600 text-black">
            <tr>
              <th className="p-3">Full Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Service</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings?.map((booking: any) => (
              <tr
                key={booking.id}
                className="border-t border-green-600/20 hover:bg-white/5"
              >
                <td className="p-3">{booking.full_name}</td>
                <td className="p-3">{booking.phone}</td>
                <td className="p-3">
                  {booking.services?.name ?? "Unknown"}
                </td>
                <td className="p-3">{booking.booking_date}</td>
                <td className="p-3">{booking.booking_time}</td>
                <td className="p-3">{booking.status}</td>

                <td className="p-3 flex gap-2">
                  {/* Mark Complete */}
                  {booking.status !== "completed" && (
                    <form
                      action={`/api/bookings/${booking.id}/complete`}
                      method="POST"
                    >
                      <button
                        type="submit"
                        className="bg-green-500 text-black px-3 py-1 rounded"
                      >
                        Complete
                      </button>
                    </form>
                  )}

                  {/* Delete */}
                  <form
                    action={`/api/bookings/${booking.id}/delete`}
                    method="POST"
                  >
                    <button
                      type="submit"
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}