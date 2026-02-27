export default function ClinicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--brand-green)] text-white flex flex-col">
      
      {/* Header */}
      <header className="py-6 text-center border-b border-white/20">
        <h1 className="text-2xl font-bold tracking-wide">
          Green Hijama Clinic
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm border-t border-white/20 opacity-80">
        © {new Date().getFullYear()} Green Hijama Clinic
      </footer>

    </div>
  );
}