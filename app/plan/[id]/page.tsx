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
  Building2,
  AlertTriangle
} from 'lucide-react';

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
      <div className="max-w-4xl mx-auto px-4 py-24 text-center text-stone-400 space-y-3">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm">Loading offline itinerary details...</p>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Itinerary Not Found</h2>
        <p className="text-sm text-stone-400">
          This itinerary may have been cleared from your local storage.
        </p>
        <Link
          href="/my-plans"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-stone-950 font-bold rounded-xl text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Plans</span>
        </Link>
      </div>
    );
  }

  const travel = travelOptions.find((t) => t.id === plan.selectedTravelId);
  const stay = stayOptions.find((s) => s.id === plan.selectedStayId);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 print:p-0 print:m-0 print:text-black">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6 print:hidden">
        <div>
          <Link
            href="/my-plans"
            className="inline-flex items-center gap-1.5 text-stone-400 hover:text-amber-400 text-xs sm:text-sm mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Saved Plans</span>
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {plan.origin} &rarr; Nashik Pilgrimage
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium border border-emerald-500/30 flex items-center gap-1">
              <WifiOff className="w-3 h-3" />
              Offline Ready
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-800 hover:bg-stone-750 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 transition-colors"
          >
            <Share2 className="w-4 h-4 text-amber-400" />
            <span>{copied ? 'Link Copied!' : 'Share'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl transition-all shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-stone-900/90 border border-stone-800 p-4 rounded-xl">
          <span className="text-[11px] text-stone-400 block uppercase font-mono">Dates</span>
          <div className="text-sm sm:text-base font-bold text-stone-100 mt-1 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>{plan.startDate}</span>
          </div>
          <span className="text-xs text-stone-500 block">to {plan.endDate}</span>
        </div>

        <div className="bg-stone-900/90 border border-stone-800 p-4 rounded-xl">
          <span className="text-[11px] text-stone-400 block uppercase font-mono">Group</span>
          <div className="text-sm sm:text-base font-bold text-stone-100 mt-1 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-amber-400" />
            <span>{plan.groupSize} Pilgrims</span>
          </div>
          <span className="text-xs text-stone-500 block">Family / Yatra</span>
        </div>

        <div className="bg-stone-900/90 border border-stone-800 p-4 rounded-xl">
          <span className="text-[11px] text-stone-400 block uppercase font-mono">Est. Cost / Person</span>
          <div className="text-sm sm:text-base font-mono font-bold text-amber-400 mt-1 flex items-center gap-1.5">
            <Banknote className="w-4 h-4 text-amber-400" />
            <span>₹{plan.totalEstimatedCost.toLocaleString()}</span>
          </div>
          <span className="text-xs text-stone-500 block">Total: ₹{(plan.totalEstimatedCost * plan.groupSize).toLocaleString()}</span>
        </div>

        <div className="bg-stone-900/90 border border-stone-800 p-4 rounded-xl">
          <span className="text-[11px] text-stone-400 block uppercase font-mono">Priority</span>
          <div className="text-sm sm:text-base font-bold text-stone-100 mt-1 capitalize">
            {plan.preference}
          </div>
          <span className="text-xs text-stone-500 block">Optimized mode</span>
        </div>
      </div>

      {/* Selected Travel & Stay Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transit */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <Train className="w-5 h-5 text-amber-400" />
              <h2 className="font-bold text-white text-base">Travel Information</h2>
            </div>
            {travel && (
              <span className="text-xs font-mono font-bold text-amber-400">
                ₹{travel.farePerPerson} / way
              </span>
            )}
          </div>

          {travel ? (
            <div className="space-y-2 text-xs sm:text-sm text-stone-300">
              <p className="font-semibold text-stone-100">{travel.summary}</p>
              <p className="text-stone-400">{travel.routeDetails}</p>
              <div className="flex items-center gap-4 text-xs text-stone-400 pt-1">
                <span>Duration: {Math.floor(travel.durationMinutes / 60)}h {travel.durationMinutes % 60}m</span>
                <span>Drop: {travel.destinationCity}</span>
              </div>
              <p className="text-stone-400 text-xs bg-stone-800/60 p-2.5 rounded-lg mt-2">
                {travel.notes}
              </p>
              <div className="pt-2 print:hidden">
                <a
                  href={travel.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium"
                >
                  <span>Official Booking Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <p className="text-xs text-stone-400">No specific travel option selected.</p>
          )}
        </div>

        {/* Stay */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              <h2 className="font-bold text-white text-base">Stay &amp; Dharamshala</h2>
            </div>
            {stay && (
              <span className="text-xs font-mono font-bold text-amber-400">
                ₹{stay.pricePerNight} / night
              </span>
            )}
          </div>

          {stay ? (
            <div className="space-y-2 text-xs sm:text-sm text-stone-300">
              <p className="font-semibold text-stone-100">{stay.name}</p>
              <p className="text-amber-400/90 font-medium text-xs">{stay.ghatReference}</p>
              <p className="text-stone-400 text-xs leading-relaxed">{stay.notes}</p>
              <div className="pt-2 print:hidden">
                <a
                  href={stay.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium"
                >
                  <span>Official Inquiry / Booking</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <p className="text-xs text-stone-400">No specific stay selected.</p>
          )}
        </div>
      </div>

      {/* Suggested Day-by-Day Pilgrim Schedule */}
      <section className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 space-y-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-400" />
          <span>Realistic Pilgrimage Schedule</span>
        </h2>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="border-l-2 border-amber-500 pl-4 space-y-1">
            <span className="font-mono font-bold text-amber-400 text-xs uppercase">Day 1: Arrival &amp; Orientation</span>
            <p className="text-stone-300 font-semibold">Arrival at Nashik Road Station / Central Bus Stand</p>
            <p className="text-stone-400 text-xs">
              Check in to your stay. Avoid rush hours. Walk through pedestrian corridors toward Panchavati to familiarize yourself with emergency medical booths and safe assembly points.
            </p>
          </div>

          <div className="border-l-2 border-amber-500 pl-4 space-y-1">
            <span className="font-mono font-bold text-amber-400 text-xs uppercase">Day 2: Sacred Snan &amp; Darshan</span>
            <p className="text-stone-300 font-semibold">Early Morning Holy Dip at Ramkund Ghat</p>
            <p className="text-stone-400 text-xs">
              Reach the holding area between 03:30 AM – 05:00 AM. After the holy dip, proceed to Kalaram Temple and Sita Gumpha. Attend the evening Godavari Maha Aarti at 06:30 PM.
            </p>
          </div>

          <div className="border-l-2 border-amber-500 pl-4 space-y-1">
            <span className="font-mono font-bold text-amber-400 text-xs uppercase">Day 3: Trimbakeshwar or Tapovan</span>
            <p className="text-stone-300 font-semibold">Trimbakeshwar Jyotirlinga Yatra (Separate Transit Day)</p>
            <p className="text-stone-400 text-xs">
              Board official MSRTC Kumbh special shuttle from CBS early morning (approx 1 hour transit to Trimbakeshwar). Visit Kushavarta Kund and Trimbakeshwar Akhada areas.
            </p>
          </div>
        </div>
      </section>

      {/* Offline Essential Checklist */}
      <section className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-amber-400" />
          <span>Crucial Offline Ground Checklist</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300">
          <div className="flex items-start gap-2 bg-stone-800/50 p-3 rounded-xl border border-stone-700/50">
            <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
            <div>
              <strong className="text-stone-200">Carry Physical Cash (₹2,000 - ₹5,000):</strong>
              <p className="text-stone-400 mt-0.5">UPI and QR payment apps will fail due to mobile tower saturation during snan days.</p>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-stone-800/50 p-3 rounded-xl border border-stone-700/50">
            <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
            <div>
              <strong className="text-stone-200">Laminated Contact Cards for Seniors:</strong>
              <p className="text-stone-400 mt-0.5">Slip a paper card into each family member&apos;s pocket with primary mobile numbers and stay address.</p>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-stone-800/50 p-3 rounded-xl border border-stone-700/50">
            <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
            <div>
              <strong className="text-stone-200">Comfortable Slip-on Sandals:</strong>
              <p className="text-stone-400 mt-0.5">You will need to remove footwear frequently before entering ghats and temple corridors.</p>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-stone-800/50 p-3 rounded-xl border border-stone-700/50">
            <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
            <div>
              <strong className="text-stone-200">Prescription Medicines &amp; ORS:</strong>
              <p className="text-stone-400 mt-0.5">Carry a 4-day personal supply of regular medications and hydration salts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-6 space-y-3">
        <h2 className="text-base font-bold text-amber-300 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          <span>Emergency Police &amp; Medical Helplines</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
            <span className="text-stone-400 block">Police Control</span>
            <span className="text-amber-300 font-mono font-bold text-base">112</span>
          </div>
          <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
            <span className="text-stone-400 block">Ambulance</span>
            <span className="text-amber-300 font-mono font-bold text-base">108</span>
          </div>
          <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
            <span className="text-stone-400 block">Railway Helpline</span>
            <span className="text-amber-300 font-mono font-bold text-base">139</span>
          </div>
          <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
            <span className="text-stone-400 block">Kumbh Control Room</span>
            <span className="text-amber-300 font-mono font-bold text-base">0253-2575555</span>
          </div>
        </div>
      </section>
    </div>
  );
}