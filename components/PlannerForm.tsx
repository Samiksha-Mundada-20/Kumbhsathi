'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchCities } from '../data/travel-options';
import { kumbhEvents } from '../data/events';
import { Calendar, Users, MapPin, ArrowRight, ShieldCheck, Banknote, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export function PlannerForm() {
  const router = useRouter();

  const [origin, setOrigin] = useState('Mumbai');
  const [startDate, setStartDate] = useState('2027-08-01');
  const [endDate, setEndDate] = useState('2027-08-04');
  const [groupSize, setGroupSize] = useState(2);
  const [budgetPerPerson, setBudgetPerPerson] = useState(3500);
  const [preference, setPreference] = useState<'cheapest' | 'balanced' | 'fastest'>('balanced');
  const [selectedEventId, setSelectedEventId] = useState<string>('event-2');

  const handleEventSelect = (eventId: string) => {
    setSelectedEventId(eventId);
    const event = kumbhEvents.find((e) => e.id === eventId);
    if (event && event.date !== 'Daily') {
      const start = new Date(event.date);
      const arrival = new Date(start);
      arrival.setDate(start.getDate() - 1);
      const departure = new Date(start);
      departure.setDate(start.getDate() + 1);

      const toIsoDate = (d: Date) => d.toISOString().split('T')[0];
      setStartDate(toIsoDate(arrival));
      setEndDate(toIsoDate(departure));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      origin,
      startDate,
      endDate,
      groupSize: groupSize.toString(),
      budget: budgetPerPerson.toString(),
      preference,
    });
    router.push(`/results?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card-surface p-6 sm:p-10 shadow-raised border border-border/80 relative overflow-hidden"
    >
      <div className="flex items-center gap-2 mb-6">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary/10 text-primary">
          <Sparkles className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold font-display text-foreground">
            Plan Your Kumbh Yatra
          </h2>
          <p className="text-xs text-muted-foreground">
            Select your city, dates, and budget for honest travel routes and ghat stays.
          </p>
        </div>
      </div>

      {/* Event Date Presets */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2.5">
          Step 1: Choose Auspicious Snan / Event Date
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {kumbhEvents.map((evt) => {
            const isSelected = selectedEventId === evt.id;
            return (
              <button
                type="button"
                key={evt.id}
                onClick={() => handleEventSelect(evt.id)}
                className={`text-left p-3.5 rounded-2xl border text-sm transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-primary/10 border-primary text-foreground shadow-soft ring-1 ring-primary/40'
                    : 'bg-card/70 border-border text-foreground hover:bg-accent/60 hover:border-primary/40'
                }`}
              >
                <div className="font-semibold text-foreground flex items-center justify-between">
                  <span>{evt.name}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-mono font-medium">
                    {evt.date}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                  <span>{evt.location}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Origin City */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            Your Departure City
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-primary pointer-events-none" />
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-2xl text-foreground font-medium focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
            >
              {searchCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1.5">
            Includes verified direct trains, state buses, and flights.
          </p>
        </div>

        {/* Group Size */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            Group Members
          </label>
          <div className="relative">
            <Users className="absolute left-3.5 top-3.5 w-4 h-4 text-primary pointer-events-none" />
            <select
              value={groupSize}
              onChange={(e) => setGroupSize(parseInt(e.target.value, 10))}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-2xl text-foreground font-medium focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
            >
              <option value={1}>1 Pilgrim (Solo)</option>
              <option value={2}>2 Persons (Couple / Friends)</option>
              <option value={4}>4 Persons (Family)</option>
              <option value={6}>6 Persons (Extended Family)</option>
              <option value={10}>10+ Persons (Yatra Mandali)</option>
            </select>
          </div>
          <p className="text-[11px] text-muted-foreground mt-1.5">
            Used to calculate dharamshala room sharing &amp; local cab splits.
          </p>
        </div>
      </div>

      {/* Date Range Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            Arrival in Nashik
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-primary pointer-events-none" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-2xl text-foreground font-medium focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            Departure from Nashik
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-primary pointer-events-none" />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-2xl text-foreground font-medium focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all"
              required
            />
          </div>
        </div>
      </div>

      {/* Budget & Priority Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            Budget per Pilgrim: <span className="text-foreground font-bold font-mono">₹{budgetPerPerson.toLocaleString()}</span>
          </label>
          <div className="flex items-center gap-3">
            <Banknote className="w-5 h-5 text-primary" />
            <input
              type="range"
              min={1000}
              max={15000}
              step={500}
              value={budgetPerPerson}
              onChange={(e) => setBudgetPerPerson(parseInt(e.target.value, 10))}
              className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
            <span>₹1,000 (Dharamshala)</span>
            <span>₹5,000 (Comfortable)</span>
            <span>₹15,000+ (Fast)</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            Travel Priority Mode
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['cheapest', 'balanced', 'fastest'] as const).map((pref) => (
              <button
                type="button"
                key={pref}
                onClick={() => setPreference(pref)}
                className={`py-2.5 px-2 rounded-2xl text-xs font-semibold capitalize transition-all border cursor-pointer ${
                  preference === pref
                    ? 'border-primary bg-saffron text-white shadow-glow'
                    : 'border-border bg-card/70 text-foreground hover:bg-accent/60'
                }`}
              >
                {pref === 'cheapest' ? '₹ Lowest' : pref === 'balanced' ? '⚖️ Balanced' : '⚡ Fastest'}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1.5">
            {preference === 'cheapest' && 'Prioritizes sleeper trains & state transport buses.'}
            {preference === 'balanced' && 'Best balance of comfort, transit time & ghat proximity.'}
            {preference === 'fastest' && 'Prioritizes direct flights & fast AC travel.'}
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="hero"
        size="lg"
        className="w-full text-base sm:text-lg font-bold gap-3"
      >
        <span>Generate Honest Pilgrimage Plan</span>
        <ArrowRight className="w-5 h-5" />
      </Button>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="w-4 h-4 text-leaf" />
        <span>100% Free • No registration needed • Saves offline to your phone</span>
      </div>
    </form>
  );
}