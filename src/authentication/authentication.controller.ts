// import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthenticationService } from './authentication.service';
import {
  Body,
  Controller,
  Req,
  Res,
  Post,
  UseGuards,
  HttpCode,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import RequestWithUser from './interfaces/requestWithUser.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authenticationService.register(createUserDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: RequestWithUser, @Res() res: Response) {
    const cookie = this.authenticationService.login(req.user);
    res.setHeader('Set-Cookie', cookie);
    return res.send(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('test')
  protected(@Req() req) {
    return req.user;
  }
}
