import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private post: Repository<Post>) {}

  async create(createPostInput: CreatePostInput): Promise<Post> {
    const post = this.post.create(createPostInput);

    return await this.post.save(post);
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.post.find();
    console.log(posts);

    return posts;
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.post.findOne({ where: { id } });
    return post;
  }

  async update(id: number, updatePostInput: UpdatePostInput): Promise<Post> {
    await this.post.update(id, updatePostInput);

    const post = await this.post.findOne({ where: { id } });

    return post;
  }

  async remove(id: number): Promise<Post> {
    const post = await this.post.findOne({ where: { id } });

    await this.post.remove(post);

    return post;
  }
}
