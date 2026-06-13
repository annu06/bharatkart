import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum StoreStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended',
}

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ownerId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  coverImage: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  address: string;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  lat: number;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  lng: number;

  @Column()
  pincode: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ type: 'simple-array' })
  categories: string[];

  @Column({ type: 'enum', enum: StoreStatus, default: StoreStatus.PENDING })
  status: StoreStatus;

  @Column({ default: true })
  isOpen: boolean;

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 0 })
  rating: number;

  @Column({ default: 0 })
  totalRatings: number;

  @Column({ default: 0 })
  totalOrders: number;

  @Column({ nullable: true })
  openTime: string; // "09:00"

  @Column({ nullable: true })
  closeTime: string; // "22:00"

  @Column({ type: 'int', default: 30 })
  avgDeliveryMinutes: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  minOrderAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 25 })
  deliveryFee: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 5 })
  serviceRadius: number; // km

  @Column({ nullable: true })
  gstNumber: string;

  @Column({ nullable: true })
  fssaiNumber: string;

  @Column({ nullable: true })
  panNumber: string;

  @Column({ type: 'jsonb', nullable: true })
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    accountHolderName: string;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
