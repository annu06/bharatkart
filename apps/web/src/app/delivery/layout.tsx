'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Navigation, IndianRupee, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/delivery', icon: Home, label: 'Home' },
  { href: '/delivery/navigate', icon: Navigation, label: 'Navigate' },
  { href: '/delivery/earnings', icon: IndianRupee, label: 'Earnings' },
  { href: '/delivery/shifts', icon: Clock, label: 'Shifts' },
  { href: '/delivery/profile', icon: User, label: 'Profile' },
];

export default function DeliveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <main>{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-3 py-1',
                  isActive ? 'text-green-600' : 'text-gray-500'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
