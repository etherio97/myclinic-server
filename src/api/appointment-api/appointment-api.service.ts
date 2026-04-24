import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './appointment-api.dto';
import { Appointment } from 'src/orm/appointment/appointment.entity';
import moment from 'moment';

@Injectable()
export class AppointmentApiService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,
  ) {}

  async list(startDate?: string, endDate?: string, appointmentStatus?: string) {
    const condition: any = {};
    if (startDate && endDate) {
      condition.appointmentDate = Between(
        moment(startDate).format('yyyy-MM-DDT00:00:00.000Z'),
        moment(endDate).format('yyyy-MM-DDT23:59:59.999Z'),
      );
    }
    if (appointmentStatus) {
      condition.status = appointmentStatus;
    }
    return this.appointmentRepo.find({
      relations: ['patient', 'doctor', 'referDoctor'],
      order: { appointmentDate: 'DESC', appointmentNo: 'DESC' },
      where: condition,
    });
  }

  async findOne(id: string) {
    return this.appointmentRepo.findOne({
      where: { id },
      relations: ['patient', 'doctor', 'referDoctor'],
    });
  }

  async findPatientAppointments(patientId: string) {
    return this.appointmentRepo.find({
      where: { patient: { id: patientId } },
      relations: ['patient', 'doctor', 'referDoctor'],
      order: { appointmentDate: 'DESC', appointmentNo: 'DESC' },
    });
  }

  async findDoctorAppointments(doctorId: string) {
    return this.appointmentRepo.find({
      where: { doctor: { id: doctorId } },
      relations: ['patient', 'doctor', 'referDoctor'],
      order: { appointmentDate: 'DESC', appointmentNo: 'DESC' },
    });
  }

  create(dto: CreateAppointmentDto) {
    const appointment = this.appointmentRepo.create(dto);

    return this.appointmentRepo.save(appointment);
  }

  update(id: string, dto: UpdateAppointmentDto) {
    return this.appointmentRepo.update(id, dto);
  }

  async delete(id: string) {
    this.appointmentRepo.delete(id);

    return { message: 'Appointment deleted successfully' };
  }
}
