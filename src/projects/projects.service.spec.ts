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
  };
  const mockUsersService = {
    findOneById: jest.fn((id: number) => ({
      ...userResponse,
      id,
    })),

    updateUser: jest.fn((project) => ({
      ...userResponse,
      projects: [{ ...projectFields }],
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

  it('should CREATE and save in DB', async () => {
    const dto: CreateProjectDto = { name: 'testing', goal: 49, ownerId: 2 };

    const { ownerId, ...rest } = dto;

    expect(await service.createProject(dto)).toEqual({
      ...projectFields,
      ...rest,
      owner: { ...userResponse, id: expect.any(Number) },
      id: expect.any(Number),
    });
  });
});
