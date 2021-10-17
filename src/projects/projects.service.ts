import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectsRepository: Repository<Project>,
    private usersService: UsersService,
  ) {}

  findAll(status?: string): Promise<Project[]> {
    return status
      ? this.projectsRepository.query(
          `SELECT * FROM project WHERE status='${status}'`,
        )
      : this.projectsRepository.find();
  }

  async findByProjectCode(projectCode: string): Promise<Project> {
    try {
      const project = await this.projectsRepository.findOneOrFail({
        code: projectCode,
      });
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

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const { ownerId, ...rest } = createProjectDto;

    const user = await this.usersService.findOneById(Number(ownerId));

    const newProject = {
      curr_amount: 0,
      status: 'in-progress',
      ...rest,
      owner: user,
      goal: Number(createProjectDto.goal),
      code: createProjectDto.name.toUpperCase().slice(0, 3),
    };

    const saveProject = this.projectsRepository.create(newProject);

    // save the project in the user
    await this.usersService.updateUser(saveProject);

    return this.projectsRepository.save(saveProject);
  }

  async updateProject(updateProjectDto: UpdateProjectDto): Promise<Project> {
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
