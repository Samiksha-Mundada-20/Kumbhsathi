import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  CalendarDays, 
  MapPinned, 
  Train, 
  Tent, 
  Wallet, 
  ShieldCheck, 
  Users, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { PlannerForm } from '../components/PlannerForm';
import { InfoCard, SectionTitle } from '../components/site/PageShell';
import { Button } from '../components/ui/button';

const features = [
  {
    to: "/events",
    icon: <CalendarDays />,
    title: "Snan & aarti calendar",
    body: "Shahi snan dates, akhada processions and daily Godavari aartis with reminders.",
  },
  {
    to: "/map",
    icon: <MapPinned />,
    title: "Ghat & sector map",
    body: "Ramkund, Tapovan and Trimbakeshwar sectors with entry gates and help desks.",
  },
  {
    to: "/travel",
    icon: <Train />,
    title: "Getting to Nashik",
    body: "Special trains, ST buses, shuttle loops and parking clusters, with live crowd notes.",
  },
  {
    to: "/stays",
    icon: <Tent />,
    title: "Stays & dharamshalas",
    body: "Tent city blocks, dharamshalas and hotels sorted by walk time to the ghat.",
  },
  {
    to: "/budget",
    icon: <Wallet />,
    title: "Yatra budget",
    body: "Split travel, stay, prasad and seva so the whole group knows where money went.",
  },
  {
    to: "/safety",
    icon: <ShieldCheck />,
    title: "Safety & helplines",
    body: "Crowd flow rules, lost & found points and one-tap emergency numbers.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-10 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-border bg-warm shadow-raised">
          <div aria-hidden="true" className="blob top-[-8rem] left-[-6rem] h-96 w-96 bg-primary/30" />
          <div aria-hidden="true" className="blob right-[-6rem] bottom-[-8rem] h-96 w-96 bg-marigold/40" />

          <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:p-14">
            <div className="min-w-0">
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Simhastha Kumbh Mela · Nashik–Trimbakeshwar
              </span>

              <h1 className="mt-6 text-4xl leading-[1.05] font-semibold text-balance sm:text-6xl lg:text-[4.25rem] font-display text-foreground">
                Walk the ghats <span className="text-primary">without the worry.</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                KumbhSathi holds your snan dates, route, stay, budget and family in one place — so
                your mind stays on the Godavari, not the logistics.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="lg">
                  <Link href="#planner">Start my yatra plan</Link>
                </Button>
                <Button asChild variant="glass" size="lg">
                  <Link href="/sathi-ai">Ask Sathi AI</Link>
                </Button>
              </div>

              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
                {[
                  ["6", "Shahi snan days"],
                  ["48", "Ghat sectors"],
                  ["24×7", "Help desks"],
                ].map(([value, label]) => (
                  <div key={label} className="glass rounded-2xl px-4 py-3 border border-border/60">
                    <dt className="font-display text-2xl font-semibold text-primary">{value}</dt>
                    <dd className="mt-0.5 text-xs text-muted-foreground">{label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-border/70 shadow-raised aspect-[4/3]">
                <Image
                  src="/assets/hero-kumbh.jpg"
                  alt="Pilgrims bathing and praying at the Ramkund ghats on the Godavari in Nashik"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="glass absolute right-4 bottom-4 left-4 rounded-2xl px-4 py-3 sm:left-auto sm:w-64 border border-border/80">
                <p className="text-xs tracking-[0.16em] text-primary uppercase font-semibold">Next shahi snan</p>
                <p className="mt-1 font-display text-lg font-semibold text-foreground">Amavasya · 4:30 AM</p>
                <p className="text-xs text-muted-foreground">Ramkund · Sector 3 entry</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Out-of-town Planner Form */}
      <section id="planner" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PlannerForm />
      </section>

      {/* Thirteen Tools / Features Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Everything in one thread"
          title="Thirteen small tools, one steady yatra"
          description="Each part of KumbhSathi does one thing well and hands you off to the next."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Link key={f.to} href={f.to} className="group block">
              <InfoCard title={f.title} icon={f.icon}>
                {f.body}
                <span className="mt-3 block text-sm font-medium text-primary group-hover:underline">
                  Open &rarr;
                </span>
              </InfoCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Two Illustration Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Travel Card */}
          <div className="card-surface card-hover overflow-hidden p-8 border border-border/80">
            <div className="relative w-full max-w-md mx-auto aspect-[4/3]">
              <Image
                src="/assets/illus-travel.png"
                alt="Pilgrims boarding a special train coach to Nashik"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="mt-6 text-2xl font-semibold font-display text-foreground">
              Arrive calm, not crushed
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Special train timings, ST bus bays and shuttle loops, mapped to the nearest ghat entry
              so you never walk the long way in.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/travel">See travel routes</Link>
            </Button>
          </div>

          {/* Family Card */}
          <div className="card-surface card-hover overflow-hidden bg-ink p-8 text-white border border-border/60">
            <div className="relative w-full max-w-md mx-auto aspect-[4/3]">
              <Image
                src="/assets/illus-family.png"
                alt="An Indian family walking together at the mela"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="mt-6 text-2xl font-semibold font-display text-white">
              Nobody gets lost
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Share a family circle, set a meeting ghat, and check in with one tap — even the elders
              can do it.
            </p>
            <Button asChild variant="hero" className="mt-6">
              <Link href="/family" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Set up family circle</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Nashik Ground Realities */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="card-surface p-6 sm:p-10 border border-border/80 space-y-6">
          <div className="space-y-1">
            <p className="eyebrow">Operational Reality</p>
            <h2 className="text-2xl sm:text-3xl font-semibold font-display text-foreground flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-primary" />
              <span>What Travel Portals Don&apos;t Tell You</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Crucial on-ground facts to prepare yourself and your family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-muted-foreground">
            <div className="bg-card/70 p-5 rounded-2xl border border-border/70 space-y-2">
              <h4 className="font-semibold text-foreground text-base">
                Ramkund vs. Trimbakeshwar Distance (28 km)
              </h4>
              <p className="text-xs leading-relaxed">
                Trimbakeshwar Jyotirlinga is <strong>28 km away</strong> from Ramkund (Nashik city). During Shahi Snan days, vehicular entry between Nashik and Trimbakeshwar is strictly regulated to official shuttles. Plan each location on separate days.
              </p>
            </div>

            <div className="bg-card/70 p-5 rounded-2xl border border-border/70 space-y-2">
              <h4 className="font-semibold text-foreground text-base">
                Mobile Network Congestion on Snan Days
              </h4>
              <p className="text-xs leading-relaxed">
                4G/5G mobile towers around Ramkund experience saturation when millions gather. <strong>Save your plan on KumbhSathi</strong>; the PWA functions 100% offline from your phone&apos;s local cache.
              </p>
            </div>

            <div className="bg-card/70 p-5 rounded-2xl border border-border/70 space-y-2">
              <h4 className="font-semibold text-foreground text-base">
                Pedestrian Barricaded Corridors
              </h4>
              <p className="text-xs leading-relaxed">
                Vehicles stop at outer holding zones (Dwarka, Nashik Road, Tapovan). Yatris walk the final 1.5 to 3 km through one-way barricaded holding lines. Wear comfortable slip-on sandals.
              </p>
            </div>

            <div className="bg-card/70 p-5 rounded-2xl border border-border/70 space-y-2">
              <h4 className="font-semibold text-foreground text-base">
                Dharamshalas &amp; Satvik Annachhatras
              </h4>
              <p className="text-xs leading-relaxed">
                Clean drinking water and free satvik meals are served round the clock at trust Annachhatras across Panchavati and Tapovan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}