import { cn } from "@/app/lib/utils";

export function TechChip({
  children,
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 font-mono-label text-[11px] sm:text-xs",
        variant === "primary" && "border border-primary/30 text-primary",
        variant === "secondary" && "border border-secondary/30 text-secondary",
        variant === "outline" && "border border-glass-stroke text-on-surface-variant",
        className,
      )}
    >
      {children}
    </span>
  );
}
