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
import { DoctorApiService } from './doctor-api.service';
import { CreateDoctorDto, UpdateDoctorDto } from './doctor-api.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('doctor')
export class DoctorApiController {
  constructor(private doctorService: DoctorApiService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier', 'lab-admin', 'lab-cashier')
  @Get('list')
  list(
    @Query('fullName') fullName: string,
    @Query('doctorNo') doctorNo: number,
    @Query('listAll') listAll: string,
  ) {
    return this.doctorService
      .list(fullName, doctorNo, listAll)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Get('list/:id')
  findOne(@Param('id') id: string) {
    return this.doctorService
      .findOne(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Post('create')
  create(@Body() dto: CreateDoctorDto, @Res() res) {
    return this.doctorService
      .create(dto)
      .then((data) => res.json(data))
      .catch((e) => res.status(400).json({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Post('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateDoctorDto) {
    return this.doctorService
      .update(id, dto)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Post('delete/:id')
  delete(@Param('id') id: string) {
    return this.doctorService
      .delete(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }
}
