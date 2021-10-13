import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  // TODO: implement DB mongo? typeORM
  constructor(
    @InjectRepository(Project) private projectsRepository: Repository<Project>,
  ) {}
  //private projects: Project[] = [
  //{
  //id: 23213,
  //name: 'grenpeace',
  //code: 'GPC',
  //goal: 500,
  //curr_amount: 100,
  //status: 'in-progress',
  //},
  //{
  //id: 311123,
  //name: 'youtube',
  //code: 'YOU',
  //goal: 100,
  //curr_amount: 100,
  //status: 'completed',
  //},
  //{
  //id: 33141,
  //name: 'argentina',
  //code: 'ARG',
  //goal: 1000,
  //curr_amount: 100,
  //status: 'in-progress',
  //},
  //];

  findAll(status?: string): Promise<Project[]> {
    //return status
    //? this.projects.filter((project) => project.status === status)
    //: this.projects;
    return this.projectsRepository.find();
  }

  async findByProjectCode(projectCode: string): Promise<Project> {
    //return this.projects.find((project) => project.code === projectCode);
    try {
      const project = await this.projectsRepository.findOneOrFail(projectCode);
      return project;
    } catch (error) {
      throw new Error('Project not found');
    }
  }

  async findOne(id: number): Promise<Project> {
    try {
      const project = await this.projectsRepository.findOneOrFail(id);
      return project;
    } catch (error) {
      throw new Error('Project not found');
    }
  }

  createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const newProject = {
      curr_amount: 0,
      status: 'in-progress',
      ...createProjectDto,
      goal: Number(createProjectDto.goal),
      code: createProjectDto.name.toUpperCase().slice(0, 3),
    };

    const saveProject = this.projectsRepository.create(newProject);
    return this.projectsRepository.save(saveProject);
  }

  async updateProject(updateProjectDto: UpdateProjectDto): Promise<Project> {
    //const newProject = {
    //curr_amount: 0,
    //status: 'in-progress',
    //...createProjectDto,
    //goal: Number(createProjectDto.goal),
    //code: createProjectDto.name.toUpperCase().slice(0, 3),
    //};
    const project = await this.findOne(updateProjectDto.id);

    const updated = {
      ...project,
      ...updateProjectDto,
    };

    return this.projectsRepository.save(updated);
  }

  async deleteProject(id: number): Promise<Project> {
    const project = await this.findOne(id);
    return this.projectsRepository.remove(project);
  }
}
