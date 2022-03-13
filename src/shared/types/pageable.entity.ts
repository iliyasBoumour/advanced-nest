import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
export default class Pageable {
  @IsOptional()
  search: string;
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number;
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset: number;
}
