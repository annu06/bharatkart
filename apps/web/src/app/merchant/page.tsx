'use client';

import {
  ShoppingCart,
  IndianRupee,
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  {
    title: "Today's Orders",
    value: '28',
    icon: ShoppingCart,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: "Today's Revenue",
    value: '₹8,450',
    icon: IndianRupee,
    color: 'bg-green-50 text-green-600',
  },
  {
    title: 'Products Listed',
    value: '342',
    icon: Package,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Avg Order Value',
    value: '₹302',
    icon: TrendingUp,
    color: 'bg-orange-50 text-orange-600',
  },
];

const pendingOrders = [
  {
    id: 'ORD-101',
    customer: 'Rahul Kumar',
    items: 5,
    total: '₹456',
    time: '2 min ago',
    status: 'new',
  },
  {
    id: 'ORD-102',
    customer: 'Priya Devi',
    items: 3,
    total: '₹230',
    time: '5 min ago',
    status: 'new',
  },
  {
    id: 'ORD-103',
    customer: 'Amit Singh',
    items: 8,
    total: '₹1,100',
    time: '8 min ago',
    status: 'picking',
  },
];

const lowStockItems = [
  { name: 'Amul Milk 500ml', stock: 3, unit: 'packets' },
  { name: 'Tata Salt 1kg', stock: 2, unit: 'packs' },
  { name: 'Fortune Oil 1L', stock: 1, unit: 'bottles' },
  { name: 'Aashirvaad Atta 5kg', stock: 4, unit: 'bags' },
];

export default function MerchantDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Store Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Krishna General Store • Sector 62, Noida
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-green-600 font-medium">
            Store Open
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
          >
            <div
              className={cn(
                'w-9 h-9 rounded-lg flex items-center justify-center mb-3',
                stat.color
              )}
            >
              <stat.icon className="w-4 h-4" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Orders */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Pending Orders
            </h2>
            <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
              {pendingOrders.length} new
            </span>
          </div>
          <div className="divide-y divide-gray-50">
            {pendingOrders.map((order) => (
              <div
                key={order.id}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">
                      {order.id}
                    </span>
                    {order.status === 'new' && (
                      <span className="bg-brand-100 text-brand-700 text-[10px] font-medium px-1.5 py-0.5 rounded">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {order.customer} • {order.items} items • {order.total}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {order.time}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600 transition-colors">
                    Accept
                  </button>
                  <button className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              Low Stock Alert
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {lowStockItems.map((item) => (
              <div
                key={item.name}
                className="px-6 py-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-red-500 mt-0.5">
                    Only {item.stock} {item.unit} left
                  </p>
                </div>
                <button className="px-3 py-1.5 bg-brand-50 text-brand-600 text-xs font-medium rounded-lg hover:bg-brand-100 transition-colors">
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
