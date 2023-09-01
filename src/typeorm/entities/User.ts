/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Comment } from './Comment';
import { Post } from './Post';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column()
  userName!: string;

  @Column()
  email!: string;

  @Column()
  passWord!: string;

  @Column({ default: '' })
  phoneNumber?: string;

  @Column('longtext', { nullable: true })
  avatar?: string;

  @Column({ default: 'member' })
  role!: string;

  @Column({ default: true })
  state!: boolean;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments?: Comment[];

  @ManyToMany(() => Post, (post) => post.likes)
  @JoinTable()
  likedPosts?: Post[];
}
