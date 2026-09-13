'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Navigation, HelpCircle, Shield, Info } from 'lucide-react';
import { PageShell, SectionTitle } from '../../components/site/PageShell';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

const MapComponent = dynamic(() => import('../../components/Map'), { ssr: false });

const sectors = [
  {
    name: "Ramkund Main Ghat",
    lat: 19.9975,
    lng: 73.7898,
    desc: "Primary holy dip zone for pilgrims and evening Godavari Maha Aarti.",
    gate: "Gate 1 & Gate 2",
    helpline: "Control Room: 0253-2575555",
  },
  {
    name: "Tapovan Sacred Bath Zone",
    lat: 19.9922,
    lng: 73.8055,
    desc: "Sadhugram tent cities, akhada encampments, and open bhajan mandals.",
    gate: "Gate 5 & 6 (Aurangabad Road)",
    helpline: "Medical Booth 3",
  },
  {
    name: "Trimbakeshwar Kushavarta",
    lat: 19.9325,
    lng: 73.5305,
    desc: "Source of Godavari river, Jyotirlinga temple, and holy Kushavarta kund.",
    gate: "Akhada Shahi Lane",
    helpline: "Trimbak Police: 02594-222033",
  },
  {
    name: "Nashik Road Station Holding Zone",
    lat: 19.9572,
    lng: 73.8344,
    desc: "Primary railway transit hub, shuttle bus bays to Panchavati.",
    gate: "Main Concourse Exit",
    helpline: "Railway RPF: 139",
  },
];

export default function MapPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeSector = sectors[activeIdx];

  return (
    <PageShell
      eyebrow="Map"
      title="Ghats, holding sectors and walking corridors"
      description="Interactive coordinate map for Ramkund, Tapovan and Trimbakeshwar to help you navigate one-way barricades."
    >
      <section className="space-y-6">
        {/* Sector selection pills */}
        <div className="flex flex-wrap gap-2">
          {sectors.map((s, idx) => (
            <button
              key={s.name}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
                activeIdx === idx
                  ? "border-primary bg-saffron text-white shadow-glow"
                  : "border-border bg-card/70 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Map View */}
        <div className="card-surface p-4 sm:p-6 border border-border/80 shadow-raised space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
            <div>
              <h3 className="text-lg font-semibold font-display text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>{activeSector.name}</span>
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">{activeSector.desc}</p>
            </div>
            <div className="text-xs text-right">
              <span className="font-semibold text-foreground block">Key Entry: {activeSector.gate}</span>
              <span className="text-primary font-mono">{activeSector.helpline}</span>
            </div>
          </div>

          <MapComponent
            key={activeSector.name}
            lat={activeSector.lat}
            lng={activeSector.lng}
            zoom={15}
            title={activeSector.name}
            description={activeSector.desc}
          />
        </div>

        {/* Sector details cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s, i) => (
            <div
              key={s.name}
              onClick={() => setActiveIdx(i)}
              className={cn(
                "card-surface p-4 border transition-all cursor-pointer",
                activeIdx === i ? "border-primary bg-accent/40 ring-1 ring-primary/40" : "border-border hover:border-primary/40"
              )}
            >
              <h4 className="font-semibold text-sm text-foreground">{s.name}</h4>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.desc}</p>
              <span className="text-[11px] text-primary mt-2 block font-medium">
                {s.gate}
              </span>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
