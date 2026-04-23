import { Module } from '@nestjs/common';
import { PatientApiController } from './patient-api.controller';
import { PatientApiService } from './patient-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/orm/patient/patient.entity';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Patient]), SharedModule],
  controllers: [PatientApiController],
  providers: [PatientApiService],
})
export class PatientApiModule {}
