'use client';

import React, { useMemo, useState } from 'react';
import { IndianRupee, Plus, Trash2, PieChart, Wallet } from 'lucide-react';
import { PageShell, SectionTitle } from '../../components/site/PageShell';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

type Entry = { id: number; label: string; category: string; amount: number };

const initial: Entry[] = [
  { id: 1, label: "Train tickets (4 pilgrims)", category: "Travel", amount: 4800 },
  { id: 2, label: "Ramkund Dharamshala · 3 nights", category: "Stay", amount: 3600 },
  { id: 3, label: "Satvik meals & Chai", category: "Food", amount: 2200 },
  { id: 4, label: "Prasad and Temple Seva", category: "Seva", amount: 1500 },
  { id: 5, label: "Shuttles & e-rickshaws", category: "Local", amount: 900 },
];

const categories = ["Travel", "Stay", "Food", "Seva", "Local", "Misc"];

export default function BudgetPage() {
  const [entries, setEntries] = useState<Entry[]>(initial);
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState("Travel");
  const [amount, setAmount] = useState("");
  const [budget, setBudget] = useState("18000");

  const total = entries.reduce((s, e) => s + e.amount, 0);
  const cap = Number(budget) || 0;
  const left = cap - total;

  const byCategory = useMemo(() => {
    const map = new Map<string, number>();
    entries.forEach((e) => map.set(e.category, (map.get(e.category) ?? 0) + e.amount));
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [entries]);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const value = Number(amount);
    if (!label.trim() || !value) return;
    setEntries((all) => [...all, { id: Date.now(), label: label.trim(), category, amount: value }]);
    setLabel("");
    setAmount("");
  };

  const remove = (id: number) => {
    setEntries((all) => all.filter((e) => e.id !== id));
  };

  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <PageShell
      eyebrow="Budget"
      title="Keep the group's spending clear and peaceful"
      description="Track every rupee spent across travel, stay, prasad and seva so the whole family stays on the same page."
    >
      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        {/* Expense List and Form */}
        <div className="card-surface p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
            <div>
              <h2 className="text-xl font-semibold font-display text-foreground">
                Group Expenses
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {entries.length} items logged
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground">Target Cap:</label>
              <div className="relative w-28">
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-1.5 bg-card border border-border rounded-xl text-xs font-mono font-bold text-foreground outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Add expense form */}
          <form onSubmit={add} className="bg-accent/40 p-4 rounded-2xl border border-border/60 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <input
                  type="text"
                  placeholder="Expense name"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  className="w-full px-3.5 py-2 bg-card border border-border rounded-xl text-xs text-foreground outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 bg-card border border-border rounded-xl text-xs text-foreground outline-none focus:border-primary"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Amount (₹)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3.5 py-2 bg-card border border-border rounded-xl text-xs text-foreground outline-none focus:border-primary font-mono"
                  required
                />
                <Button type="submit" variant="hero" size="sm" className="px-4">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </form>

          {/* List */}
          <ul className="space-y-2.5">
            {entries.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors"
              >
                <div>
                  <span className="text-sm font-semibold text-foreground block">{item.label}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase font-mono font-medium">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-foreground text-sm">
                    {inr(item.amount)}
                  </span>
                  <button
                    onClick={() => remove(item.id)}
                    className="text-muted-foreground hover:text-destructive p-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Summary Card */}
        <div className="space-y-5">
          <div className="card-surface p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-semibold font-display text-foreground flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />
              <span>Budget Overview</span>
            </h3>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Spent:</span>
                <span className="font-mono font-bold text-foreground">{inr(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Target Cap:</span>
                <span className="font-mono font-bold text-foreground">{inr(cap)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-border pt-2">
                <span className="font-semibold text-foreground">Remaining:</span>
                <span className={cn("font-mono font-bold", left >= 0 ? "text-leaf" : "text-destructive")}>
                  {inr(left)}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden mt-3">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.round((total / (cap || 1)) * 100))}%` }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground text-right">
              {Math.round((total / (cap || 1)) * 100)}% of target budget utilized
            </p>
          </div>

          {/* Breakdown by Category */}
          <div className="card-surface p-6 space-y-3">
            <h3 className="text-base font-semibold font-display text-foreground flex items-center gap-2">
              <PieChart className="w-4 h-4 text-primary" />
              <span>Category Breakdown</span>
            </h3>

            <div className="space-y-2 text-xs">
              {byCategory.map(([cat, amt]) => (
                <div key={cat} className="flex items-center justify-between py-1 border-b border-border/50">
                  <span className="text-muted-foreground">{cat}</span>
                  <span className="font-mono font-semibold text-foreground">{inr(amt)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
