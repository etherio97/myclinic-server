import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logging } from './logging.entity';
import { LoggingService } from './logging.service';

@Module({
  providers: [LoggingService],
  imports: [TypeOrmModule.forFeature([Logging])],
  exports: [LoggingService],
})
export class LoggingModule {}
