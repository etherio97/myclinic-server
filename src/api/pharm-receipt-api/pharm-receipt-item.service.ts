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

  update(id: string, dto: any) {
    return this.receiptItemRepo.update(id, dto);
  }

  delete(receiptId: string) {
    return this.receiptItemRepo.delete({
      receipt: {
        id: receiptId,
      },
    });
  }
}
