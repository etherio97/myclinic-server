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
import { LabOrderApiService } from './lab-order-api.service';
import { CreateLabOrderDto, UpdateLabOrderDto } from './lab-order-api.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('lab-orders')
export class LabOrderApiController {
  constructor(private itemService: LabOrderApiService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'lab-admin', 'lab-cashier')
  @Get('list')
  list(
    @Query('startDate') startDate,
    @Query('endDate') endDate,
    @Query('status') status,
  ) {
    return this.itemService
      .list(startDate, endDate, status)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'lab-admin', 'lab-cashier')
  @Get('list/:id')
  findOne(@Param('id') id: string) {
    return this.itemService
      .findOne(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'lab-admin', 'lab-cashier')
  @Post('create')
  create(@Body() dto: CreateLabOrderDto, @Res() res) {
    dto.user = res.req.user.sub;
    return this.itemService
      .create(dto)
      .then((data) => res.json(data))
      .catch((e) => res.status(500).json({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'lab-admin', 'lab-cashier')
  @Post('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateLabOrderDto) {
    return this.itemService
      .update(id, dto)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'lab-admin')
  @Post('delete/:id')
  delete(@Param('id') id: string) {
    return this.itemService
      .delete(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }
}
