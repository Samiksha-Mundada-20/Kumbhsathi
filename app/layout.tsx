import './globals.css';
import { Metadata, Viewport } from 'next';
import { Navbar } from '../components/Navbar';
import { OfflineBanner } from '../components/OfflineBanner';

export const metadata: Metadata = {
  title: 'Kumbh Trip Planner 2027 | Nashik Kumbh Mela Companion',
  description: 'Out-of-town pilgrim trip planner for Nashik Kumbh Mela 2027. Honest transport links, ghat-near stays, clear budget planning, and 100% offline-saved itineraries.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#1c1917',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-stone-950 text-stone-100 antialiased min-h-screen flex flex-col font-sans">
        <Navbar />
        <OfflineBanner />
        <div className="flex-1">{children}</div>
        <footer className="border-t border-stone-800/80 bg-stone-900/60 py-8 px-4 text-center text-xs text-stone-500">
          <div className="max-w-4xl mx-auto space-y-2">
            <p className="font-semibold text-stone-400">
              Kumbh Trip Planner (KumbhSathi) • Nashik Kumbh Mela 2027
            </p>
            <p>
              Built for real pilgrims. Verified schedules from official Maharashtra district gazettes &amp; verified ground trusts.
            </p>
            <p className="text-[11px] text-stone-600">
              Works 100% offline via Progressive Web App (PWA) cache &amp; IndexedDB.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
