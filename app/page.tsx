import React from 'react';
import { PlannerForm } from '../components/PlannerForm';
import { kumbhEvents } from '../data/events';
import { 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  WifiOff, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-4 pt-4 pb-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-medium">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Nashik • Trimbakeshwar Kumbh Mela 2026 - 2027</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Your Kumbh. Your Journey.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
            Your Sathi.
          </span>
        </h1>

        <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
          The honest digital companion for out-of-town pilgrims. Plan verified travel from your city, ghat-near dharamshalas, transparent costs, and save everything offline to your phone.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-stone-300">
          <span className="flex items-center gap-1.5 bg-stone-900/80 px-3 py-1.5 rounded-lg border border-stone-800">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Zero Fake Promises
          </span>
          <span className="flex items-center gap-1.5 bg-stone-900/80 px-3 py-1.5 rounded-lg border border-stone-800">
            <WifiOff className="w-4 h-4 text-amber-400" />
            Works 100% Offline
          </span>
          <span className="flex items-center gap-1.5 bg-stone-900/80 px-3 py-1.5 rounded-lg border border-stone-800">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            Gazette Verified Dates
          </span>
        </div>
      </section>

      {/* Main Planner Form Section */}
      <section id="planner" className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/30 to-orange-600/30 rounded-3xl blur-xl opacity-50 -z-10" />
        <PlannerForm />
      </section>

      {/* Auspicious Shahi Snan Dates Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-amber-400" />
              <span>Official Key Dates &amp; Shahi Snan Schedule</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              Verified from Maharashtra State Kumbh Cell and Nashik District Administration.
            </p>
          </div>
          <span className="text-xs text-stone-400">Times in IST</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kumbhEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-stone-900/80 border border-stone-800 hover:border-amber-500/50 rounded-2xl p-5 space-y-3 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-md font-semibold ${
                      evt.type === 'Shahi Snan'
                        ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                        : evt.type === 'Ceremony'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-stone-800 text-stone-300 border border-stone-700'
                    }`}
                  >
                    {evt.type}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-stone-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{evt.time}</span>
                  </div>
                </div>

                <h3 className="font-bold text-base text-stone-100 mt-2.5">{evt.name}</h3>
                <p className="text-xs text-stone-400 flex items-center gap-1.5 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>{evt.location}</span>
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-500">
                <span className="font-mono text-amber-400/90 font-semibold">{evt.date}</span>
                <span className="text-[11px] bg-stone-800/80 px-2 py-0.5 rounded text-stone-400">
                  {evt.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ground Realities & Pilgrim Practical Advice */}
      <section className="bg-stone-900/90 border border-stone-800/90 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <span>Nashik Ground Realities (What Travel Portals Don&apos;t Tell You)</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Crucial operational knowledge for smooth darshan without panic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-stone-300">
          <div className="bg-stone-800/50 p-4 rounded-xl border border-stone-800 space-y-2">
            <h4 className="font-semibold text-amber-300 flex items-center gap-2">
              <span>Ramkund vs. Trimbakeshwar Distance</span>
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Trimbakeshwar Jyotirlinga is <strong>28 km away</strong> from Ramkund (Nashik city). During Shahi Snan days, vehicular entry between Nashik and Trimbakeshwar is restricted to emergency and government feeder shuttles. Plan each location on separate days.
            </p>
          </div>

          <div className="bg-stone-800/50 p-4 rounded-xl border border-stone-800 space-y-2">
            <h4 className="font-semibold text-amber-300 flex items-center gap-2">
              <span>Severe Mobile Congestion on Snan Days</span>
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              4G/5G mobile towers around Ramkund and Godavari Ghats experience heavy congestion when millions gather. <strong>Save your itinerary to this app now</strong>; it runs offline without cellular data or internet.
            </p>
          </div>

          <div className="bg-stone-800/50 p-4 rounded-xl border border-stone-800 space-y-2">
            <h4 className="font-semibold text-amber-300 flex items-center gap-2">
              <span>Inner Ring Road Walking Corridors</span>
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Vehicles are stopped at outer holding grounds (Dwarka circle, Nashik Road, Gangapur). Pilgrims must walk the last 1.5 to 3 km through barricaded pedestrian corridors to reach Ramkund. Wear comfortable footwear.
            </p>
          </div>

          <div className="bg-stone-800/50 p-4 rounded-xl border border-stone-800 space-y-2">
            <h4 className="font-semibold text-amber-300 flex items-center gap-2">
              <span>Dharamshalas &amp; Satvik Food</span>
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Numerous community Annachhatras (free food camps) operate around Panchavati and Tapovan. Pure vegetarian food and boiled drinking water points are maintained by the municipal corporation and seva trusts.
            </p>
          </div>
        </div>
      </section>

      {/* Fast CTA */}
      <section className="text-center py-6">
        <Link
          href="#planner"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition-all shadow-lg hover:shadow-amber-500/20"
        >
          <span>Start Your Nashik 2027 Plan</span>
        </Link>
      </section>
    </div>
  );
}