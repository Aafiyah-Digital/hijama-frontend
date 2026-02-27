// app/green-hijama/confirmation/page.tsx

export default function Confirmation() {
  return (
    <div className="max-w-xl mx-auto text-center space-y-6">
      <h2 className="text-3xl font-bold">
        Booking Received
      </h2>

      <p className="opacity-90">
        JazakAllah khayr. We will contact you shortly to confirm your appointment.
      </p>

      <a
        href="/green-hijama"
        className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
      >
        Back to Home
      </a>
    </div>
  );
}