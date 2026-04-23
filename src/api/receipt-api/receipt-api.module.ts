import { Module } from '@nestjs/common';
import { ReceiptApiController } from './receipt-api.controller';
import { ReceiptApiService } from './receipt-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from 'src/orm/receipt/receipt.entity';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt]), SharedModule],
  controllers: [ReceiptApiController],
  providers: [ReceiptApiService],
})
export class ReceiptApiModule {}
