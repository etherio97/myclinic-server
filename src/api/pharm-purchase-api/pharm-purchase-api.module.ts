import { Module } from '@nestjs/common';
import { PharmPurchaseApiController } from './pharm-purchase-api.controller';
import { PharmPurchaseApiService } from './pharm-purchase-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { PharmPurchase } from 'src/orm/pharm-purchase/pharm-purchase.entity';
import { PharmItemApiService } from '../pharm-item-api/pharm-item-api.service';
import { PharmItem } from 'src/orm/pharm-item/pharm-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PharmPurchase, PharmItem]), SharedModule],
  controllers: [PharmPurchaseApiController],
  providers: [PharmPurchaseApiService, PharmItemApiService],
})
export class PharmPurchaseApiModule {}
