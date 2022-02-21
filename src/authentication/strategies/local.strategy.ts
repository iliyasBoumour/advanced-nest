import { User } from './../../users/entities/user.entity';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';

@Injectable()
// To configure a strategy, we need to provide a set of options specific to a particular strategy. In NestJS, we do it by extending the  PassportStrategy class.
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthenticationService) {
    super();
    // if we authenticate with email instead of username
    // {usernameField: 'email',} as param of super
  }
  // For every strategy, Passport calls the validate function using a set of parameters specific for a particular strategy. For the local strategy, Passport needs a method with a username and a password.
  async validate(userMail: string, password: string): Promise<User> {
    return await this.authService.validateUser(userMail, password);
  }
}
