import { IsNotEmpty } from 'class-validator';
export class CreateEmailDto {
  @IsNotEmpty()
  object: string;
  @IsNotEmpty()
  content: string;
}
