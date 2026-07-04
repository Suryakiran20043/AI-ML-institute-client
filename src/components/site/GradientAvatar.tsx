import { cn } from "@/lib/utils";

export function GradientAvatar({
  name,
  size = "lg",
  className,
}: {
  name: string;
  size?: "md" | "lg" | "xl";
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const sizeClass = {
    md: "h-14 w-14 text-lg",
    lg: "h-20 w-20 text-2xl",
    xl: "h-28 w-28 text-3xl",
  }[size];

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full p-[3px] bg-gradient-brand shadow-glow",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-navy font-display font-bold text-white",
          sizeClass,
        )}
      >
        {initials}
      </div>
    </div>
  );
}
