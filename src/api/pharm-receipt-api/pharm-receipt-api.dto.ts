import { PharmItem } from 'src/orm/pharm-item/pharm-item.entity';
import { Patient } from 'src/orm/patient/patient.entity';
import { User } from 'src/orm/user/user.entity';

export class CreatePharmReceiptDto {
  patient: Patient;
  user: User;
  date: string;
  paymentMethod: string;
  subtotal: number;
  discountAmount: number;
  grandTotal: number;
  items: PharmItem[];
}

export class UpdatePharmReceiptDto {
  patient?: Patient;
  user?: User;
  date?: string;
  paymentMethod?: string;
  subtotal?: number;
  discountAmount?: number;
  grandTotal?: number;
  items?: PharmItem[];
}
