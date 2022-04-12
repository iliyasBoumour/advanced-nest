import { IsString, IsNotEmpty, IsDateString, IsEmail } from 'class-validator';
export class CreateEmailScheduleDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  object: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsDateString()
  date: string;
}
