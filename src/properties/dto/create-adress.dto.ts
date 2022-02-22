import { IsString } from 'class-validator';
export class CreateAdressDto {
  @IsString()
  adress: string;
}
