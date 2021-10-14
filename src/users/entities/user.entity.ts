import { ApiProperty } from '@nestjs/swagger';
import { Project } from 'src/projects/entities/project.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty({ type: () => Project })
  @OneToMany(() => Project, (project) => project.owner)
  projects: Project[];
}

/*
 *TODO: create entity for User

 class User {

  @OneToMany(type=> Project, project=>project.owner)
  projects : Project[]
 }
 * */
