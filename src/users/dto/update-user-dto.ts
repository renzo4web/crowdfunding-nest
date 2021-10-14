import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Project } from 'src/projects/entities/project.entity';

export class UpdateUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsOptional()
  project?: Project;
}
