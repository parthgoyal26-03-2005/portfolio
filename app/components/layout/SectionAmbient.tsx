import { cn } from "@/app/lib/utils";

type SectionAmbientProps = {
  variant?: "purple" | "blue" | "dual";
  className?: string;
};

export function SectionAmbient({
  variant = "dual",
  className,
}: SectionAmbientProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden
    >
      {(variant === "purple" || variant === "dual") && (
        <div className="absolute -top-[10%] -right-[10%] h-[min(400px,55vw)] w-[min(400px,55vw)] rounded-full bg-primary/7 blur-[140px]" />
      )}
      {(variant === "blue" || variant === "dual") && (
        <div className="absolute -bottom-[10%] -left-[10%] h-[min(360px,50vw)] w-[min(360px,50vw)] rounded-full bg-secondary/6 blur-[140px]" />
      )}
    </div>
  );
}
