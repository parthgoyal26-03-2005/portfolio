import { cn } from "@/app/lib/utils";

export function LiveBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const isLive = status === "Live";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider backdrop-blur-md",
        isLive
          ? "border-primary/30 bg-primary/10 text-primary"
          : "border-secondary/30 bg-secondary/10 text-secondary",
        className,
      )}
    >
      {isLive && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_#d2bbff]" />
        </span>
      )}
      {status}
    </span>
  );
}
