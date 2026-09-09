import { Module } from '@nestjs/common';
import { PharmItemApiController } from './pharm-item-api.controller';
import { PharmItemApiService } from './pharm-item-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { PharmItem } from 'src/orm/pharm-item/pharm-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PharmItem]), SharedModule],
  controllers: [PharmItemApiController],
  providers: [PharmItemApiService],
})
export class PharmItemApiModule {}
