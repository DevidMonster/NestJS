import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Rate {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Field(() => Int)
  @Column({ default: '0' })
  rate: number;

  @Field()
  @Column('longtext', { nullable: true })
  content: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.rates)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.rates)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Field()
  @Column({ type: 'timestamp', default: () => 'current_timestamp' })
  createdAt?: Date;
}
