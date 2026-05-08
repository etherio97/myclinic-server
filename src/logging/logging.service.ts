import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logging } from './logging.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoggingService {
  constructor(
    @InjectRepository(Logging)
    private loggingRepo: Repository<Logging>,
  ) {}

  log(data: any) {
    const log = this.loggingRepo.create(data);

    return this.loggingRepo.save(log);
  }
}
