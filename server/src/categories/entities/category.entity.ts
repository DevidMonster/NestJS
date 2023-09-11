import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field(() => [Product], { nullable: true })
  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}
