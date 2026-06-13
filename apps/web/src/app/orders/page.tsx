'use client';

import { Package, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { BottomNav } from '@/components/layout/bottom-nav';

const orders = [
  {
    id: 'BK001',
    store: 'Krishna General Store',
    items: 5,
    total: '₹456',
    status: 'Delivered',
    date: '12 Jun 2026',
    statusColor: 'text-green-600 bg-green-50',
  },
  {
    id: 'BK002',
    store: 'Fresh Fruits Hub',
    items: 3,
    total: '₹230',
    status: 'On the way',
    date: '12 Jun 2026',
    statusColor: 'text-blue-600 bg-blue-50',
  },
  {
    id: 'BK003',
    store: 'Sharma Kirana',
    items: 8,
    total: '₹1,100',
    status: 'Delivered',
    date: '10 Jun 2026',
    statusColor: 'text-green-600 bg-green-50',
  },
];

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-4">
        <h1 className="text-lg font-semibold text-gray-900">My Orders</h1>
      </header>

      <div className="p-4 space-y-3">
        {orders.map((order) => (
          <Link key={order.id} href={`/tracking/${order.id}`}>
            <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-brand-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{order.store}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {order.items} items • {order.total}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-[11px] text-gray-400">{order.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${order.statusColor}`}>
                    {order.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <BottomNav />
    </main>
  );
}
