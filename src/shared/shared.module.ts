import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'YOUR_SECRET_KEY',
      signOptions: { expiresIn: '3h' },
    }),
  ],
  exports: [JwtModule],
  providers: [AuthGuard, RolesGuard],
})
export class SharedModule {}
