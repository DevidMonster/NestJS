import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Not, Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Category } from 'src/categories/entities/category.entity';
import { Rate } from 'src/rate/entities/rate.entity';
import { CacheService } from 'src/cache/cache.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Comment) private comment: Repository<Comment>,
    @InjectRepository(Category) private category: Repository<Category>,
    @InjectRepository(Rate) private rate: Repository<Rate>,
    @InjectRepository(Cart) private cart: Repository<Cart>,
    @InjectRepository(CartItem) private cartItem: Repository<CartItem>,
    @InjectRepository(Product) private product: Repository<Product>,
    private readonly cacheService: CacheService,
  ) {}

  async checkInventory(
    cartId?: number,
    productId?: number,
    quantity?: number,
  ): Promise<boolean> {
    const currentInventory = await this.cacheService.get(
      `inventory:${productId}`,
    );
    const cartItem = await this.cartItem.findOne({
      where: { cart: { id: cartId }, product: { id: productId } },
      relations: { product: true },
    });

    console.log(currentInventory?.quantity, cartItem?.quantity + quantity);

    if (
      currentInventory &&
      currentInventory?.quantity >= (cartItem?.quantity || 0) + quantity
    ) {
      return true;
    }

    return false;
  }

  async checkPlaceOrder(cartId: number): Promise<boolean> {
    const cart = await this.cart.findOne({
      where: { id: cartId },
      relations: { cartItem: { product: true } },
    });

    let isValid: boolean = true;

    for (const cartItem of cart.cartItem) {
      const productId = cartItem.product.id;
      const quantity = cartItem.quantity;

      const currentInventory = await this.cacheService.get(
        `inventory:${productId}`,
      );

      if (currentInventory && currentInventory.quantity >= quantity) {
        await this.cacheService.set(
          `inventory:${productId}`,
          currentInventory.quantity - quantity,
          86400,
        ); // Giảm tồn kho
      } else {
        isValid = false; // Sản phẩm không có đủ tồn kho
      }
    }

    return isValid;
  }

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const category = await this.category.findOne({
      where: { id: createProductInput.categoryId },
    });

    createProductInput.categoryId = undefined;
    const product = this.product.create({
      ...createProductInput,
      category,
    });

    await this.cacheService.set(
      `inventory:${product.id}`,
      JSON.stringify(product),
      86400,
    );

    return this.product.save(product);
  }

  async findAll(
    type?: string,
    cate?: string,
    page: number = 1,
    pageSize: number = 1000,
  ): Promise<Product[]> {
    const options: FindManyOptions<Product> = {
      relations: ['comments', 'rates', 'category'], // Chọn các relations cần thiết
    };

    if (type === 'out_of_stock') {
      options.where = { category: { id: 1 } }; // Sản phẩm trong danh mục mặc định (nằm trong kho)
    } else {
      // Sản phẩm không trong danh mục mặc định
      options.where = { category: { id: Not(1) } };
    }

    if (cate) {
      options.where = { category: { id: parseInt(cate) } };
    }

    // Thêm phân trang nếu cung cấp page và pageSize
    if (page && pageSize) {
      options.skip = (page - 1) * pageSize;
      options.take = pageSize;
    }

    const products = await this.product.find(options);
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

    await this.cacheService.set(
      `inventory:${productUpdated.id}`,
      JSON.stringify(productUpdated),
      86400,
    );

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

    await this.cacheService.del(`inventory:${product.id}`);

    await this.product.remove(product);
    return product;
  }
}
