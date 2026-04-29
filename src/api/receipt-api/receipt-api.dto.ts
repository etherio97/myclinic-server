import { Doctor } from 'src/orm/doctor/doctor.entity';
import { Item } from 'src/orm/item/item.entity';
import { Patient } from 'src/orm/patient/patient.entity';
import { User } from 'src/orm/user/user.entity';

export class CreateReceiptDto {
  type: 'Laboratory' | 'Clinic';
  patient: Patient;
  doctor: Doctor;
  user: User;
  paymentMethod: number;
  subtotal: number;
  discountAmount: number;
  grandTotal: number;
  items: Item[];
}

export class UpdateReceiptDto {
  type: 'Laboratory' | 'Clinic';
  patient?: Patient;
  doctor?: Doctor;
  user?: User;
  paymentMethod?: number;
  subtotal?: number;
  discountAmount?: number;
  grandTotal?: number;
  items?: Item[];
}
