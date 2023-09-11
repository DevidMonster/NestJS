import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class OrderDetail {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.orderDetails)
  product: Product;

  @Field()
  @Column()
  productName: string;

  @Field()
  @Column('longtext')
  productImage: string;

  @Field(() => Int)
  @Column()
  quantity: number;

  @Field(() => Int)
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Field(() => Order)
  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order;
}
