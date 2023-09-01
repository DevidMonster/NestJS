import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IComment } from 'src/comments/dtos/comment.dto';
import { Comment } from 'src/typeorm/entities/Comment';
import { Post } from 'src/typeorm/entities/Post';
import { User } from 'src/typeorm/entities/User';
import { IResponse } from 'src/types/response';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private comment: Repository<Comment>,
    @InjectRepository(Post) private post: Repository<Post>,
    @InjectRepository(User) private user: Repository<User>,
  ) {}

  async findAllComments(): Promise<IResponse<Comment[], undefined>> {
    const comments = await this.comment.find({
      relations: { user: true, post: true },
    });

    if (!comments)
      throw new HttpException('No comments found', HttpStatus.NOT_FOUND);

    return { message: 'Comments found', data: comments };
  }

  async findCommentsByPostId(
    postId: number,
  ): Promise<IResponse<Comment[], undefined>> {
    const post = await this.post.findOne({ where: { id: postId } });

    const comments = await this.comment.find({
      where: { post: post as Post | any },
      relations: { user: true },
    });

    return { message: 'Comments found', data: comments };
  }

  async createComment(
    data: IComment,
  ): Promise<IResponse<undefined, undefined>> {
    const user = await this.user.findOne({
      where: { id: data.userId as number },
    });

    const post = await this.post.findOne({
      where: { id: data.postId as number },
    });

    await this.comment.insert({
      user: user!,
      post: post!,
      content: data.content,
    });

    return { message: 'Comment created' };
  }

  async deleteComment(id: number): Promise<IResponse<undefined, undefined>> {
    const comment = await this.comment.findOne({
      where: { id },
      relations: { post: true },
    });

    if (!comment)
      throw new HttpException('No comment found', HttpStatus.NOT_FOUND);

    const post = await this.post.findOne({
      where: { id: comment?.post?.id },
      relations: { comments: true },
    });

    if (post) post.comments = post.comments.filter((cmt) => cmt.id !== id);

    await this.post.save(post);

    await this.comment.remove(comment);

    return { message: 'Comment deleted' };
  }
}
