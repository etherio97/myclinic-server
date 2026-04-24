import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { Receipt } from 'src/orm/receipt/receipt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt]), SharedModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
