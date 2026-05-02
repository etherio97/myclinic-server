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
import { CashflowApiService } from './cashflow-api.service';
import { CreateCashflowDto, UpdateCashflowDto } from './cashflow-api.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('cashflow')
export class CashflowApiController {
  constructor(private cashflowService: CashflowApiService) {}

  @Get('list')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  list(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.cashflowService
      .list(startDate, endDate)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @Post('create')
  @SkipThrottle()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  create(@Body() dto: CreateCashflowDto, @Res() res) {
    dto.user = res.req.user.id;
    return this.cashflowService
      .create(dto)
      .then((r) => res.json(r))
      .catch((e) => res.json({ error: 'Unexpected error' }));
  }

  @Post('update/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  update(@Param('id') id: string, @Body() dto: UpdateCashflowDto) {
    return this.cashflowService
      .update(id, dto)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @Post('delete/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  delete(@Param('id') id: string) {
    return this.cashflowService
      .delete(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }
}
