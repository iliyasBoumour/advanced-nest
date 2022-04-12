import { Module } from '@nestjs/common';
import { EmailScheduleService } from './email-schedule.service';
import { EmailScheduleController } from './email-schedule.controller';
import EmailService from './email.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [EmailScheduleController],
  providers: [EmailScheduleService, EmailService],
})
export class EmailScheduleModule {}
