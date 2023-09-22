import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FindManyOptions, Not, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private category: Repository<Category>,
    @InjectRepository(Product) private product: Repository<Product>,
  ) {}

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const category = this.category.create(createCategoryInput);
    await this.category.save(category);

    return category;
  }

  async findAll(
    type?: string,
    page: number = 1,
    pageSize: number = 1000,
  ): Promise<Category[]> {
    const options: FindManyOptions<Category> = {
      where: { id: Not(1) },
      relations: ['products'], // Chọn các relations cần thiết
    };

    if (type === '') {
      options.where = {};
    }

    // Thêm phân trang nếu cung cấp page và pageSize
    if (page && pageSize) {
      options.skip = (page - 1) * pageSize;
      options.take = pageSize;
    }

    // nếu có query parameter ?_full thì lấy cả default category
    return await this.category.find(options);
  }

  async findOne(id: number): Promise<Category> {
    return this.category.findOne({
      where: { id },
      relations: { products: true },
    });
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    await this.category.update(id, updateCategoryInput);

    return await this.category.findOne({ where: { id } });
  }

  async remove(id: number): Promise<Category> {
    const category = await this.category.findOne({
      where: { id },
      relations: { products: true },
    });

    const defaultCategory = await this.category.findOne({ where: { id: 1 } });

    for (const product of category.products) {
      await this.product.update(product.id, {
        category: defaultCategory,
      });
    }

    await this.category.remove(category);

    return category;
  }
}
