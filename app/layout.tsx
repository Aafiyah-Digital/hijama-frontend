export default function ClinicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      
      {/* Header */}
      <header className="py-6 text-center border-b border-green-600/30">
        <h1 className="text-2xl font-bold tracking-wide text-green-500">
          Green Hijama Clinic
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm border-t border-green-600/30 text-gray-400">
        © {new Date().getFullYear()} Green Hijama Clinic
      </footer>

    </div>
  );
}