import { Controller, Request, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  login() {
    return 'Hello';
  }
}
