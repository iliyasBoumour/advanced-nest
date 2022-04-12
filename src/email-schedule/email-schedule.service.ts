import { Injectable } from '@nestjs/common';
import { CreateEmailScheduleDto } from './dto/create-email-schedule.dto';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import EmailService from './email.service';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
@Injectable()
export class EmailScheduleService {
  constructor(
    private readonly emailService: EmailService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  // @Cron('* * * * * *')
  log() {
    console.log('Hello world!');
  }
  create(createEmailScheduleDto: CreateEmailScheduleDto) {
    const date = new Date(createEmailScheduleDto.date);
    // first argument, it takes either a cron pattern or a date
    const job = new CronJob(date, () => {
      this.emailService.sendMail({
        to: createEmailScheduleDto.email,
        subject: createEmailScheduleDto.object,
        text: createEmailScheduleDto.content,
      });
    });
    this.schedulerRegistry.addCronJob(
      `${Date.now()}-${createEmailScheduleDto.object}`,
      job,
    );
    job.start();
  }
  stop() {
    this.schedulerRegistry.getCronJobs().forEach((job) => {
      job.stop();
    });
  }
}
