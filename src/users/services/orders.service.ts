import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto, AddProductsToOrderDto } from '../dtos/order.dto';

import { UsersService } from "./users.service"

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>, private usersService: UsersService) {}

  findAll() {
    return this.orderModel
      .find()
      .populate('customer')
      .populate('products')
      .exec();
  }

  async findOne(id: string) {
    return this.orderModel.findById(id);
  }

  create(data: CreateOrderDto) {
    const newModel = new this.orderModel(data);
    return newModel.save();
  }

  update(id: string, changes: UpdateOrderDto) {
    return this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }

  async removeProduct(id: string, productId: string) {
    const order = await this.orderModel.findById(id)
    order.products.pull(productId)
    return order.save()
  }

  async addProducts(id: string, productsIds: String[]) {
    const order = await this.orderModel.findById(id)
    productsIds.forEach((item) => order.products.addToSet(item))
  } 

  async ordersByCustomer(userId: string) {
    
    const user = await (await this.usersService.findOne(userId)).toJSON()

    return await this.orderModel.find({ customer: user.customer._id.toString() }).populate("products").exec()
  }

}