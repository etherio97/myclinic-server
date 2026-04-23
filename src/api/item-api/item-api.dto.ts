export class CreateItemDto {
  name: string;
  description: string;
  itemType: string;
  category: string;
  basePrice: number;
  sellingPrice: number;
}

export class UpdateItemDto {
  name?: string;
  description?: string;
  itemType?: string;
  category?: string;
  basePrice?: number;
  sellingPrice?: number;
  isActive?: boolean;
}
