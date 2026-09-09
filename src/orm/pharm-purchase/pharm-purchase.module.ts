import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PharmPurchase } from './pharm-purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PharmPurchase])],
})
export class PharmPurchaseModule {}
