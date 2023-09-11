import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  subTitle?: string;

  @Field({ nullable: true })
  @Column('longtext', { nullable: true })
  thumbnail?: string;

  @Field()
  @Column('longtext')
  content!: string;
}
