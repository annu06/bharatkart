'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const deals = [
  {
    id: '1',
    title: 'Fresh Fruits Festival',
    subtitle: 'Up to 40% OFF',
    bgColor: 'bg-gradient-to-r from-green-400 to-green-600',
    emoji: '🍎🥭🍇',
  },
  {
    id: '2',
    title: 'Dairy Delights',
    subtitle: 'Buy 2 Get 1 Free',
    bgColor: 'bg-gradient-to-r from-blue-400 to-blue-600',
    emoji: '🥛🧈🧀',
  },
  {
    id: '3',
    title: 'Weekend Special',
    subtitle: 'Free Delivery All Day',
    bgColor: 'bg-gradient-to-r from-brand-400 to-brand-600',
    emoji: '🛒✨🎉',
  },
  {
    id: '4',
    title: 'Healthy Living',
    subtitle: 'Organic products at 30% OFF',
    bgColor: 'bg-gradient-to-r from-emerald-400 to-emerald-600',
    emoji: '🥦🥕🌽',
  },
];

export function DealsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto no-scrollbar px-4 py-4"
      >
        {deals.map((deal) => (
          <button
            key={deal.id}
            className={`flex-shrink-0 w-72 sm:w-80 h-32 rounded-2xl ${deal.bgColor} p-5 text-white text-left hover:scale-[1.02] transition-transform`}
          >
            <div className="flex justify-between items-start h-full">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-bold text-lg">{deal.title}</h3>
                  <p className="text-white/90 text-sm mt-1">{deal.subtitle}</p>
                </div>
                <span className="text-xs bg-white/20 rounded-full px-3 py-1 w-fit backdrop-blur-sm">
                  Shop Now →
                </span>
              </div>
              <span className="text-3xl">{deal.emoji}</span>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-1.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
