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
        .eq("clinic_id", clinic.id);

      if (data) setServices(data);
    }

    fetchServices();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const { data: clinic } = await supabase
      .from("clinics")
      .select("id")
      .eq("slug", "green-hijama")
      .single();

    if (!clinic) {
      setLoading(false);
      return;
    }

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

    if (error || !data) {
      setLoading(false);
      return;
    }

    router.push(`/green-hijama/confirmation?id=${data.id}`);
  }

  return (
    <div className="w-full max-w-xl bg-white/10 rounded-2xl p-10">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Book Appointment v2
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <input name="full_name" required className="w-full bg-white/20 border border-white/40 rounded-lg px-4 py-3 text-white" />
        <input name="phone" required className="w-full bg-white/20 border border-white/40 rounded-lg px-4 py-3 text-white" />
        <select name="service_id" required className="w-full bg-white/20 border border-white/40 rounded-lg px-4 py-3 text-white">
          <option value="">Select Service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} (£{service.price})
            </option>
          ))}
        </select>
        <input name="booking_date" type="date" required className="w-full bg-white/20 border border-white/40 rounded-lg px-4 py-3 text-white" />
        <input name="booking_time" type="time" required className="w-full bg-white/20 border border-white/40 rounded-lg px-4 py-3 text-white" />
        <button type="submit" disabled={loading} className="w-full bg-white text-black py-3 rounded-lg font-semibold">
          {loading ? "Submitting..." : "Submit Booking"}
        </button>
      </form>
    </div>
  );
}