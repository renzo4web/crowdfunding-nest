import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { LoginUserDto } from './auth/dto/login-dto';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User } from './users/entities/user.entity';

// controller receive the request from the user
/*
 * in express this would be
 * router.routes("app").get("hello").post()
 * */
@Controller('founding') // path
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    console.log('HEllo');
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any, @Body() body: LoginUserDto): any {
    return req.user;
  }
}
