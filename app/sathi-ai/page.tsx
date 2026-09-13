'use client';

import React, { useState } from 'react';
import { Flame, Send, Sparkles, User, Bot, WifiOff } from 'lucide-react';
import { PageShell } from '../../components/site/PageShell';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

const suggestions = [
  "When is the next shahi snan?",
  "Least crowded time for Ramkund?",
  "Where can I get free satvik bhojan?",
  "How do I reach Trimbakeshwar?",
  "Can I use UPI for payments?",
];

type Msg = { from: "sathi" | "you"; text: string };

const seed: Msg[] = [
  {
    from: "sathi",
    text: "Namaskar! I am Sathi, your offline companion for the Nashik Kumbh Mela. Ask me about snan timings, barricade routes, stays, food, or emergency rules — I work even without internet.",
  },
];

const canned: [RegExp, string][] = [
  [/snan|bath|shahi|timing/i, "The first Shahi Snan is on 2 August 2027 (Shravan Amavasya) starting at 4:30 AM at Ramkund. Akhadas bathe first; general public entry opens around 8:30 AM. Second Shahi Snan is 31 August 2027, and third is 11 September 2027."],
  [/crowd|least|quiet|time/i, "Ramkund is calmest on non-snan weekdays between 1:00 PM and 4:00 PM. Early mornings before 5:30 AM on non-snan days are peaceful and pleasant."],
  [/food|eat|free|annadaan|bhojan|satvik/i, "Free Satvik Annachhatras operate in Panchavati, Tapovan (Sector 3), and Sadhugram from 11:00 AM to 3:30 PM and 7:00 PM to 9:30 PM daily. Filtered drinking water is freely available throughout the corridor."],
  [/trimbak|trimbakeshwar/i, "Trimbakeshwar Jyotirlinga is 28 km west of Ramkund. Direct MSRTC Kumbh special shuttles run from Central Bus Stand (CBS) every 15 minutes. Plan Trimbakeshwar on a separate day from Ramkund Snan because intercity roads are regulated."],
  [/upi|cash|atm|payment|network/i, "WARNING: Do NOT rely solely on UPI or Google Pay/PhonePe! Mobile networks experience heavy saturation around Ramkund. Always keep ₹2,000–₹5,000 in physical paper cash."],
  [/lost|found|police|emergency|helpline/i, "Call 112 for Police Emergency, 108 for Medical Ambulance, and 0253-2575555 for Nashik Kumbh Control Room. Lost and Found (Khoya-Paya) centers are active at Ramkund Gate 2 and Tapovan."],
];

function answer(q: string): string {
  for (const [re, a] of canned) {
    if (re.test(q)) return a;
  }
  return "That's a helpful question. For this, check with any Seva volunteer in a saffron vest or head to the nearest Sector Help Booth. Remember to keep your group meeting point fixed and carry physical cash!";
}

export default function SathiAiPage() {
  const [messages, setMessages] = useState<Msg[]>(seed);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { from: "you", text: text.trim() };
    setMessages((all) => [...all, userMsg]);
    setDraft("");
    setThinking(true);

    setTimeout(() => {
      const botMsg: Msg = { from: "sathi", text: answer(text) };
      setMessages((all) => [...all, botMsg]);
      setThinking(false);
    }, 450);
  };

  return (
    <PageShell
      eyebrow="Assistant"
      title="Ask Sathi anything about the Kumbh"
      description="Instant answers on snan timings, travel corridors, satvik food and safety. Works 100% offline directly in your browser."
    >
      <section className="mx-auto max-w-3xl space-y-6">
        <div className="card-surface p-4 sm:p-6 border border-border/80 shadow-raised flex flex-col h-[520px]">
          {/* Header pill */}
          <div className="flex items-center justify-between pb-3 border-b border-border/70 text-xs">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary">
                <Flame className="w-4 h-4" />
              </span>
              <span className="font-semibold text-foreground">Sathi Pilgrim Companion</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-leaf font-medium">
              <WifiOff className="w-3 h-3" />
              Offline Ready
            </span>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex gap-2.5 max-w-[85%]",
                  m.from === "you" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold",
                    m.from === "you" ? "bg-secondary text-white" : "bg-primary text-white"
                  )}
                >
                  {m.from === "you" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={cn(
                    "p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed",
                    m.from === "you"
                      ? "bg-secondary text-white rounded-tr-none"
                      : "bg-accent/40 text-foreground border border-border/60 rounded-tl-none"
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {thinking && (
              <div className="flex gap-2.5 mr-auto">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3.5 rounded-2xl bg-accent/40 text-xs text-muted-foreground border border-border/60 rounded-tl-none animate-pulse">
                  Finding verified information...
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div className="pt-2 pb-3 flex flex-wrap gap-1.5 border-t border-border/70">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-[11px] px-3 py-1 rounded-full bg-card border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask about snan dates, dharamshalas, route..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-card border border-border rounded-xl text-sm text-foreground outline-none focus:border-primary"
            />
            <Button type="submit" variant="hero" size="default" className="px-5">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
