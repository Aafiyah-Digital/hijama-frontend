interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline";
}

export default function Button({
  children,
  href,
  variant = "primary",
}: ButtonProps) {
  const base =
    "block w-full py-3 rounded-xl font-semibold text-center transition";

  const styles =
    variant === "primary"
      ? "bg-white text-black hover:opacity-90"
      : "border border-white hover:bg-white hover:text-black";

  if (href) {
    return (
      <a href={href} className={`${base} ${styles}`}>
        {children}
      </a>
    );
  }

  return (
    <button className={`${base} ${styles}`}>
      {children}
    </button>
  );
}