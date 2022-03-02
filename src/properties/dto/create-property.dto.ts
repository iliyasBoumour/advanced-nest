import { CreateAdressDto } from './create-adress.dto';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
export class CreatePropertyDto {
  @IsString()
  name: string;
  @IsString()
  type: string;
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => CreateAdressDto)
  adress: CreateAdressDto;
}
