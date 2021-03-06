import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
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
  @ManyToOne(() => User, (user) => user.projects, { onDelete: 'SET NULL' })
  owner: User;
}

/*
 *TODO: create entity for User

 class User {

  @OneToMany(type=> Project, project=>project.owner)
  projects : Project[]
 }
 * */
