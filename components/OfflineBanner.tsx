'use client';

import React, { useState, useEffect } from 'react';
import { WifiOff, CheckCircle2 } from 'lucide-react';

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOffline = () => {
      setIsOffline(true);
      setShowRestored(false);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setShowRestored(true);
      const timer = setTimeout(() => setShowRestored(false), 4000);
      return () => clearTimeout(timer);
    };

    if (!navigator.onLine) {
      setIsOffline(true);
    }

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('Service worker registration failed:', err);
      });
    }

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (showRestored) {
    return (
      <div className="bg-leaf text-white px-4 py-2 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-soft">
        <CheckCircle2 className="w-4 h-4" />
        <span>Internet connection restored. Live updates &amp; booking portals are reachable.</span>
      </div>
    );
  }

  if (isOffline) {
    return (
      <div className="bg-saffron text-white px-4 py-2 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-soft">
        <WifiOff className="w-4 h-4 animate-pulse" />
        <span>
          <strong>Offline Mode:</strong> Viewing local device copy. Itineraries, checklists, and helplines work without cellular data.
        </span>
      </div>
    );
  }

  return null;
}