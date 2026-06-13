import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrderStatus } from './entities/order.entity';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Req() req: any, @Body() data: any) {
    return this.ordersService.create({
      ...data,
      customerId: req.user.id,
    });
  }

  @Get('my')
  async getMyOrders(
    @Req() req: any,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.ordersService.findByCustomer(req.user.id, page, limit);
  }

  @Get('store/:storeId')
  async getStoreOrders(
    @Param('storeId') storeId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 20,
  ) {
    return this.ordersService.findByStore(storeId, page, limit);
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: OrderStatus,
  ) {
    return this.ordersService.updateStatus(id, status);
  }

  @Put(':id/assign-rider')
  async assignRider(
    @Param('id') id: string,
    @Body('deliveryPartnerId') deliveryPartnerId: string,
  ) {
    return this.ordersService.assignDeliveryPartner(id, deliveryPartnerId);
  }

  @Get('admin/stats')
  async getAdminStats() {
    return this.ordersService.getAdminStats();
  }
}
