'use client';

import React, { useState } from 'react';
import { Users, UserPlus, CheckCircle2, ShieldCheck, MapPin, HeartHandshake } from 'lucide-react';
import { PageShell, SectionTitle, InfoCard } from '../../components/site/PageShell';
import { Button } from '../../components/ui/button';

export default function FamilyPage() {
  const [members, setMembers] = useState([
    { id: 1, name: "Grandfather (Ramesh Ji)", role: "Elder", status: "Checked in", phone: "+91 98200 XXXXX" },
    { id: 2, name: "Grandmother (Shanti Devi)", role: "Elder", status: "Checked in", phone: "+91 98200 XXXXX" },
    { id: 3, name: "Father / Group Lead", role: "Leader", status: "Active", phone: "+91 98201 XXXXX" },
  ]);

  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("Member");

  const addMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setMembers([...members, { id: Date.now(), name: newName.trim(), role: newRole, status: "Active", phone: "Shared Contact" }]);
    setNewName("");
  };

  return (
    <PageShell
      eyebrow="Family"
      title="Keep the family together without panic"
      description="Designate a group lead, register member details, set meeting points, and generate printable senior safety slips."
    >
      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        {/* Members List */}
        <div className="card-surface p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-border/80 pb-4">
            <div>
              <h2 className="text-xl font-semibold font-display text-foreground">
                Family &amp; Yatra Circle
              </h2>
              <p className="text-xs text-muted-foreground">{members.length} registered members</p>
            </div>
          </div>

          <ul className="space-y-3">
            {members.map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground text-sm">{m.name}</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      {m.role}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-0.5 block">{m.phone}</span>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs text-leaf font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{m.status}</span>
                </span>
              </li>
            ))}
          </ul>

          <form onSubmit={addMember} className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="Add member name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1 px-4 py-2 bg-card border border-border rounded-xl text-xs text-foreground outline-none focus:border-primary"
              required
            />
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="px-3 py-2 bg-card border border-border rounded-xl text-xs text-foreground outline-none focus:border-primary"
            >
              <option value="Elder">Elder</option>
              <option value="Member">Member</option>
              <option value="Child">Child</option>
            </select>
            <Button type="submit" variant="hero" size="sm">
              <UserPlus className="w-4 h-4" />
              <span>Add</span>
            </Button>
          </form>
        </div>

        {/* Emergency Meeting Plan */}
        <div className="space-y-5">
          <div className="card-surface p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-semibold font-display text-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Agreed Meeting Point</span>
            </h3>

            <div className="p-4 rounded-2xl bg-accent/40 border border-border/70 text-xs space-y-2">
              <span className="font-bold text-foreground block text-sm">Panchavati Gate 3 (Kalaram Temple Plaza)</span>
              <p className="text-muted-foreground leading-relaxed">
                If anyone in the family gets separated in the ghat crowds, instruct them to walk to Panchavati Gate 3 and wait near the official police booth.
              </p>
            </div>

            <div className="border-t border-border pt-3 space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-leaf" />
                <span>Keep senior ID paper slips inside pockets</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-primary" />
                <span>Fix a morning and evening reunion schedule</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
