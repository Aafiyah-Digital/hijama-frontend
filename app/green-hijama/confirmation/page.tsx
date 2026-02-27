export default function Confirmation() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-10">
      <div className="max-w-xl text-center space-y-6 bg-white/5 border border-green-600/40 rounded-2xl p-10">
        <h2 className="text-3xl font-bold">
          Booking Received
        </h2>

        <p className="text-gray-400">
          JazakAllah khayr. We will contact you shortly to confirm your appointment.
        </p>

        <a
          href="/green-hijama"
          className="inline-block mt-6 bg-green-600 hover:bg-green-500 text-black px-6 py-3 rounded-xl font-semibold transition"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}