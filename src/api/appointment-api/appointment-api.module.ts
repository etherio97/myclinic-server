import { Module } from '@nestjs/common';
import { AppointmentApiController } from './appointment-api.controller';
import { AppointmentApiService } from './appointment-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { Appointment } from 'src/orm/appointment/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), SharedModule],
  controllers: [AppointmentApiController],
  providers: [AppointmentApiService],
})
export class AppointmentApiModule {}
