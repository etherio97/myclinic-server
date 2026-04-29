export class CreateItemDto {
  name: string;
  itemType: string;
  category: string;
  basePrice: number;
  sellingPrice: number;
}

export class UpdateItemDto {
  name?: string;
  itemType?: string;
  category?: string;
  basePrice?: number;
  sellingPrice?: number;
  isActive?: boolean;
}
