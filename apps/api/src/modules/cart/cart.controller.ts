import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Req() req: any) {
    return this.cartService.getCart(req.user.id);
  }

  @Post('add')
  async addItem(@Req() req: any, @Body() data: any) {
    return this.cartService.addItem(req.user.id, data);
  }

  @Put('update')
  async updateQuantity(
    @Req() req: any,
    @Body() data: { productId: string; quantity: number },
  ) {
    return this.cartService.updateQuantity(
      req.user.id,
      data.productId,
      data.quantity,
    );
  }

  @Delete(':productId')
  async removeItem(@Req() req: any, @Param('productId') productId: string) {
    return this.cartService.removeItem(req.user.id, productId);
  }

  @Delete()
  async clearCart(@Req() req: any) {
    return this.cartService.clearCart(req.user.id);
  }
}
