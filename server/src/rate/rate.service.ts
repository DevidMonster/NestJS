import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateRateInput } from './dto/create-rate.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Rate } from './entities/rate.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entities/order.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';

@Injectable()
export class RateService {
  constructor(
    @InjectRepository(Rate) private rate: Repository<Rate>,
    @InjectRepository(User) private user: Repository<User>,
    @InjectRepository(Order) private order: Repository<Order>,
    @InjectRepository(OrderDetail) private orderDetail: Repository<OrderDetail>,
    @InjectRepository(Product) private product: Repository<Product>,
  ) {}

  async create(createRateInput: CreateRateInput): Promise<Rate> {
    const user = await this.user.findOne({
      where: { id: createRateInput.userId },
    });
    if (!user) throw new NotFoundException('No user found');

    const order = await this.order.findOne({
      where: { id: createRateInput.orderId },
      relations: { orderDetails: { product: true }, user: true },
    });
    if (!order) throw new NotFoundException('No order found');

    const product = await this.product.findOne({
      where: { id: createRateInput.productId },
    });
    if (!product) throw new NotFoundException('No product found');

    if (
      user.id !== order.user.id ||
      !order.orderDetails.some((detail) => detail.product.id === product.id)
    )
      throw new UnauthorizedException(
        'You are not authorized to rate this product',
      );

    const hasRated = order.orderDetails.some((detail) => {
      return detail.product.id === product.id && detail.rated;
    });

    if (hasRated) {
      throw new UnauthorizedException('You have already rated this product');
    }

    const rate = this.rate.create({
      content: createRateInput.content,
      user: user,
      product: product,
      rate: createRateInput.rate,
    });

    // Đánh dấu sản phẩm đã được đánh giá trong chi tiết đơn hàng
    for (const detail of order.orderDetails) {
      if (detail.product.id === product.id) {
        detail.rated = true;
      }
      await this.orderDetail.save(detail);
    }

    return await this.rate.save(rate);
  }

  async findAll(): Promise<Rate[]> {
    return await this.rate.find({ relations: { user: true, product: true } });
  }

  async findByProduct(productId: number): Promise<Rate[]> {
    return await this.rate.find({
      where: { product: { id: productId } },
      relations: { user: true, product: true },
    });
  }

  async findOne(id: number): Promise<Rate> {
    return await this.rate.findOne({
      where: { id },
      relations: { user: true, product: true },
    });
  }

  async remove(id: number): Promise<Rate> {
    const rate = await this.rate.findOne({ where: { id } });

    await this.rate.remove(rate);

    return rate;
  }
}
