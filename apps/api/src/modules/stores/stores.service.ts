import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store, StoreStatus } from './entities/store.entity';

@Injectable()
export class StoresService {
  constructor(
    @Optional()
    @InjectRepository(Store)
    private readonly storeRepository?: Repository<Store>,
  ) {}

  async create(data: Partial<Store>): Promise<Store> {
    if (!this.storeRepository) return { id: 'demo-store', ...data } as Store;
    const store = this.storeRepository.create(data);
    return this.storeRepository.save(store);
  }

  async findById(id: string): Promise<Store> {
    if (!this.storeRepository) throw new NotFoundException('Store not found');
    const store = await this.storeRepository.findOne({ where: { id } });
    if (!store) throw new NotFoundException('Store not found');
    return store;
  }

  async findByOwner(ownerId: string): Promise<Store[]> {
    if (!this.storeRepository) return [];
    return this.storeRepository.find({ where: { ownerId } });
  }

  async findNearby(lat: number, lng: number, radiusKm: number = 5) {
    if (!this.storeRepository) return [];
    return this.storeRepository
      .createQueryBuilder('store')
      .where('store.status = :status', { status: StoreStatus.APPROVED })
      .andWhere('store.isOpen = :isOpen', { isOpen: true })
      .orderBy('store.createdAt', 'DESC')
      .limit(20)
      .getMany();
  }

  async updateStatus(id: string, status: StoreStatus): Promise<Store> {
    const store = await this.findById(id);
    store.status = status;
    return this.storeRepository!.save(store);
  }

  async toggleOpen(id: string): Promise<Store> {
    const store = await this.findById(id);
    store.isOpen = !store.isOpen;
    return this.storeRepository!.save(store);
  }

  async search(query: string, lat?: number, lng?: number) {
    if (!this.storeRepository) return [];
    return this.storeRepository
      .createQueryBuilder('store')
      .where('store.status = :status', { status: StoreStatus.APPROVED })
      .andWhere('store.name ILIKE :query', { query: `%${query}%` })
      .limit(20)
      .getMany();
  }
}
