import { Injectable, NotFoundException, Optional } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @Optional()
    @InjectRepository(Order)
    private readonly orderRepository?: Repository<Order>,
  ) {}

  async create(data: Partial<Order>): Promise<Order> {
    if (!this.orderRepository) {
      return { id: 'demo-order', orderNumber: 'BKDEMO001', ...data } as Order;
    }
    const order = this.orderRepository.create({
      ...data,
      orderNumber: this.generateOrderNumber(),
    });
    return this.orderRepository.save(order);
  }

  async findById(id: string): Promise<Order> {
    if (!this.orderRepository) throw new NotFoundException('Order not found');
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async findByCustomer(customerId: string, page: number = 1, limit: number = 20) {
    if (!this.orderRepository) {
      return { orders: [], pagination: { page, limit, total: 0, totalPages: 0 } };
    }
    const [orders, total] = await this.orderRepository.findAndCount({
      where: { customerId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { orders, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findByStore(storeId: string, page: number = 1, limit: number = 20) {
    if (!this.orderRepository) {
      return { orders: [], pagination: { page, limit, total: 0, totalPages: 0 } };
    }
    const [orders, total] = await this.orderRepository.findAndCount({
      where: { storeId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { orders, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async findByDeliveryPartner(deliveryPartnerId: string) {
    if (!this.orderRepository) return [];
    return this.orderRepository.find({
      where: { deliveryPartnerId, status: OrderStatus.ON_THE_WAY },
      order: { createdAt: 'ASC' },
    });
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.findById(id);
    order.status = status;
    if (status === OrderStatus.DELIVERED) order.deliveredAt = new Date();
    if (status === OrderStatus.CANCELLED) order.cancelledAt = new Date();
    return this.orderRepository!.save(order);
  }

  async assignDeliveryPartner(orderId: string, partnerId: string): Promise<Order> {
    const order = await this.findById(orderId);
    order.deliveryPartnerId = partnerId;
    order.status = OrderStatus.RIDER_ASSIGNED;
    return this.orderRepository!.save(order);
  }

  async getAdminStats() {
    if (!this.orderRepository) {
      return { totalOrders: 0, todayOrders: 0, totalRevenue: 0, todayRevenue: 0 };
    }
    const totalOrders = await this.orderRepository.count();
    const todayOrders = await this.orderRepository
      .createQueryBuilder('order')
      .where('order.createdAt >= CURRENT_DATE')
      .getCount();
    const revenue = await this.orderRepository
      .createQueryBuilder('order')
      .select('SUM(order.total)', 'total')
      .where('order.paymentStatus = :status', { status: 'paid' })
      .getRawOne();
    return {
      totalOrders,
      todayOrders,
      totalRevenue: revenue?.total || 0,
      todayRevenue: 0,
    };
  }

  private generateOrderNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `BK${timestamp}${random}`;
  }
}
