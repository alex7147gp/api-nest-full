import { Controller, Get, UseGuards, Req } from '@nestjs/common';


import { ApiTags } from "@nestjs/swagger"
import { Request } from "express"


import { JwtAuthGuard } from "../../auth/gaurds/jwt-auth.guard"
import { RolesGuard } from "../../auth/gaurds/roles.guard"
import { Roles } from "../../auth/decorators/roles.decorator"
import { Role } from "../../models/roles.model"
import { PayloadToken } from "../../models/token.models"


import { OrdersService } from "../services/orders.service"

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags("profile")
@Controller('profile')
export class ProfileController {

	constructor(private orderService: OrdersService) {}

	@Roles(Role.CUSTOMER)
	@Get("my-orders")
	getOrders(@Req() req: Request ) {
		const user = req.user as PayloadToken

		return this.orderService.ordersByCustomer(user.sub)
	}
}
