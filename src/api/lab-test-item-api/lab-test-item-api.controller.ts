import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LabTestItemApiService } from './lab-test-item-api.service';
import {
  CreateLabTestItemDto,
  UpdateLabTestItemDto,
} from './lab-test-item-api.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('lab-test-items')
export class LabTestItemApiController {
  constructor(private itemService: LabTestItemApiService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'lab-admin', 'lab-cashier')
  @Get('list')
  list(
    @Query('name') name: string,
    @Query('category') category: string,
    @Query('subgroup') subgroup: string,
    @Query('updatedAt') updatedAt = false,
  ) {
    return this.itemService
      .list(name, category, subgroup, updatedAt)
      .then((results) =>
        results.map((item) => ({
          ...item,
          enumValues: item.enumValues?.split(',') || [],
        })),
      )
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
  create(@Body() dto: CreateLabTestItemDto) {
    return this.itemService
      .create(dto)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'lab-admin', 'lab-cashier')
  @Post('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateLabTestItemDto) {
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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'lab-admin', 'lab-cashier')
  @Get('categories')
  getCategory() {
    return this.itemService
      .getCategories()
      .then((categories) => categories.map((item) => item.category))
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'lab-admin', 'lab-cashier')
  @Get('subgroups')
  getSubGroups(@Query('category') category: string) {
    return this.itemService
      .getSubGroups(category)
      .then((subgroups) => subgroups.map((item) => item.subgroup))
      .catch((e) => ({ error: 'Unexpected Error' }));
  }
}
