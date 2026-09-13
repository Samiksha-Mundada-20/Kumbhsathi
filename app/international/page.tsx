'use client';

import React from 'react';
import { Globe, Plane, DollarSign, HeartHandshake, ShieldCheck, Compass } from 'lucide-react';
import { PageShell, SectionTitle, InfoCard } from '../../components/site/PageShell';
import { Button } from '../../components/ui/button';
import Link from 'next/link';

export default function InternationalPage() {
  return (
    <PageShell
      eyebrow="International"
      title="Guide for international visitors and diaspora yatris"
      description="Clear guidance on e-visas, foreign exchange, cultural customs, and reaching Nashik smoothly from Mumbai and Delhi international airports."
    >
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard title="Airport Entry & Transit" meta="Arrival Logistics" icon={<Plane className="w-5 h-5 text-primary" />}>
          Fly into Mumbai (BOM) or New Delhi (DEL). From Mumbai CSMT, express trains reach Nashik Road in ~3.5 hours. Alternatively, regional flights fly direct to Nashik Ozar (ISK).
        </InfoCard>

        <InfoCard title="Currency & Cash" meta="Financial Planning" icon={<DollarSign className="w-5 h-5 text-primary" />} accent>
          Foreign cards and digital wallets frequently experience terminal failures in mela zones. Withdraw Indian Rupees (₹) at Mumbai airport ATMs before entering Nashik.
        </InfoCard>

        <InfoCard title="Sacred Ghat Etiquette" meta="Cultural Norms" icon={<HeartHandshake className="w-5 h-5 text-primary" />}>
          Modest traditional dress (covering shoulders and knees) is expected across all ghats and temples. Always remove footwear before stepping onto ghat stone steps.
        </InfoCard>

        <InfoCard title="Health & Drinking Water" meta="Wellbeing" icon={<ShieldCheck className="w-5 h-5 text-primary" />}>
          Consume sealed bottled water or municipal RO filtered booths. Strictly avoid raw unpeeled food from roadside stalls during humid gathering days.
        </InfoCard>

        <InfoCard title="Sim Card & Roaming" meta="Communications" icon={<Globe className="w-5 h-5 text-primary" />}>
          Acquire an Indian physical SIM or eSIM (Jio / Airtel) at the international arrival terminal. Ensure you bookmark this app offline before heading to Ramkund.
        </InfoCard>

        <InfoCard title="Language & Translation" meta="Local Support" icon={<Compass className="w-5 h-5 text-primary" />}>
          Marathi and Hindi are primary languages. Police assistance booths and Kumbh help desks have English-speaking liaison officers for international yatris.
        </InfoCard>
      </section>
    </PageShell>
  );
}
