export type NavItem = {
  to: string;
  label: string;
  hint: string;
};

export const navItems: NavItem[] = [
  { to: "/", label: "Home", hint: "Kumbh Mela Nashik 2027 at a glance" },
  { to: "/planner", label: "Planner", hint: "Build your yatra plan & save offline" },
  { to: "/events", label: "Events", hint: "Shahi snan dates, aartis & akhada processions" },
  { to: "/travel", label: "Travel", hint: "Trains, buses and flights to Nashik" },
  { to: "/stays", label: "Stays", hint: "Dharamshalas, tent city and lodges" },
  { to: "/budget", label: "Budget", hint: "Track spends across travel, stay & seva" },
  { to: "/map", label: "Map", hint: "Ghats, sectors, parking and help desks" },
  { to: "/my-plans", label: "Saved Plans", hint: "Offline saved itineraries on your device" },
  { to: "/safety", label: "Safety", hint: "Crowd rules, helplines and lost & found" },
  { to: "/nearby", label: "Nearby", hint: "Trimbakeshwar, Panchavati & sacred spots" },
  { to: "/family", label: "Family", hint: "Family check-ins & elder safety cards" },
  { to: "/international", label: "International", hint: "Visa, currency and etiquette guide" },
  { to: "/sathi-ai", label: "Sathi AI", hint: "Ask anything about Nashik Kumbh" },
];
