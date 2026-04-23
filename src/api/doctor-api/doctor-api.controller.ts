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

@Controller('doctor')
export class DoctorApiController {
  constructor(private doctorService: DoctorApiService) {}

  @UseGuards(AuthGuard)
  @Get('list')
  list(
    @Query('fullName') fullName: string,
    @Query('doctorNo') doctorNo: string,
  ) {
    return this.doctorService
      .list(fullName, doctorNo)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Get('list/:id')
  findOne(@Param('id') id: string) {
    return this.doctorService
      .findOne(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Post('create')
  create(@Body() dto: CreateDoctorDto, @Res() res) {
    return this.doctorService
      .create(dto)
      .then((data) => res.json(data))
      .catch((e) => res.status(400).json({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Post('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateDoctorDto) {
    return this.doctorService
      .update(id, dto)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }

  @UseGuards(AuthGuard)
  @Post('delete/:id')
  delete(@Param('id') id: string) {
    return this.doctorService
      .delete(id)
      .catch((e) => ({ error: 'Unexpected Error' }));
  }
}
