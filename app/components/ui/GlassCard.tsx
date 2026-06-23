import { cn } from "@/app/lib/utils";

type GlassCardProps = React.ComponentProps<"div"> & {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  rounded?: "xl" | "2xl" | "3xl";
};

const paddingMap = {
  none: "",
  sm: "p-4 sm:p-5",
  md: "p-6 sm:p-8",
  lg: "p-8 sm:p-10",
};

const roundedMap = {
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
};

export function GlassCard({
  className,
  children,
  hover = false,
  padding = "none",
  rounded = "2xl",
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card",
        roundedMap[rounded],
        paddingMap[padding],
        hover &&
          "neon-border-hover transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-0.5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
