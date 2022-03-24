import { JwtAuthGuard } from './../authentication/guards/jwt-auth.guard';
import { Controller, Get, Post, Body, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEmailDto } from './dto/create-email.dto';
// this controller will talk with our microservice
@Controller('emails')
export class EmailController {
  constructor(@Inject('EMAIL_SERVICE') private emailService: ClientProxy) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createEmailDto: CreateEmailDto) {
    // with event emit we cannot khow if the email was created or not and we cannot receive the answer from the server
    return this.emailService.emit({ cmd: 'createEmail' }, createEmailDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.emailService.send({ cmd: 'findAllEmail' }, '');
  }
}
