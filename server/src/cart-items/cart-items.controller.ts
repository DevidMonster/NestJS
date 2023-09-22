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
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { IResponse } from 'src/types/response';
import { CartItem } from './entities/cart-item.entity';
import { CreateCartItemInput } from './dto/create-cart-item.input';
import { UpdateCartItemInput } from './dto/update-cart-item.input';
import { AuthenticationGuard } from 'src/guard/authentication/authentication.guard';
import { ProductsService } from 'src/products/products.service';

@Controller('cart-items')
export class CartItemsController {
  constructor(
    private cartItemService: CartItemsService,
    private productService: ProductsService,
  ) {}

  @UseGuards(AuthenticationGuard)
  @Get()
  async getCartItems(): Promise<IResponse<CartItem[], undefined>> {
    const items = await this.cartItemService.findAll();
    return { message: 'Find items success', data: items };
  }

  @UseGuards(AuthenticationGuard)
  @Get(':id')
  async getCartItem(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<CartItem, undefined>> {
    const item = await this.cartItemService.findOne(id);
    return { message: 'item found', data: item };
  }

  @UseGuards(AuthenticationGuard)
  @Post()
  @UsePipes(ValidationPipe)
  async createCartItem(
    @Body() rqData: CreateCartItemInput,
  ): Promise<IResponse<CartItem | undefined, undefined>> {
    const isAvaliable = await this.productService.checkInventory(
      rqData.cartId,
      rqData.productId,
      rqData.quantity,
    );
    if (isAvaliable) {
      const cartItem = await this.cartItemService.create(rqData);
      return { message: 'Cart item created', data: cartItem };
    } else {
      throw new HttpException(
        'Product is out of stock',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(AuthenticationGuard)
  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateCartItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() rqData: UpdateCartItemInput,
  ): Promise<IResponse<CartItem, undefined>> {
    const cartItem = await this.cartItemService.update(id, rqData);
    return { message: 'Cart item updated', data: cartItem };
  }

  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  async deleteCartItem(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<CartItem, undefined>> {
    const cartItem = await this.cartItemService.remove(id);
    return { message: 'Cart item deleted', data: cartItem };
  }
}
