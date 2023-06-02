import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from "mongoose"

import { InjectModel } from "@nestjs/mongoose"



import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto, FilterProductDto } from './../dtos/products.dto';

@Injectable()
export class ProductsService {
  
  constructor(@InjectModel("Product") private productModel: Model<Product>) {}

  findAll(params?: FilterProductDto) {
    if (params) {
      
      const filters: FilterQuery<Product> = {}

      const { limit, offset } = params 
      
      const { minPrice, maxPrice } = params
    
      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice }
      }

      return this.productModel.find(filters).populate("brand").skip(offset * limit).limit(limit).exec()
    }
    return this.productModel.find().populate("populate").exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).populate("brand").exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const product = new this.productModel(data)
    product.save()
    return {
      message: "product created",
      body: product
    }
  }

  async update(id: string, changes: UpdateProductDto) {
    const product = await this.productModel.findByIdAndUpdate(id, { $set: changes }, { new: true }).exec();
    
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`)
    }
    return product;
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id).exec()
    if (product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }
}
