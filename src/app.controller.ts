import { Controller, Get, Param, Query, UseGuards, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';

import { ApikeyGuard } from "./auth/gaurds/apikey.guard"


import { Public } from "./auth/decorators/public.decorator"

@UseGuards(ApikeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('nuevo')
  @Public()
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }
}
