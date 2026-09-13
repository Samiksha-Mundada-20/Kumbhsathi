'use client';

import React from 'react';
import { MapPin, Navigation, Clock, Compass, ExternalLink } from 'lucide-react';
import { PageShell, SectionTitle, InfoCard } from '../../components/site/PageShell';
import { Button } from '../../components/ui/button';

const spots = [
  {
    name: "Trimbakeshwar Jyotirlinga",
    distance: "28 km west of Nashik",
    duration: "45-60 min via bus / taxi",
    desc: "One of the twelve sacred Jyotirlingas of Lord Shiva. Origin of river Godavari and site of Trimbak Shahi Snans.",
    highlight: "Kushavarta Kund & Akhada ashrams",
  },
  {
    name: "Panchavati & Sita Gumpha",
    distance: "Walking distance from Ramkund (800m)",
    duration: "10 min walk",
    desc: "Site where Lord Rama, Sita, and Lakshmana stayed in exile. Features the historic black stone Kalaram Temple.",
    highlight: "Kalaram Mandir, 5 sacred Banyan trees",
  },
  {
    name: "Saptashrungi Devi (Vani)",
    distance: "65 km north of Nashik",
    duration: "1.5 hours via MSRTC direct bus",
    desc: "One of the 3.5 Shaktipeeths of Maharashtra, located atop a cliff with 510 steps or funicular trolley ropeway.",
    highlight: "Panoramic Sahyadri views & ropeway",
  },
  {
    name: "Anjaneri Hills",
    distance: "20 km on Trimbak road",
    duration: "30 min drive",
    desc: "Sacred birthplace of Lord Hanuman. Scenic mountain trek with ancient Jain caves and temples along the trail.",
    highlight: "Hanuman temple summit trek",
  },
  {
    name: "Tapovan Sacred Grove",
    distance: "2.5 km east of Ramkund",
    duration: "15 min walk or shared auto",
    desc: "Where Lakshmana cut Surpanakha's nose. Hub of Kumbh tent cities, sadhugram, and evening spiritual discourses.",
    highlight: "Kapila-Godavari sangam, sadhugrams",
  },
  {
    name: "Muktidham Temple",
    distance: "Nashik Road (near station)",
    duration: "5 min from station",
    desc: "Pure white Makrana marble temple replicating all 12 Jyotirlingas and 18 chapters of Gita inscribed on walls.",
    highlight: "Convenient darshan on arrival / departure",
  },
];

export default function NearbyPage() {
  return (
    <PageShell
      eyebrow="Nearby"
      title="Sacred temples and day trips around Nashik"
      description="Plan excursions to Trimbakeshwar, Panchavati, Saptashrungi, and Anjaneri without disrupting your snan schedule."
    >
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {spots.map((spot) => (
          <article
            key={spot.name}
            className="card-surface card-hover p-6 border border-border/80 flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {spot.distance}
              </span>

              <h3 className="text-lg font-semibold font-display text-foreground mt-3">{spot.name}</h3>

              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
                <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span>{spot.duration}</span>
              </div>

              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{spot.desc}</p>
            </div>

            <div className="mt-5 pt-3 border-t border-border/80 text-xs text-primary font-medium">
              Key Darshan: {spot.highlight}
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
