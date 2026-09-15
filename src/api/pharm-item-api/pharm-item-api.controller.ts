import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PharmItemApiService } from './pharm-item-api.service';
import { CreatePharmItemDto, UpdatePharmItemDto } from './pharm-item-api.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { SkipThrottle } from '@nestjs/throttler';

// @SkipThrottle()
@Controller('pharm-item')
export class PharmItemApiController {
  constructor(private itemService: PharmItemApiService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier', 'pharm-cashier')
  @Get('list')
  list(
    @Query('name') name: string,
    @Query('code') code: string,
    @Query('barcode') barcode: string,
  ) {
    return this.itemService
      .list({ name, code, barcode })
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier', 'pharm-cashier')
  @Get('list/:id')
  findOne(@Param('id') id: string) {
    return this.itemService
      .findOne(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Post('create')
  create(@Body() dto: CreatePharmItemDto) {
    return this.itemService
      .create(dto)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Post('update/:code')
  update(@Param('code') code: string, @Body() dto: UpdatePharmItemDto) {
    return this.itemService
      .update(code, dto)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Post('delete/:code')
  delete(@Param('code') code: string) {
    return this.itemService
      .delete(code)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }
}
