import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @UseGuards(AuthGuard)
  @Get('revenue')
  getTotalRevenue(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.dashboardService
      .getTotalRevenue(startDate, endDate)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Get('discount')
  getTotalDiscount(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.dashboardService
      .getTotalDiscount(startDate, endDate)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Get('average-revenue-per-day')
  getAverageRevenuePerDay(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.dashboardService
      .getAverageRevenuePerDay(startDate, endDate)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Get('average-revenue-per-patient')
  getAverageRevenuePerPatient(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.dashboardService
      .getAverageRevenuePerPatient(startDate, endDate)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Get('total-patients')
  getTotalPatients(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.dashboardService
      .getTotalPatients(startDate, endDate)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Get('total-appointments')
  getTotalAppointments(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.dashboardService
      .getTotalAppointments(startDate, endDate)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Get('batch-admin')
  getBatchAdmin(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return Promise.all([
      this.dashboardService.getTotalRevenue(startDate, endDate),
      this.dashboardService.getTotalDiscount(startDate, endDate),
      this.dashboardService.getTotalClinicRevenue(startDate, endDate),
      this.dashboardService.getTotalLabRevenue(startDate, endDate),
      this.dashboardService.getTotalPatients(startDate, endDate),
      this.dashboardService.getTotalAppointments(startDate, endDate),
    ])
      .then(([a, b, c, d, e, f]) => ({ ...a, ...b, ...c, ...d, ...e, ...f }))
      .catch((e) => ({ error: 'Unexpected Error' }));
  }
}
