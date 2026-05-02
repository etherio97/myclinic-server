import { User } from 'src/orm/user/user.entity';

export class CreateCashflowDto {
  date: string;
  category: string;
  description: string;
  cashIn: number;
  cashOut: number;
  remarks: string;
  user: User;
}

export class UpdateCashflowDto {
  date?: string;
  category?: string;
  description?: string;
  cashIn?: number;
  cashOut?: number;
  remarks?: string;
  user?: User;
}
