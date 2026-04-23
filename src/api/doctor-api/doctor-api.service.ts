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

  async list(fullName?: string, doctorNo?: string) {
    const conditions: any = {};

    if (fullName) {
      return this.doctorRepo
        .createQueryBuilder('doctor')
        .where('LOWER(doctor.fullName) LIKE LOWER(:fullName)', {
          fullName: `%${fullName}%`,
        })
        .orderBy({ created_at: 'DESC' })
        .getMany();
    }

    if (doctorNo) {
      conditions.doctorNo = doctorNo;
      return this.doctorRepo.find({ where: conditions });
    }

    return this.doctorRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    return this.doctorRepo.findOneBy({ id });
  }

  async create(dto: CreateDoctorDto) {
    const doctor = this.doctorRepo.create(dto);

    const doctorResponse = await this.doctorRepo.save(doctor);

    return doctorResponse;
  }

  async update(id: string, dto: UpdateDoctorDto) {
    this.doctorRepo.update(id, dto);

    return { message: 'Doctor updated successfully' };
  }

  async delete(id: string) {
    this.doctorRepo.delete(id);

    return { message: 'Doctor deleted successfully' };
  }
}
