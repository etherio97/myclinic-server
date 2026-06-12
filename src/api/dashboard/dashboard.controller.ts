import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @UseGuards(AuthGuard)
  @Get('batch-admin')
  getBatchAdmin(
    @Res() res,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    let promises = [
      this.dashboardService.getTotalLabRevenue(startDate, endDate),
    ];
    switch (res.req.user.role) {
      case 'admin':
      case 'manager':
      case 'cashier':
        promises.push(
          this.dashboardService.getTotalRevenue(startDate, endDate),
          this.dashboardService.getTotalClinicRevenue(startDate, endDate),
          this.dashboardService.getTotalDiscount(startDate, endDate),
          this.dashboardService.getTotalPatients(startDate, endDate),
          this.dashboardService.getTotalExpenses(startDate, endDate),
        );
        break;
    }
    return Promise.all(promises)
      .then((items) => {
        let response = {};
        items.forEach((item) => {
          Object.keys(item).forEach((key) => {
            response[key] = item[key];
          });
        });
        res.json(response);
      })
      .catch((e) => res.json({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'lab-admin')
  @Get('monthly-statistics')
  getMonthlyStatistics(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('type') type = 'clinic',
  ) {
    return Promise.all([
      this.dashboardService.getPatientCountByDate(startDate, endDate, type),
      this.dashboardService.getTotalRevenueByDate(startDate, endDate, type),
    ])
      .then(([patientCount, revenueTrend]) => ({
        patientCount,
        revenueTrend,
      }))
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Get('daily-statistics')
  getDailyStatistics(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('type') type = 'clinic',
  ) {
    return Promise.all([
      this.dashboardService.getPatientCountByHour(startDate, endDate, type),
      this.dashboardService.getTotalRevenueByHour(startDate, endDate, type),
    ])
      .then(([patientCount, revenueTrend]) => ({
        patientCount,
        revenueTrend,
      }))
      .catch((e) => ({ error: 'Unexpected Error' }));
  }
}
