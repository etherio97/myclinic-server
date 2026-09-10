import { Module } from '@nestjs/common';
import { PharmReceiptApiController } from './pharm-receipt-api.controller';
import { PharmReceiptApiService } from './pharm-receipt-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { PharmReceipt } from 'src/orm/pharm-receipt/pharm-receipt.entity';
import { PharmItem } from 'src/orm/pharm-item/pharm-item.entity';
import { PharmItemApiService } from '../pharm-item-api/pharm-item-api.service';
import { PharmReceiptItem } from 'src/orm/pharm-receipt-item/pharm-receipt-item.entity';
import { PharmReceiptItemService } from './pharm-receipt-item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PharmReceipt, PharmItem, PharmReceiptItem]),
    SharedModule,
  ],
  controllers: [PharmReceiptApiController],
  providers: [
    PharmReceiptApiService,
    PharmItemApiService,
    PharmReceiptItemService,
  ],
})
export class PharmReceiptApiModule {}
