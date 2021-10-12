import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project-dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  // TODO: implement DB mongo? typeORM
  private projects: Project[] = [
    {
      id: 23213,
      name: 'grenpeace',
      code: 'GPC',
      goal: 500,
      curr_amount: 100,
      status: 'in-progress',
    },
    {
      id: 311123,
      name: 'youtube',
      code: 'YOU',
      goal: 100,
      curr_amount: 100,
      status: 'completed',
    },
    {
      id: 33141,
      name: 'argentina',
      code: 'ARG',
      goal: 1000,
      curr_amount: 100,
      status: 'in-progress',
    },
  ];

  findAll(status?: string): Project[] {
    return status
      ? this.projects.filter((project) => project.status === status)
      : this.projects;
  }

  findByProjectCode(projectCode: string): Project {
    return this.projects.find((project) => project.code === projectCode);
  }

  createProject(createProjectDto: CreateProjectDto): Project {
    // TODO: generate the interface
    const newProject = {
      id: Date.now(),
      curr_amount: 0,
      status: 'in-progress',
      ...createProjectDto,
      goal: Number(createProjectDto.goal),
      code: createProjectDto.name.toUpperCase().slice(0, 3),
    };

    this.projects.push(newProject);
    return newProject;
  }
}
