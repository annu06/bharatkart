'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  { id: 'fruits', name: 'Fruits', emoji: '🍎', color: 'bg-red-50' },
  { id: 'vegetables', name: 'Vegetables', emoji: '🥬', color: 'bg-green-50' },
  { id: 'dairy', name: 'Dairy', emoji: '🥛', color: 'bg-blue-50' },
  { id: 'bakery', name: 'Bakery', emoji: '🍞', color: 'bg-amber-50' },
  { id: 'household', name: 'Household', emoji: '🧹', color: 'bg-purple-50' },
  { id: 'personal-care', name: 'Personal Care', emoji: '🧴', color: 'bg-pink-50' },
  { id: 'beverages', name: 'Beverages', emoji: '🥤', color: 'bg-cyan-50' },
  { id: 'snacks', name: 'Snacks', emoji: '🍿', color: 'bg-yellow-50' },
  { id: 'baby-care', name: 'Baby Care', emoji: '🍼', color: 'bg-rose-50' },
  { id: 'medicines', name: 'Medicines', emoji: '💊', color: 'bg-emerald-50' },
  { id: 'meat-fish', name: 'Meat & Fish', emoji: '🍗', color: 'bg-orange-50' },
  { id: 'pet-care', name: 'Pet Care', emoji: '🐾', color: 'bg-indigo-50' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function CategoryGrid() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-8"
    >
      {categories.map((category) => (
        <motion.div key={category.id} variants={itemVariants}>
          <Link
            href={`/category/${category.id}`}
            className="flex flex-col items-center gap-2 group"
          >
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${category.color} flex items-center justify-center text-2xl group-hover:scale-105 transition-transform`}
            >
              {category.emoji}
            </div>
            <span className="text-xs text-gray-700 font-medium text-center leading-tight">
              {category.name}
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
