import {
  Controller,
  Get,
  Param,
  Body,
  Patch,
  Post,
  Delete,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IResponse } from 'src/types/response';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { OrderDetailsService } from 'src/order-details/order-details.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private orderService: OrdersService,
    private orderDetailService: OrderDetailsService,
  ) {}

  @Get()
  async getOrders(): Promise<IResponse<Order[], undefined>> {
    const orders = await this.orderService.findAll();
    return { message: 'Orders found', data: orders };
  }

  @Get('/user/:id')
  async getOrderByUser(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<IResponse<Order[], undefined>> {
    const orders = await this.orderService.findOrdersByUser(userId);

    return { message: 'Orders found', data: orders };
  }

  @Get(':id')
  async getOrdersById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<Order, undefined>> {
    const order = await this.orderService.findOne(id);
    return { message: 'Order found', data: order };
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createOrder(
    @Body() rqData: CreateOrderInput,
  ): Promise<IResponse<Order, undefined>> {
    const order = await this.orderService.create(rqData);

    await this.orderDetailService.create({
      cartId: rqData.cartId,
      orderId: order.id,
    });

    return { message: 'Order created', data: order };
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateStatusOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() rqData: UpdateOrderInput,
  ): Promise<IResponse<Order, undefined>> {
    const order = await this.orderService.update(id, rqData);

    return { message: 'Order updated', data: order };
  }

  @Delete(':id')
  async deleteOrder(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<Order, undefined>> {
    const order = await this.orderService.remove(id);

    return { message: 'Order deleted', data: order };
  }
}
