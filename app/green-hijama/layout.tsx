export default function ClinicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#2e8b14] text-white flex flex-col">
      
      <header className="py-6 text-center border-b border-white/20">
        <h1 className="text-2xl font-bold text-white">
          Green Hijama Clinic
        </h1>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        {children}
      </main>

      <footer className="py-6 text-center border-t border-white/20 opacity-80">
        © {new Date().getFullYear()} Green Hijama Clinic
      </footer>

    </div>
  );
}