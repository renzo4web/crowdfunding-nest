import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LoginUserDto } from './auth/dto/login-dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { CreateUserDto } from './users/dto/create-user-dto';
import { User } from './users/entities/user.entity';
import { UsersService } from './users/users.service';

// controller receive the request from the user
/*
 * in express this would be
 * router.routes("app").get("hello").post()
 * */
@Controller('api') // path
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any, @Body() body: LoginUserDto): any {
    return this.authService.login(req.user);
  }

  @Post('signup')
  signup(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    body: CreateUserDto,
  ): Promise<User> {
    return this.usersService.createUser(body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(): string {
    // TODO: required an Bearer token, validate token
    console.log('HEllo');
    return this.appService.getHello();
  }
}
