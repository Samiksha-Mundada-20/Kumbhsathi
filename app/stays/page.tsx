'use client';

import React, { useState } from 'react';
import { Tent, Footprints, ExternalLink, MapPin, Building2, ArrowRight } from 'lucide-react';
import { PageShell, SectionTitle } from '../../components/site/PageShell';
import { Button } from '../../components/ui/button';
import { stayOptions } from '../../data/stays';
import { cn } from '../../lib/utils';
import Link from 'next/link';

export default function StaysPage() {
  const [areaFilter, setAreaFilter] = useState<string>("All");

  const areas = ["All", "Ramkund", "Panchavati", "Tapovan", "Trimbakeshwar", "Nashik Road"];

  const filtered = stayOptions.filter((s) => {
    return areaFilter === "All" || s.area === areaFilter;
  });

  return (
    <PageShell
      eyebrow="Stays"
      title="Dharamshalas, tent cities and verified stays"
      description="Stay close enough to walk to the ghat at 4:00 AM without worrying about road closures or night taxis."
      actions={
        <Button asChild variant="hero">
          <Link href="/#planner" className="flex items-center gap-2">
            <span>Calculate Stay in Full Budget</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      }
    >
      {/* Area Filter */}
      <section className="space-y-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-primary block">
          Filter by Ghat / Sector:
        </label>
        <div className="flex flex-wrap gap-2">
          {areas.map((a) => (
            <button
              key={a}
              onClick={() => setAreaFilter(a)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
                areaFilter === a
                  ? "border-primary bg-saffron text-white shadow-glow"
                  : "border-border bg-card/70 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              {a}
            </button>
          ))}
        </div>
      </section>

      {/* Stay Cards */}
      <section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <article
              key={s.id}
              className="card-surface card-hover p-6 border border-border/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-border/80 pb-3 mb-3">
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase font-mono font-medium">
                    {s.type}
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-mono font-bold text-primary">₹{s.pricePerNight}</span>
                    <span className="text-[11px] text-muted-foreground block">/ night</span>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-foreground font-display">{s.name}</h3>

                <div className="flex items-center gap-1.5 text-xs text-primary font-medium mt-2">
                  <Footprints className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{s.ghatReference}</span>
                </div>

                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{s.notes}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-border/80 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{s.area}</span>
                <a
                  href={s.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline"
                >
                  <span>Check Availability</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
