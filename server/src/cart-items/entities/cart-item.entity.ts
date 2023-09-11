import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class CartItem {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Field(() => Cart)
  @ManyToOne(() => Cart, (cart) => cart.cartItem)
  @JoinColumn({ name: 'cartId' })
  cart!: Cart;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.cartItems)
  @JoinColumn({ name: 'productId' })
  product!: Product;

  @Field(() => Int)
  @Column()
  quantity: number;

  @Field()
  @Column({ type: 'timestamp', default: () => 'current_timestamp' })
  createdAt?: Date;
}
