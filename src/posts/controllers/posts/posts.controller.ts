import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { AuthenticationGuard } from 'src/guard/authentication/authentication.guard';
import { AuthortizationGuard } from 'src/guard/authortization/authortization.guard';
import { CreatePost, UpdatePost } from 'src/posts/dtos/post.dto';
import { PostsService } from 'src/posts/services/posts/posts.service';
import { Role } from 'src/typeorm/role.enum';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get()
  fetchAllPost() {
    return this.postService.findAllPosts();
  }

  @Get(':id')
  fetchOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthortizationGuard)
  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Body() createPost: CreatePost) {
    this.postService.createdPost(createPost);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthortizationGuard)
  @Patch(':id')
  @UsePipes(ValidationPipe)
  updatePostById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePost: UpdatePost,
  ) {
    return this.postService.updatedPost(id, updatePost);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthenticationGuard, AuthortizationGuard)
  @Delete(':id')
  deletePostById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.deletedPost(id);
  }
}
