import Button from "@/app/components/Button";
export default function GreenHijama() {
  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <h2 className="text-4xl font-extrabold">
        Welcome
      </h2>

      <p className="opacity-90">
        Professional Hijama therapy in London.
      </p>

      <div className="space-y-4">
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