import { IComment } from 'src/comments/dtos/comment.dto';
import { CommentsService } from './../../services/comments/comments.service';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';

@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Get()
  fetchAllComments() {
    return this.commentService.findAllComments();
  }

  @Get('post/:id')
  fetchCommentsByPostId(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.findCommentsByPostId(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  addComment(@Body() comment: IComment) {
    return this.commentService.createComment(comment);
  }

  @Delete(':id')
  removeComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.deleteComment(id);
  }
}
