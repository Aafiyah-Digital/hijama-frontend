"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function BookPage() {
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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

      if (!clinic) throw new Error("Clinic not found");

      const { data, error } = await supabase
        .from("bookings")
        .insert([
          {
            clinic_id: clinic.id,
            service_id: formData.get("service_id"),
            full_name: formData.get("full_name"),
            phone: formData.get("phone"),
            booking_date: formData.get("booking_date"),
            booking_time: formData.get("booking_time"),
            status: "pending",
          },
        ])
        .select()
        .single();

      if (error) throw error;

      router.push(`/green-hijama/confirmation?id=${data.id}`);
    } catch (err) {
      console.error("Booking error:", err);
      alert("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  return (
    <div className="w-full max-w-xl bg-white/10 rounded-2xl p-6 md:p-10 shadow-lg backdrop-blur">
      <h2 className="text-2xl font-bold mb-8 text-center text-white">
        Book Appointment
      </h2>

      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        {/* Full Name */}

        <input
          name="full_name"
          placeholder="Full Name"
          required
          autoComplete="name"
          className="w-full h-12 bg-white/20 border border-white/40 rounded-lg px-4 text-white placeholder-white/70 text-base focus:outline-none focus:ring-2 focus:ring-white/30"
        />

        {/* Phone */}

        <input
          name="phone"
          placeholder="Phone Number"
          required
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          className="w-full h-12 bg-white/20 border border-white/40 rounded-lg px-4 text-white placeholder-white/70 text-base focus:outline-none focus:ring-2 focus:ring-white/30"
        />

        {/* Service */}

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
            className="peer w-full h-12 bg-white/20 border border-white/40 rounded-lg px-4 text-white text-base appearance-none focus:outline-none focus:ring-2 focus:ring-white/30"
          />

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 text-base pointer-events-none peer-focus:opacity-0 peer-valid:opacity-0">
            Date
          </span>
        </div>

        {/* Time */}

        <div className="relative">
          <input
            name="booking_time"
            type="time"
            required
            className="peer w-full h-12 bg-white/20 border border-white/40 rounded-lg px-4 text-white text-base appearance-none focus:outline-none focus:ring-2 focus:ring-white/30"
          />

          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 text-base pointer-events-none peer-focus:opacity-0 peer-valid:opacity-0">
            Time
          </span>
        </div>
        
        {/* Submit */}

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