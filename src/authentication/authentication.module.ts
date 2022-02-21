import { UsersModule } from './../users/users.module';
import { AuthenticationService } from './authentication.service';
import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { LocalStrategy } from './strategies/local.strategy';
// import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UsersModule],
  providers: [AuthenticationService, LocalStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
