import { Doctor } from 'src/orm/doctor/doctor.entity';
import { Item } from 'src/orm/item/item.entity';
import { Patient } from 'src/orm/patient/patient.entity';
import { User } from 'src/orm/user/user.entity';

export class CreateReceiptDto {
  patient: Patient;
  doctor: Doctor;
  user: User;
  paymentMethod: string;
  subtotal: string;
  discountAmount: string;
  grandTotal: string;
  items: Item[];
}

export class UpdateReceiptDto {
  patient?: Patient;
  doctor?: Doctor;
  user?: User;
  paymentMethod?: string;
  subtotal?: string;
  discountAmount?: string;
  grandTotal?: string;
  items?: Item[];
}
