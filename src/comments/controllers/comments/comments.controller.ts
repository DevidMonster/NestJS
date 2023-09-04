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
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from 'src/typeorm/role.enum';
import { AuthortizationGuard } from 'src/guard/authortization/authortization.guard';
import { AuthenticationGuard } from 'src/guard/authentication/authentication.guard';

@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthortizationGuard)
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

  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthortizationGuard)
  @Delete(':id')
  removeComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.deleteComment(id);
  }
}
