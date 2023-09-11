import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDetailInput } from './dto/create-order-detail.input';
import { OrderDetail } from './entities/order-detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail) private orderDetail: Repository<OrderDetail>,
    @InjectRepository(Order) private order: Repository<Order>,
    @InjectRepository(Cart) private cart: Repository<Cart>,
    @InjectRepository(Product) private product: Repository<Product>,
  ) {}
  async create(
    createOrderDetailInput: CreateOrderDetailInput,
  ): Promise<OrderDetail[]> {
    const cart = await this.cart.findOne({
      where: { id: createOrderDetailInput.cartId },
      relations: { cartItem: { product: true } },
    });

    const order = await this.order.findOne({
      where: { id: createOrderDetailInput.orderId },
    });

    for (const cartItem of cart.cartItem) {
      const product = cartItem.product;

      const orderDetail = this.orderDetail.create({
        order,
        product: product,
        quantity: cartItem.quantity,
        price: cartItem.quantity * product.price,
        productName: product.name,
        productImage: product.image,
      });

      await this.product.update(product.id, {
        quantity: product.quantity - cartItem.quantity,
      });

      await this.orderDetail.save(orderDetail);
    }

    cart.cartItem = [];

    await this.cart.save(cart);

    const orderDetails = await this.orderDetail.find({
      where: { order: { id: createOrderDetailInput.orderId } },
      relations: { product: true },
    });

    return orderDetails;
  }

  async findAll(): Promise<OrderDetail[]> {
    const orderDetails = await this.orderDetail.find({
      relations: { product: true },
    });

    if (!orderDetails) throw new NotFoundException('No order details found');

    return orderDetails;
  }
}
