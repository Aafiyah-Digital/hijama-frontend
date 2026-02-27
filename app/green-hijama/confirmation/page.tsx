export default function ConfirmationPage() {
  return (
    <div className="w-full max-w-xl bg-white/10 rounded-2xl p-10 text-center">
      <h2 className="text-2xl font-bold mb-6">
        Booking Confirmed 🎉
      </h2>

      <p className="text-white/80 mb-8">
        Your appointment has been received.
        We will contact you shortly to confirm.
      </p>

      <a
        href="/green-hijama"
        className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold"
      >
        Back to Home
      </a>
    </div>
  );
}