// User types
export enum UserRole {
  CUSTOMER = 'customer',
  MERCHANT = 'merchant',
  DELIVERY = 'delivery',
  ADMIN = 'admin',
}

// Order types
export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PICKING = 'picking',
  PACKING = 'packing',
  PACKED = 'packed',
  RIDER_ASSIGNED = 'rider_assigned',
  RIDER_AT_STORE = 'rider_at_store',
  PICKED_UP = 'picked_up',
  ON_THE_WAY = 'on_the_way',
  NEAR_CUSTOMER = 'near_customer',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  UPI = 'upi',
  CARD = 'card',
  NET_BANKING = 'net_banking',
  WALLET = 'wallet',
  COD = 'cod',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

// Store types
export enum StoreStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended',
}

// Delivery types
export enum VehicleType {
  BICYCLE = 'bicycle',
  MOTORCYCLE = 'motorcycle',
  SCOOTER = 'scooter',
  AUTO = 'auto',
}

export enum DeliveryPartnerStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  ON_DELIVERY = 'on_delivery',
  ON_BREAK = 'on_break',
}

// Socket event types
export interface RiderLocationEvent {
  lat: number;
  lng: number;
  heading: number;
  speed: number;
  timestamp: number;
}

export interface OrderStatusEvent {
  orderId: string;
  status: OrderStatus;
  timestamp: number;
}

export interface EtaEvent {
  eta: number; // minutes
  distance: number; // meters
}

// API response types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
