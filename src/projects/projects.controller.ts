import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @ApiOkResponse({ type: Project, isArray: true })
  @ApiQuery({ required: false, name: 'status' })
  @Get()
  async getProjects(@Query('status') status?: string): Promise<Project[]> {
    return this.projectsService.findAll(status);
  }

  @ApiOkResponse({ type: Project })
  @ApiNotFoundResponse()
  @Get(':code')
  async getProjectByCode(@Param('code') code: string): Promise<Project> {
    const project = this.projectsService.findByProjectCode(code);

    if (!project) {
      throw new NotFoundException();
    }

    return project;
  }

  @ApiCreatedResponse({ type: Project }) // for the documentation of swagger
  @ApiBadRequestResponse()
  @Post()
  async createProject(@Body() body: CreateProjectDto): Promise<Project> {
    if (!body.name || !body.goal) {
      // Custom  exception
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Please provide name and goal',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.projectsService.createProject(body);
  }

  @ApiCreatedResponse({ type: Project }) // for the documentation of swagger
  @ApiBadRequestResponse()
  @Put()
  async updateProject(@Body() body: UpdateProjectDto): Promise<Project> {
    if (!body) {
      throw new BadRequestException();
    }

    return this.projectsService.updateProject(body);
  }

  @ApiCreatedResponse({ type: Project })
  @Delete(':id')
  async deleteProject(@Param('id') id: number): Promise<Project> {
    return this.projectsService.deleteProject(id);
  }
}
