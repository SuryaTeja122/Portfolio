interface BadgeProps {
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function Badge({ label, variant = "primary" }: BadgeProps) {
  const bgColor =
    variant === "primary"
      ? "bg-[#00F0FF]/20 border-[#00F0FF]/50 text-[#00F0FF]"
      : "bg-[#B200FF]/20 border-[#B200FF]/50 text-[#B200FF]";

  return (
    <div
      className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border font-mono text-[0.65rem] sm:text-xs uppercase tracking-widest ${bgColor} transition-all duration-300 hover:scale-105 whitespace-nowrap`}
    >
      {label}
    </div>
  );
}
