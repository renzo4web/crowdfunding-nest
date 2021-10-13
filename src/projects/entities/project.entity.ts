import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  code: string;

  @ApiProperty()
  @Column()
  goal: number;

  @ApiProperty()
  @Column()
  curr_amount: number;

  @ApiProperty()
  @Column()
  status: string;

  @ApiProperty({ type: () => User })
  @ManyToOne((type) => User, (user) => user.projects)
  owner: User;
}

/*
 *TODO: create entity for User

 class User {

  @OneToMany(type=> Project, project=>project.owner)
  projects : Project[]
 }
 * */
