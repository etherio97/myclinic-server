import { Doctor } from 'src/orm/doctor/doctor.entity';
import {
  LabTestItem,
  LabTestItemRange,
} from 'src/orm/lab-test-item/lab-test-item.entity';
import { Patient } from 'src/orm/patient/patient.entity';
import { User } from 'src/orm/user/user.entity';

export class CreateLabOrderDto {
  user: User;
  patient: Patient;
  doctor: Doctor | null;
  referCentre: string | null;
  status: string;
  collectedDate: Date;
  receivedDate: Date;
  items: LabTestItem[];
}

export class UpdateLabOrderDto {
  user?: User;
  patient?: Patient;
  doctor?: Doctor | null;
  referCentre?: string | null;
  status?: string;
  collectedDate?: Date;
  receivedDate?: Date;
  items?: LabTestItem[];
}
