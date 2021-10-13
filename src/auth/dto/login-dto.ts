import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  @MaxLength(25)
  password: string;
}
