'use client';

import { useSession, signOut } from 'next-auth/react';
import { User, MapPin, ShoppingBag, Heart, CreditCard, Gift, HelpCircle, LogOut, ChevronRight, Crown } from 'lucide-react';
import Link from 'next/link';
import { BottomNav } from '@/components/layout/bottom-nav';

const menuItems = [
  { href: '/orders', icon: ShoppingBag, label: 'My Orders', subtitle: 'Track and view orders' },
  { href: '/addresses', icon: MapPin, label: 'Saved Addresses', subtitle: 'Manage delivery addresses' },
  { href: '/wishlist', icon: Heart, label: 'Wishlist', subtitle: 'Your favorite items' },
  { href: '/wallet', icon: CreditCard, label: 'Wallet', subtitle: '₹0 balance' },
  { href: '/referrals', icon: Gift, label: 'Refer & Earn', subtitle: 'Get ₹50 per referral' },
  { href: '/help', icon: HelpCircle, label: 'Help & Support', subtitle: 'FAQs and contact us' },
];

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Profile Header */}
      <div className="bg-white px-4 py-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center">
            {session?.user?.image ? (
              <img
                src={session.user.image}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-7 h-7 text-brand-500" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900">
              {session?.user?.name || 'Guest User'}
            </h1>
            <p className="text-sm text-gray-500">
              {session?.user?.email || 'Login to access your account'}
            </p>
          </div>
          {!session && (
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-brand-500 text-white text-sm font-medium rounded-lg"
            >
              Login
            </Link>
          )}
        </div>

        {/* Subscription Banner */}
        <div className="mt-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-sm font-semibold text-gray-900">BharatKart Plus</p>
                <p className="text-xs text-gray-500">Free delivery & exclusive offers</p>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-amber-500 text-white text-xs font-medium rounded-lg">
              ₹99/mo
            </button>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="mt-2 bg-white">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between px-4 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                <item.icon className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500">{item.subtitle}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>
        ))}
      </div>

      {/* Logout */}
      {session && (
        <div className="mt-2 bg-white">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 px-4 py-4 w-full hover:bg-gray-50 transition-colors"
          >
            <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
              <LogOut className="w-4 h-4 text-red-500" />
            </div>
            <span className="text-sm font-medium text-red-600">Logout</span>
          </button>
        </div>
      )}

      <BottomNav />
    </main>
  );
}
