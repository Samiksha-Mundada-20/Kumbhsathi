import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "hero" | "destructive" | "outline" | "secondary" | "soft" | "glass" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const getVariantClasses = (variant: ButtonProps["variant"] = "default") => {
  switch (variant) {
    case "hero":
      return "bg-saffron text-primary-foreground shadow-glow hover:-translate-y-0.5 hover:brightness-105";
    case "destructive":
      return "bg-destructive text-destructive-foreground shadow-soft hover:bg-destructive/90 hover:-translate-y-0.5";
    case "outline":
      return "border border-border bg-card/70 text-foreground shadow-soft hover:border-primary/50 hover:bg-accent/60 hover:-translate-y-0.5";
    case "secondary":
      return "bg-secondary text-secondary-foreground shadow-soft hover:bg-secondary/88 hover:-translate-y-0.5";
    case "soft":
      return "bg-accent/70 text-accent-foreground hover:bg-accent";
    case "glass":
      return "glass text-foreground hover:border-primary/40 hover:-translate-y-0.5";
    case "ghost":
      return "hover:bg-accent/70 hover:text-accent-foreground";
    case "link":
      return "text-primary underline-offset-4 hover:underline rounded-md";
    case "default":
    default:
      return "bg-primary text-primary-foreground shadow-soft hover:bg-primary/92 hover:-translate-y-0.5 hover:shadow-glow";
  }
};

const getSizeClasses = (size: ButtonProps["size"] = "default") => {
  switch (size) {
    case "sm":
      return "h-9 px-4 text-xs";
    case "lg":
      return "h-12 px-7 text-base";
    case "icon":
      return "h-10 w-10 p-0";
    case "default":
    default:
      return "h-10 px-5 py-2 text-sm";
  }
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium cursor-pointer transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:size-4 [&_svg]:shrink-0";

    const computedClass = cn(baseClasses, getVariantClasses(variant), getSizeClasses(size), className);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: cn(computedClass, (children as React.ReactElement<{ className?: string }>).props.className),
      });
    }

    return (
      <button ref={ref} className={computedClass} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
