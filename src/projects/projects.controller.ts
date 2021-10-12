import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project-dto';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  getProjects(): Project[] {
    return this.projectsService.findAll();
  }

  @Get(':code')
  getProjectByCode(@Param('code') code: string): Project {
    return this.projectsService.findByProjectCode(code);
  }

  @ApiCreatedResponse({ type: Project }) // for the documentation of swagger
  @Post()
  createProject(@Body() body: CreateProjectDto): Project {
    return this.projectsService.createProject(body);
  }
}
