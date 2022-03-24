import { UsersService } from './../users/users.service';
import { RefreshGuard } from './guards/refresh.guard';
import { AuthenticationService } from './authentication.service';
import {
  Body,
  Controller,
  Req,
  Post,
  UseGuards,
  HttpCode,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import RequestWithUser from './interfaces/requestWithUser.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authenticationService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Req() req: RequestWithUser): Promise<User> {
    const { id } = req.user;
    const access_cookie = this.authenticationService.getAccessCookie(id);
    const { refresh_cookie, refresh_token: refreshToken } =
      this.authenticationService.getRefreshCookie(id);
    await this.usersService.update(id, { refreshToken });

    req.res.setHeader('Set-Cookie', [access_cookie, refresh_cookie]);
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('logout')
  async logout(@Req() req: RequestWithUser): Promise<void> {
    await this.usersService.removeRefreshToken(req.user.id);
    const cookie = this.authenticationService.logout();
    req.res.setHeader('Set-Cookie', cookie);
  }

  @UseGuards(RefreshGuard)
  @Get('refresh')
  refresh(@Req() req: RequestWithUser): void {
    const access_cookie = this.authenticationService.getAccessCookie(
      req.user.id,
    );
    req.res.setHeader('Set-Cookie', access_cookie);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  test() {
    return { msg: 'we' };
  }
}
