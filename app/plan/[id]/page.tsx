'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getPlanById, SavedPlan } from '../../../lib/storage';
import { travelOptions } from '../../../data/travel-options';
import { stayOptions } from '../../../data/stays';
import { 
  ArrowLeft, 
  Printer, 
  Share2, 
  MapPin, 
  Calendar, 
  Users, 
  Banknote, 
  Clock, 
  ShieldAlert, 
  CheckSquare, 
  ExternalLink,
  WifiOff,
  Train,
  Building2
} from 'lucide-react';
import { Button } from '../../../components/ui/button';

const MapComponent = dynamic(() => import('../../../components/Map'), { ssr: false });

export default function PlanDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [plan, setPlan] = useState<SavedPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function fetchPlan() {
      try {
        const found = await getPlanById(id);
        setPlan(found);
      } catch (err) {
        console.error('Error fetching plan:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPlan();
  }, [id]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleShare = async () => {
    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Kumbh Mela 2027 Pilgrimage Plan (${plan?.origin} to Nashik)`,
          text: `Here is my Nashik Kumbh Mela 2027 itinerary for ${plan?.groupSize} pilgrims.`,
          url: window.location.href,
        });
      } catch {
        // user cancelled or share unsupported
      }
    } else if (typeof window !== 'undefined') {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center text-muted-foreground space-y-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm">Loading offline itinerary details...</p>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-semibold font-display text-foreground">Itinerary Not Found</h2>
        <p className="text-sm text-muted-foreground">
          This itinerary may have been cleared from your local device storage.
        </p>
        <Button asChild variant="hero">
          <Link href="/my-plans" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Saved Plans</span>
          </Link>
        </Button>
      </div>
    );
  }

  const travel = travelOptions.find((t) => t.id === plan.selectedTravelId);
  const stay = stayOptions.find((s) => s.id === plan.selectedStayId);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 print:p-0 print:m-0">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6 print:hidden">
        <div>
          <Link
            href="/my-plans"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary text-xs sm:text-sm mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Saved Plans</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-semibold font-display text-foreground">
              {plan.origin} &rarr; Nashik Pilgrimage
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-leaf/10 text-leaf text-xs font-medium border border-leaf/30 flex items-center gap-1">
              <WifiOff className="w-3 h-3" />
              Offline Ready
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handleShare} variant="outline" size="sm">
            <Share2 className="w-4 h-4 text-primary" />
            <span>{copied ? 'Link Copied!' : 'Share'}</span>
          </Button>

          <Button onClick={handlePrint} variant="hero" size="sm">
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card-surface p-4 border border-border/80">
          <span className="text-[11px] text-muted-foreground block uppercase font-mono">Dates</span>
          <div className="text-sm sm:text-base font-bold text-foreground mt-1 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{plan.startDate}</span>
          </div>
          <span className="text-xs text-muted-foreground block">to {plan.endDate}</span>
        </div>

        <div className="card-surface p-4 border border-border/80">
          <span className="text-[11px] text-muted-foreground block uppercase font-mono">Group</span>
          <div className="text-sm sm:text-base font-bold text-foreground mt-1 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-primary" />
            <span>{plan.groupSize} Pilgrims</span>
          </div>
          <span className="text-xs text-muted-foreground block">Family / Yatra</span>
        </div>

        <div className="card-surface p-4 border border-border/80">
          <span className="text-[11px] text-muted-foreground block uppercase font-mono">Est. Cost / Person</span>
          <div className="text-sm sm:text-base font-mono font-bold text-primary mt-1 flex items-center gap-1.5">
            <Banknote className="w-4 h-4 text-primary" />
            <span>₹{plan.totalEstimatedCost.toLocaleString()}</span>
          </div>
          <span className="text-xs text-muted-foreground block">Total: ₹{(plan.totalEstimatedCost * plan.groupSize).toLocaleString()}</span>
        </div>

        <div className="card-surface p-4 border border-border/80">
          <span className="text-[11px] text-muted-foreground block uppercase font-mono">Priority</span>
          <div className="text-sm sm:text-base font-bold text-foreground mt-1 capitalize">
            {plan.preference}
          </div>
          <span className="text-xs text-muted-foreground block">Optimized mode</span>
        </div>
      </div>

      {/* Selected Travel & Stay Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transit */}
        <div className="card-surface p-6 border border-border/80 space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Train className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-foreground text-base font-display">Travel Information</h2>
            </div>
            {travel && (
              <span className="text-xs font-mono font-bold text-primary">
                ₹{travel.farePerPerson} / way
              </span>
            )}
          </div>

          {travel ? (
            <div className="space-y-2 text-xs sm:text-sm text-foreground">
              <p className="font-semibold">{travel.summary}</p>
              <p className="text-muted-foreground">{travel.routeDetails}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                <span>Duration: {Math.floor(travel.durationMinutes / 60)}h {travel.durationMinutes % 60}m</span>
                <span>Drop: {travel.destinationCity}</span>
              </div>
              <p className="text-muted-foreground text-xs bg-accent/40 p-3 rounded-xl mt-2 border border-border/50">
                {travel.notes}
              </p>
              <div className="pt-2 print:hidden">
                <a
                  href={travel.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
                >
                  <span>Official Booking Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No specific travel option selected.</p>
          )}
        </div>

        {/* Stay */}
        <div className="card-surface p-6 border border-border/80 space-y-3">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-foreground text-base font-display">Stay &amp; Dharamshala</h2>
            </div>
            {stay && (
              <span className="text-xs font-mono font-bold text-primary">
                ₹{stay.pricePerNight} / night
              </span>
            )}
          </div>

          {stay ? (
            <div className="space-y-2 text-xs sm:text-sm text-foreground">
              <p className="font-semibold">{stay.name}</p>
              <p className="text-primary font-medium text-xs">{stay.ghatReference}</p>
              <p className="text-muted-foreground text-xs leading-relaxed">{stay.notes}</p>
              <div className="pt-2 print:hidden">
                <a
                  href={stay.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline"
                >
                  <span>Official Inquiry / Booking</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No specific stay selected.</p>
          )}
        </div>
      </div>

      {/* Suggested Day-by-Day Pilgrim Schedule */}
      <section className="card-surface p-6 sm:p-8 border border-border/80 space-y-5">
        <h2 className="text-lg font-semibold font-display text-foreground flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <span>Realistic Pilgrimage Schedule</span>
        </h2>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="border-l-2 border-primary pl-4 space-y-1">
            <span className="font-mono font-bold text-primary text-xs uppercase">Day 1: Arrival &amp; Orientation</span>
            <p className="text-foreground font-semibold">Arrival at Nashik Road / CBS &rarr; Check-in</p>
            <p className="text-muted-foreground text-xs">
              Check in to your stay. Avoid peak midday congestion. Walk through pedestrian corridors toward Panchavati to locate emergency help booths and safe assembly points.
            </p>
          </div>

          <div className="border-l-2 border-primary pl-4 space-y-1">
            <span className="font-mono font-bold text-primary text-xs uppercase">Day 2: Sacred Snan &amp; Darshan</span>
            <p className="text-foreground font-semibold">Early Morning Holy Dip at Ramkund Ghat</p>
            <p className="text-muted-foreground text-xs">
              Reach holding area between 03:30 AM – 05:00 AM. After the holy dip, proceed to Kalaram Temple and Sita Gumpha. Attend the evening Godavari Maha Aarti at 06:45 PM.
            </p>
          </div>

          <div className="border-l-2 border-primary pl-4 space-y-1">
            <span className="font-mono font-bold text-primary text-xs uppercase">Day 3: Trimbakeshwar Yatra</span>
            <p className="text-foreground font-semibold">Trimbakeshwar Jyotirlinga (Separate Transit Day)</p>
            <p className="text-muted-foreground text-xs">
              Board official MSRTC Kumbh special shuttle from CBS early morning (~1 hour transit to Trimbakeshwar). Visit Kushavarta Kund and Trimbakeshwar Akhada areas.
            </p>
          </div>
        </div>
      </section>

      {/* Offline Essential Checklist */}
      <section className="card-surface p-6 border border-border/80 space-y-4">
        <h2 className="text-lg font-semibold font-display text-foreground flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-primary" />
          <span>Crucial Ground Checklist</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-accent/40 p-3.5 rounded-2xl border border-border/60">
            <strong className="text-foreground block">Physical Cash (₹2,000 - ₹5,000):</strong>
            <p className="text-muted-foreground mt-0.5">UPI and QR payment apps often stall due to mobile network saturation.</p>
          </div>

          <div className="bg-accent/40 p-3.5 rounded-2xl border border-border/60">
            <strong className="text-foreground block">Laminated Senior ID Cards:</strong>
            <p className="text-muted-foreground mt-0.5">Slip a paper contact slip into each family member&apos;s pocket.</p>
          </div>

          <div className="bg-accent/40 p-3.5 rounded-2xl border border-border/60">
            <strong className="text-foreground block">Comfortable Slip-on Sandals:</strong>
            <p className="text-muted-foreground mt-0.5">You will remove footwear frequently before entering ghat steps.</p>
          </div>

          <div className="bg-accent/40 p-3.5 rounded-2xl border border-border/60">
            <strong className="text-foreground block">Prescription Medicines &amp; ORS:</strong>
            <p className="text-muted-foreground mt-0.5">Carry a 4-day personal supply of regular medications.</p>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="card-surface p-6 border border-primary/30 bg-primary/5 space-y-3">
        <h2 className="text-base font-semibold font-display text-primary flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-primary" />
          <span>Emergency Police &amp; Medical Helplines</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-card p-3 rounded-xl border border-border text-center">
            <span className="text-muted-foreground block">Police</span>
            <span className="text-primary font-mono font-bold text-base">112</span>
          </div>
          <div className="bg-card p-3 rounded-xl border border-border text-center">
            <span className="text-muted-foreground block">Ambulance</span>
            <span className="text-primary font-mono font-bold text-base">108</span>
          </div>
          <div className="bg-card p-3 rounded-xl border border-border text-center">
            <span className="text-muted-foreground block">Railway</span>
            <span className="text-primary font-mono font-bold text-base">139</span>
          </div>
          <div className="bg-card p-3 rounded-xl border border-border text-center">
            <span className="text-muted-foreground block">Control Room</span>
            <span className="text-primary font-mono font-bold text-xs sm:text-sm">0253-2575555</span>
          </div>
        </div>
      </section>
    </div>
  );
}