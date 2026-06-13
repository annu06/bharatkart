'use client';

import { useEffect, useRef, useState } from 'react';
import { OrderTrackingStatus } from '@/store/slices/tracking-slice';

interface LiveMapProps {
  riderLocation: { lat: number; lng: number; heading: number } | null;
  route: Array<{ lat: number; lng: number }>;
  status: OrderTrackingStatus | null;
}

export function LiveMap({ riderLocation, route, status }: LiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // In production, initialize Google Maps here
    // For now, show a placeholder that demonstrates the layout
    setMapLoaded(true);
  }, []);

  return (
    <div ref={mapRef} className="w-full h-full bg-gray-200 relative">
      {/* Map placeholder - replace with Google Maps integration */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-green-100 to-green-50">
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-sm text-gray-600 font-medium">Live Map View</p>
          <p className="text-xs text-gray-400 mt-1">
            Google Maps integration ready
          </p>
          {riderLocation && (
            <div className="mt-3 bg-white rounded-lg px-3 py-2 shadow-sm">
              <p className="text-xs text-gray-500">Rider Location</p>
              <p className="text-xs font-mono">
                {riderLocation.lat.toFixed(4)}, {riderLocation.lng.toFixed(4)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Animated rider marker */}
      {riderLocation && status && ['on_the_way', 'near_customer'].includes(status) && (
        <div
          className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            left: '50%',
            top: '40%',
            transform: `rotate(${riderLocation.heading}deg)`,
          }}
        >
          <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center shadow-lg animate-pulse-dot">
            <span className="text-lg">🛵</span>
          </div>
        </div>
      )}
    </div>
  );
}
