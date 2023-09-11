import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Patch,
  Query,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { IResponse } from 'src/types/response';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  async getAll(
    @Query('_type') type: string,
    @Query('_category') cate?: string,
  ): Promise<IResponse<Product[], undefined>> {
    const products = await this.productService.findAll(
      type ? type : undefined,
      cate ? cate : undefined,
    );
    return { message: 'Find Products successfully', data: products };
  }

  @Get(':id')
  async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<Product, undefined>> {
    const product = await this.productService.findOne(id);
    return { message: 'Find Product successfully', data: product };
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createProduct(
    @Body() reqData: CreateProductInput,
  ): Promise<IResponse<Product, undefined>> {
    const product = await this.productService.create(reqData);
    return { message: 'Product created', data: product };
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() reqData: UpdateProductInput,
  ): Promise<IResponse<Product, undefined>> {
    const product = await this.productService.update(id, reqData);
    return { message: 'Product updated successfully', data: product };
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<Product, undefined>> {
    const product = await this.productService.remove(id);
    return { message: 'Product deleted successfully', data: product };
  }
}
