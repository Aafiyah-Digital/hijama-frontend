"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function BookPage() {
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");

  /* ---------------------------------------- */
  /* Fetch services */
  /* ---------------------------------------- */

  useEffect(() => {
    async function fetchServices() {
      const { data: clinic } = await supabase
        .from("clinics")
        .select("id")
        .eq("slug", "green-hijama")
        .single();

      if (!clinic) return;

      const { data } = await supabase
        .from("services")
        .select("*")
        .eq("clinic_id", clinic.id)
        .order("price");

      if (data) setServices(data);
    }

    fetchServices();
  }, []);

  /* ---------------------------------------- */
  /* Submit booking */
  /* ---------------------------------------- */

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const { data: clinic } = await supabase
        .from("clinics")
        .select("id")
        .eq("slug", "green-hijama")
        .single();

      if (!clinic) {
        alert("Clinic not found");
        setLoading(false);
        return;
      }

      /* ---------------------------------------- */
      /* Generate cancel token */
      /* ---------------------------------------- */

      const cancelToken = crypto.randomUUID();

      const { error } = await supabase.from("bookings").insert([
        {
          clinic_id: clinic.id,
          service_id: String(formData.get("service_id")),
          full_name: String(formData.get("full_name")),
          phone: String(formData.get("phone")),
          email: String(formData.get("email")),
          booking_date: String(formData.get("booking_date")),
          booking_time: String(formData.get("booking_time")),
          status: "pending",
          cancel_token: cancelToken,
        },
      ]);

      if (error) {
        console.error("SUPABASE ERROR:", error);
        alert(error.message);
        setLoading(false);
        return;
      }

      router.push(`/green-hijama/confirmation`);
    } catch (err) {
      console.error("Booking error:", err);
      alert(JSON.stringify(err));
    }

    setLoading(false);
  }

  /* ---------------------------------------- */
  /* UI */
  /* ---------------------------------------- */

  return (
    <div className="w-full max-w-xl bg-white/10 rounded-2xl p-6 md:p-10 shadow-lg backdrop-blur">
      <h2 className="text-2xl font-bold mb-8 text-center text-white">
        Book Appointment
      </h2>

      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <input
          name="full_name"
          placeholder="Full Name"
          required
          autoComplete="name"
          className="w-full h-12 bg-white/20 border border-white/40 rounded-lg px-4 text-white placeholder-white/70 text-base focus:outline-none focus:ring-2 focus:ring-white/30"
        />

        <input
          name="phone"
          placeholder="Phone Number"
          required
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          className="w-full h-12 bg-white/20 border border-white/40 rounded-lg px-4 text-white placeholder-white/70 text-base focus:outline-none focus:ring-2 focus:ring-white/30"
        />

        <input
          name="email"
          placeholder="Email Address"
          required
          type="email"
          autoComplete="email"
          className="w-full h-12 bg-white/20 border border-white/40 rounded-lg px-4 text-white placeholder-white/70 text-base focus:outline-none focus:ring-2 focus:ring-white/30"
        />

        <select
          name="service_id"
          required
          className="w-full h-12 bg-white/20 border border-white/40 rounded-lg px-4 text-white appearance-none text-base focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          <option value="">Select Service</option>

          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} (£{service.price})
            </option>
          ))}
        </select>

        {/* Date */}

        <div className="relative">
          <input
            name="booking_date"
            type="date"
            required
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value || "")}
            className="w-full h-12 bg-white/20 border border-white/40 rounded-lg px-4 text-white text-base appearance-none focus:outline-none focus:ring-2 focus:ring-white/30"
          />

          {!dateValue && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 text-base pointer-events-none">
              Date
            </span>
          )}
        </div>

        {/* Time */}

        <div className="relative">
          <input
            name="booking_time"
            type="time"
            required
            value={timeValue}
            onChange={(e) => setTimeValue(e.target.value || "")}
            className="w-full h-12 bg-white/20 border border-white/40 rounded-lg px-4 text-white text-base appearance-none focus:outline-none focus:ring-2 focus:ring-white/30"
          />

          {!timeValue && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 text-base pointer-events-none">
              Time
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-white text-black rounded-lg font-semibold transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Booking"}
        </button>
      </form>
    </div>
  );
}
