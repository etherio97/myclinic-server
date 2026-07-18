import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabOrder } from './lab-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LabOrder])],
})
export class LabOrderModule {}
