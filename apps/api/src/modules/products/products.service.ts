import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Optional()
    @InjectRepository(Product)
    private readonly productRepository?: Repository<Product>,
  ) {}

  async create(data: Partial<Product>): Promise<Product> {
    if (!this.productRepository) return { id: 'demo-product', ...data } as Product;
    const product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }

  async findById(id: string): Promise<Product> {
    if (!this.productRepository) throw new NotFoundException('Product not found');
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findByStore(storeId: string, category?: string) {
    if (!this.productRepository) return [];
    const query = this.productRepository
      .createQueryBuilder('product')
      .where('product.storeId = :storeId', { storeId })
      .andWhere('product.isAvailable = :available', { available: true });
    if (category) {
      query.andWhere('product.category = :category', { category });
    }
    return query.orderBy('product.name', 'ASC').getMany();
  }

  async search(query: string, storeId?: string) {
    if (!this.productRepository) return [];
    const qb = this.productRepository
      .createQueryBuilder('product')
      .where('product.name ILIKE :query', { query: `%${query}%` })
      .andWhere('product.isAvailable = :available', { available: true });
    if (storeId) {
      qb.andWhere('product.storeId = :storeId', { storeId });
    }
    return qb.limit(50).getMany();
  }

  async updateStock(id: string, stock: number): Promise<Product> {
    const product = await this.findById(id);
    product.stock = stock;
    product.isAvailable = stock > 0;
    return this.productRepository!.save(product);
  }

  async decrementStock(id: string, quantity: number): Promise<Product> {
    const product = await this.findById(id);
    product.stock = Math.max(0, product.stock - quantity);
    product.isAvailable = product.stock > 0;
    return this.productRepository!.save(product);
  }

  async bulkCreate(storeId: string, products: Partial<Product>[]): Promise<Product[]> {
    if (!this.productRepository) return [];
    const entities = products.map((p) =>
      this.productRepository!.create({ ...p, storeId }),
    );
    return this.productRepository.save(entities);
  }
}
