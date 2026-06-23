import { FadeIn } from "@/app/components/animations/FadeIn";
import { cn } from "@/app/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  highlight?: React.ReactNode;
  description?: string;
  aside?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  aside,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <FadeIn
      className={cn(
        "mb-12 md:mb-16 lg:mb-20",
        align === "center" && "text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-6",
          aside && align === "left" && "md:flex-row md:items-end md:justify-between",
          align === "center" && "items-center",
        )}
      >
        <div className={cn(align === "center" && "max-w-3xl")}>
          {eyebrow && (
            <div
              className={cn(
                "mb-4 flex items-center gap-3",
                align === "center" && "justify-center",
              )}
            >
              <span className="h-px w-12 bg-primary" />
              <span className="font-mono-label text-primary">{eyebrow}</span>
            </div>
          )}
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
            {highlight && (
              <>
                {" "}
                <span className="gradient-text">{highlight}</span>
              </>
            )}
          </h2>
          {description && (
            <p
              className={cn(
                "mt-4 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg sm:leading-8",
                align === "center" && "mx-auto",
              )}
            >
              {description}
            </p>
          )}
        </div>
        {aside && (
          <p
            className={cn(
              "shrink-0 font-mono-label text-text-muted",
              align === "center" ? "text-center" : "md:text-right",
            )}
          >
            {aside}
          </p>
        )}
      </div>
    </FadeIn>
  );
}
