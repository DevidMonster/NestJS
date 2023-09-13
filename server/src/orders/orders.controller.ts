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
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IResponse } from 'src/types/response';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { OrderDetailsService } from 'src/order-details/order-details.service';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/types/role.enum';
import { AuthenticationGuard } from 'src/guard/authentication/authentication.guard';
import { AuthortizationGuard } from 'src/guard/authortization/authortization.guard';

@Controller('orders')
export class OrdersController {
  constructor(
    private orderService: OrdersService,
    private orderDetailService: OrderDetailsService,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthortizationGuard)
  @Get()
  async getOrders(): Promise<IResponse<Order[], undefined>> {
    const orders = await this.orderService.findAll();
    return { message: 'Orders found', data: orders };
  }

  @UseGuards(AuthenticationGuard)
  @Get('/user/:id')
  async getOrderByUser(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<IResponse<Order[], undefined>> {
    const orders = await this.orderService.findOrdersByUser(userId);

    return { message: 'Orders found', data: orders };
  }

  @UseGuards(AuthenticationGuard)
  @Get(':id')
  async getOrdersById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<Order, undefined>> {
    const order = await this.orderService.findOne(id);
    return { message: 'Order found', data: order };
  }

  @UseGuards(AuthenticationGuard)
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

  @UseGuards(AuthenticationGuard, AuthortizationGuard)
  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateStatusOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() rqData: UpdateOrderInput,
  ): Promise<IResponse<Order, undefined>> {
    const order = await this.orderService.update(id, rqData);

    return { message: 'Order updated', data: order };
  }

  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthortizationGuard)
  @Delete(':id')
  async deleteOrder(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<Order, undefined>> {
    const order = await this.orderService.remove(id);

    return { message: 'Order deleted', data: order };
  }
}
