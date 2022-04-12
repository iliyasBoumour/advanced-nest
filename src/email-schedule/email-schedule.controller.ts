import {
  Controller,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { EmailScheduleService } from './email-schedule.service';
import { CreateEmailScheduleDto } from './dto/create-email-schedule.dto';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';

@Controller('email-schedule')
export class EmailScheduleController {
  constructor(private readonly emailScheduleService: EmailScheduleService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createEmailScheduleDto: CreateEmailScheduleDto) {
    return this.emailScheduleService.create(createEmailScheduleDto);
  }
  @Delete()
  @UseGuards(JwtAuthGuard)
  stop() {
    return this.emailScheduleService.stop();
  }
}
