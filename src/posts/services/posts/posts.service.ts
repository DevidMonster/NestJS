import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/typeorm/entities/Post';
import { CreatePost, UpdatePost } from 'src/posts/dtos/post.dto';
import { IResponse } from 'src/types/response';
import { Comment } from 'src/typeorm/entities/Comment';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private post: Repository<Post>,
    @InjectRepository(Comment) private comment: Repository<Comment>,
  ) {}

  async findAllPosts(): Promise<IResponse<Post[], undefined>> {
    const posts = await this.post.find({
      relations: { likes: true, comments: true },
    });

    if (!posts) throw new HttpException('No posts found', HttpStatus.NOT_FOUND);

    return { message: 'Post found', data: posts };
  }

  async findOne(id: number): Promise<IResponse<Post, undefined>> {
    const post = await this.post.findOne({
      where: { id },
      relations: { likes: true, comments: true },
    });

    if (!post) throw new HttpException('No post found', HttpStatus.NOT_FOUND);

    return { message: 'Post found', data: post };
  }

  async createdPost(
    data: CreatePost,
  ): Promise<IResponse<undefined, undefined>> {
    await this.post.insert(data);

    return { message: 'Post created' };
  }

  async updatedPost(
    id: number,
    data: UpdatePost,
  ): Promise<IResponse<Post, undefined>> {
    await this.post.update(id, data);

    const postUpdated = await this.post.findOne({
      where: { id },
      relations: { likes: true, comments: true },
    });

    return { message: 'Post updated', data: postUpdated };
  }

  async deletedPost(id: number): Promise<IResponse<undefined, undefined>> {
    const post = await this.post.findOne({
      where: { id },
      relations: {
        comments: true,
      },
    });

    if (!post) {
      throw new HttpException('No post found', HttpStatus.NOT_FOUND);
    }

    for (const comment of post.comments!) {
      await this.comment.remove(comment);
    }
    return { message: 'Post deleted' };
  }
}
