/* eslint-disable prettier/prettier */
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.comments)
  @JoinColumn({ name: 'productId' })
  product?: Product;

  @Field()
  @Column('longtext', { nullable: true })
  content?: string;

  @Field()
  @Column({ type: 'timestamp', default: () => 'current_timestamp' })
  createdAt?: Date;
}
