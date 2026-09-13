'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { travelOptions } from '../../data/travel-options';
import { stayOptions } from '../../data/stays';
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
  Footprints, 
  Calendar,
  Users,
  Banknote,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

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
  const travelFarePerPerson = selectedTravel ? selectedTravel.farePerPerson * 2 : 0;
  const roomsNeeded = Math.ceil(groupSize / 2);
  const stayCostTotal = selectedStay ? selectedStay.pricePerNight * nights * roomsNeeded : 0;
  const stayCostPerPerson = Math.round(stayCostTotal / groupSize);
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
        return <Train className="w-4 h-4 text-primary" />;
      case 'Bus':
        return <Bus className="w-4 h-4 text-primary" />;
      case 'Flight':
        return <Plane className="w-4 h-4 text-primary" />;
      default:
        return <Train className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Back & Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Modify Details</span>
          </Link>
          <h1 className="text-2xl sm:text-4xl font-semibold font-display text-foreground">
            Trip Plan: <span className="text-primary">{origin}</span> to Nashik
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground mt-2">
            <span className="flex items-center gap-1.5 bg-card px-3 py-1 rounded-full border border-border">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              {startDate} to {endDate} ({nights} {nights === 1 ? 'night' : 'nights'})
            </span>
            <span className="flex items-center gap-1.5 bg-card px-3 py-1 rounded-full border border-border">
              <Users className="w-3.5 h-3.5 text-primary" />
              {groupSize} {groupSize === 1 ? 'Pilgrim' : 'Pilgrims'}
            </span>
            <span className="flex items-center gap-1.5 bg-card px-3 py-1 rounded-full border border-border">
              <Banknote className="w-3.5 h-3.5 text-primary" />
              Target: ₹{budgetPerPerson.toLocaleString()} / person
            </span>
          </div>
        </div>

        {/* Offline Save Action Button */}
        <div>
          {savedSuccess ? (
            <div className="flex items-center gap-2 bg-leaf/10 border border-leaf text-foreground px-4 py-3 rounded-2xl">
              <CheckCircle2 className="w-5 h-5 text-leaf" />
              <div className="text-xs">
                <p className="font-bold text-foreground">Saved to Device!</p>
                <Link href={`/plan/${newPlanId}`} className="underline text-primary font-medium hover:text-primary/80">
                  View Saved Plan &rarr;
                </Link>
              </div>
            </div>
          ) : (
            <Button
              onClick={handleSavePlan}
              disabled={isSaving}
              variant="hero"
              size="lg"
              className="gap-2 shadow-glow"
            >
              <Bookmark className="w-5 h-5" />
              <span>{isSaving ? 'Saving...' : 'Save Plan Offline'}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Honest Cost Breakdown Box */}
      <section className="card-surface p-6 sm:p-8 shadow-raised border border-border/80 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold font-display text-foreground flex items-center gap-2">
              <Banknote className="w-5 h-5 text-primary" />
              <span>Transparent Pilgrim Cost Estimate</span>
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Includes return transit, stay near ghats, and satvik meals.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-mono font-bold text-primary">
              ₹{totalCostPerPerson.toLocaleString()}{' '}
              <span className="text-xs font-normal text-muted-foreground">/ person</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Total for {groupSize} {groupSize === 1 ? 'person' : 'persons'}:{' '}
              <span className="font-mono text-foreground font-semibold">₹{totalCostGroup.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="bg-accent/40 p-4 rounded-2xl border border-border/60">
            <span className="text-muted-foreground block mb-1">Return Travel (per person)</span>
            <span className="text-foreground font-mono font-bold text-base">₹{travelFarePerPerson.toLocaleString()}</span>
            <span className="text-[11px] text-muted-foreground block mt-0.5 truncate">
              {selectedTravel ? selectedTravel.summary : 'Select option below'}
            </span>
          </div>

          <div className="bg-accent/40 p-4 rounded-2xl border border-border/60">
            <span className="text-muted-foreground block mb-1">
              Ghat Stay ({nights} {nights === 1 ? 'night' : 'nights'}, {roomsNeeded} {roomsNeeded === 1 ? 'room' : 'rooms'})
            </span>
            <span className="text-foreground font-mono font-bold text-base">₹{stayCostPerPerson.toLocaleString()}</span>
            <span className="text-[11px] text-muted-foreground block mt-0.5 truncate">
              {selectedStay ? selectedStay.name : 'Select option below'}
            </span>
          </div>

          <div className="bg-accent/40 p-4 rounded-2xl border border-border/60">
            <span className="text-muted-foreground block mb-1">Food &amp; Local Auto Buffer</span>
            <span className="text-foreground font-mono font-bold text-base">₹{localBufferPerPerson.toLocaleString()}</span>
            <span className="text-[11px] text-muted-foreground block mt-0.5">
              ₹350 / day for Satvik meals &amp; temple transfers
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 text-xs">
          {isWithinBudget ? (
            <span className="flex items-center gap-1.5 text-leaf font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Within your target budget of ₹{budgetPerPerson.toLocaleString()} per person.
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-primary font-medium">
              <AlertCircle className="w-4 h-4" />
              Exceeds target budget by ₹{(totalCostPerPerson - budgetPerPerson).toLocaleString()} per person. Try choosing a dharamshala or rail option below.
            </span>
          )}
        </div>
      </section>

      {/* Step 1: Select Travel Option */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold font-display text-foreground flex items-center gap-2">
            <span>1. Verified Travel Options from {origin}</span>
          </h2>
          <span className="text-xs text-muted-foreground">{matchingTravel.length} options found</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchingTravel.map((t) => {
            const isSelected = selectedTravel?.id === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTravelId(t.id)}
                className={cn(
                  "card-surface p-5 border transition-all flex flex-col justify-between cursor-pointer",
                  isSelected
                    ? "border-primary bg-primary/10 ring-1 ring-primary/40 shadow-soft"
                    : "border-border hover:border-primary/40"
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-accent text-accent-foreground">
                        {getModeIcon(t.mode)}
                      </span>
                      <div>
                        <span className="text-xs font-mono uppercase text-muted-foreground">{t.mode}</span>
                        <h3 className="font-semibold text-foreground text-sm sm:text-base font-display">{t.operatorName}</h3>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-mono font-bold text-primary">
                        ₹{t.farePerPerson}
                      </span>
                      <span className="text-[11px] text-muted-foreground block">one-way</span>
                    </div>
                  </div>

                  <p className="text-xs text-foreground font-medium mt-1">{t.summary}</p>
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

                  <div className="mt-3 p-2.5 rounded-xl bg-card text-xs space-y-1 border border-border/50">
                    <div className="text-leaf font-medium">
                      <strong>Pros:</strong> {t.pros}
                    </div>
                    <div className="text-muted-foreground">
                      <strong>Watch out:</strong> {t.cons}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-[11px] text-primary font-medium">
                    {isSelected ? '✓ Selected' : 'Click to select'}
                  </span>
                  <a
                    href={t.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary font-medium transition-colors"
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

      {/* Step 2: Select Stay Option */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold font-display text-foreground flex items-center gap-2">
            <span>2. Ghat-Proximity Stays &amp; Dharamshalas</span>
          </h2>
          <span className="text-xs text-muted-foreground">{stayOptions.length} stays available</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stayOptions.map((s) => {
            const isSelected = selectedStay?.id === s.id;
            return (
              <div
                key={s.id}
                onClick={() => setSelectedStayId(s.id)}
                className={cn(
                  "card-surface p-5 border transition-all flex flex-col justify-between cursor-pointer",
                  isSelected
                    ? "border-primary bg-primary/10 ring-1 ring-primary/40 shadow-soft"
                    : "border-border hover:border-primary/40"
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-accent text-primary font-medium">
                      {s.type}
                    </span>
                    <div className="text-right">
                      <span className="text-base font-mono font-bold text-primary">
                        ₹{s.pricePerNight}
                      </span>
                      <span className="text-[11px] text-muted-foreground block">/ night</span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-foreground text-base font-display">{s.name}</h3>

                  <div className="flex items-center gap-1 text-xs text-primary mt-2 font-medium">
                    <Footprints className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{s.ghatReference}</span>
                  </div>

                  <p className="text-xs text-muted-foreground mt-2.5 leading-relaxed">{s.notes}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-[11px] text-primary font-medium">
                    {isSelected ? '✓ Selected' : 'Click to select'}
                  </span>
                  <a
                    href={s.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary font-medium transition-colors"
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

      {/* Map Preview */}
      <section className="card-surface p-6 border border-border/80 shadow-raised space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold font-display text-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Ramkund Sacred Ghat Zone</span>
            </h2>
            <p className="text-xs text-muted-foreground">
              Main bathing ghats on the Godavari. Shahi Snan entry corridors diverge from Panchavati.
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
        <div className="max-w-4xl mx-auto px-4 py-20 text-center text-muted-foreground space-y-3">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium">Loading verified pilgrimage routes...</p>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
