import { UsersService } from './../../users/users.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // first extract jwt token and verify it
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request?.cookies?.Authentication,
      ]),
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }
  // For every strategy, Passport calls the validate function using a set of parameters specific for a particular strategy. For the jwt strategy, Passport needs a method with the user.
  async validate(payload: User): Promise<User> {
    return await this.usersService.findOne(payload.id);
  }
}
