import { Module } from '@nestjs/common';
import { DoctorApiController } from './doctor-api.controller';
import { DoctorApiService } from './doctor-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/orm/doctor/doctor.entity';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor]), SharedModule],
  controllers: [DoctorApiController],
  providers: [DoctorApiService],
})
export class DoctorApiModule {}
