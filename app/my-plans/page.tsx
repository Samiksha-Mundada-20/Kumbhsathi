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
import { PageShell } from '../../components/site/PageShell';
import { Button } from '../../components/ui/button';

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
    <PageShell
      eyebrow="Saved Yatras"
      title="Your offline pilgrimage itineraries"
      description="Access your plans anytime on the ground even when cellular towers around Ramkund lose signal."
      actions={
        <Button asChild variant="hero">
          <Link href="/#planner" className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            <span>Plan New Yatra</span>
          </Link>
        </Button>
      }
    >
      {loading ? (
        <div className="py-20 text-center text-muted-foreground space-y-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm">Loading your offline saved yatras...</p>
        </div>
      ) : plans.length === 0 ? (
        <div className="card-surface p-10 text-center space-y-4 max-w-lg mx-auto border border-border/80">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary">
            <Bookmark className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-semibold font-display text-foreground">No Saved Plans Yet</h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            You haven&apos;t saved any Kumbh itineraries yet. Select your city, dates, and budget to generate and save your personalized itinerary for offline use.
          </p>
          <div className="pt-2">
            <Button asChild variant="hero">
              <Link href="/#planner" className="flex items-center gap-2">
                <span>Create Your First Plan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      ) : (
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
                className="card-surface card-hover p-6 border border-border/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-border pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-foreground text-base font-display">
                        {plan.origin} &rarr; Nashik
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formattedDate}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>
                        Dates: <strong className="text-foreground">{plan.startDate}</strong> to{' '}
                        <strong className="text-foreground">{plan.endDate}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-primary" />
                      <span>
                        Group: <strong className="text-foreground">{plan.groupSize} pilgrims</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Banknote className="w-3.5 h-3.5 text-primary" />
                      <span>
                        Est. Cost:{' '}
                        <strong className="text-primary font-mono text-sm font-bold">
                          ₹{plan.totalEstimatedCost.toLocaleString()}
                        </strong>{' '}
                        / person
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-accent/40 rounded-xl space-y-1.5 text-xs border border-border/50">
                    {travel && (
                      <div className="text-foreground truncate">
                        <span className="text-primary font-medium">Travel:</span> {travel.summary}
                      </div>
                    )}
                    {stay && (
                      <div className="text-foreground truncate">
                        <span className="text-primary font-medium">Stay:</span> {stay.name} ({stay.area})
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-border flex items-center justify-between">
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-card rounded-lg transition-colors cursor-pointer"
                    title="Delete plan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <Button asChild variant="outline" size="sm">
                    <Link href={`/plan/${plan.id}`} className="flex items-center gap-1.5">
                      <span>View Offline Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
