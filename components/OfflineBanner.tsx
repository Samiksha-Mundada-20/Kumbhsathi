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

    // Initial check
    if (!navigator.onLine) {
      setIsOffline(true);
    }

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    // Register service worker for PWA offline caching
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
      <div className="bg-emerald-900/90 text-emerald-100 border-b border-emerald-600/50 px-4 py-2 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all">
        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
        <span>Internet connection restored. Live updates and booking links are active.</span>
      </div>
    );
  }

  if (isOffline) {
    return (
      <div className="bg-amber-950 text-amber-200 border-b border-amber-600/60 px-4 py-2 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-inner">
        <WifiOff className="w-4 h-4 text-amber-400 animate-pulse" />
        <span>
          <strong>Offline Mode Active:</strong> You are viewing saved data. Your itineraries and essential contacts work without internet.
        </span>
      </div>
    );
  }

  return null;
}