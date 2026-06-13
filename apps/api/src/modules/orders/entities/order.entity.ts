import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

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

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PaymentMethod {
  UPI = 'upi',
  CARD = 'card',
  NET_BANKING = 'net_banking',
  WALLET = 'wallet',
  COD = 'cod',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderNumber: string;

  @Column()
  customerId: string;

  @Column()
  storeId: string;

  @Column({ nullable: true })
  deliveryPartnerId: string;

  @Column({ type: 'jsonb' })
  items: OrderItem[];

  @Column({ type: 'jsonb' })
  deliveryAddress: {
    fullAddress: string;
    lat: number;
    lng: number;
    landmark?: string;
    pincode: string;
  };

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  deliveryFee: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  tax: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ nullable: true })
  couponCode: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus;

  @Column({ type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Column({ nullable: true })
  razorpayOrderId: string;

  @Column({ nullable: true })
  razorpayPaymentId: string;

  @Column({ nullable: true })
  deliveryInstructions: string;

  @Column({ nullable: true })
  scheduledFor: Date;

  @Column({ type: 'int', nullable: true })
  estimatedDeliveryMinutes: number;

  @Column({ nullable: true })
  deliveredAt: Date;

  @Column({ nullable: true })
  cancelledAt: Date;

  @Column({ nullable: true })
  cancelReason: string;

  @Column({ type: 'int', nullable: true })
  rating: number;

  @Column({ nullable: true })
  review: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  mrp: number;
  quantity: number;
  unit: string;
}
