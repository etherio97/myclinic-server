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
import { ExpenseApiService } from './expense-api.service';
import { CreateExpenseDto, UpdateExpenseDto } from './expense-api.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('expense')
export class ExpenseApiController {
  constructor(private expenseService: ExpenseApiService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Get('list')
  list(
    @Query('startDate') startDate,
    @Query('endDate') endDate,
    @Query('category') category: string | string[],
  ) {
    const categoryArray = Array.isArray(category)
      ? category
      : category
        ? [category]
        : [];
    return this.expenseService
      .list(startDate, endDate, categoryArray)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Get('list/:id')
  findOne(@Param('id') id: string) {
    return this.expenseService
      .findOne(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Post('create')
  create(@Body() dto: CreateExpenseDto, @Res() res) {
    dto.user = res.req.user.sub;
    return this.expenseService
      .create(dto)
      .then((data) => res.json(data))
      .catch((e) => res.status(500).json({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Post('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateExpenseDto) {
    return this.expenseService
      .update(id, dto)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Post('delete/:id')
  delete(@Param('id') id: string) {
    return this.expenseService
      .delete(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }
}
