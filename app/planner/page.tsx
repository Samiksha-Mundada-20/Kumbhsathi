'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Circle, Plus, Trash2, Calendar, Bookmark, ArrowRight } from 'lucide-react';
import { PageShell } from '../../components/site/PageShell';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

type Task = { id: number; text: string; done: boolean; day: string };

const days = ["Day 1", "Day 2", "Day 3"];

const initial: Task[] = [
  { id: 1, text: "Reach Nashik Road station, board connecting shuttle to Sector 3", done: true, day: "Day 1" },
  { id: 2, text: "Check in at dharamshala / camp, keep ID cards and physical cash ready", done: true, day: "Day 1" },
  { id: 3, text: "Attend evening Godavari Maha Aarti at Ramkund / Gadge Maharaj bridge", done: false, day: "Day 1" },
  { id: 4, text: "Shahi Snan at Ramkund — depart holding area early by 3:30 AM", done: false, day: "Day 2" },
  { id: 5, text: "Kalaram Temple and Sita Gumpha darshan after morning prasad", done: false, day: "Day 2" },
  { id: 6, text: "Trimbakeshwar Jyotirlinga & Kushavarta Kund day trip (Separate bus transit)", done: false, day: "Day 3" },
];

export default function PlannerPage() {
  const [tasks, setTasks] = useState<Task[]>(initial);
  const [day, setDay] = useState("Day 1");
  const [draft, setDraft] = useState("");

  const dayTasks = tasks.filter((t) => t.day === day);
  const doneCount = tasks.filter((t) => t.done).length;
  const pct = Math.round((doneCount / tasks.length) * 100);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setTasks((t) => [...t, { id: Date.now(), text: draft.trim(), done: false, day }]);
    setDraft("");
  };

  const toggle = (id: number) => {
    setTasks((all) => all.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const remove = (id: number) => {
    setTasks((all) => all.filter((t) => t.id !== id));
  };

  return (
    <PageShell
      eyebrow="Planner"
      title="One quiet plan for each day of the mela"
      description="Add what matters, tick it off as you go. Your plan stays simple enough to read at 4 AM on a crowded ghat."
      actions={
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="hero">
            <Link href="/#planner" className="flex items-center gap-2">
              <span>Full Route &amp; Budget Planner</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/my-plans" className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-primary" />
              <span>Saved Offline Itineraries</span>
            </Link>
          </Button>
        </div>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        {/* Daily Tasks List */}
        <div className="card-surface p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
            <div className="flex flex-wrap gap-2">
              {days.map((d) => (
                <button
                  key={d}
                  onClick={() => setDay(d)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
                    day === d
                      ? "border-primary bg-saffron text-white shadow-glow"
                      : "border-border bg-card/70 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {dayTasks.filter((t) => t.done).length}/{dayTasks.length} completed for {day}
            </span>
          </div>

          <ul className="space-y-3">
            {dayTasks.map((t) => (
              <li
                key={t.id}
                className="group flex items-center justify-between gap-3 p-3.5 rounded-2xl border border-border bg-background/60 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => toggle(t.id)}
                    className="text-primary hover:scale-110 transition-transform cursor-pointer flex-shrink-0"
                  >
                    {t.done ? (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors break-words",
                      t.done ? "line-through text-muted-foreground" : "text-foreground"
                    )}
                  >
                    {t.text}
                  </span>
                </div>

                <button
                  onClick={() => remove(t.id)}
                  className="text-muted-foreground hover:text-destructive p-1 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>

          <form onSubmit={add} className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder={`Add task for ${day}...`}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground outline-none focus:border-primary"
            />
            <Button type="submit" variant="default" size="default" className="px-5">
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </Button>
          </form>
        </div>

        {/* Progress Card */}
        <div className="space-y-5">
          <div className="card-surface p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-semibold font-display text-foreground">
              Yatra Readiness
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your overall pilgrimage preparation across all days.
            </p>

            <div className="pt-2">
              <div className="flex justify-between text-sm font-medium mb-1.5">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-primary font-mono font-bold">{pct}%</span>
              </div>
              <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-accent/40 border border-border/70 text-xs text-muted-foreground space-y-2">
              <span className="font-semibold text-foreground block">Ground Tip:</span>
              <p>
                Download and save your full itinerary offline to your phone. At peak snan hours, phone signals are intermittent.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
