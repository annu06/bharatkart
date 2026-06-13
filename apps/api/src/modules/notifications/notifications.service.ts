import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export enum NotificationChannel {
  SMS = 'sms',
  PUSH = 'push',
  WHATSAPP = 'whatsapp',
  EMAIL = 'email',
}

interface NotificationPayload {
  userId: string;
  title: string;
  body: string;
  channel: NotificationChannel;
  data?: Record<string, any>;
}

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}

  async send(payload: NotificationPayload): Promise<void> {
    switch (payload.channel) {
      case NotificationChannel.SMS:
        await this.sendSms(payload);
        break;
      case NotificationChannel.PUSH:
        await this.sendPush(payload);
        break;
      case NotificationChannel.WHATSAPP:
        await this.sendWhatsApp(payload);
        break;
      case NotificationChannel.EMAIL:
        await this.sendEmail(payload);
        break;
    }
  }

  async sendOrderUpdate(
    userId: string,
    orderId: string,
    status: string,
  ): Promise<void> {
    const messages: Record<string, string> = {
      confirmed: 'Your order has been confirmed! 🎉',
      picking: 'Store is picking your items 🛒',
      packed: 'Your order is packed and ready! 📦',
      rider_assigned: 'A delivery partner has been assigned 🛵',
      picked_up: 'Your order is on the way! 🚀',
      delivered: 'Your order has been delivered! ✅ Rate your experience.',
    };

    const message = messages[status];
    if (message) {
      await this.send({
        userId,
        title: 'Order Update',
        body: message,
        channel: NotificationChannel.PUSH,
        data: { orderId, status },
      });
    }
  }

  private async sendSms(payload: NotificationPayload): Promise<void> {
    // Integration with MSG91
    // const authKey = this.configService.get('MSG91_AUTH_KEY');
    // const senderId = this.configService.get('MSG91_SENDER_ID');
    console.log(`[SMS] To: ${payload.userId} | ${payload.body}`);
  }

  private async sendPush(payload: NotificationPayload): Promise<void> {
    // Integration with FCM or similar
    console.log(`[PUSH] To: ${payload.userId} | ${payload.title}: ${payload.body}`);
  }

  private async sendWhatsApp(payload: NotificationPayload): Promise<void> {
    // Integration with WhatsApp Business API
    console.log(`[WHATSAPP] To: ${payload.userId} | ${payload.body}`);
  }

  private async sendEmail(payload: NotificationPayload): Promise<void> {
    // Integration with email provider
    console.log(`[EMAIL] To: ${payload.userId} | ${payload.title}: ${payload.body}`);
  }
}
