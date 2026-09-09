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

@Controller('pharm-receipt')
export class PharmReceiptApiController {
  constructor(
    private receiptService: PharmReceiptApiService,
    private itemService: PharmItemApiService,
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

      for (let item of dto.items) {
        // Update stocks
        let quantity = (<any>item).quantity;
        let unit = (<any>item).unit;
        if (unit !== item.trackingUnit) {
          quantity = quantity * item.qtyPerUnit;
        }

        await this.itemService.decrement(item.code, 'stocks', quantity);
      }

      // Save purchase
      return res.json(await this.receiptService.create(dto));
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
      // Fetch Item
      let data = await this.receiptService.findOne(id);

      for (let item of data.items) {
        let quantity = (<any>item).quantity;
        let unit = (<any>item).unit;
        console.log(item.name);
        if (unit !== item.trackingUnit) {
          quantity = quantity * item.qtyPerUnit;
        }

        // Update stocks
        await this.itemService.increment(item.code, 'stocks', quantity);
      }

      // Save purchase
      return this.receiptService.delete(id);
    } catch (e) {
      console.error(e);
      return { error: 'Unexpected Error' };
    }
  }
}
