import { CreateAdressDto } from './create-adress.dto';
import { Adress } from './../entities/adress.entity';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
export class CreatePropertyDto {
  @IsString()
  name: string;
  @IsString()
  type: string;
  @ValidateNested({ each: true })
  @Type(() => CreateAdressDto)
  adress: CreateAdressDto;
}
