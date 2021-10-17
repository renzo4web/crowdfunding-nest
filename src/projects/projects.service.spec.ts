import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { CreateProjectDto } from './dto/create-project-dto';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;

  const userResponse = {
    id: Date.now(),
    name: 'string',
    email: 'string@gmail.com',
    projects: [],
  };

  const projectFields = {
    curr_amount: 0,
    status: 'in-progress',
    name: 'string',
    owner: { ...userResponse },
    goal: 111,
    code: 'TES',
    id: Date.now(),
  };

  const mockProjectsRepository = {
    create: jest.fn((dto: CreateProjectDto) => ({
      ...projectFields,
      ...dto,
    })),

    save: jest.fn((project) =>
      Promise.resolve({
        ...project,
        id: Date.now(),
      }),
    ),

    findOneOrFail: jest.fn((id) => Promise.resolve({ ...projectFields, id })),

    remove: jest.fn((id: number) => Promise.resolve({ ...projectFields, id })),
  };

  const mockUsersService = {
    findOneById: jest.fn((id: number) => ({
      ...userResponse,
      id,
    })),

    updateUser: jest.fn((project: Project) => ({
      ...userResponse,
      projects: [{ ...projectFields, ...project }],
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        UsersService,
        {
          provide: getRepositoryToken(Project),
          useValue: mockProjectsRepository,
        },
      ],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should CREATE a project record and return that', async () => {
    const dto: CreateProjectDto = { name: 'testing', goal: 49, ownerId: 2 };

    const { ownerId, ...rest } = dto;

    expect(await service.createProject(dto)).toEqual({
      ...projectFields,
      ...rest,
      owner: { ...userResponse, id: expect.any(Number) },
      id: expect.any(Number),
    });
  });

  it('should return a project by the code', async () => {
    await service.findByProjectCode('TES');
    expect(mockProjectsRepository.findOneOrFail).toHaveBeenCalledWith({
      code: 'TES',
    });
  });

  it('should findOne record and return that', async () => {
    const id = 3;
    expect(await service.findOne(id)).toEqual({ ...projectFields, id });
  });
});
