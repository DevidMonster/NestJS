import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private order: Repository<Order>) {}

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    const order = this.order.create({
      userName: createOrderInput.userName,
      shippingAddress: createOrderInput.shippingAddress,
      phoneNumber: createOrderInput.phoneNumber,
      paymentMethod: createOrderInput.paymentMethod,
      totalAmount: createOrderInput.totalAmount,
    });

    return await this.order.save(order);
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.order.find({ relations: { orderDetails: true } });

    if (!orders) throw new NotFoundException('No order found');

    return orders;
  }

  async findOrdersByUser(userId: number): Promise<Order[]> {
    const orders = await this.order.find({
      where: { user: { id: userId } },
      relations: { orderDetails: true },
    });

    if (!orders) throw new NotFoundException('No order found');

    return orders;
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.order.findOne({
      where: { id },
      relations: { orderDetails: { product: true } },
    });

    if (!order) throw new NotFoundException('No order found');

    return order;
  }

  async update(id: number, updateOrderInput: UpdateOrderInput): Promise<Order> {
    const order = await this.order.findOne({ where: { id } });

    if (!order) throw new NotFoundException('No order found');

    order.status = updateOrderInput.status;

    return await this.order.save(order);
  }

  async remove(id: number): Promise<Order> {
    const order = await this.order.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    await this.order.remove(order);

    return order;
  }
}
