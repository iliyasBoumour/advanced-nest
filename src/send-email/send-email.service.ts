import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { Cron, Interval } from '@nestjs/schedule';
@Injectable()
export class SendEmailService {
  private nodemailerTransport: Mail;
  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport({
      service: configService.get('EMAIL_SERVICE'),
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      },
    });
  }
  // @Cron('* * * * * *')
  logEverySecond() {
    console.log('Hello world!');
  }
  //   @Interval(60000)
  logEveryMinute() {
    console.log('Called every minute');
  }
  sendMail(options: Mail.Options): Promise<any> {
    return this.nodemailerTransport.sendMail(options);
  }
}
