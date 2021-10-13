import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @MinLength(4)
  @MaxLength(10)
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  @MaxLength(25)
  password: string;
}
