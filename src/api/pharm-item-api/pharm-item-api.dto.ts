export class CreatePharmItemDto {
  code: string;
  barcode: string;
  name: string;
  description: string;
  units: string[];
  defaultUnit: string;
  trackingUnit: string;
  qtyPerUnit: number;
  unitPrice: number;
  eachPrice: number;
  minThreshold: number;
  stocks: number;
}

export class UpdatePharmItemDto {
  code?: string;
  barcode?: string;
  name?: string;
  description?: string;
  units?: string[];
  defaultUnit?: string;
  trackingUnit?: string;
  qtyPerUnit?: number;
  unitPrice?: number;
  eachPrice?: number;
  minThreshold?: number;
  stocks?: number;
}
