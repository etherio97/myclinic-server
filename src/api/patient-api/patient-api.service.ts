import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto, UpdatePatientDto } from './patient-api.dto';
import { Patient } from 'src/orm/patient/patient.entity';

@Injectable()
export class PatientApiService {
  constructor(
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
  ) {}

  async list(fullName?: string, patientNo?: string) {
    const conditions: any = {};

    if (fullName) {
      return this.patientRepo
        .createQueryBuilder('patient')
        .where('LOWER(patient.fullName) LIKE LOWER(:fullName)', {
          fullName: `%${fullName}%`,
        })
        .orderBy({ created_at: 'DESC' })
        .getMany();
    }

    if (patientNo) {
      conditions.patientNo = patientNo;
      return this.patientRepo.find({ where: conditions });
    }

    return this.patientRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    return this.patientRepo.findOneBy({ id });
  }

  async create(dto: CreatePatientDto) {
    const patient = this.patientRepo.create(dto);

    const patientResponse = await this.patientRepo.save(patient);

    return patientResponse;
  }

  async update(id: string, dto: UpdatePatientDto) {
    await this.patientRepo.update(id, dto);

    return { message: 'Patient updated successfully' };
  }

  async delete(id: string) {
    return this.patientRepo.delete(id);
  }
}
