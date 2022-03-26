import { JwtAuthGuard } from './../authentication/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  UseGuards,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateEmailDto } from './dto/create-email.dto';
import IEmailService from './emails.service.interface';
// this controller will talk with our microservice
@Controller('emails')
export class EmailController implements OnModuleInit {
  private emailService: IEmailService;
  constructor(@Inject('EMAIL_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.emailService = this.client.getService<IEmailService>('EmailService');
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
  create(@Body() createEmailDto: CreateEmailDto) {
    return this.emailService.addEmail(createEmailDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  findAll() {
    return this.emailService.getAllEmails({});
  }
}
