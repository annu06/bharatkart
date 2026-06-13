// Product categories
export const PRODUCT_CATEGORIES = [
  { id: 'fruits', name: 'Fruits', nameHi: 'फल', emoji: '🍎' },
  { id: 'vegetables', name: 'Vegetables', nameHi: 'सब्जियाँ', emoji: '🥬' },
  { id: 'dairy', name: 'Dairy', nameHi: 'डेयरी', emoji: '🥛' },
  { id: 'bakery', name: 'Bakery', nameHi: 'बेकरी', emoji: '🍞' },
  { id: 'household', name: 'Household', nameHi: 'घरेलू सामान', emoji: '🧹' },
  { id: 'personal-care', name: 'Personal Care', nameHi: 'पर्सनल केयर', emoji: '🧴' },
  { id: 'beverages', name: 'Beverages', nameHi: 'पेय पदार्थ', emoji: '🥤' },
  { id: 'snacks', name: 'Snacks', nameHi: 'स्नैक्स', emoji: '🍿' },
  { id: 'baby-care', name: 'Baby Care', nameHi: 'शिशु देखभाल', emoji: '🍼' },
  { id: 'medicines', name: 'Medicines', nameHi: 'दवाइयाँ', emoji: '💊' },
  { id: 'meat-fish', name: 'Meat & Fish', nameHi: 'मांस और मछली', emoji: '🍗' },
  { id: 'pet-care', name: 'Pet Care', nameHi: 'पालतू जानवर', emoji: '🐾' },
] as const;

// Tracking update intervals (milliseconds)
export const TRACKING_INTERVALS = {
  ACTIVE_DELIVERY: 3000, // 3 seconds during active delivery
  IDLE_STATE: 10000, // 10 seconds when idle
} as const;

// Delivery fee configuration
export const DELIVERY_CONFIG = {
  BASE_FEE: 25, // ₹25 base delivery fee
  FREE_DELIVERY_THRESHOLD: 199, // Free delivery above ₹199
  PER_KM_CHARGE: 5, // ₹5 per km after 2km
  FREE_KM: 2, // First 2km free
  SURGE_MULTIPLIER_PEAK: 1.5, // 1.5x during peak hours
  SURGE_MULTIPLIER_RAIN: 2.0, // 2x during rain
} as const;

// Subscription plans
export const SUBSCRIPTION_PLANS = {
  MONTHLY: {
    id: 'monthly',
    name: 'BharatKart Plus Monthly',
    price: 99,
    durationDays: 30,
    benefits: ['Free delivery', 'Priority support', 'Exclusive discounts'],
  },
  QUARTERLY: {
    id: 'quarterly',
    name: 'BharatKart Plus Quarterly',
    price: 249,
    durationDays: 90,
    benefits: ['Free delivery', 'Priority support', 'Exclusive discounts', '5% extra cashback'],
  },
  YEARLY: {
    id: 'yearly',
    name: 'BharatKart Plus Yearly',
    price: 799,
    durationDays: 365,
    benefits: ['Free delivery', 'Priority support', 'Exclusive discounts', '10% extra cashback', 'Early access to offers'],
  },
} as const;

// Referral rewards
export const REFERRAL_CONFIG = {
  REFERRER_REWARD: 50, // ₹50 to referrer
  REFEREE_DISCOUNT: 100, // ₹100 off first order for new user
  MAX_REFERRALS_PER_USER: 50,
} as const;

// Order limits
export const ORDER_LIMITS = {
  MIN_ORDER_AMOUNT: 49, // ₹49 minimum order
  MAX_ITEMS_PER_ORDER: 100,
  MAX_QUANTITY_PER_ITEM: 10,
  CANCELLATION_WINDOW_MINUTES: 5,
} as const;

// Supported languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
] as const;
