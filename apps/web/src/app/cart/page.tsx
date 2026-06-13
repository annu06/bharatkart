'use client';

import { useSelector, useDispatch } from 'react-redux';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  selectCartItems,
  selectCartTotal,
  selectCartSavings,
  updateQuantity,
  removeItem,
} from '@/store/slices/cart-slice';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const savings = useSelector(selectCartSavings);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8 text-brand-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Your cart is empty</h2>
        <p className="text-sm text-gray-500 mt-1 text-center">
          Add items from a store to get started
        </p>
        <Link
          href="/"
          className="mt-6 px-6 py-3 bg-brand-500 text-white rounded-xl font-medium text-sm"
        >
          Browse Stores
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-32">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">Cart</h1>
          <span className="text-sm text-gray-500">({items.length} items)</span>
        </div>
      </header>

      <div className="p-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.productId}
            className="bg-white rounded-xl p-4 border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🛒</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">{item.unit}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-semibold">{formatPrice(item.price)}</span>
                  {item.mrp > item.price && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(item.mrp)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        productId: item.productId,
                        quantity: item.quantity - 1,
                      })
                    )
                  }
                  className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-sm font-semibold w-5 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        productId: item.productId,
                        quantity: item.quantity + 1,
                      })
                    )
                  }
                  className="w-7 h-7 rounded-full bg-brand-500 text-white flex items-center justify-center"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        {savings > 0 && (
          <p className="text-xs text-green-600 font-medium mb-2">
            🎉 You&apos;re saving {formatPrice(savings)} on this order!
          </p>
        )}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">{formatPrice(total)}</p>
            <p className="text-xs text-gray-500">+ ₹25 delivery fee</p>
          </div>
          <button className="px-8 py-3 bg-brand-500 text-white rounded-xl font-medium text-sm hover:bg-brand-600 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
}
