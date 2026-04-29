// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../orm/user/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto, RegisterAuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // REGISTER
  async register(dto: RegisterAuthDto) {
    const existedUser = await this.userRepo.findOne({
      where: { username: dto.username },
    });

    if (existedUser)
      throw new UnauthorizedException('Username already existed');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const data: any = {
      fullName: dto.fullName,
      username: dto.username,
      password: hashedPassword,
    };

    if (dto.role) {
      data.role = dto.role;
    }

    const user = this.userRepo.create(data);

    await this.userRepo.save(user);

    return { message: 'User registered successfully' };
  }

  // LOGIN
  async login(dto: LoginAuthDto) {
    const user = await this.userRepo.findOne({
      where: { username: dto.username, isActive: true },
      select: [
        'id',
        'fullName',
        'username',
        'password',
        'role',
        'updatedAt',
        'createdAt',
      ],
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({
      id: user.id,
      sub: user.id,
      fullname: user.fullName,
      username: user.username,
      role: user.role,
    });

    return { access_token: token };
  }

  async getAll() {
    return this.userRepo.find();
  }

  async delete(id: string) {
    return this.userRepo.delete(id);
  }

  async changeRole(id: string, role: string) {
    return this.userRepo.update(id, { role });
  }

  async changeStatus(id: string, isActive: boolean) {
    return this.userRepo.update(id, { isActive });
  }

  async changePassword(id: string, oldPassword: string, newPassword: string) {
    const user = await this.userRepo.findOne({
      where: { id },
      select: [
        'id',
        'fullName',
        'username',
        'password',
        'role',
        'updatedAt',
        'createdAt',
      ],
    });

    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid old password.');

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    return this.userRepo.update(id, { password: hashedPassword });
  }
}
