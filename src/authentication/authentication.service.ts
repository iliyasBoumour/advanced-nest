import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}
  async register(createUserDto: CreateUserDto) {
    const shadow: string = await bcrypt.hash(createUserDto.password, 10);
    const user: CreateUserDto = { ...createUserDto, password: shadow };
    return this.usersService.create(user);
  }
}
