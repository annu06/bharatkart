import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { DeliveryPartner } from './entities/delivery-partner.entity';

const imports = process.env.DATABASE_URL
  ? [TypeOrmModule.forFeature([DeliveryPartner])]
  : [];

@Module({
  imports,
  controllers: [DeliveryController],
  providers: [DeliveryService],
  exports: [DeliveryService],
})
export class DeliveryModule {}
