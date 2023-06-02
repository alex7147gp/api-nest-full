import { Injectable, Inject } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"

import { Strategy, ExtractJwt } from "passport-jwt"



import config from "../../config"

import { ConfigType } from "@nestjs/config"



import { PayloadToken } from "../../models/token.models"


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
	constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
	  super({
	  	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		ignoreExpiration: false,
		secretOrKey: configService.jwtSecret
	  })
    }

    validate(payload: PayloadToken) {

    	return payload
    }
}