'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { travelOptions, TravelOption } from '../../data/travel-options';
import { stayOptions, StayOption } from '../../data/stays';
import { savePlan } from '../../lib/storage';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Bookmark, 
  MapPin, 
  Clock, 
  Train, 
  Bus, 
  Plane, 
  ExternalLink, 
  Building2, 
  Footprints, 
  Calendar,
  Users,
  Banknote,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const MapComponent = dynamic(() => import('../../components/Map'), { ssr: false });

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const origin = searchParams.get('origin') || 'Mumbai';
  const startDate = searchParams.get('startDate') || '2027-08-01';
  const endDate = searchParams.get('endDate') || '2027-08-04';
  const groupSize = parseInt(searchParams.get('groupSize') || '2', 10);
  const budgetPerPerson = parseInt(searchParams.get('budget') || '3500', 10);
  const preference = (searchParams.get('preference') as 'cheapest' | 'balanced' | 'fastest') || 'balanced';

  // Calculate nights
  const nights = useMemo(() => {
    try {
      const d1 = new Date(startDate).getTime();
      const d2 = new Date(endDate).getTime();
      const diff = Math.round(Math.abs(d2 - d1) / (1000 * 3600 * 24));
      return Math.max(1, isNaN(diff) ? 2 : diff);
    } catch {
      return 2;
    }
  }, [startDate, endDate]);

  // Filter matching travel options
  const matchingTravel = useMemo(() => {
    const direct = travelOptions.filter((t) => t.originCity.toLowerCase() === origin.toLowerCase());
    if (direct.length > 0) return direct;
    return travelOptions;
  }, [origin]);

  const [selectedTravelId, setSelectedTravelId] = useState<string>(matchingTravel[0]?.id || '');
  const [selectedStayId, setSelectedStayId] = useState<string>(stayOptions[0]?.id || '');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [newPlanId, setNewPlanId] = useState<string | null>(null);

  const selectedTravel = matchingTravel.find((t) => t.id === selectedTravelId) || matchingTravel[0];
  const selectedStay = stayOptions.find((s) => s.id === selectedStayId) || stayOptions[0];

  // Budget calculations
  // Round trip travel fare per person
  const travelFarePerPerson = selectedTravel ? selectedTravel.farePerPerson * 2 : 0;
  // Rooms needed: ceil(groupSize / 2)
  const roomsNeeded = Math.ceil(groupSize / 2);
  const stayCostTotal = selectedStay ? selectedStay.pricePerNight * nights * roomsNeeded : 0;
  const stayCostPerPerson = Math.round(stayCostTotal / groupSize);
  // Food & local transport buffer per person (Satvik meals ~₹250/day + shared e-rickshaw ~₹100/day)
  const localBufferPerPerson = 350 * nights;

  const totalCostPerPerson = travelFarePerPerson + stayCostPerPerson + localBufferPerPerson;
  const totalCostGroup = totalCostPerPerson * groupSize;
  const isWithinBudget = totalCostPerPerson <= budgetPerPerson;

  const handleSavePlan = async () => {
    setIsSaving(true);
    try {
      const plan = await savePlan({
        origin,
        startDate,
        endDate,
        groupSize,
        budgetPerPerson,
        preference,
        selectedTravelId: selectedTravel?.id,
        selectedStayId: selectedStay?.id,
        totalEstimatedCost: totalCostPerPerson,
      });
      setNewPlanId(plan.id);
      setSavedSuccess(true);
    } catch (err) {
      console.error('Failed to save plan offline:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'Train':
        return <Train className="w-4 h-4 text-amber-400" />;
      case 'Bus':
        return <Bus className="w-4 h-4 text-orange-400" />;
      case 'Flight':
        return <Plane className="w-4 h-4 text-sky-400" />;
      default:
        return <Train className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Back & Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-stone-400 hover:text-amber-400 text-sm mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Modify Search</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Trip Plan: <span className="text-amber-400">{origin}</span> to Nashik
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-stone-400 mt-2">
            <span className="flex items-center gap-1.5 bg-stone-900 px-3 py-1 rounded-lg border border-stone-800">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              {startDate} to {endDate} ({nights} {nights === 1 ? 'night' : 'nights'})
            </span>
            <span className="flex items-center gap-1.5 bg-stone-900 px-3 py-1 rounded-lg border border-stone-800">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              {groupSize} {groupSize === 1 ? 'Pilgrim' : 'Pilgrims'}
            </span>
            <span className="flex items-center gap-1.5 bg-stone-900 px-3 py-1 rounded-lg border border-stone-800">
              <Banknote className="w-3.5 h-3.5 text-amber-400" />
              Budget: ₹{budgetPerPerson.toLocaleString()} / person
            </span>
          </div>
        </div>

        {/* Offline Save Action Button */}
        <div>
          {savedSuccess ? (
            <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500 text-emerald-200 px-4 py-3 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div className="text-xs">
                <p className="font-bold">Saved Offline to Device!</p>
                <Link href={`/plan/${newPlanId}`} className="underline text-emerald-300 hover:text-white">
                  View Saved Plan
                </Link>
              </div>
            </div>
          ) : (
            <button
              onClick={handleSavePlan}
              disabled={isSaving}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              <Bookmark className="w-5 h-5" />
              <span>{isSaving ? 'Saving...' : 'Save Plan Offline'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Honest Cost Breakdown Box */}
      <section className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Banknote className="w-5 h-5 text-amber-400" />
              <span>Transparent Pilgrim Cost Estimate</span>
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Includes return transit, stay near ghats, and satvik food.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono font-extrabold text-amber-400">
              ₹{totalCostPerPerson.toLocaleString()}{' '}
              <span className="text-xs font-normal text-stone-400">/ person</span>
            </div>
            <div className="text-xs text-stone-400">
              Total for {groupSize} {groupSize === 1 ? 'person' : 'persons'}:{' '}
              <span className="font-mono text-stone-200 font-semibold">₹{totalCostGroup.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="bg-stone-800/60 p-3.5 rounded-xl border border-stone-700/60">
            <span className="text-stone-400 block mb-1">Return Travel (per person)</span>
            <span className="text-stone-100 font-mono font-bold text-base">₹{travelFarePerPerson.toLocaleString()}</span>
            <span className="text-[11px] text-stone-400 block mt-0.5">
              {selectedTravel ? selectedTravel.summary : 'Select option below'}
            </span>
          </div>

          <div className="bg-stone-800/60 p-3.5 rounded-xl border border-stone-700/60">
            <span className="text-stone-400 block mb-1">
              Ghat Stay ({nights} {nights === 1 ? 'night' : 'nights'}, {roomsNeeded} {roomsNeeded === 1 ? 'room' : 'rooms'})
            </span>
            <span className="text-stone-100 font-mono font-bold text-base">₹{stayCostPerPerson.toLocaleString()}</span>
            <span className="text-[11px] text-stone-400 block mt-0.5">
              {selectedStay ? selectedStay.name : 'Select option below'}
            </span>
          </div>

          <div className="bg-stone-800/60 p-3.5 rounded-xl border border-stone-700/60">
            <span className="text-stone-400 block mb-1">Food &amp; Local Auto Buffer</span>
            <span className="text-stone-100 font-mono font-bold text-base">₹{localBufferPerPerson.toLocaleString()}</span>
            <span className="text-[11px] text-stone-400 block mt-0.5">
              ₹350 / day for Satvik meals &amp; temple transfers
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 text-xs">
          {isWithinBudget ? (
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Within your target budget of ₹{budgetPerPerson.toLocaleString()} per person.
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <AlertCircle className="w-4 h-4" />
              Exceeds target budget by ₹{(totalCostPerPerson - budgetPerPerson).toLocaleString()} per person. Try selecting a dharamshala or rail option below.
            </span>
          )}
        </div>
      </section>

      {/* Step A: Select Travel Option */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>1. Verified Travel Options from {origin}</span>
          </h2>
          <span className="text-xs text-stone-400">{matchingTravel.length} options found</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchingTravel.map((t) => {
            const isSelected = selectedTravel?.id === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTravelId(t.id)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-500 shadow-lg ring-1 ring-amber-500'
                    : 'bg-stone-900/80 border-stone-800 hover:border-amber-600/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-lg bg-stone-800 border border-stone-700">
                        {getModeIcon(t.mode)}
                      </span>
                      <div>
                        <span className="text-xs font-mono uppercase text-stone-400">{t.mode}</span>
                        <h3 className="font-bold text-stone-100 text-sm sm:text-base">{t.operatorName}</h3>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-mono font-extrabold text-amber-400">
                        ₹{t.farePerPerson}
                      </span>
                      <span className="text-[11px] text-stone-400 block">one-way</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-300 font-medium mt-1">{t.summary}</p>
                  <p className="text-xs text-stone-400 mt-1">{t.routeDetails}</p>

                  <div className="flex items-center gap-4 mt-3 text-xs text-stone-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {Math.floor(t.durationMinutes / 60)}h {t.durationMinutes % 60}m
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {t.destinationCity}
                    </span>
                  </div>

                  <div className="mt-3 p-2.5 rounded-lg bg-stone-800/60 text-xs space-y-1">
                    <div className="text-emerald-300">
                      <strong>Pros:</strong> {t.pros}
                    </div>
                    <div className="text-stone-400">
                      <strong>Watch out:</strong> {t.cons}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-amber-400 font-medium">
                    {isSelected ? '✓ Currently Selected' : 'Click to select'}
                  </span>
                  <a
                    href={t.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-amber-400 font-medium transition-colors"
                  >
                    <span>Official Booking</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Step B: Select Stay Option */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>2. Ghat-Proximity Stays &amp; Dharamshalas</span>
          </h2>
          <span className="text-xs text-stone-400">{stayOptions.length} stays available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stayOptions.map((s) => {
            const isSelected = selectedStay?.id === s.id;
            return (
              <div
                key={s.id}
                onClick={() => setSelectedStayId(s.id)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-500 shadow-lg ring-1 ring-amber-500'
                    : 'bg-stone-900/80 border-stone-800 hover:border-amber-600/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-stone-800 text-amber-300 border border-stone-700">
                      {s.type}
                    </span>
                    <div className="text-right">
                      <span className="text-base font-mono font-extrabold text-amber-400">
                        ₹{s.pricePerNight}
                      </span>
                      <span className="text-[11px] text-stone-400 block">/ night</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-stone-100 text-base">{s.name}</h3>

                  <div className="flex items-center gap-1 text-xs text-amber-400/90 mt-2 font-medium">
                    <Footprints className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{s.ghatReference}</span>
                  </div>

                  <p className="text-xs text-stone-400 mt-2.5 leading-relaxed">{s.notes}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-amber-400 font-medium">
                    {isSelected ? '✓ Currently Selected' : 'Click to select'}
                  </span>
                  <a
                    href={s.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-amber-400 font-medium transition-colors"
                  >
                    <span>Check Room</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Geographic Ghat Map Preview */}
      <section className="bg-stone-900/90 border border-stone-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span>Nashik Ramkund &amp; Godavari Sacred Ghat Zone</span>
            </h2>
            <p className="text-xs text-stone-400">
              Ramkund Main Ghat coordinates (19.9975° N, 73.7898° E). Shahi Snan entry corridors diverge from Panchavati.
            </p>
          </div>
        </div>

        <MapComponent
          lat={19.9975}
          lng={73.7898}
          zoom={15}
          title="Ramkund Sacred Ghat, Nashik"
          description="Focal point of Nashik Kumbh Mela Shahi Snans and Godavari Aarti."
        />
      </section>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-20 text-center text-stone-400 space-y-3">
          <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium">Loading verified pilgrimage routes...</p>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
