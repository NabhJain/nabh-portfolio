import { cn } from "@/libs/utils";
import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

export function GlassCard({ className, interactive, children, ...rest }: Props) {
  return (
    <div
      {...rest}
      className={cn(
        "glass relative overflow-hidden rounded-2xl",
        interactive &&
          "group transition-all duration-300 hover:border-electric/40 hover:bg-white/[0.04] hover:shadow-glow",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </div>
  );
}
