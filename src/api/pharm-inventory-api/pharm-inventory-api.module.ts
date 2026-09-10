import { Module } from '@nestjs/common';
import { PharmInventoryApiController } from './pharm-inventory-api.controller';
import { PharmInventoryApiService } from './pharm-inventory-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { PharmPurchase } from 'src/orm/pharm-purchase/pharm-purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PharmPurchase]), SharedModule],
  controllers: [PharmInventoryApiController],
  providers: [PharmInventoryApiService],
})
export class PharmInventoryApiModule {}
