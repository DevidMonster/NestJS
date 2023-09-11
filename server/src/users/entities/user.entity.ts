/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Comment } from 'src/comments/entities/comment.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Field()
  @Column()
  userName!: string;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  passWord!: string;

  @Field({ defaultValue: '' })
  @Column({ default: '' })
  phoneNumber?: string;

  @Field({ nullable: true })
  @Column('longtext', { nullable: true })
  avatar?: string;

  @Field({ defaultValue: 'member' })
  @Column({ default: 'member' })
  role!: string;

  @Field({ defaultValue: true })
  @Column({ default: true })
  state!: boolean;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user)
  comments?: Comment[];

  @Field(() => Cart)
  @OneToOne(() => Cart, (cart) => cart.user, { cascade: true })
  @JoinColumn({ name: 'cartId' })
  cart?: Cart;

  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
