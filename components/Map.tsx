'use client';

import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  lat: number;
  lng: number;
  zoom?: number;
  title: string;
  description?: string;
}

export default function MapComponent({ lat, lng, zoom = 14, title, description }: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    // Dynamically import Leaflet so it only loads on the client
    const L = require('leaflet');

    // Fix standard marker icon issue in Leaflet + Next.js bundler
    const defaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const map = L.map(containerRef.current).setView([lat, lng], zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    L.marker([lat, lng], { icon: defaultIcon })
      .addTo(map)
      .bindPopup(`<b>${title}</b><br/>${description || ''}`)
      .openPopup();

    return () => {
      map.remove();
    };
  }, [lat, lng, zoom, title, description]);

  return (
    <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-amber-500/30 shadow-lg relative z-0">
      <div ref={containerRef} className="w-full h-full bg-stone-900" />
    </div>
  );
}
