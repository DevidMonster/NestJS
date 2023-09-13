import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { CreateProductInput } from './dto/create-product.input';
// import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Category } from 'src/categories/entities/category.entity';
import { Rate } from 'src/rate/entities/rate.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly product: Repository<Product>,
    @InjectRepository(Comment) private comment: Repository<Comment>,
    @InjectRepository(Category) private category: Repository<Category>,
    @InjectRepository(Rate) private rate: Repository<Rate>,
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const category = await this.category.findOne({
      where: { id: createProductInput.categoryId },
    });

    createProductInput.categoryId = undefined;
    const product = this.product.create({
      ...createProductInput,
      category,
    });

    return this.product.save(product);
  }

  async findAll(type?: string, cate?: string): Promise<Product[]> {
    const whereClause: Record<string, any> = {};

    // Nếu type được cung cấp và có giá trị 'out_of_stock', thêm điều kiện filter theo type
    if (type === 'out_of_stock') {
      whereClause.category = { id: 1 }; // Sản phẩm trong danh mục mặc định (nằm trong kho)
    } else {
      // Sản phẩm không trong danh mục mặc định
      whereClause.category = { id: Not(1) };
    }

    // Nếu cate được cung cấp, thêm điều kiện filter theo category id
    if (cate) {
      whereClause.category = { id: parseInt(cate) };
    }
    const products = await this.product.find({
      where: whereClause,
      relations: { comments: true, rates: true, category: true },
    });

    return products;
  }

  async findOne(id: number): Promise<Product> {
    const product = this.product.findOne({
      where: { id },
      relations: { comments: true, rates: true, category: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: number,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    const category = await this.category.findOne({
      where: { id: updateProductInput.categoryId },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    updateProductInput.categoryId = undefined;
    await this.product.update(id, { ...updateProductInput, category });

    const productUpdated = await this.product.findOne({
      where: { id },
      relations: { comments: true, rates: true, category: true },
    });

    return productUpdated;
  }

  async remove(id: number): Promise<Product> {
    const product = await this.product.findOne({
      where: { id },
      relations: {
        comments: true,
        rates: true,
        category: true,
      },
    });

    if (!product) {
      throw new HttpException('No post found', HttpStatus.NOT_FOUND);
    }

    for (const comment of product.comments!) {
      await this.comment.remove(comment);
    }

    for (const rate of product.rates!) {
      await this.rate.remove(rate);
    }

    //Xóa sản phẩm trong category
    const category = await this.category.findOne({
      where: { id: product.category.id },
      relations: { products: true },
    });

    if (category) {
      category.products = category.products.filter(
        (product: Product) => product.id !== id,
      );

      await this.category.save(category);
    }

    await this.product.remove(product);
    return product;
  }
}
