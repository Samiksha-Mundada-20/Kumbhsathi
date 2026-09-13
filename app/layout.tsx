import './globals.css';
import { Metadata, Viewport } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import { Navbar, BrandMark } from '../components/Navbar';
import { OfflineBanner } from '../components/OfflineBanner';
import { navItems } from '../components/site/nav';
import Link from 'next/link';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KumbhSathi — Kumbh Mela Nashik 2027 Companion',
  description: 'Snan dates, ghat maps, travel, stays, budgets and family safety for the Nashik Kumbh Mela — in one calm companion.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#d65a1f',
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
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="relative flex min-h-screen flex-col overflow-x-clip bg-background text-foreground antialiased font-sans">
        {/* Decorative background glow blobs */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="blob top-[-8rem] left-[-6rem] h-96 w-96 bg-primary/20" />
          <div className="blob top-[30%] right-[-8rem] h-[28rem] w-[28rem] bg-marigold/30" />
          <div className="blob bottom-[-10rem] left-[35%] h-[28rem] w-[28rem] bg-leaf/15" />
        </div>

        <Navbar />
        <OfflineBanner />

        <main className="flex-1">{children}</main>

        <footer className="mt-24 border-t border-border/70 bg-card/60 backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_2fr] lg:px-8">
            <div>
              <BrandMark />
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                A calm companion for the Nashik Kumbh Mela — plan your snan, find your stay, keep your
                family together, and walk the ghats with confidence.
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  ● 100% Offline Ready
                </span>
                <span>Emergency: <strong>112</strong> / <strong>108</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              {[navItems.slice(0, 5), navItems.slice(5, 9), navItems.slice(9)].map((group, i) => (
                <ul key={i} className="space-y-2.5 text-sm">
                  {group.map((item) => (
                    <li key={item.to}>
                      <Link
                        href={item.to}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div className="border-t border-border/70 px-4 py-6 text-center text-xs text-muted-foreground">
            Made with shraddha for every yatri • KumbhSathi Nashik 2027
          </div>
        </footer>
      </body>
    </html>
  );
}
