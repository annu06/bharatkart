import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store, StoreStatus } from './entities/store.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
  ) {}

  async create(data: Partial<Store>): Promise<Store> {
    const store = this.storeRepository.create(data);
    return this.storeRepository.save(store);
  }

  async findById(id: string): Promise<Store> {
    const store = await this.storeRepository.findOne({ where: { id } });
    if (!store) throw new NotFoundException('Store not found');
    return store;
  }

  async findByOwner(ownerId: string): Promise<Store[]> {
    return this.storeRepository.find({ where: { ownerId } });
  }

  async findNearby(lat: number, lng: number, radiusKm: number = 5) {
    // PostGIS-style distance calculation
    return this.storeRepository
      .createQueryBuilder('store')
      .where('store.status = :status', { status: StoreStatus.APPROVED })
      .andWhere('store.isOpen = :isOpen', { isOpen: true })
      .andWhere(
        `(6371 * acos(cos(radians(:lat)) * cos(radians(store.lat)) * cos(radians(store.lng) - radians(:lng)) + sin(radians(:lat)) * sin(radians(store.lat)))) < :radius`,
        { lat, lng, radius: radiusKm },
      )
      .orderBy(
        `(6371 * acos(cos(radians(:lat)) * cos(radians(store.lat)) * cos(radians(store.lng) - radians(:lng)) + sin(radians(:lat)) * sin(radians(store.lat))))`,
        'ASC',
      )
      .setParameters({ lat, lng })
      .limit(20)
      .getMany();
  }

  async updateStatus(id: string, status: StoreStatus): Promise<Store> {
    const store = await this.findById(id);
    store.status = status;
    return this.storeRepository.save(store);
  }

  async toggleOpen(id: string): Promise<Store> {
    const store = await this.findById(id);
    store.isOpen = !store.isOpen;
    return this.storeRepository.save(store);
  }

  async search(query: string, lat?: number, lng?: number) {
    const qb = this.storeRepository
      .createQueryBuilder('store')
      .where('store.status = :status', { status: StoreStatus.APPROVED })
      .andWhere(
        '(store.name ILIKE :query OR :query = ANY(store.categories))',
        { query: `%${query}%` },
      );

    return qb.limit(20).getMany();
  }
}
