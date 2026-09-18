import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PharmReceiptItem } from 'src/orm/pharm-receipt-item/pharm-receipt-item.entity';

@Injectable()
export class PharmReceiptItemService {
  constructor(
    @InjectRepository(PharmReceiptItem)
    private receiptItemRepo: Repository<PharmReceiptItem>,
  ) {}

  create(dto: any) {
    const receipt = this.receiptItemRepo.create(dto);

    return this.receiptItemRepo.save(receipt);
  }

  update(criteria: any, dto: any) {
    return this.receiptItemRepo.update(criteria, dto);
  }

  delete(receiptId: string) {
    return this.receiptItemRepo.delete({
      receipt: {
        id: receiptId,
      },
    });
  }
}
