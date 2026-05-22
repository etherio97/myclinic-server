import { User } from 'src/orm/user/user.entity';

export class CreateExpenseDto {
  user: User;
  date: string;
  category: string;
  description: string;
  amount: number;
  notes?: string;
}

export class UpdateExpenseDto {
  user?: User;
  date?: string;
  category?: string;
  description?: string;
  amount?: number;
  notes?: string;
}
