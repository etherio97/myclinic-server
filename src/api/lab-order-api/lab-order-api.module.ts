import { Module } from '@nestjs/common';
import { LabOrderApiController } from './lab-order-api.controller';
import { LabOrderApiService } from './lab-order-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { LabOrder } from 'src/orm/lab-order/lab-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LabOrder]), SharedModule],
  controllers: [LabOrderApiController],
  providers: [LabOrderApiService],
})
export class LabOrderApiModule {}
