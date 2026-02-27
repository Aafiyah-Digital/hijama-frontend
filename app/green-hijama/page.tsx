export default function GreenHijama() {
  return (
    <div className="w-full max-w-md text-center space-y-8">
      <h2 className="text-4xl font-extrabold text-white">
        Green Hijama Clinic
      </h2>

      <p className="text-white/80">
        Professional Hijama therapy in London.
      </p>

      <div className="space-y-4 pt-6">
        <a
          href="/green-hijama/services"
          className="block w-full bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          View Services
        </a>

        <a
          href="/green-hijama/book"
          className="block w-full border border-white py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
        >
          Book Appointment
        </a>
      </div>
    </div>
  );
}