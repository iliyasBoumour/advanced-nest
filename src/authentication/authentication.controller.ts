import { AuthenticationService } from './authentication.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authenticationService.register(createUserDto);
  }
}
