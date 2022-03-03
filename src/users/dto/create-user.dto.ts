import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsEmail()
  email: string;
  @IsString()
  refreshToken: string;
  @MinLength(7)
  readonly password: string;
}
