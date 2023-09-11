import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  ParseIntPipe,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { IResponse } from 'src/types/response';
import { CartItem } from './entities/cart-item.entity';
import { CreateCartItemInput } from './dto/create-cart-item.input';
import { UpdateCartItemInput } from './dto/update-cart-item.input';

@Controller('cart-items')
export class CartItemsController {
  constructor(private cartItemService: CartItemsService) {}

  @Get()
  async getCartItems(): Promise<IResponse<CartItem[], undefined>> {
    const items = await this.cartItemService.findAll();
    return { message: 'Find items success', data: items };
  }

  @Get(':id')
  async getCartItem(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<CartItem, undefined>> {
    const item = await this.cartItemService.findOne(id);
    return { message: 'item found', data: item };
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createCartItem(
    @Body() rqData: CreateCartItemInput,
  ): Promise<IResponse<CartItem, undefined>> {
    const cartItem = await this.cartItemService.create(rqData);
    return { message: 'Cart item created', data: cartItem };
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateCartItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() rqData: UpdateCartItemInput,
  ): Promise<IResponse<CartItem, undefined>> {
    const cartItem = await this.cartItemService.update(id, rqData);
    return { message: 'Cart item updated', data: cartItem };
  }

  @Delete(':id')
  async deleteCartItem(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<CartItem, undefined>> {
    const cartItem = await this.cartItemService.remove(id);
    return { message: 'Cart item deleted', data: cartItem };
  }
}
