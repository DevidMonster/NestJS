import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Cart {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field(() => [CartItem])
  @OneToMany(() => CartItem, (item) => item.cart)
  cartItem: CartItem[];
}
