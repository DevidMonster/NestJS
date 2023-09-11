import { Injectable } from '@nestjs/common';
import { CreateCartInput } from './dto/create-cart.input';
// import { UpdateCartInput } from './dto/update-cart.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cart: Repository<Cart>,
    @InjectRepository(User) private user: Repository<User>,
    @InjectRepository(CartItem) private cartItem: Repository<CartItem>,
  ) {}

  async create(createCartInput: CreateCartInput): Promise<Cart> {
    const user = await this.user.findOne({
      where: { id: createCartInput.userId },
    });

    const cart = this.cart.create({
      user,
    });

    const savedCart = await this.cart.save(cart);

    user.cart = savedCart;

    await this.user.save(user);

    return savedCart;
  }

  async findAll(): Promise<Cart[]> {
    return await this.cart.find();
  }

  async findOneByUserId(id: number): Promise<Cart> {
    return await this.cart
      .createQueryBuilder('cart')
      .leftJoinAndSelect('cart.cartItem', 'cartItem')
      .leftJoinAndSelect('cart.user', 'user')
      .leftJoinAndSelect('cartItem.product', 'product')
      .where('cart.id = :id', { id })
      .getOne();
  }

  // update(id: number, updateCartInput: UpdateCartInput) {
  //   return `This action updates a #${id} cart`;
  // }

  async remove(id: number): Promise<Cart> {
    const cart = await this.cart.findOne({
      where: { id },
      relations: { cartItem: true, user: true },
    });

    await this.cart.remove(cart);

    for (const items of cart.cartItem) {
      await this.cartItem.remove(items);
    }

    await this.user.update(cart.user.id, { cart: null });

    return cart;
  }
}
