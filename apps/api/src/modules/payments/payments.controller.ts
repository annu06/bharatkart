import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-order')
  @HttpCode(HttpStatus.OK)
  async createOrder(@Body() data: any) {
    return this.paymentsService.createOrder(data);
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verifyPayment(@Body() data: any) {
    const isValid = await this.paymentsService.verifyPayment(data);
    return { success: isValid };
  }

  @Post('refund')
  @HttpCode(HttpStatus.OK)
  async refund(@Body() data: { paymentId: string; amount?: number }) {
    return this.paymentsService.initiateRefund(data.paymentId, data.amount);
  }
}
