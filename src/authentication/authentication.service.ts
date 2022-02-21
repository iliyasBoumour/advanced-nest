import { Injectable, BadRequestException } from '@nestjs/common';
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
  // add token payload here
  login({ id }: User): string {
    const token = this.jwtService.sign({ id });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }
  logout(): string {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
