'use client';

import { useState } from 'react';
import { Search, ArrowLeft, Mic, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { BottomNav } from '@/components/layout/bottom-nav';

const recentSearches = ['Milk', 'Atta', 'Rice', 'Oil', 'Sugar'];
const trending = ['Mango', 'Ice Cream', 'Cold Drinks', 'Curd', 'Bread', 'Eggs'];

export default function SearchPage() {
  const [query, setQuery] = useState('');

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Search Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-1">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <div className="flex-1 flex items-center bg-gray-100 rounded-xl px-3 py-2.5">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for groceries..."
              className="flex-1 bg-transparent text-sm outline-none"
              autoFocus
            />
            <button className="ml-2">
              <Mic className="w-4 h-4 text-brand-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Recent Searches */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Searches</h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((item) => (
              <button
                key={item}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <Clock className="w-3 h-3 text-gray-400" />
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Trending */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-brand-500" />
            Trending Now
          </h3>
          <div className="flex flex-wrap gap-2">
            {trending.map((item) => (
              <button
                key={item}
                className="px-3 py-1.5 bg-brand-50 text-brand-600 rounded-full text-sm font-medium hover:bg-brand-100 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
