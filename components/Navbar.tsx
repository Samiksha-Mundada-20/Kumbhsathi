'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Flame } from 'lucide-react';
import { navItems } from './site/nav';
import { cn } from '@/lib/utils';

export function BrandMark() {
  return (
    <Link href="/" className="group flex min-w-0 items-center gap-2.5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-saffron text-white shadow-glow transition-transform duration-200 group-hover:-translate-y-0.5">
        <Flame className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block truncate font-display text-lg leading-tight font-semibold text-foreground">
          KumbhSathi
        </span>
        <span className="block truncate text-[11px] tracking-[0.16em] text-primary font-semibold uppercase">
          Nashik 2027
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      <div className="glass border-x-0 border-t-0 bg-card/85 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <BrandMark />

          <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-1 xl:flex">
              {navItems.slice(0, 8).map((item) => {
                const isActive = pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    href={item.to}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:bg-accent/70 hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/sathi-ai"
              className="hidden rounded-full bg-saffron px-4 py-2 text-sm font-medium text-white shadow-glow transition-transform duration-200 hover:-translate-y-0.5 sm:inline-flex"
            >
              Ask Sathi AI
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-card/70 text-foreground transition-colors hover:border-primary/50 hover:bg-accent/60 cursor-pointer"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="glass mx-3 mt-2 rounded-3xl p-4 sm:mx-6 border border-border/80 shadow-raised animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {navItems.map((item) => {
              const isActive = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-2xl px-4 py-3 transition-colors duration-200 hover:bg-accent/70",
                    isActive && "bg-accent border border-primary/20"
                  )}
                >
                  <span className="block text-sm font-semibold text-foreground">{item.label}</span>
                  <span className="block truncate text-xs text-muted-foreground mt-0.5">{item.hint}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}