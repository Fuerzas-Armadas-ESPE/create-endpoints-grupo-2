import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return '¡Metodos Nuevos para los Endpoints!';
  }
}
