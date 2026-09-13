'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchCities } from '../data/travel-options';
import { kumbhEvents } from '../data/events';
import { Calendar, Users, MapPin, ArrowRight, ShieldCheck, Banknote } from 'lucide-react';

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
      // Arrive 1 day before event
      const arrival = new Date(start);
      arrival.setDate(start.getDate() - 1);
      // Depart 1 day after event
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
    <form onSubmit={handleSubmit} className="bg-stone-900/90 backdrop-blur-md rounded-2xl border border-amber-600/40 p-6 sm:p-8 shadow-2xl text-stone-100">
      {/* Event Date Presets */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
          Step 1: Choose Auspicious Event or Shahi Snan
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {kumbhEvents.map((evt) => {
            const isSelected = selectedEventId === evt.id;
            return (
              <button
                type="button"
                key={evt.id}
                onClick={() => handleEventSelect(evt.id)}
                className={`text-left p-3 rounded-xl border text-sm transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-600/20 border-amber-500 text-white shadow-md ring-1 ring-amber-500'
                    : 'bg-stone-800/60 border-stone-700/70 text-stone-300 hover:bg-stone-800 hover:border-amber-600/50'
                }`}
              >
                <div className="font-semibold text-stone-100 flex items-center justify-between">
                  <span>{evt.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                    {evt.date}
                  </span>
                </div>
                <div className="text-xs text-stone-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
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
          <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            Your Departure City
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-3.5 w-5 h-5 text-amber-400 pointer-events-none" />
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
            >
              {searchCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <p className="text-[11px] text-stone-400 mt-1.5">Includes verified direct trains, state buses, and flights.</p>
        </div>

        {/* Group Size */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            Traveling Members (Group Size)
          </label>
          <div className="relative">
            <Users className="absolute left-3.5 top-3.5 w-5 h-5 text-amber-400 pointer-events-none" />
            <select
              value={groupSize}
              onChange={(e) => setGroupSize(parseInt(e.target.value, 10))}
              className="w-full pl-11 pr-4 py-3 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
            >
              <option value={1}>1 Pilgrim (Solo)</option>
              <option value={2}>2 Persons (Couple / Friends)</option>
              <option value={4}>4 Persons (Family)</option>
              <option value={6}>6 Persons (Extended Family / Satsang)</option>
              <option value={10}>10+ Persons (Yatra Group)</option>
            </select>
          </div>
          <p className="text-[11px] text-stone-400 mt-1.5">Helps calculate room requirements and shared auto/cab fares.</p>
        </div>
      </div>

      {/* Date Range Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            Arrival in Nashik
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-3.5 w-5 h-5 text-amber-400 pointer-events-none" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            Departure from Nashik
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-3.5 w-5 h-5 text-amber-400 pointer-events-none" />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-stone-800 border border-stone-700 rounded-xl text-stone-100 font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
              required
            />
          </div>
        </div>
      </div>

      {/* Budget & Priority Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            Budget per Pilgrim: <span className="text-amber-300 font-bold font-mono">₹{budgetPerPerson.toLocaleString()}</span>
          </label>
          <div className="flex items-center gap-3">
            <Banknote className="w-5 h-5 text-amber-400" />
            <input
              type="range"
              min={1000}
              max={15000}
              step={500}
              value={budgetPerPerson}
              onChange={(e) => setBudgetPerPerson(parseInt(e.target.value, 10))}
              className="w-full accent-amber-500 h-2 bg-stone-700 rounded-lg cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-[11px] text-stone-400 mt-1">
            <span>₹1,000 (Dharamshala)</span>
            <span>₹5,000 (Comfortable)</span>
            <span>₹15,000+ (Fast)</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            Travel Priority Mode
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['cheapest', 'balanced', 'fastest'] as const).map((pref) => (
              <button
                type="button"
                key={pref}
                onClick={() => setPreference(pref)}
                className={`py-2.5 px-2 rounded-xl text-xs font-semibold capitalize transition-all border ${
                  preference === pref
                    ? 'bg-amber-600 border-amber-400 text-white shadow-md'
                    : 'bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-750'
                }`}
              >
                {pref === 'cheapest' ? '₹ Lowest' : pref === 'balanced' ? '⚖️ Balanced' : '⚡ Fastest'}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-stone-400 mt-1.5">
            {preference === 'cheapest' && 'Prioritizes sleeper trains and state transport buses.'}
            {preference === 'balanced' && 'Best trade-off between transit time, comfort & ghat proximity.'}
            {preference === 'fastest' && 'Prioritizes direct flights and express AC travel.'}
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 px-6 bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-stone-950 font-bold text-base sm:text-lg rounded-xl shadow-lg hover:shadow-amber-600/30 transition-all flex items-center justify-center gap-3 cursor-pointer group"
      >
        <span>Generate Honest Pilgrimage Plan</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-stone-400">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>100% Free • No registration required • Saves offline to your phone</span>
      </div>
    </form>
  );
}