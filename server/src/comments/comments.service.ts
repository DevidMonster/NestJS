import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentInput } from './dto/create-comment.input';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private comment: Repository<Comment>,
    @InjectRepository(Product) private product: Repository<Product>,
    @InjectRepository(User) private user: Repository<User>,
  ) {}

  async findAllComments(): Promise<Comment[]> {
    const comments = await this.comment.find({
      relations: { user: true, product: true },
    });

    if (!comments)
      throw new HttpException('No comments found', HttpStatus.NOT_FOUND);

    return comments;
  }

  async findCommentsByProductId(productId: number): Promise<Comment[]> {
    const product = await this.product.findOne({ where: { id: productId } });

    const comments = await this.comment.find({
      where: { product: product as Product | any },
      relations: { user: true },
    });

    return comments;
  }

  async createComment(data: CreateCommentInput): Promise<Comment> {
    const user = await this.user.findOne({
      where: { id: data.userId },
    });

    const product = await this.product.findOne({
      where: { id: data.productId },
    });

    const comment = this.comment.create({
      user: user!,
      product: product!,
      content: data.content,
    });
    await this.comment.save(comment);
    return comment;
  }

  async deleteComment(id: number): Promise<Comment> {
    const comment = await this.comment.findOne({
      where: { id },
      relations: { product: true },
    });

    if (!comment)
      throw new HttpException('No comment found', HttpStatus.NOT_FOUND);

    const product = await this.product.findOne({
      where: { id: comment?.product?.id },
      relations: { comments: true },
    });

    if (product)
      product.comments = product.comments.filter((cmt) => cmt.id !== id);

    await this.product.save(product);

    await this.comment.remove(comment);

    return comment;
  }
}
