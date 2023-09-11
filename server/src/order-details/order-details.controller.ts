import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IResponse } from 'src/types/response';
import { OrderDetail } from './entities/order-detail.entity';
import { OrderDetailsService } from './order-details.service';
import { CreateOrderDetailInput } from './dto/create-order-detail.input';

@Controller('order-details')
export class OrderDetailsController {
  constructor(private orderDetailService: OrderDetailsService) {}

  @Get()
  async getOrderDetails(): Promise<IResponse<OrderDetail[], undefined>> {
    const orderDetails = await this.orderDetailService.findAll();
    return { message: 'Order details found', data: orderDetails };
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createOrderDetail(
    @Body() rqData: CreateOrderDetailInput,
  ): Promise<IResponse<OrderDetail[], undefined>> {
    const orderDetails = await this.orderDetailService.create(rqData);

    return { message: 'Order details created', data: orderDetails };
  }
}
