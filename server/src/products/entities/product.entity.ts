import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Comment } from 'src/comments/entities/comment.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';

@Entity()
@ObjectType()
export class Product extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column('longtext', { nullable: true })
  description?: string;

  @Field(() => Int)
  @Column()
  price!: number;

  @Field(() => Int)
  @Column()
  quantity!: number;

  @Field()
  @Column('longtext', { nullable: true })
  image?: string;

  @Field(() => Int)
  @Column()
  discount!: number;

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.product)
  comments?: Comment[];

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Field(() => [CartItem])
  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @Field(() => [OrderDetail])
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];
}
