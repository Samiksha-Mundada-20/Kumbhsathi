# KumbhSathi (Kumbh Trip Planner 2027)

> **"Your Kumbh. Your Journey. Your Sathi."**  
> An offline-first, anti-hackathon pilgrimage companion and trip planning Progressive Web App (PWA) for the **Nashik Kumbh Mela 2027**.

---

## 🌟 Overview

KumbhSathi is designed for real out-of-town pilgrims traveling to Nashik and Trimbakeshwar. Instead of generic travel cards or superficial mockups, it solves the actual ground problems pilgrims face:
- **Verified Route Options**: Real timetables, durations, and honest pros/cons across Train (IRCTC), State Bus (MSRTC Shivneri/Shivshahi), and Regional Flights from **8 major hubs** (Mumbai, Pune, Delhi, Ahmedabad, Bengaluru, Hyderabad, Nagpur, Indore).
- **Ghat-Proximity Stays**: Dharamshalas, government tent sectors, and budget lodges near Ramkund, Panchavati, Tapovan, and Trimbakeshwar with walking distances to main bathing ghats.
- **Official Auspicious Dates**: Official schedules from the Maharashtra State Kumbh Cell (Flag Hoisting on Oct 31, 2026; Shahi Snans on Aug 2, Aug 31, and Sep 11, 2027; Daily Godavari Evening Aarti).
- **Transparent Budget Estimator**: Return transit + stay + Satvik bhojanalaya meals + local buffer.
- **100% Offline Resilience**: Saves itineraries locally using IndexedDB (`idb-keyval`) so pilgrims can access their complete plan, offline checklists, and emergency numbers (112, 108, 139, Kumbh control room) even when mobile networks are congested near Ramkund.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Maps**: Leaflet & React Leaflet (Ramkund & Godavari Ghat coordinates)
- **Offline Storage**: IndexedDB (`idb-keyval`) with localStorage fallback
- **PWA**: Service Worker caching (`/sw.js`) and Web App Manifest (`/manifest.json`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+ installed
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Samiksha-Mundada-20/Kumbhsathi.git
cd Kumbhsathi

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 📦 Production Build & Testing

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

---

## 📱 Mobile & PWA Testing

To test on physical smartphones on the same local network:

```bash
npm run dev -- -H 0.0.0.0
```
Open `http://<YOUR_LOCAL_IP>:3000` on your mobile browser and tap **"Add to Home Screen"** to install the PWA.

---

## 🚢 Deployment (Vercel)

This repository includes a preconfigured `vercel.json`.

```bash
npx vercel
```
Or connect your GitHub repository directly to [Vercel](https://vercel.com).
