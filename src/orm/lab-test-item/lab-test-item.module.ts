import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabTestItem } from './lab-test-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LabTestItem])],
})
export class LabTestItemModule {}
