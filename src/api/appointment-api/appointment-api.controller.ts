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
import { AppointmentApiService } from './appointment-api.service';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from './appointment-api.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('appointment')
export class AppointmentApiController {
  constructor(private appointmentService: AppointmentApiService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Get('list')
  list(
    @Query('startDate') startDate,
    @Query('endDate') endDate,
    @Query('status') appointmentStatus,
  ) {
    return this.appointmentService
      .list(startDate, endDate, appointmentStatus)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Get('list/:id')
  findOne(@Param('id') id: string) {
    return this.appointmentService
      .findOne(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Get('patient-appointments/:patientId')
  getPatientAppointments(@Param('patientId') patientId: string) {
    return this.appointmentService.findPatientAppointments(patientId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Get('doctor-appointments/:doctorId')
  getDoctorAppointments(@Param('doctorId') doctorId: string) {
    return this.appointmentService.findDoctorAppointments(doctorId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Post('create')
  create(@Body() dto: CreateAppointmentDto, @Res() res) {
    return this.appointmentService
      .create(dto)
      .then((data) => res.json(data))
      .catch((e) => res.status(400).json({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Post('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    return this.appointmentService
      .update(id, dto)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager', 'cashier')
  @Post('delete/:id')
  delete(@Param('id') id: string) {
    return this.appointmentService
      .delete(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }
}
