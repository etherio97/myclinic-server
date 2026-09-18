import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PharmInventoryApiService } from './pharm-inventory-api.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('pharm-inventory')
export class PharmInventoryApiController {
  constructor(private inventoryService: PharmInventoryApiService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier', 'pharm-cashier')
  @Get('list')
  list(@Query('showAll') showAll: string) {
    return this.inventoryService.getAll(showAll === '1' ? true : false);
  }
}
