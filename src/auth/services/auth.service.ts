import { Injectable } from '@nestjs/common';


import { UsersService } from "./../../users/services/users.service"


import * as bcrypt from "bcrypt"

import { JwtService } from "@nestjs/jwt"


import { User } from "./../../users/entities/user.entity"


import { PayloadToken } from "./../../models/token.models"

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}



  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)

    if (user) {
    	
       const isMatch = await bcrypt.compare(password, user.password)

       if (isMatch) {

         const { password, ...rta } = user.toJSON()

         return rta
       }
       
       return null

    }

    return null
  }

  generateJWT(user: User) {
  	const payload: PayloadToken = { role: user.role, sub: user.id }
  	return {
  		access_token: this.jwtService.sign(payload),
  		user,
  	}
  }
}