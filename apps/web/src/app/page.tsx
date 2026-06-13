'use client';

import { Header } from '@/components/layout/header';
import { SearchBar } from '@/components/home/search-bar';
import { CategoryGrid } from '@/components/home/category-grid';
import { NearbyStores } from '@/components/home/nearby-stores';
import { DealsCarousel } from '@/components/home/deals-carousel';
import { BottomNav } from '@/components/layout/bottom-nav';
import { FloatingCart } from '@/components/cart/floating-cart';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <Header />

      <div className="px-4 py-3">
        <SearchBar />
      </div>

      <DealsCarousel />

      <section className="px-4 py-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Shop by Category
        </h2>
        <CategoryGrid />
      </section>

      <section className="px-4 py-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Nearby Stores
        </h2>
        <NearbyStores />
      </section>

      <FloatingCart />
      <BottomNav />
    </main>
  );
}
