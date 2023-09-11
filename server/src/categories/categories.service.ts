import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Not, Repository } from 'typeorm';
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

  async findAll(type?: string): Promise<Category[]> {
    // nếu có query parameter ?_full thì lấy cả default category
    return await this.category.find({
      where: type === '' ? {} : { id: Not(1) },
      relations: { products: true },
    });
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
