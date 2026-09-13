'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSavedPlans, deletePlan, SavedPlan } from '../../lib/storage';
import { travelOptions } from '../../data/travel-options';
import { stayOptions } from '../../data/stays';
import { 
  Bookmark, 
  Trash2, 
  ArrowRight, 
  Calendar, 
  Users, 
  Banknote, 
  WifiOff, 
  PlusCircle,
  MapPin,
  Clock
} from 'lucide-react';

export default function MyPlansPage() {
  const [plans, setPlans] = useState<SavedPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPlans = async () => {
    try {
      const data = await getSavedPlans();
      setPlans(data);
    } catch (err) {
      console.error('Failed to load saved plans:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Delete this saved offline itinerary?')) {
      await deletePlan(id);
      await loadPlans();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium mb-2">
            <WifiOff className="w-3.5 h-3.5 text-amber-400" />
            <span>IndexedDB Local Storage • 100% Offline Accessible</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            My Saved Offline Itineraries
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Access these plans anytime on ground even when cellular towers around Ramkund lose signal.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-xl transition-all shadow-md"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Plan New Yatra</span>
        </Link>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="py-20 text-center text-stone-400 space-y-3">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm">Loading your offline saved yatras...</p>
        </div>
      ) : plans.length === 0 ? (
        /* Empty State */
        <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-10 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <Bookmark className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold text-white">No Saved Plans Yet</h2>
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            You haven&apos;t saved any Kumbh itineraries yet. Select your city, dates, and budget to generate and save your personalized itinerary for offline use.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-xl transition-all"
            >
              <span>Create Your First Plan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* Saved Plans List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {plans.map((plan) => {
            const travel = travelOptions.find((t) => t.id === plan.selectedTravelId);
            const stay = stayOptions.find((s) => s.id === plan.selectedStayId);
            const formattedDate = new Date(plan.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            return (
              <div
                key={plan.id}
                className="bg-stone-900/90 border border-stone-800 hover:border-amber-500/50 rounded-2xl p-5 shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-stone-800/80 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <span className="font-extrabold text-stone-100 text-base">
                        {plan.origin} &rarr; Nashik
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-stone-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formattedDate}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-stone-300 mb-4">
                    <div className="flex items-center gap-2 text-stone-400">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>
                        Dates: <strong className="text-stone-200">{plan.startDate}</strong> to{' '}
                        <strong className="text-stone-200">{plan.endDate}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-stone-400">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>
                        Group Size:{' '}
                        <strong className="text-stone-200">{plan.groupSize} pilgrims</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-stone-400">
                      <Banknote className="w-3.5 h-3.5 text-amber-400" />
                      <span>
                        Est. Cost:{' '}
                        <strong className="text-amber-400 font-mono text-sm">
                          ₹{plan.totalEstimatedCost.toLocaleString()}
                        </strong>{' '}
                        / person
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-stone-800/50 rounded-xl space-y-1.5 text-xs">
                    {travel && (
                      <div className="text-stone-300 truncate">
                        <span className="text-amber-400 font-medium">Travel:</span> {travel.summary}
                      </div>
                    )}
                    {stay && (
                      <div className="text-stone-300 truncate">
                        <span className="text-amber-400 font-medium">Stay:</span> {stay.name} ({stay.area})
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-800 flex items-center justify-between">
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="p-2 text-stone-500 hover:text-red-400 hover:bg-stone-800 rounded-lg transition-colors"
                    title="Delete plan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <Link
                    href={`/plan/${plan.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-stone-200 font-semibold text-xs rounded-xl transition-colors"
                  >
                    <span>View Offline Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
