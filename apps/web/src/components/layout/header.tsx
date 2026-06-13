'use client';

import { MapPin, ChevronDown, Bell, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Link from 'next/link';

export function Header() {
  const currentAddress = useSelector(
    (state: RootState) => state.user.currentAddress
  );

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Location */}
        <button className="flex items-center gap-2 flex-1 min-w-0">
          <div className="flex-shrink-0">
            <MapPin className="w-5 h-5 text-brand-500" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-gray-900 truncate">
                {currentAddress?.label || 'Set Location'}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
            </div>
            <span className="text-xs text-gray-500 truncate">
              {currentAddress?.fullAddress || 'Tap to set your delivery address'}
            </span>
          </div>
        </button>

        {/* Actions */}
        <div className="flex items-center gap-3 ml-3">
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-brand-500 rounded-full" />
          </button>
          <Link
            href="/profile"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <User className="w-5 h-5 text-gray-700" />
          </Link>
        </div>
      </div>
    </header>
  );
}
