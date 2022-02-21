import { IsNumberString } from 'class-validator';

export class NumericParam {
  @IsNumberString()
  id: number;
}
