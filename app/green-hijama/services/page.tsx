export default function Services() {
  return (
    <div className="max-w-xl w-full space-y-8">
      <h2 className="text-3xl font-bold text-center">
        Services & Pricing
      </h2>

      <div className="bg-white/10 rounded-xl p-6">
        <h3 className="font-semibold text-lg">Full Body Hijama</h3>
        <p className="text-white/80 text-sm">60 minutes</p>
        <p className="font-bold mt-2">£60</p>
      </div>

      <div className="bg-white/10 rounded-xl p-6">
        <h3 className="font-semibold text-lg">Sunnah Hijama</h3>
        <p className="text-white/80 text-sm">45 minutes</p>
        <p className="font-bold mt-2">£45</p>
      </div>

      <a
        href="/green-hijama/book"
        className="block mt-8 bg-white text-black text-center py-3 rounded-xl font-semibold hover:opacity-90 transition"
      >
        Book Now
      </a>
    </div>
  );
}