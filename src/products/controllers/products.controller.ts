import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  UseGuards,
  // ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int.pipe';
import { MongoIdPipe } from "../../common/mongo-id.pipe";
import { CreateProductDto, UpdateProductDto, FilterProductDto } from '../dtos/products.dto';
import { ProductsService } from './../services/products.service';

import { AuthGuard } from "@nestjs/passport"

import { JwtAuthGuard } from "../../auth/gaurds/jwt-auth.guard"

import { Public } from "../../auth/decorators/public.decorator"

import { Roles } from "../../auth/decorators/roles.decorator"

import { Role } from "../../models/roles.model"

import { RolesGuard } from "../../auth/gaurds/roles.guard"

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Roles(Role.ADMIN)
  @Public()
  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts( @Query() params: FilterProductDto) {
    // return {
    //   message: `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
    // };
    return this.productsService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return `yo soy un filter`;
  }


  @Public()
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', MongoIdPipe) productId: string) {

    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {


    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateProductDto) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.remove(id);
  }
}
