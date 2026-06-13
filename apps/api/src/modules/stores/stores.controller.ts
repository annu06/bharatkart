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
import { StoresService } from './stores.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StoreStatus } from './entities/store.entity';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get('nearby')
  async getNearbyStores(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius: number = 5,
  ) {
    return this.storesService.findNearby(lat, lng, radius);
  }

  @Get('search')
  async searchStores(
    @Query('q') query: string,
    @Query('lat') lat?: number,
    @Query('lng') lng?: number,
  ) {
    return this.storesService.search(query, lat, lng);
  }

  @Get(':id')
  async getStore(@Param('id') id: string) {
    return this.storesService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createStore(@Req() req: any, @Body() data: any) {
    return this.storesService.create({ ...data, ownerId: req.user.id });
  }

  @Put(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateStoreStatus(
    @Param('id') id: string,
    @Body('status') status: StoreStatus,
  ) {
    return this.storesService.updateStatus(id, status);
  }

  @Put(':id/toggle')
  @UseGuards(JwtAuthGuard)
  async toggleStore(@Param('id') id: string) {
    return this.storesService.toggleOpen(id);
  }

  @Get('owner/my-stores')
  @UseGuards(JwtAuthGuard)
  async getMyStores(@Req() req: any) {
    return this.storesService.findByOwner(req.user.id);
  }
}
