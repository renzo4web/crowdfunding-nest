import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, MaxLength, Min, MinLength } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @MinLength(3)
  @MaxLength(15)
  name: string;

  @ApiProperty()
  @IsNumber()
  @Min(100)
  goal: number;
}
