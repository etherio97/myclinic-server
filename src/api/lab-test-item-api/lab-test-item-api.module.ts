import { Module } from '@nestjs/common';
import { LabTestItemApiController } from './lab-test-item-api.controller';
import { LabTestItemApiService } from './lab-test-item-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { LabTestItem } from 'src/orm/lab-test-item/lab-test-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LabTestItem]), SharedModule],
  controllers: [LabTestItemApiController],
  providers: [LabTestItemApiService],
})
export class LabTestItemApiModule {}
