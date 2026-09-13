'use client';

import React, { useState } from 'react';
import { Bell, Clock, Flame, Music, Sunrise, MapPin, CheckCircle2 } from 'lucide-react';
import { InfoCard, PageShell, SectionTitle } from '../../components/site/PageShell';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import { kumbhEvents } from '../../data/events';

const filters = ["All", "Shahi Snan", "Aarti", "Ceremony", "Cultural"] as const;

export default function EventsPage() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const [reminded, setReminded] = useState(false);

  const shown = kumbhEvents.filter((e) => active === "All" || e.type === active);

  return (
    <PageShell
      eyebrow="Calendar"
      title="Every snan, aarti and procession — in order"
      description="Official schedule verified from Maharashtra State Kumbh Cell and Nashik District Gazette."
      actions={
        <Button
          variant="hero"
          onClick={() => setReminded(true)}
          className="cursor-pointer"
        >
          <Bell className="h-4 w-4" />
          <span>{reminded ? "✓ Notifications Enabled" : "Remind me for shahi snans"}</span>
        </Button>
      }
    >
      <section>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
                active === f
                  ? "border-primary bg-saffron text-white shadow-glow"
                  : "border-border bg-card/70 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {shown.map((e) => (
            <article
              key={e.id}
              className="card-surface card-hover grid gap-5 p-6 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center border border-border/80"
            >
              <div className="flex items-center gap-3 sm:block">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground">
                  {e.type === "Aarti" ? (
                    <Flame className="h-5 w-5 text-primary" />
                  ) : e.type === "Cultural" ? (
                    <Music className="h-5 w-5 text-primary" />
                  ) : (
                    <Sunrise className="h-5 w-5 text-primary" />
                  )}
                </span>
                <p className="mt-2 text-xs tracking-[0.16em] text-muted-foreground uppercase font-mono font-medium">
                  {e.date}
                </p>
              </div>

              <div className="min-w-0">
                <p className="eyebrow">
                  {e.type} · {e.date}
                </p>
                <h3 className="mt-1 text-lg font-semibold font-display text-foreground">{e.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{e.location}</span>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Source: <strong className="text-foreground">{e.source}</strong> ({e.sourceStatus})
                </p>
              </div>

              <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-white">
                  <Clock className="h-3.5 w-3.5 text-primary" /> {e.time}
                </span>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  Official Gazette
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="Before you go"
          title="Small things that make the snan easier"
          description="Tried-and-tested advice from local authorities and volunteer seva mandals."
        />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard title="Reach two hours early" meta="Shahi snan days">
            Barricades close in phases from 2:00 AM. Late arrivals get routed to outer holding areas.
          </InfoCard>
          <InfoCard title="Carry a dry set" meta="Ghat kit">
            One cloth bag, dry clothes, towel, Aadhaar copy and water bottle is all you should hold in the crowd.
          </InfoCard>
          <InfoCard title="Fix a meeting point" meta="With family" accent>
            Pick a numbered pole or emergency tent near your exit gate and agree on it before entering.
          </InfoCard>
        </div>
      </section>
    </PageShell>
  );
}
