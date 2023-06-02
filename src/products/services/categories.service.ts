import { Injectable, NotFoundException } from '@nestjs/common';



import { Model, FilterQuery } from "mongoose"

import { InjectModel } from "@nestjs/mongoose"


import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';

@Injectable()
export class CategoriesService {

  constructor(@InjectModel("Category") private categoryModel: Model<Category>) {}


  findAll() {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async create(data: CreateCategoryDto) {
    
    const newCategory = new this.categoryModel(data)

    newCategory.save()

    return {
      "message": "category created",
      "body": newCategory
    };
  }

  async update(id: string, changes: UpdateCategoryDto) {

    const category = await this.categoryModel.findByIdAndUpdate(id, { $set: changes }, { new: true}).exec();

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return category;
  }

  remove(id: string) {
    const category = this.categoryModel.findByIdAndDelete(id).exec();
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return category;
  }
}
