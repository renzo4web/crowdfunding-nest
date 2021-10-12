import { ApiProperty } from '@nestjs/swagger';

export class Project {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  goal: number;

  @ApiProperty()
  curr_amount: number;

  @ApiProperty()
  status: string;
}
