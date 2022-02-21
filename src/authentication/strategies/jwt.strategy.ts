import { UsersService } from './../../users/users.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';
import { ConfigService } from '@nestjs/config';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.Authentication,
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
    console.log('wee');
  }
  // For every strategy, Passport calls the validate function using a set of parameters specific for a particular strategy. For the local strategy, Passport needs a method with a username and a password.
  async validate(payload: User) {
    console.log(payload);

    // return await this.usersService.findOne(payload.id);
  }
}