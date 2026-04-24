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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post('register')
  register(@Body() dto: RegisterAuthDto) {
    return this.authService
      .register(dto)
      .catch((e) => ({ error: 'Unexcepted Error' }));
  }

  @Post('login')
  login(@Body() dto: LoginAuthDto) {
    return this.authService
      .login(dto)
      .catch((e) => ({ error: 'Unexcepted Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Get('users')
  getAllUsers() {
    return this.authService
      .getAll()
      .catch((e) => ({ error: 'Unexcepted Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post('delete/:id')
  delete(@Param('id') id: string) {
    return this.authService
      .delete(id)
      .catch((e) => ({ error: 'Unexcepted Error' }));
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post('change-status/:id')
  changeStatus(@Param('id') id: string, @Body('isActive') isActive: any) {
    let _isActive = false;
    if (isActive === 'true' || isActive === 1 || isActive === true) {
      _isActive = true;
    }
    return this.authService
      .changeStatus(id, _isActive)
      .catch((e) => ({ error: 'Unexcepted Error' }));
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
}
