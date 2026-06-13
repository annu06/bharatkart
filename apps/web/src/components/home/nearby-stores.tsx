'use client';

import { Star, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Mock data - replace with API call
const stores = [
  {
    id: '1',
    name: 'Krishna General Store',
    image: '/stores/store1.jpg',
    rating: 4.5,
    deliveryTime: '15-20 min',
    distance: '0.8 km',
    categories: ['Grocery', 'Dairy', 'Snacks'],
    isOpen: true,
    offer: '20% OFF on first order',
  },
  {
    id: '2',
    name: 'Sharma Kirana',
    image: '/stores/store2.jpg',
    rating: 4.2,
    deliveryTime: '20-30 min',
    distance: '1.2 km',
    categories: ['Grocery', 'Household', 'Personal Care'],
    isOpen: true,
    offer: 'Free delivery above ₹199',
  },
  {
    id: '3',
    name: 'Fresh Fruits Hub',
    image: '/stores/store3.jpg',
    rating: 4.8,
    deliveryTime: '10-15 min',
    distance: '0.5 km',
    categories: ['Fruits', 'Vegetables', 'Organic'],
    isOpen: true,
    offer: null,
  },
  {
    id: '4',
    name: 'Daily Needs Mart',
    image: '/stores/store4.jpg',
    rating: 4.0,
    deliveryTime: '25-35 min',
    distance: '1.8 km',
    categories: ['Grocery', 'Beverages', 'Bakery'],
    isOpen: false,
    offer: 'Buy 2 Get 1 Free on Snacks',
  },
];

export function NearbyStores() {
  return (
    <div className="space-y-3">
      {stores.map((store, index) => (
        <motion.div
          key={store.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={`/store/${store.id}`}>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex gap-3">
                {/* Store Image Placeholder */}
                <div className="w-16 h-16 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🏪</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {store.name}
                    </h3>
                    {!store.isOpen && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                        Closed
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-medium text-gray-700">
                        {store.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {store.deliveryTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {store.distance}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {store.categories.map((cat) => (
                      <span
                        key={cat}
                        className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {store.offer && (
                <div className="mt-3 bg-green-50 rounded-lg px-3 py-1.5">
                  <span className="text-xs text-green-700 font-medium">
                    🎉 {store.offer}
                  </span>
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
