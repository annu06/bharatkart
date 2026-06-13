import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('search')
  async search(
    @Query('q') query: string,
    @Query('storeId') storeId?: string,
  ) {
    return this.productsService.search(query, storeId);
  }

  @Get('store/:storeId')
  async getStoreProducts(
    @Param('storeId') storeId: string,
    @Query('category') category?: string,
  ) {
    return this.productsService.findByStore(storeId, category);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() data: any) {
    return this.productsService.create(data);
  }

  @Post('bulk')
  @UseGuards(JwtAuthGuard)
  async bulkCreate(
    @Body() data: { storeId: string; products: any[] },
  ) {
    return this.productsService.bulkCreate(data.storeId, data.products);
  }

  @Put(':id/stock')
  @UseGuards(JwtAuthGuard)
  async updateStock(
    @Param('id') id: string,
    @Body('stock') stock: number,
  ) {
    return this.productsService.updateStock(id, stock);
  }
}
