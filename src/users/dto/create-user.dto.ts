import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsEmail()
  email: string;
  refreshToken: string;
  @MinLength(7)
  readonly password: string;
}
