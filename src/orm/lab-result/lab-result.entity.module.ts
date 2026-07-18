import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabResult } from './lab-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LabResult])],
})
export class LabResultModule {}
