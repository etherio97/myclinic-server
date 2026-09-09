import { PharmItem } from 'src/orm/pharm-item/pharm-item.entity';

export class CreatePharmPurchaseDto {
  item: PharmItem;
  purchasedDate: string;
  unit: string;
  supplier: string;
  expiryDate: string;
  cost: number;
  quantity: number;
  discount: number;
  total: number;
}

export class UpdatePharmPurchaseDto {
  item?: PharmItem;
  purchasedDate?: string;
  unit?: string;
  supplier?: string;
  expiryDate?: string;
  cost?: number;
  quantity?: number;
  discount?: number;
  total?: number;
}
