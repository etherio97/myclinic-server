import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PharmReceiptApiService } from './pharm-receipt-api.service';
import {
  CreatePharmReceiptDto,
  UpdatePharmReceiptDto,
} from './pharm-receipt-api.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { PharmItemApiService } from '../pharm-item-api/pharm-item-api.service';
import { PharmReceiptItemService } from './pharm-receipt-item.service';
import { PharmReceipt } from 'src/orm/pharm-receipt/pharm-receipt.entity';
import { sleep } from 'src/shared/utils';

@Controller('pharm-receipt')
export class PharmReceiptApiController {
  constructor(
    private receiptService: PharmReceiptApiService,
    private itemService: PharmItemApiService,
    private receiptItemService: PharmReceiptItemService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Get('list')
  list(@Query('startDate') startDate, @Query('endDate') endDate) {
    return this.receiptService
      .list(startDate, endDate)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Get('deleted-receipts')
  listDeletedReceipts(
    @Query('startDate') startDate,
    @Query('endDate') endDate,
  ) {
    return this.receiptService
      .listDeletedReceipts(startDate, endDate)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Get('list/:id')
  findOne(@Param('id') id: string) {
    return this.receiptService
      .findOne(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Get('patient-receipts/:patientId')
  getPatientAppointments(@Param('patientId') patientId: string) {
    return this.receiptService.findPatientReceipt(patientId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Post('create')
  async create(@Body() dto: CreatePharmReceiptDto, @Res() res) {
    try {
      dto.user = res.req.user.sub;

      let receipt = await this.receiptService.create(dto);

      for (let item of dto.items) {
        // Update stocks
        let quantity = (<any>item).quantity;
        let unit = (<any>item).unit;
        if (unit !== item.trackingUnit) {
          unit = item.trackingUnit;
          quantity = quantity * item.qtyPerUnit;
        }
        await this.receiptItemService.create({
          receipt: receipt.id,
          unit,
          quantity,
          item: item.code,
        });
      }

      // Response
      return res.json(receipt);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Unexpected Error' });
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Post('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdatePharmReceiptDto) {
    return this.receiptService
      .update(id, dto)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    try {
      // // Fetch Item
      // let data = await this.receiptService.findOne(id);

      // for (let item of data.items) {
      //   let quantity = (<any>item).quantity;
      //   let unit = (<any>item).unit;
      //   if (unit !== item.trackingUnit) {
      //     quantity = quantity * item.qtyPerUnit;
      //   }

      //   // Update stocks
      //   await this.itemService.increment(item.code, 'stocks', quantity);
      // }
      await this.receiptItemService.delete(id);

      // Save purchase
      return await this.receiptService.delete(id);
    } catch (e) {
      console.error(e);
      return { error: 'Unexpected Error' };
    }
  }
}
