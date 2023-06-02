import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose"

import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

import { UserSchema } from "./entities/user.entity"
import { CustomerSchema } from "./entities/customer.entity"

import { OrderSchema } from "./entities/order.entity"


import { TaskSchema } from "./entities/task.entity"

import { ProductsModule } from '../products/products.module';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { ProfileController } from './controllers/profile.controller';



@Module({
  imports: [MongooseModule.forFeature([
      {
        name: "User",
        schema: UserSchema
      },
      {
        name: "Customer",
        schema: CustomerSchema
      },
      {
        name: "Order",
        schema: OrderSchema
      },
      {
        name: "Task",
        schema: TaskSchema
      }
    ]
  ), ProductsModule],
  controllers: [CustomerController, UsersController, OrdersController, ProfileController],
  providers: [CustomersService, UsersService, OrdersService],
  exports: [UsersService],
})
export class UsersModule {}
