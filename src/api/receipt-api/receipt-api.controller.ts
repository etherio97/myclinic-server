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
import { ReceiptApiService } from './receipt-api.service';
import { CreateReceiptDto, UpdateReceiptDto } from './receipt-api.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('receipt')
export class ReceiptApiController {
  constructor(private receiptService: ReceiptApiService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier', 'lab-admin', 'lab-cashier')
  @Get('list')
  list(
    @Query('startDate') startDate,
    @Query('endDate') endDate,
    @Query('type') type,
  ) {
    return this.receiptService
      .list(startDate, endDate, type)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'lab-admin')
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
  @Roles('admin', 'manager', 'cashier', 'lab-admin', 'lab-cashier')
  @Get('list/:id')
  findOne(@Param('id') id: string) {
    return this.receiptService
      .findOne(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier', 'lab-admin', 'lab-cashier')
  @Get('patient-receipts/:patientId')
  getPatientReceipt(
    @Param('patientId') patientId: string,
    @Query('type') type: string,
  ) {
    return this.receiptService.findPatientReceipt(patientId, type);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier', 'lab-admin', 'lab-cashier')
  @Post('create')
  create(@Body() dto: CreateReceiptDto, @Res() res) {
    dto.user = res.req.user.sub;
    return this.receiptService
      .create(dto)
      .then((data) => res.json(data))
      .catch((e) => res.status(500).json({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier', 'lab-admin', 'lab-cashier')
  @Post('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateReceiptDto) {
    return this.receiptService
      .update(id, dto)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'lab-admin')
  @Post('delete/:id')
  delete(@Param('id') id: string) {
    return this.receiptService
      .delete(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }
}
