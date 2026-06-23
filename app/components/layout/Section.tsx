import { cn } from "@/app/lib/utils";
import { SectionAmbient } from "@/app/components/layout/SectionAmbient";

type SectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  ambient?: "purple" | "blue" | "dual" | "none";
  noPadding?: boolean;
};

export function Section({
  id,
  children,
  className,
  containerClassName,
  ambient = "none",
  noPadding = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        !noPadding && "section-x section-y",
        className,
      )}
    >
      {ambient !== "none" && <SectionAmbient variant={ambient} />}
      <div className={cn("container-site relative z-10", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
