'use client';

import React from 'react';
import { ShieldCheck, PhoneCall, AlertTriangle, Users, HeartPulse, ShieldAlert } from 'lucide-react';
import { PageShell, SectionTitle, InfoCard } from '../../components/site/PageShell';
import { Button } from '../../components/ui/button';

export default function SafetyPage() {
  return (
    <PageShell
      eyebrow="Safety"
      title="Crowd rules, medical booths and emergency helplines"
      description="One-tap emergency dials, lost & found procedures, and practical guidelines to ensure every pilgrim in your group returns safely."
    >
      {/* Emergency Helplines */}
      <section className="space-y-4">
        <SectionTitle
          eyebrow="Direct Helplines"
          title="Emergency Contact Numbers (Toll-Free)"
          description="Keep these numbers saved on your phone and written on physical paper in case of low battery."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
          <div className="card-surface p-6 border border-border/80 text-center space-y-2">
            <ShieldAlert className="w-8 h-8 text-primary mx-auto" />
            <h3 className="font-semibold text-foreground text-sm">Police Control</h3>
            <div className="text-2xl font-mono font-bold text-primary">112</div>
            <p className="text-xs text-muted-foreground">National Emergency Response</p>
          </div>

          <div className="card-surface p-6 border border-border/80 text-center space-y-2">
            <HeartPulse className="w-8 h-8 text-primary mx-auto" />
            <h3 className="font-semibold text-foreground text-sm">Ambulance / Medical</h3>
            <div className="text-2xl font-mono font-bold text-primary">108</div>
            <p className="text-xs text-muted-foreground">Free Emergency Medical Care</p>
          </div>

          <div className="card-surface p-6 border border-border/80 text-center space-y-2">
            <PhoneCall className="w-8 h-8 text-primary mx-auto" />
            <h3 className="font-semibold text-foreground text-sm">Railway Assistance</h3>
            <div className="text-2xl font-mono font-bold text-primary">139</div>
            <p className="text-xs text-muted-foreground">IRCTC &amp; RPF Security</p>
          </div>

          <div className="card-surface p-6 border border-border/80 text-center space-y-2">
            <Users className="w-8 h-8 text-primary mx-auto" />
            <h3 className="font-semibold text-foreground text-sm">Kumbh Control Room</h3>
            <div className="text-xl font-mono font-bold text-primary">0253-2575555</div>
            <p className="text-xs text-muted-foreground">Nashik District Administration</p>
          </div>
        </div>
      </section>

      {/* Ground Guidelines */}
      <section className="space-y-6">
        <SectionTitle
          eyebrow="Crowd Protocol"
          title="Crucial Guidelines for Shahi Snan Crowds"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard title="Follow Barricade Flow" meta="Strict Rule">
            Entry and exit ghat corridors are strictly one-way. Never attempt to push back against the crowd direction.
          </InfoCard>

          <InfoCard title="Physical Cash Only" meta="Connectivity" accent>
            Cellular data stalls during snan gatherings. Carry ₹2,000–₹5,000 in paper notes for emergency food &amp; rides.
          </InfoCard>

          <InfoCard title="Laminated Senior Cards" meta="Family Safety">
            Slip an emergency card into elders&apos; and children&apos;s pockets listing their name, yatra group leader&apos;s phone, and stay address.
          </InfoCard>

          <InfoCard title="Lost & Found Centers" meta="Khoya Paya">
            Official Khoya-Paya camps operate near Ramkund Gate 2 and Tapovan main ground with continuous loudspeaker announcements.
          </InfoCard>

          <InfoCard title="Hydration & ORS" meta="Health">
            Free drinking water is available across municipal points. Carry personal ORS packets for midday dehydration.
          </InfoCard>

          <InfoCard title="Footwear Management" meta="Ghat Etiquette">
            Wear lightweight slip-on footwear and carry a small cloth bag so you can hold your sandals when walking down the ghat steps.
          </InfoCard>
        </div>
      </section>
    </PageShell>
  );
}
