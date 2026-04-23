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
import { CreateReceiptDto } from './receipt-api.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('receipt')
export class ReceiptApiController {
  constructor(private receiptService: ReceiptApiService) {}

  @UseGuards(AuthGuard)
  @Get('list')
  list(@Query('startDate') startDate, @Query('endDate') endDate) {
    return this.receiptService
      .list(startDate, endDate)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Get('list/:id')
  findOne(@Param('id') id: string) {
    return this.receiptService
      .findOne(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Get('patient-receipts/:patientId')
  getPatientAppointments(@Param('patientId') patientId: string) {
    return this.receiptService.findPatientReceipt(patientId);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  create(@Body() dto: CreateReceiptDto, @Res() res) {
    dto.user = res.req.user.sub;
    return this.receiptService
      .create(dto)
      .then((response) => res.json(response))
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Post('delete/:id')
  delete(@Param('id') id: string) {
    return this.receiptService
      .delete(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Get('receiptNo')
  getReceiptNo() {
    return this.receiptService
      .getReceiptNo()
      .catch((e) => ({ error: 'Unexpected Error' }));
  }
}
