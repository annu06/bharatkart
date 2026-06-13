'use client';

import { Phone, MessageCircle, Star } from 'lucide-react';

interface RiderCardProps {
  name: string;
  photo: string;
  vehicleNumber: string;
  rating: number;
  phone: string;
}

export function RiderCard({
  name,
  photo,
  vehicleNumber,
  rating,
  phone,
}: RiderCardProps) {
  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
      <div className="flex items-center gap-3">
        {/* Rider Photo */}
        <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center overflow-hidden">
          {photo ? (
            <img
              src={photo}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl">🧑</span>
          )}
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900">{name}</h4>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex items-center gap-0.5">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-xs text-gray-600">{rating}</span>
            </div>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">{vehicleNumber}</span>
          </div>
        </div>
      </div>

      {/* Contact Actions */}
      <div className="flex items-center gap-2">
        <a
          href={`tel:${phone}`}
          className="p-2.5 bg-white rounded-full shadow-sm border border-gray-100 hover:bg-brand-50 transition-colors"
          aria-label="Call rider"
        >
          <Phone className="w-4 h-4 text-brand-500" />
        </a>
        <button
          className="p-2.5 bg-white rounded-full shadow-sm border border-gray-100 hover:bg-brand-50 transition-colors"
          aria-label="Message rider"
        >
          <MessageCircle className="w-4 h-4 text-brand-500" />
        </button>
      </div>
    </div>
  );
}
