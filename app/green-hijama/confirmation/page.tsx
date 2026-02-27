return (
  <div className="w-full max-w-xl bg-white/10 rounded-2xl p-10">
    <h2 className="text-2xl font-bold mb-8 text-center">
      Book Appointment
    </h2>

    <form className="space-y-6" onSubmit={handleSubmit}>
      <input
        name="full_name"
        placeholder="Full Name"
        required
        className="w-full bg-white/20 border border-white/40 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none"
      />

      <input
        name="phone"
        placeholder="Phone Number"
        required
        className="w-full bg-white/20 border border-white/40 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none"
      />

      <select
        name="service_id"
        required
        className="w-full bg-white/20 border border-white/40 rounded-lg px-4 py-3 text-white focus:outline-none"
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
        className="w-full bg-white/20 border border-white/40 rounded-lg px-4 py-3 text-white focus:outline-none"
      />

      <input
        name="booking_time"
        type="time"
        required
        className="w-full bg-white/20 border border-white/40 rounded-lg px-4 py-3 text-white focus:outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-white text-black py-3 rounded-lg font-semibold transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Booking"}
      </button>
    </form>
  </div>
);