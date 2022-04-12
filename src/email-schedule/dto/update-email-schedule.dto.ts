import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailScheduleDto } from './create-email-schedule.dto';

export class UpdateEmailScheduleDto extends PartialType(CreateEmailScheduleDto) {}
