import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PatientApiService } from './patient-api.service';
import { CreatePatientDto, UpdatePatientDto } from './patient-api.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('patient')
export class PatientApiController {
  constructor(private patientService: PatientApiService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Get('list')
  list(
    @Query('fullName') fullName: string,
    @Query('patientNo') patientNo: string,
    @Query('phoneNumber') phoneNumber: string,
  ) {
    return this.patientService
      .list(fullName, patientNo, phoneNumber)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Get('list/:id')
  findOne(@Param('id') id: string) {
    return this.patientService
      .findOne(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Post('create')
  create(@Body() dto: CreatePatientDto) {
    return this.patientService
      .create(dto)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Post('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdatePatientDto) {
    return this.patientService
      .update(id, dto)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Post('delete/:id')
  delete(@Param('id') id: string) {
    return this.patientService
      .delete(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }
}
