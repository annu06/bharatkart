import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryPartner, PartnerStatus } from './entities/delivery-partner.entity';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(DeliveryPartner)
    private readonly partnerRepository: Repository<DeliveryPartner>,
  ) {}

  async findById(id: string): Promise<DeliveryPartner> {
    const partner = await this.partnerRepository.findOne({ where: { id } });
    if (!partner) throw new NotFoundException('Delivery partner not found');
    return partner;
  }

  async findByUserId(userId: string): Promise<DeliveryPartner | null> {
    return this.partnerRepository.findOne({ where: { userId } });
  }

  async updateStatus(id: string, status: PartnerStatus): Promise<DeliveryPartner> {
    const partner = await this.findById(id);
    partner.status = status;
    return this.partnerRepository.save(partner);
  }

  async updateLocation(
    id: string,
    lat: number,
    lng: number,
  ): Promise<DeliveryPartner> {
    const partner = await this.findById(id);
    partner.currentLat = lat;
    partner.currentLng = lng;
    return this.partnerRepository.save(partner);
  }

  async findNearestAvailable(
    lat: number,
    lng: number,
    radiusKm: number = 5,
  ): Promise<DeliveryPartner[]> {
    return this.partnerRepository
      .createQueryBuilder('partner')
      .where('partner.status = :status', { status: PartnerStatus.ONLINE })
      .andWhere('partner.isActive = :active', { active: true })
      .andWhere('partner.isVerified = :verified', { verified: true })
      .andWhere('partner.currentLoad < partner.maxConcurrentOrders')
      .andWhere(
        `(6371 * acos(cos(radians(:lat)) * cos(radians(partner.currentLat)) * cos(radians(partner.currentLng) - radians(:lng)) + sin(radians(:lat)) * sin(radians(partner.currentLat)))) < :radius`,
        { lat, lng, radius: radiusKm },
      )
      .orderBy(
        `(6371 * acos(cos(radians(:lat)) * cos(radians(partner.currentLat)) * cos(radians(partner.currentLng) - radians(:lng)) + sin(radians(:lat)) * sin(radians(partner.currentLat))))`,
        'ASC',
      )
      .setParameters({ lat, lng })
      .limit(10)
      .getMany();
  }

  async getEarnings(partnerId: string, period: 'today' | 'week' | 'month') {
    const partner = await this.findById(partnerId);

    return {
      partnerId,
      today: partner.todayEarnings,
      total: partner.totalEarnings,
      totalDeliveries: partner.totalDeliveries,
      rating: partner.rating,
    };
  }

  async addEarning(partnerId: string, amount: number): Promise<void> {
    const partner = await this.findById(partnerId);
    partner.totalEarnings = Number(partner.totalEarnings) + amount;
    partner.todayEarnings = Number(partner.todayEarnings) + amount;
    partner.totalDeliveries += 1;
    await this.partnerRepository.save(partner);
  }
}
