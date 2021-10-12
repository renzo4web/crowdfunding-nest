import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project-dto';
import { Project } from './entities/project.entity';

// TODO: implement DB mongo? typeORM
@Injectable()
export class ProjectsService {
  private projects: Project[] = [
    {
      id: 23213,
      name: 'grenpeace',
      code: 'GPC',
      goal: 500,
      curr_amount: 100,
      status: 'in-progress',
    },
  ];

  findAll(): Project[] {
    return this.projects;
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
