import { Doctor } from 'src/orm/doctor/doctor.entity';
import { LabOrder } from 'src/orm/lab-order/lab-order.entity';
import { LabTestItem } from 'src/orm/lab-test-item/lab-test-item.entity';
import { User } from 'src/orm/user/user.entity';

export class CreateLabResultDto {
  user: User;
  order: LabOrder;
  status: string;
  reportedDate: Date;
  items: LabTestItem[];
}

export class UpdateLabResultDto {
  user?: User;
  order?: LabOrder;
  status?: string;
  reportedDate?: Date;
  items?: LabTestItem[];
}
