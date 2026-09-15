import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PharmPurchaseApiService } from './pharm-purchase-api.service';
import {
  CreatePharmPurchaseDto,
  UpdatePharmPurchaseDto,
} from './pharm-purchase-api.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { SkipThrottle } from '@nestjs/throttler';
import { PharmItemApiService } from '../pharm-item-api/pharm-item-api.service';

@SkipThrottle()
@Controller('pharm-purchase')
export class PharmPurchaseApiController {
  constructor(
    private purchaseService: PharmPurchaseApiService,
    private itemService: PharmItemApiService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Get('list')
  list(@Query('startDate') startDate, @Query('endDate') endDate) {
    return this.purchaseService
      .list(startDate, endDate)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Get('list/:id')
  findOne(@Param('id') id: string) {
    return this.purchaseService
      .findOne(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Post('create')
  async create(@Body() dto: CreatePharmPurchaseDto) {
    try {
      // Update stocks
      let itemCode = (<any>dto).item;
      let item = await this.itemService.findOne(itemCode);
      if (!item) return { error: 'Item not found' };
      let { trackingUnit, stocks } = item;
      // if (dto.unit !== trackingUnit)
      //   return { error: 'Tracking unit mismatched' };
      dto.unit = trackingUnit;
      await this.itemService.increment(itemCode, 'stocks', dto.quantity);

      // Save purchase
      return await this.purchaseService.create(dto);
    } catch (e) {
      console.error(e);
      return { error: 'Unexpected Error' };
    }
  }

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles('admin', 'manager')
  // @Post('update/:id')
  // update(@Param('id') id: string, @Body() dto: UpdatePharmPurchaseDto) {
  //   return this.purchaseService
  //     .update(id, dto)
  //     .catch((e) => ({ error: 'Unexpected Error' }));
  // }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Post('delete/:id')
  async delete(@Param('id') id: string) {
    try {
      // Fetch Item
      let data = await this.purchaseService.findOne(id);
      let itemCode = data.item.code;
      await this.itemService.decrement(itemCode, 'stocks', data.quantity);

      // Save purchase
      return await this.purchaseService.delete(id);
    } catch (e) {
      console.error(e);
      return { error: 'Unexpected Error' };
    }
  }
}
