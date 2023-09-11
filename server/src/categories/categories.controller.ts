import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { IResponse } from 'src/types/response';
import { Category } from './entities/category.entity';
import { UpdateCategoryInput } from './dto/update-category.input';
import { CreateCategoryInput } from './dto/create-category.input';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Get()
  async getCategories(
    @Query('_full') type: string,
  ): Promise<IResponse<Category[], undefined>> {
    const categories = await this.categoryService.findAll(type);
    return { message: 'Find categories success', data: categories };
  }

  @Get(':id')
  async getCategoryById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<Category, undefined>> {
    const catogory = await this.categoryService.findOne(id);
    return { message: 'Category found', data: catogory };
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() rqData: CreateCategoryInput,
  ): Promise<IResponse<Category, undefined>> {
    const category = await this.categoryService.create(rqData);
    return { message: 'Category created', data: category };
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() rqData: UpdateCategoryInput,
  ): Promise<IResponse<Category, undefined>> {
    const category = await this.categoryService.update(id, rqData);
    return { message: 'Category updated', data: category };
  }

  @Delete(':id')
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<Category, undefined>> {
    const category = await this.categoryService.remove(id);
    return { message: 'Category deleted', data: category };
  }
}
