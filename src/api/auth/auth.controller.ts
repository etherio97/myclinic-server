import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './auth.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { In } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginAuthDto) {
    return this.authService
      .login(dto)
      .catch((e) => ({ error: 'Unexcepted Error', message: e.message }));
  }

  @UseGuards(AuthGuard)
  @Post('change-password')
  changePassword(
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
    @Res() res,
  ) {
    return this.authService
      .changePassword(res.req.user.sub, oldPassword, newPassword)
      .then(() => {
        res.json({ message: 'Successfully changed!' });
      })
      .catch((e) => {
        res.json({ error: true, message: e.message });
      });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Post('register')
  register(@Body() dto: RegisterAuthDto, @Res() res) {
    if (!['admin'].includes(res.req.user.role)) {
      if (res.req.user.role === 'manager' && dto.role !== 'cashier') {
        return res
          .status(400)
          .json({ error: 'Unexcepted Error', message: 'Role not allowed' });
      }
    }
    return this.authService
      .register(dto)
      .then((r) => res.json(r))
      .catch((e) =>
        res.json({ error: 'Unexcepted Error', message: e.message }),
      );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Get('users')
  getAllUsers(@Res() res) {
    let role: any;
    if (res.req.user.role === 'manager') {
      role = In(['manager', 'cashier']);
    }
    return this.authService
      .getAll(role)
      .then((r) => res.json(r))
      .catch((e) =>
        res.json({ error: 'Unexcepted Error', message: e.message }),
      );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Post('delete/:id')
  delete(@Param('id') id: string) {
    return this.authService
      .delete(id)
      .catch((e) => ({ error: 'Unexcepted Error', message: e.message }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')
  @Post('change-status/:id')
  changeStatus(@Param('id') id: string, @Body('isActive') isActive: any) {
    let _isActive = false;
    if (isActive === 'true' || isActive === 1 || isActive === true) {
      _isActive = true;
    }
    return this.authService
      .changeStatus(id, _isActive)
      .catch((e) => ({ error: 'Unexcepted Error', message: e.message }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post('change-role/:id')
  changeRole(@Param('id') id: string, @Body('role') role: any) {
    return this.authService
      .changeStatus(id, role)
      .catch((e) => ({ error: 'Unexcepted Error', message: e.message }));
  }
}
