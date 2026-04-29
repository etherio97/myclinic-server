import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from 'src/orm/receipt/receipt.entity';
import moment from 'moment';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Receipt)
    private repo: Repository<Receipt>,
  ) {}

  async getTotalRevenue(startDate: string, endDate: string) {
    startDate = moment(startDate).format('yyyy-MM-DDT00:00:00.000Z');
    endDate = moment(endDate).format('yyyy-MM-DDT23:59:59.999Z');

    return this.repo
      .query(
        `SELECT COALESCE(SUM(grand_total), 0) AS total_revenue 
        FROM receipts WHERE date BETWEEN $1 AND $2 
        AND status = 'Active'`,
        [startDate, endDate],
      )
      .then((res) => res[0]);
  }

  async getTotalDiscount(startDate: string, endDate: string) {
    startDate = moment(startDate).format('yyyy-MM-DDT00:00:00.000Z');
    endDate = moment(endDate).format('yyyy-MM-DDT23:59:59.999Z');

    return this.repo
      .query(
        `SELECT COALESCE(SUM(discount_amount), 0) AS total_discount 
        FROM receipts WHERE date BETWEEN $1 AND $2 
        AND status = 'Active'`,
        [startDate, endDate],
      )
      .then((res) => res[0]);
  }

  async getAverageRevenuePerDay(startDate: string, endDate: string) {
    startDate = moment(startDate).format('yyyy-MM-DDT00:00:00.000Z');
    endDate = moment(endDate).format('yyyy-MM-DDT23:59:59.999Z');

    return this.repo
      .query(
        `SELECT COALESCE(SUM(grand_total), 0) / NULLIF(COUNT(DISTINCT DATE(date)), 0) AS avg_daily_revenue
        FROM receipts WHERE date BETWEEN $1 AND $2 
        AND status = 'Active'`,
        [startDate, endDate],
      )
      .then((res) => res[0]);
  }

  async getAverageRevenuePerPatient(startDate: string, endDate: string) {
    startDate = moment(startDate).format('yyyy-MM-DDT00:00:00.000Z');
    endDate = moment(endDate).format('yyyy-MM-DDT23:59:59.999Z');

    return this.repo
      .query(
        `SELECT COALESCE(AVG(grand_total), 0) AS avg_per_patient
        FROM receipts WHERE date BETWEEN $1 AND $2 
        AND status = 'Active'`,
        [startDate, endDate],
      )
      .then((res) => res[0]);
  }

  async getTotalClinicRevenue(startDate: string, endDate: string) {
    startDate = moment(startDate).format('yyyy-MM-DDT00:00:00.000Z');
    endDate = moment(endDate).format('yyyy-MM-DDT23:59:59.999Z');

    return this.repo
      .query(
        `SELECT COALESCE(SUM(grand_total), 0) AS total_clinic_revenue
        FROM receipts WHERE date BETWEEN $1 AND $2 
        AND type = 'Clinic'
        AND status = 'Active'`,
        [startDate, endDate],
      )
      .then((res) => res[0]);
  }

  async getTotalLabRevenue(startDate: string, endDate: string) {
    startDate = moment(startDate).format('yyyy-MM-DDT00:00:00.000Z');
    endDate = moment(endDate).format('yyyy-MM-DDT23:59:59.999Z');

    return this.repo
      .query(
        `SELECT COALESCE(SUM(grand_total), 0) AS total_lab_revenue
        FROM receipts WHERE date BETWEEN $1 AND $2 
        AND type = 'Laboratory'
        AND status = 'Active'`,
        [startDate, endDate],
      )
      .then((res) => res[0]);
  }

  async getTotalPatients(startDate: string, endDate: string) {
    startDate = moment(startDate).format('yyyy-MM-DDT00:00:00.000Z');
    endDate = moment(endDate).format('yyyy-MM-DDT23:59:59.999Z');

    return this.repo
      .query(
        `SELECT COUNT(*) AS total_patients
        FROM patients WHERE created_at BETWEEN $1 AND $2`,
        [startDate, endDate],
      )
      .then((res) => res[0]);
  }

  async getTotalAppointments(startDate: string, endDate: string) {
    startDate = moment(startDate).format('yyyy-MM-DDT00:00:00.000Z');
    endDate = moment(endDate).format('yyyy-MM-DDT23:59:59.999Z');

    return this.repo
      .query(
        `SELECT COUNT(*) AS total_appointments
        FROM appointment
        WHERE appointment_date BETWEEN $1 AND $2
        AND status NOT IN ('No Show', 'Cancelled')`,
        [startDate, endDate],
      )
      .then((res) => res[0]);
  }
}
