import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Request } from "express"


import { Reflector } from "@nestjs/core"

import config from "./../../config"


import { ConfigType } from "@nestjs/config"


@Injectable()
export class ApikeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {}


  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const isPublic = this.reflector.get("public", context.getHandler())
    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest<Request>()
    const authHeader = request.header("Auth")
    const isAuth = authHeader == this.configService.apiKey;

    if (!isAuth) {
       throw new UnauthorizedException("not allow")
    }

    return isAuth
  }
}
