'use client';

import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCartItemCount, selectCartTotal } from '@/store/slices/cart-slice';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function FloatingCart() {
  const itemCount = useSelector(selectCartItemCount);
  const total = useSelector(selectCartTotal);

  if (itemCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-20 left-4 right-4 z-40 md:bottom-6 md:left-auto md:right-6 md:w-80"
      >
        <Link href="/cart">
          <div className="bg-brand-500 text-white rounded-2xl px-5 py-4 shadow-xl shadow-brand-500/30 flex items-center justify-between hover:bg-brand-600 transition-colors">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-brand-500 text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">
                  {itemCount} item{itemCount > 1 ? 's' : ''}
                </p>
                <p className="text-xs text-white/80">View cart</p>
              </div>
            </div>
            <span className="text-lg font-bold">₹{total.toFixed(0)}</span>
          </div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
