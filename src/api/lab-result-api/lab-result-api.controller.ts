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
import { LabResultApiService } from './lab-result-api.service';
import { CreateLabResultDto, UpdateLabResultDto } from './lab-result-api.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { LabOrderApiService } from '../lab-order-api/lab-order-api.service';

@Controller('lab-results')
export class LabResultApiController {
  constructor(
    private labResultService: LabResultApiService,
    private labOrderService: LabOrderApiService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'lab-admin', 'lab-cashier')
  @Get('list')
  list(
    @Query('startDate') startDate,
    @Query('endDate') endDate,
    @Query('status') status,
  ) {
    return this.labResultService
      .list(startDate, endDate, status)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'lab-admin', 'lab-cashier')
  @Get('list/:id')
  findOne(@Param('id') id: string) {
    return this.labResultService
      .findOne(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'lab-admin', 'lab-cashier')
  @Post('create')
  create(@Body() dto: CreateLabResultDto, @Res() res) {
    dto.user = res.req.user.sub;
    return this.labResultService
      .create(dto)
      .then(async (data) => {
        await this.labOrderService.update(<any>dto.order, {
          status: 'Completed',
        });
        return res.json(data);
      })
      .catch((e) => res.status(500).json({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'lab-admin', 'lab-cashier')
  @Post('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateLabResultDto) {
    return this.labResultService
      .update(id, dto)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'lab-admin')
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    try {
      const { order } = await this.labResultService.findOne(id);
      await this.labOrderService.delete(order.id);
      return await this.labResultService.delete(id);
    } catch (e) {
      return { error: 'Unexpected Error' };
    }
  }
}
