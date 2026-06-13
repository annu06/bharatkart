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
import { DeliveryService } from './delivery.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PartnerStatus } from './entities/delivery-partner.entity';

@Controller('delivery')
@UseGuards(JwtAuthGuard)
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get('me')
  async getProfile(@Req() req: any) {
    return this.deliveryService.findByUserId(req.user.id);
  }

  @Put('status')
  async updateStatus(@Req() req: any, @Body('status') status: PartnerStatus) {
    const partner = await this.deliveryService.findByUserId(req.user.id);
    if (partner) {
      return this.deliveryService.updateStatus(partner.id, status);
    }
  }

  @Put('location')
  async updateLocation(
    @Req() req: any,
    @Body() data: { lat: number; lng: number },
  ) {
    const partner = await this.deliveryService.findByUserId(req.user.id);
    if (partner) {
      return this.deliveryService.updateLocation(partner.id, data.lat, data.lng);
    }
  }

  @Get('earnings')
  async getEarnings(
    @Req() req: any,
    @Query('period') period: 'today' | 'week' | 'month' = 'today',
  ) {
    const partner = await this.deliveryService.findByUserId(req.user.id);
    if (partner) {
      return this.deliveryService.getEarnings(partner.id, period);
    }
  }

  @Get('nearby-available')
  async findNearby(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius: number = 5,
  ) {
    return this.deliveryService.findNearestAvailable(lat, lng, radius);
  }
}
