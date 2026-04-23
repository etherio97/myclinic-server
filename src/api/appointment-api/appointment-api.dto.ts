import { Doctor } from 'src/orm/doctor/doctor.entity';
import { Patient } from 'src/orm/patient/patient.entity';

export class CreateAppointmentDto {
  patient: Patient;
  phoneNumber: string;
  appointmentType: string;
  appointmentCase: string;
  doctor: Doctor;
  referDoctor: Doctor;
  appointmentDate: string;
}

export class UpdateAppointmentDto {
  patient: Patient;
  phoneNumber: string;
  appointmentType: string;
  appointmentCase: string;
  doctor: Doctor;
  referDoctor: Doctor;
  appointmentDate: string;
}
