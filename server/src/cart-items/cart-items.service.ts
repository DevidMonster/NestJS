import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartItemInput } from './dto/create-cart-item.input';
import { UpdateCartItemInput } from './dto/update-cart-item.input';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Repository } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CartItemsService {
  constructor(
    @InjectRepository(CartItem) private cartItem: Repository<CartItem>,
    @InjectRepository(User) private user: Repository<User>,
    @InjectRepository(Product) private product: Repository<Product>,
    @InjectRepository(Cart) private cart: Repository<Cart>,
  ) {}

  async create(createCartItemInput: CreateCartItemInput): Promise<CartItem> {
    const item = await this.cartItem.findOne({
      where: {
        product: { id: createCartItemInput.productId },
        cart: { id: createCartItemInput.cartId },
      },
    });

    if (item) {
      await this.cartItem.update(item.id, {
        quantity: +createCartItemInput.quantity + item.quantity,
      });
      return item;
    }

    const product = await this.product.findOne({
      where: { id: createCartItemInput.productId },
    });

    const cart = await this.cart.findOne({
      where: { id: createCartItemInput.cartId },
    });

    if (createCartItemInput.quantity > product.quantity)
      throw new HttpException(
        'Quantity run out of range',
        HttpStatus.BAD_REQUEST,
      );

    const cartItem = this.cartItem.create({
      cart: cart,
      product: product,
      quantity: createCartItemInput.quantity,
    });
    return await this.cartItem.save(cartItem);
  }

  async findAll(): Promise<CartItem[]> {
    return await this.cartItem.find();
  }

  async findOne(id: number): Promise<CartItem> {
    const cartItem = await this.cartItem.findOne({ where: { id } });

    if (!cartItem) {
      throw new NotFoundException(`CartItem with ID ${id} not found`);
    }

    return cartItem;
  }

  async update(
    id: number,
    updateCartItemInput: UpdateCartItemInput,
  ): Promise<CartItem> {
    const cartItem = await this.cartItem.findOne({
      where: { id },
      relations: { product: true },
    });

    if (!cartItem) {
      throw new NotFoundException(`CartItem with ID ${id} not found`);
    }

    // Cập nhật trường quantity từ updateCartItemInput
    if (updateCartItemInput.quantity !== undefined) {
      //nếu số lượng về 0 thì xóa khỏi giỏ hàng
      if (updateCartItemInput.quantity === 0)
        return await this.cartItem.remove(cartItem);

      //trả về lỗi nếu quantity vượt quá số lượng sản phẩm đang có
      if (updateCartItemInput.quantity > cartItem.product.quantity)
        throw new HttpException(
          'Quantity run out of range',
          HttpStatus.BAD_REQUEST,
        );

      cartItem.quantity = updateCartItemInput.quantity;
    }

    return await this.cartItem.save(cartItem);
  }

  async remove(id: number): Promise<CartItem> {
    const cartItem = await this.cartItem.findOne({ where: { id } });

    if (!cartItem)
      throw new NotFoundException(`CartItem with ID ${id} not found`);

    await this.cartItem.remove(cartItem);

    return cartItem;
  }
}
