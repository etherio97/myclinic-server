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

@Controller('patient')
export class PatientApiController {
  constructor(private patientService: PatientApiService) {}

  @UseGuards(AuthGuard)
  @Get('list')
  list(
    @Query('fullName') fullName: string,
    @Query('patientNo') patientNo: string,
  ) {
    return this.patientService
      .list(fullName, patientNo)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Get('list/:id')
  findOne(@Param('id') id: string) {
    return this.patientService
      .findOne(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Post('create')
  create(@Body() dto: CreatePatientDto) {
    return this.patientService.create(dto).catch((e) => {
      console.error(e);
      return { error: 'Unexpected Error' };
    });
  }

  @UseGuards(AuthGuard)
  @Post('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdatePatientDto) {
    return this.patientService
      .update(id, dto)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Post('delete/:id')
  delete(@Param('id') id: string) {
    return this.patientService
      .delete(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }
}
