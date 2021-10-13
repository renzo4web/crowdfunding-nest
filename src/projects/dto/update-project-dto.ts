import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @MinLength(3)
  @MaxLength(15)
  @IsOptional()
  status?: string;

  @ApiProperty()
  @IsNumber()
  @Min(100)
  @IsOptional()
  goal?: number;

  @ApiProperty()
  @IsNumber()
  @Min(100)
  @IsOptional()
  curr_amount?: number;
}
