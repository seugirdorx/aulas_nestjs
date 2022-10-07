import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/HelloWorld')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/ListaBSMs')
  getListaBSMs(): string {
    return this.appService.getListaBSMs();
  }
  @Get('/Objetivos')
  getObjetivos(): string {
    return this.appService.getObjetivos();
  }
}
