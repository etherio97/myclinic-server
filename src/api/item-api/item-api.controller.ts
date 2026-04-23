import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ItemApiService } from './item-api.service';
import { CreateItemDto, UpdateItemDto } from './item-api.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('item')
export class ItemApiController {
  constructor(private itemService: ItemApiService) {}

  @UseGuards(AuthGuard)
  @Get('list')
  list(
    @Query('name') name: string,
    @Query('itemType') itemType: string,
    @Query('category') category: string,
  ) {
    return this.itemService
      .list({ name, itemType, category })
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Get('list/:id')
  findOne(@Param('id') id: string) {
    return this.itemService
      .findOne(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Post('create')
  @Roles('admin')
  create(@Body() dto: CreateItemDto) {
    return this.itemService
      .create(dto)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateItemDto) {
    return this.itemService
      .update(id, dto)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post('delete/:id')
  delete(@Param('id') id: string) {
    return this.itemService
      .delete(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Get('utils')
  utils() {
    return this.itemService
      .getCategories()
      .then((categories) => {
        return this.itemService.getItemTypes().then((itemTypes) => ({
          categories: Object.values(categories.map((i) => i.category)),
          itemTypes: Object.values(itemTypes.map((i) => i.item_type)),
        }));
      })
      .catch((e) => ({ error: 'Unexpected Error' }));
  }
}
