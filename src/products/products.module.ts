import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose"

import { ProductsController } from './controllers/products.controller';
import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsService } from './services/products.service';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { ProductSchema } from "./entities/product.entity"
import { CategorySchema } from "./entities/category.entity"
import { BrandSchema } from "./entities/brand.entity"

import { SubDocSchema } from "./entities/sub-doc.entity" 

@Module({
  imports: [MongooseModule.forFeature([
      {
        name: "Product",
        schema: ProductSchema
      },
      {
        name: "Category",
        schema: CategorySchema
      },
      {
        name: "Brand",
        schema: BrandSchema
      },{
        name: "SubDoc",
        schema: SubDocSchema
      }
    ]
  )],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, BrandsService, CategoriesService],
  exports: [ProductsService],
})
export class ProductsModule {}
