'use client';

import { Heart } from 'lucide-react';
import { BottomNav } from '@/components/layout/bottom-nav';

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-4">
        <h1 className="text-lg font-semibold text-gray-900">Wishlist</h1>
      </header>

      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-4">
          <Heart className="w-8 h-8 text-pink-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Your wishlist is empty</h2>
        <p className="text-sm text-gray-500 mt-1 text-center">
          Save your favorite items here to buy them later
        </p>
      </div>

      <BottomNav />
    </main>
  );
}
