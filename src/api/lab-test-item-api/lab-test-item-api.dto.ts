import { LabTestItemRange } from 'src/orm/lab-test-item/lab-test-item.entity';

export class CreateLabTestItemDto {
  name: string;
  type: string;
  category: string;
  subgroup: string | null;
  unit: string | null;
  range: LabTestItemRange | null;
  rangeMale: LabTestItemRange | null;
  rangeFemale: LabTestItemRange | null;
  refText: string | null;
  enumValues: string | null;
  customFooter: string | null;
  priotity: number;
}

export class UpdateLabTestItemDto {
  name?: string;
  type?: string;
  category?: string;
  subgroup?: string | null;
  unit?: string | null;
  range?: LabTestItemRange | null;
  rangeMale?: LabTestItemRange | null;
  rangeFemale?: LabTestItemRange | null;
  refText?: string | null;
  enumValues?: string | null;
  customFooter?: string | null;
  priotity?: number;
}
