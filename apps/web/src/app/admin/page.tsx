'use client';

import {
  TrendingUp,
  Users,
  ShoppingCart,
  IndianRupee,
  Store,
  Truck,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  {
    title: 'Total Revenue',
    value: '₹12,45,890',
    change: '+12.5%',
    trend: 'up' as const,
    icon: IndianRupee,
    color: 'bg-green-50 text-green-600',
  },
  {
    title: 'Total Orders',
    value: '3,456',
    change: '+8.2%',
    trend: 'up' as const,
    icon: ShoppingCart,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Active Users',
    value: '12,890',
    change: '+15.3%',
    trend: 'up' as const,
    icon: Users,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Active Stores',
    value: '234',
    change: '+3.1%',
    trend: 'up' as const,
    icon: Store,
    color: 'bg-orange-50 text-orange-600',
  },
  {
    title: 'Active Riders',
    value: '89',
    change: '-2.4%',
    trend: 'down' as const,
    icon: Truck,
    color: 'bg-red-50 text-red-600',
  },
  {
    title: 'Avg Order Value',
    value: '₹360',
    change: '+5.8%',
    trend: 'up' as const,
    icon: TrendingUp,
    color: 'bg-amber-50 text-amber-600',
  },
];

const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'Rahul Kumar',
    store: 'Krishna General Store',
    amount: '₹456',
    status: 'delivered',
    time: '2 min ago',
  },
  {
    id: 'ORD-002',
    customer: 'Priya Sharma',
    store: 'Fresh Fruits Hub',
    amount: '₹1,230',
    status: 'on_the_way',
    time: '5 min ago',
  },
  {
    id: 'ORD-003',
    customer: 'Amit Patel',
    store: 'Sharma Kirana',
    amount: '₹890',
    status: 'picking',
    time: '8 min ago',
  },
  {
    id: 'ORD-004',
    customer: 'Neha Singh',
    store: 'Daily Needs Mart',
    amount: '₹2,100',
    status: 'order_placed',
    time: '12 min ago',
  },
  {
    id: 'ORD-005',
    customer: 'Vikram Reddy',
    store: 'Krishna General Store',
    amount: '₹675',
    status: 'delivered',
    time: '15 min ago',
  },
];

const statusColors: Record<string, string> = {
  order_placed: 'bg-yellow-100 text-yellow-700',
  picking: 'bg-blue-100 text-blue-700',
  on_the_way: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center',
                  stat.color
                )}
              >
                <stat.icon className="w-4 h-4" />
              </div>
              <div
                className={cn(
                  'flex items-center gap-0.5 text-xs font-medium',
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                )}
              >
                {stat.change}
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Orders
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">
                  Order ID
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">
                  Customer
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">
                  Store
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">
                  Amount
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-6 py-3">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-50 hover:bg-gray-50"
                >
                  <td className="px-6 py-3 text-sm font-medium text-brand-600">
                    {order.id}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-500">
                    {order.store}
                  </td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={cn(
                        'text-xs font-medium px-2 py-1 rounded-full',
                        statusColors[order.status]
                      )}
                    >
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-400">
                    {order.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
