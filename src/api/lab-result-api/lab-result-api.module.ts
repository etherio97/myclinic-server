import { Module } from '@nestjs/common';
import { LabResultApiController } from './lab-result-api.controller';
import { LabResultApiService } from './lab-result-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { LabResult } from 'src/orm/lab-result/lab-result.entity';
import { LabOrder } from 'src/orm/lab-order/lab-order.entity';
import { LabOrderApiService } from '../lab-order-api/lab-order-api.service';

@Module({
  imports: [TypeOrmModule.forFeature([LabResult, LabOrder]), SharedModule],
  controllers: [LabResultApiController],
  providers: [LabResultApiService, LabOrderApiService],
})
export class LabResultApiModule {}
