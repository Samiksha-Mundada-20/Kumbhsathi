'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Bookmark, Menu, X, ShieldAlert, Sparkles } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md border-b border-amber-600/30 text-stone-100 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-amber-100" />
            </div>
            <div>
              <div className="font-bold text-lg sm:text-xl tracking-tight text-white flex items-center gap-2">
                <span>Kumbh Trip Planner</span>
                <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Nashik 2027
                </span>
              </div>
              <p className="text-xs text-stone-400 hidden sm:block">Real routes • Honest stays • Offline saved</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-stone-300 hover:text-amber-400 font-medium text-sm transition-colors"
            >
              <Compass className="w-4 h-4 text-amber-500" />
              <span>Plan Trip</span>
            </Link>

            <Link
              href="/my-plans"
              className="flex items-center gap-2 text-stone-300 hover:text-amber-400 font-medium text-sm transition-colors"
            >
              <Bookmark className="w-4 h-4 text-amber-500" />
              <span>Saved Offline Plans</span>
            </Link>

            <div className="flex items-center gap-2 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700/60 text-xs text-stone-300">
              <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Police Helpline: <strong className="text-amber-300 font-mono">112</strong></span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-stone-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-800 bg-stone-900 px-4 pt-3 pb-5 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium text-stone-200 hover:bg-stone-800 hover:text-amber-400"
          >
            <Compass className="w-5 h-5 text-amber-500" />
            <span>Plan Trip</span>
          </Link>

          <Link
            href="/my-plans"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium text-stone-200 hover:bg-stone-800 hover:text-amber-400"
          >
            <Bookmark className="w-5 h-5 text-amber-500" />
            <span>Saved Offline Plans</span>
          </Link>

          <div className="px-3 py-2 bg-stone-800/60 rounded-lg flex items-center justify-between text-xs text-stone-300 border border-stone-700/50">
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Emergency Helpline
            </span>
            <span className="font-mono font-bold text-amber-300">112 / 108</span>
          </div>
        </div>
      )}
    </nav>
  );
}