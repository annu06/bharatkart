'use client';

import { useState } from 'react';
import {
  IndianRupee,
  Package,
  Clock,
  MapPin,
  Navigation,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeliveryOrder {
  id: string;
  type: 'pickup' | 'drop';
  storeName?: string;
  customerName?: string;
  address: string;
  distance: string;
  items: number;
  amount: string;
}

const activeOrders: DeliveryOrder[] = [
  {
    id: 'ORD-201',
    type: 'pickup',
    storeName: 'Krishna General Store',
    address: 'Shop 12, Sector 62, Noida',
    distance: '1.2 km',
    items: 5,
    amount: '₹456',
  },
  {
    id: 'ORD-202',
    type: 'pickup',
    storeName: 'Fresh Fruits Hub',
    address: 'Main Market, Sector 18',
    distance: '0.8 km',
    items: 3,
    amount: '₹230',
  },
  {
    id: 'ORD-201',
    type: 'drop',
    customerName: 'Rahul Kumar',
    address: 'A-42, Sector 63, Noida',
    distance: '2.1 km',
    items: 5,
    amount: '₹456',
  },
];

export default function DeliveryDashboard() {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="min-h-screen">
      {/* Status Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-bold">Hey, Vikram! 👋</h1>
            <p className="text-green-100 text-sm">
              {isOnline ? 'You are online' : 'You are offline'}
            </p>
          </div>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              isOnline
                ? 'bg-white text-green-600'
                : 'bg-green-700 text-white border border-green-400'
            )}
          >
            {isOnline ? '● Online' : '○ Go Online'}
          </button>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center gap-1 mb-1">
              <Package className="w-3.5 h-3.5 text-green-200" />
              <span className="text-[10px] text-green-200">Deliveries</span>
            </div>
            <p className="text-xl font-bold">12</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center gap-1 mb-1">
              <IndianRupee className="w-3.5 h-3.5 text-green-200" />
              <span className="text-[10px] text-green-200">Earned</span>
            </div>
            <p className="text-xl font-bold">₹860</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center gap-1 mb-1">
              <Clock className="w-3.5 h-3.5 text-green-200" />
              <span className="text-[10px] text-green-200">Hours</span>
            </div>
            <p className="text-xl font-bold">6.5h</p>
          </div>
        </div>
      </header>

      {/* Active Orders */}
      <div className="px-4 py-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Active Deliveries
        </h2>

        <div className="space-y-3">
          {activeOrders.map((order, index) => (
            <div
              key={`${order.id}-${order.type}-${index}`}
              className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center',
                      order.type === 'pickup'
                        ? 'bg-blue-100'
                        : 'bg-green-100'
                    )}
                  >
                    {order.type === 'pickup' ? (
                      <Package className="w-4 h-4 text-blue-600" />
                    ) : (
                      <MapPin className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'text-[10px] font-medium px-1.5 py-0.5 rounded',
                          order.type === 'pickup'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        )}
                      >
                        {order.type === 'pickup' ? 'PICKUP' : 'DROP'}
                      </span>
                      <span className="text-xs text-gray-400">{order.id}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900 mt-1">
                      {order.storeName || order.customerName}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {order.address}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Navigation className="w-3 h-3" />
                        {order.distance}
                      </span>
                      <span className="text-xs text-gray-400">
                        {order.items} items
                      </span>
                      <span className="text-xs font-medium text-gray-700">
                        {order.amount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <button className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-1">
                  <Navigation className="w-4 h-4" />
                  Navigate
                </button>
                {order.type === 'pickup' ? (
                  <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Picked Up
                  </button>
                ) : (
                  <button className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Delivered
                  </button>
                )}
                <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <Phone className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Order Alert */}
      {isOnline && (
        <div className="fixed top-20 left-4 right-4 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 animate-slide-down hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                New Order Available!
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Pickup: Sharma Kirana • 1.5 km away
              </p>
              <p className="text-xs text-gray-400">Earn ₹45 for this delivery</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg">
                Accept
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg">
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
