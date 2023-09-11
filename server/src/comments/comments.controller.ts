import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { IResponse } from 'src/types/response';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';

@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Get()
  async getAllComments(): Promise<IResponse<Comment[], undefined>> {
    const comments = await this.commentService.findAllComments();
    return { message: 'Find comments success', data: comments };
  }

  @Get('post/:id')
  async getCommentByProductId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<Comment[], undefined>> {
    const comments = await this.commentService.findCommentsByProductId(id);
    return { message: 'Find comments success', data: comments };
  }

  @Post()
  @UsePipes(ValidationPipe)
  async addComment(
    @Body() rqData: CreateCommentInput,
  ): Promise<IResponse<Comment, undefined>> {
    const comments = await this.commentService.createComment(rqData);
    return { message: 'Comment added', data: comments };
  }

  @Delete()
  async removeComment(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<Comment, undefined>> {
    const comments = await this.commentService.deleteComment(id);
    return { message: 'Comment deleted', data: comments };
  }
}
