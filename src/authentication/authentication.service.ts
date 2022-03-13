import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const shadow: string = await bcrypt.hash(createUserDto.password, 10);
    const user: CreateUserDto = { ...createUserDto, password: shadow };
    return this.usersService.create(user);
  }

  async validateUser(userMail, password): Promise<User> {
    const user: User = await this.usersService.findByUserOrMail(userMail);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException();
    }
    return user;
  }

  async validateRefreshToken(id: number, token: string): Promise<User> {
    const user: User = await this.usersService.findOne(id);
    if (!user || !(await bcrypt.compare(token, user.refreshToken))) {
      throw new UnauthorizedException();
    }
    return user;
  }

  getAccessCookie(id: number): string {
    const access_token = this.jwtService.sign(
      { id },
      {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: `${this.configService.get('JWT_ACCESS_EXPIRATION_TIME')}s`,
      },
    );
    return `Authentication=${access_token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  getRefreshCookie(id: number) {
    const refresh_token = this.jwtService.sign(
      { id },
      {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: `${this.configService.get('JWT_REFRESH_EXPIRATION_TIME')}s`,
      },
    );
    const refresh_cookie = `Refresh=${refresh_token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
    return { refresh_cookie, refresh_token };
  }

  logout(): string[] {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}
