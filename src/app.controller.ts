import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

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
    return this.appService.getHello();
  }
}
