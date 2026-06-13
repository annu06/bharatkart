import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  storeId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  nameHindi: string;

  @Column({ nullable: true })
  nameTelugu: string;

  @Column({ nullable: true })
  nameTamil: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

  @Column()
  category: string;

  @Column({ nullable: true })
  subcategory: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  mrp: number;

  @Column()
  unit: string; // kg, g, L, ml, piece, pack

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 1 })
  unitValue: number; // 500 (for 500g)

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ nullable: true })
  barcode: string;

  @Column({ nullable: true })
  sku: string;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @Column({ type: 'decimal', precision: 3, scale: 1, default: 0 })
  rating: number;

  @Column({ default: 0 })
  totalRatings: number;

  @Column({ default: 0 })
  totalSold: number;

  @Column({ default: false })
  isVeg: boolean;

  @Column({ default: false })
  isOrganic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
