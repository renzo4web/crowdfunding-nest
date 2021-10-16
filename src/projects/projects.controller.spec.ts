import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProjectDto } from './dto/create-project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

describe('ProjectsController', () => {
  let controller: ProjectsController;

  const updateProjectResponse = {
    name: 'test',
    goal: 400,
    code: 'TES',
    curr_amount: 0,
    status: 'completed',
    owner: {
      id: Number(Date.now()),
      name: 'names',
      email: 'names2@gmail.com',
      password: 'names2',
      projects: [],
    },
    id: Date.now(),
  };

  const mockProjectsService = {
    findAll: jest.fn(() => [{ ...updateProjectResponse }]),

    createProject: jest.fn((dto: CreateProjectDto) => ({
      ...updateProjectResponse,
      ...dto,
    })),

    updateProject: jest.fn(
      (dto: UpdateProjectDto): Project => ({
        ...updateProjectResponse,
        ...dto,
      }),
    ),

    deleteProject: jest.fn((id: number) => ({
      ...updateProjectResponse,
      id,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        ProjectsService,
        {
          provide: JwtAuthGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    })
      .overrideProvider(ProjectsService)
      .useValue(mockProjectsService)
      .compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should CREATE a project', async () => {
    const dto: CreateProjectDto = { goal: 500, name: 'testing', ownerId: 3 };

    expect(await controller.createProject(dto)).toEqual({
      ...updateProjectResponse,
      ...dto,
    });

    expect(mockProjectsService.createProject).toHaveBeenCalledWith(dto);
  });

  it('should UPDATE a project', async () => {
    const dto: UpdateProjectDto = { id: 2, goal: 500 };
    expect(await controller.updateProject(dto)).toEqual({
      ...updateProjectResponse,
      ...dto,
      id: dto.id,
    });

    expect(mockProjectsService.updateProject).toHaveBeenCalledWith(dto);
  });

  it('should DELETE a project', async () => {
    const id = 2;

    expect(await controller.deleteProject(id)).toEqual({
      ...updateProjectResponse,
      id,
    });

    expect(mockProjectsService.deleteProject).toHaveBeenCalledWith(id);
  });

  it('should READ', async () => {
    expect(await controller.getProjects()).toEqual([
      { ...updateProjectResponse },
    ]);
  });
});
