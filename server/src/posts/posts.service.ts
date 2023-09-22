import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private post: Repository<Post>) {}

  async create(createPostInput: CreatePostInput): Promise<Post> {
    const post = this.post.create(createPostInput);

    return await this.post.save(post);
  }

  async findAll(page: number = 1, pageSize: number = 1000): Promise<Post[]> {
    const options: FindManyOptions<Post> = {
      relations: [''], // Chọn các relations cần thiết
    };

    // Thêm phân trang nếu cung cấp page và pageSize
    if (page && pageSize) {
      options.skip = (page - 1) * pageSize;
      options.take = pageSize;
    }

    const posts = await this.post.find(options);
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
