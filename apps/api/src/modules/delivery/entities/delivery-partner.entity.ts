import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum VehicleType {
  BICYCLE = 'bicycle',
  MOTORCYCLE = 'motorcycle',
  SCOOTER = 'scooter',
  AUTO = 'auto',
}

export enum PartnerStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  ON_DELIVERY = 'on_delivery',
  ON_BREAK = 'on_break',
}

@Entity('delivery_partners')
export class DeliveryPartner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ type: 'enum', enum: VehicleType })
  vehicleType: VehicleType;

  @Column()
  vehicleNumber: string;

  @Column({ nullable: true })
  drivingLicense: string;

  @Column({ type: 'enum', enum: PartnerStatus, default: PartnerStatus.OFFLINE })
  status: PartnerStatus;

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 5.0 })
  rating: number;

  @Column({ default: 0 })
  totalDeliveries: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalEarnings: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  todayEarnings: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  currentLat: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  currentLng: number;

  @Column({ type: 'int', default: 0 })
  currentLoad: number; // number of active orders

  @Column({ type: 'int', default: 3 })
  maxConcurrentOrders: number;

  @Column({ default: true })
  isVerified: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
