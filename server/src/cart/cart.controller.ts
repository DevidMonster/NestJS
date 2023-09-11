import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { IResponse } from 'src/types/response';
import { Cart } from './entities/cart.entity';
import { CreateCartInput } from './dto/create-cart.input';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getAllCart(): Promise<IResponse<Cart[], undefined>> {
    const carts = await this.cartService.findAll();
    return { message: 'Find carts success', data: carts };
  }

  @Get(':id')
  async getCartById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<Cart, undefined>> {
    const cart = await this.cartService.findOneByUserId(id);
    return { message: 'Cart found', data: cart };
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createCart(
    @Body() rqData: CreateCartInput,
  ): Promise<IResponse<Cart, undefined>> {
    const cart = await this.cartService.create(rqData);
    return { message: 'Cart created', data: cart };
  }
}
