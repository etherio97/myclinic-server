import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './orm/user/user.module';
import { DoctorModule } from './orm/doctor/doctor.module';
import { ItemModule } from './orm/item/item.module';
import { PatientModule } from './orm/patient/patient.module';
import { ReceiptModule } from './orm/receipt/receipt.module';
import { AuthModule } from './api/auth/auth.module';
import { DoctorApiModule } from './api/doctor-api/doctor-api.module';
import { PatientApiModule } from './api/patient-api/patient-api.module';
import { ItemApiModule } from './api/item-api/item-api.module';
import { ReceiptApiModule } from './api/receipt-api/receipt-api.module';
import { SharedModule } from './shared/shared.module';
import { AppointmentModule } from './orm/appointment/appointment.module';
import { AppointmentApiModule } from './api/appointment-api/appointment-api.module';
import { DashboardModule } from './api/dashboard/dashboard.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 100 }],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: <any>process.env.DB_PORT || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'postgres',
      autoLoadEntities: true,
      synchronize: true, // ⚠️ only for dev
    }),
    /* ORM Modules */
    UserModule,
    DoctorModule,
    ItemModule,
    PatientModule,
    ReceiptModule,
    AppointmentModule,

    /* API Modules */
    AuthModule,
    DashboardModule,
    DoctorApiModule,
    ItemApiModule,
    PatientApiModule,
    ReceiptApiModule,
    AppointmentApiModule,

    /* Other Modules */
    SharedModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
