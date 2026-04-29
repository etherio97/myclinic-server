import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/orm/doctor/doctor.entity';
import { Repository } from 'typeorm';
import { CreateDoctorDto, UpdateDoctorDto } from './doctor-api.dto';

@Injectable()
export class DoctorApiService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
  ) {}

  list(fullName?: string, doctorNo?: number, listAll?: string) {
    if (doctorNo) {
      return this.doctorRepo.find({ where: { doctorNo: doctorNo } });
    }

    if (fullName) {
      let query = ' AND is_active TRUE';
      if (listAll) {
        query = '';
      }
      return this.doctorRepo
        .createQueryBuilder('doctor')
        .where('LOWER(doctor.fullName) LIKE LOWER(:fullName)' + query, {
          fullName: `%${fullName}%`,
        })
        .orderBy({ created_at: 'DESC' })
        .getMany();
    }

    const conditions: any = {};

    if (!listAll) {
      conditions.isActive = true;
    }

    return this.doctorRepo.find({
      order: { createdAt: 'DESC' },
      where: conditions,
    });
  }

  findOne(id: string) {
    return this.doctorRepo.findOneBy({ id });
  }

  create(dto: CreateDoctorDto) {
    const doctor = this.doctorRepo.create(dto);

    return this.doctorRepo.save(doctor);
  }

  update(id: string, dto: UpdateDoctorDto) {
    return this.doctorRepo.update(id, dto);
  }

  delete(id: string) {
    return this.doctorRepo.delete(id);
  }
}
