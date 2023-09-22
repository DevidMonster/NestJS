import { CacheInterceptor } from '@nestjs/cache-manager';
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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { IResponse } from 'src/types/response';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/types/role.enum';
import { AuthenticationGuard } from 'src/guard/authentication/authentication.guard';
import { AuthortizationGuard } from 'src/guard/authortization/authortization.guard';
import { ApiQuery } from '@nestjs/swagger';

@UseInterceptors(CacheInterceptor)
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  @ApiQuery({ name: '_category', required: false })
  @ApiQuery({ name: '_type', required: false })
  async getAll(
    @Query('_type') type: string,
    @Query('_category') cate?: string,
    @Query('_page') page?: number,
    @Query('_pageSize') pageSize?: number,
  ): Promise<IResponse<Product[], undefined>> {
    const products = await this.productService.findAll(
      type,
      cate,
      page,
      pageSize,
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

  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthortizationGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async createProduct(
    @Body() reqData: CreateProductInput,
  ): Promise<IResponse<Product, undefined>> {
    const product = await this.productService.create(reqData);
    return { message: 'Product created', data: product };
  }

  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthortizationGuard)
  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() reqData: UpdateProductInput,
  ): Promise<IResponse<Product, undefined>> {
    const product = await this.productService.update(id, reqData);
    return { message: 'Product updated successfully', data: product };
  }

  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthortizationGuard)
  @Delete(':id')
  async deleteProduct(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<Product, undefined>> {
    const product = await this.productService.remove(id);
    return { message: 'Product deleted successfully', data: product };
  }
}
