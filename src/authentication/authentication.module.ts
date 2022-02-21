import { UsersModule } from './../users/users.module';
import { AuthenticationService } from './authentication.service';
import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';

@Module({
  imports: [UsersModule],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
