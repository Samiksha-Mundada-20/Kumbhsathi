import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageShell({
  eyebrow,
  title,
  description,
  actions,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <header className="glass relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-12 border border-border/70">
        <div aria-hidden className="blob top-[-6rem] right-[-4rem] h-64 w-64 bg-primary/25" />
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-3xl leading-[1.1] font-semibold text-balance sm:text-5xl font-display">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
        {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
      </header>

      <div className="mt-10 space-y-10 sm:mt-14 sm:space-y-14">{children}</div>
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 text-2xl font-semibold text-balance sm:text-3xl font-display">{title}</h2>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export function InfoCard({
  title,
  meta,
  children,
  icon,
  accent,
}: {
  title: string;
  meta?: string;
  children?: ReactNode;
  icon?: ReactNode;
  accent?: boolean;
}) {
  return (
    <article
      className={cn(
        "card-surface card-hover flex flex-col gap-3 p-6",
        accent && "border-primary/30 bg-accent/40",
      )}
    >
      {icon && (
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground [&_svg]:h-5 [&_svg]:w-5">
          {icon}
        </span>
      )}
      <div className="min-w-0">
        <h3 className="text-lg leading-snug font-semibold">{title}</h3>
        {meta && <p className="mt-1 text-xs tracking-wide text-primary uppercase font-medium">{meta}</p>}
      </div>
      {children && (
        <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
      )}
    </article>
  );
}
