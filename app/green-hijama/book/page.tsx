// app/green-hijama/book/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default function Book() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<any[]>([]);

  // 🔴 REPLACE THIS WITH YOUR REAL CLINIC UUID
  const clinicId = "1036016f-7190-465b-b5e0-3f0393eceba7";

  // Fetch services from DB
  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("clinic_id", clinicId);

      if (!error && data) {
        setServices(data);
      }
    }

    fetchServices();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(true);

  const form = e.currentTarget;
  const formData = new FormData(form);

  const payload = {
    clinic_id: clinicId,
    service_id: formData.get("service_id"),
    full_name: formData.get("full_name"),
    phone: formData.get("phone"),
    booking_date: formData.get("booking_date"),
    booking_time: formData.get("booking_time"),
  };

  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json();
    alert(data.error);
    setLoading(false);
    return;
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "appointment.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();

  router.push("/green-hijama/confirmation");
}

  return (
    <div className="max-w-xl mx-auto bg-white text-black rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Book Appointment
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="full_name"
          type="text"
          placeholder="Full Name"
          required
          className="w-full border rounded-lg px-4 py-3"
        />

        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          required
          className="w-full border rounded-lg px-4 py-3"
        />

        {/* Dynamic Services */}
        <select
          name="service_id"
          required
          className="w-full border rounded-lg px-4 py-3"
        >
          <option value="">Select Service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name} (£{service.price})
            </option>
          ))}
        </select>

        <input
          name="booking_date"
          type="date"
          required
          className="w-full border rounded-lg px-4 py-3"
        />

        <input
          name="booking_time"
          type="time"
          required
          className="w-full border rounded-lg px-4 py-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Booking"}
        </button>
      </form>
    </div>
  );
}