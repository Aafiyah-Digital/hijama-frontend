export default function GreenHijama() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-10">
      <div className="max-w-md w-full text-center space-y-8">
        <h2 className="text-4xl font-extrabold">
          hijama<span className="text-green-500">.bio</span>
        </h2>

        <p className="text-gray-400">
          Professional Hijama therapy in London.
        </p>

        <div className="space-y-4">
          <a
            href="/green-hijama/services"
            className="block w-full bg-green-600 hover:bg-green-500 text-black py-3 rounded-xl font-semibold transition"
          >
            View Services
          </a>

          <a
            href="/green-hijama/book"
            className="block w-full border border-green-600/40 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </div>
  );
}