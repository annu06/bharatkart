'use client';

import { Search, Mic } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/search')}
      className="w-full flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3 transition-all hover:bg-gray-200 active:scale-[0.98]"
    >
      <Search className="w-5 h-5 text-gray-400" />
      <span className="text-sm text-gray-500 flex-1 text-left">
        Search for groceries, fruits, vegetables...
      </span>
      <Mic className="w-5 h-5 text-brand-500" />
    </button>
  );
}
