import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PharmPurchase } from 'src/orm/pharm-purchase/pharm-purchase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PharmInventoryApiService {
  constructor(
    @InjectRepository(PharmPurchase)
    private receiptRepo: Repository<PharmPurchase>,
  ) {}

  getAll(showAll: boolean) {
    let q = `SELECT 
  item.code AS "itemCode",
  item.name AS "itemName",
  item.tracking_unit AS "unit",
  item.units AS "units",
  item.status AS "itemStatus",
  item.qty_per_unit AS "qtyPerUnit",
  item.min_threshold AS "minThreshold",
  COALESCE(p.total_purchased, 0) AS "totalPurchased",
  COALESCE(s.total_sold, 0) AS "totalSold",
  (COALESCE(p.total_purchased, 0) - COALESCE(s.total_sold, 0)) AS "currentStock"
FROM pharm_items item
LEFT JOIN (
  SELECT pharm_item_code, SUM(quantity) AS total_purchased
  FROM pharm_purchases
  GROUP BY pharm_item_code
) p ON item.code = p.pharm_item_code
LEFT JOIN (
  SELECT ri.item_code, SUM(ri.quantity) AS total_sold
  FROM pharm_receipt_items ri
  JOIN pharm_receipts r ON ri.receipt_id = r.id AND r.status = 'Active'
  GROUP BY ri.item_code
) s ON item.code = s.item_code`;
    if (!showAll) {
      q += " WHERE item.status = 'Active'";
    }
    q += ' ORDER BY item.name ASC;';

    return this.receiptRepo.query(q);
  }
}
