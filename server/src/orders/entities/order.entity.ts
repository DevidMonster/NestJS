import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { OrderStatus } from 'src/types/orderStatus.enum';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field()
  @Column({ type: 'timestamp', default: () => 'current_timestamp' })
  orderDate?: Date;

  @Field()
  @Column()
  userName!: string;

  @Field()
  @Column()
  shippingAddress!: string;

  @Field()
  @Column()
  phoneNumber!: string;

  @Field()
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Field()
  @Column()
  paymentMethod!: string;

  @Field(() => Int)
  @Column()
  totalAmount!: number;

  @Field(() => [OrderDetail])
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];
}
