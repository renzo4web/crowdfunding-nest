import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
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
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @ApiOkResponse({ type: Project, isArray: true })
  @ApiQuery({ required: false, name: 'status' })
  @Get()
  getProjects(@Query('status') status?: string): Project[] {
    return this.projectsService.findAll(status);
  }

  @ApiOkResponse({ type: Project })
  @ApiNotFoundResponse()
  @Get(':code')
  getProjectByCode(@Param('code') code: string): Project {
    const project = this.projectsService.findByProjectCode(code);

    if (!project) {
      throw new NotFoundException();
    }

    return project;
  }

  @ApiCreatedResponse({ type: Project }) // for the documentation of swagger
  @ApiBadRequestResponse()
  @Post()
  createProject(@Body() body: CreateProjectDto): Project {
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
}
