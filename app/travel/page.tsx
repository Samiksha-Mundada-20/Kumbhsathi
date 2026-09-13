'use client';

import React, { useState } from 'react';
import { Train, Bus, Plane, Clock, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { PageShell, SectionTitle } from '../../components/site/PageShell';
import { Button } from '../../components/ui/button';
import { travelOptions, searchCities } from '../../data/travel-options';
import { cn } from '../../lib/utils';
import Link from 'next/link';

export default function TravelPage() {
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [selectedMode, setSelectedMode] = useState<string>("All");

  const filtered = travelOptions.filter((t) => {
    const cityMatch = t.originCity.toLowerCase() === selectedCity.toLowerCase();
    const modeMatch = selectedMode === "All" || t.mode === selectedMode;
    return cityMatch && modeMatch;
  });

  return (
    <PageShell
      eyebrow="Travel"
      title="How to reach Nashik without confusion"
      description="Direct trains, express state transport buses, and regional flights from 8 major hubs — with real travel times and booking links."
      actions={
        <Button asChild variant="hero">
          <Link href="/#planner" className="flex items-center gap-2">
            <span>Calculate Full Group Travel Budget</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      }
    >
      {/* Origin City Pills */}
      <section className="space-y-4">
        <label className="text-xs font-semibold uppercase tracking-wider text-primary block">
          Select Your Hub City:
        </label>
        <div className="flex flex-wrap gap-2">
          {searchCities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
                selectedCity === city
                  ? "border-primary bg-saffron text-white shadow-glow"
                  : "border-border bg-card/70 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Mode filter */}
        <div className="flex items-center gap-2 pt-2">
          <span className="text-xs text-muted-foreground">Mode:</span>
          {["All", "Train", "Bus", "Flight"].map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMode(m)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border cursor-pointer",
                selectedMode === m
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </section>

      {/* Route Cards */}
      <section className="space-y-4">
        <div className="grid gap-5 sm:grid-cols-2">
          {filtered.map((t) => (
            <article
              key={t.id}
              className="card-surface card-hover p-6 border border-border/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-border/80 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                      {t.mode === 'Train' ? <Train className="w-5 h-5 text-primary" /> : t.mode === 'Bus' ? <Bus className="w-5 h-5 text-primary" /> : <Plane className="w-5 h-5 text-primary" />}
                    </span>
                    <div>
                      <span className="text-xs uppercase font-mono text-muted-foreground">{t.mode}</span>
                      <h3 className="text-base font-semibold text-foreground font-display">{t.operatorName}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-mono font-bold text-primary">₹{t.farePerPerson}</span>
                    <span className="text-[11px] text-muted-foreground block">one-way</span>
                  </div>
                </div>

                <p className="text-sm font-semibold text-foreground">{t.summary}</p>
                <p className="text-xs text-muted-foreground mt-1">{t.routeDetails}</p>

                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    {Math.floor(t.durationMinutes / 60)}h {t.durationMinutes % 60}m
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {t.destinationCity}
                  </span>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-accent/40 text-xs space-y-1 border border-border/50">
                  <div className="text-leaf font-medium">
                    <strong>Pros:</strong> {t.pros}
                  </div>
                  <div className="text-muted-foreground">
                    <strong>Watch out:</strong> {t.cons}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-border/80 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Verified Schedule</span>
                <a
                  href={t.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline"
                >
                  <span>Official Booking Portal</span>
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
