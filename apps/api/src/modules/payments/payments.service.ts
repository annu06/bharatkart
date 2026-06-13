import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface CreateOrderPayload {
  amount: number;
  currency?: string;
  orderId: string;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
}

interface PaymentVerification {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

@Injectable()
export class PaymentsService {
  private razorpay: any;

  constructor(private readonly configService: ConfigService) {
    // Initialize Razorpay in production
    // this.razorpay = new Razorpay({
    //   key_id: this.configService.get('RAZORPAY_KEY_ID'),
    //   key_secret: this.configService.get('RAZORPAY_KEY_SECRET'),
    // });
  }

  async createOrder(payload: CreateOrderPayload) {
    const { amount, currency = 'INR', orderId } = payload;

    // In production, create Razorpay order
    // const razorpayOrder = await this.razorpay.orders.create({
    //   amount: amount * 100, // Razorpay expects amount in paise
    //   currency,
    //   receipt: orderId,
    //   notes: { orderId },
    // });

    // Development mock
    const razorpayOrder = {
      id: `order_${Date.now()}`,
      amount: amount * 100,
      currency,
      receipt: orderId,
      status: 'created',
    };

    return {
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: this.configService.get('RAZORPAY_KEY_ID'),
    };
  }

  async verifyPayment(verification: PaymentVerification): Promise<boolean> {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } =
      verification;

    // In production, verify signature with Razorpay
    // const crypto = require('crypto');
    // const expectedSignature = crypto
    //   .createHmac('sha256', this.configService.get('RAZORPAY_KEY_SECRET'))
    //   .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    //   .digest('hex');
    // return expectedSignature === razorpaySignature;

    // Development: always return true
    return true;
  }

  async initiateRefund(paymentId: string, amount?: number) {
    // In production:
    // const refund = await this.razorpay.payments.refund(paymentId, { amount });
    // return refund;

    return {
      id: `refund_${Date.now()}`,
      paymentId,
      amount,
      status: 'processed',
    };
  }
}
