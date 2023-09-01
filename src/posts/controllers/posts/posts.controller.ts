import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePost, UpdatePost } from 'src/posts/dtos/post.dto';
import { PostsService } from 'src/posts/services/posts/posts.service';

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

  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Body() createPost: CreatePost) {
    this.postService.createdPost(createPost);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  updatePostById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePost: UpdatePost,
  ) {
    return this.postService.updatedPost(id, updatePost);
  }

  @Delete(':id')
  deletePostById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.deletedPost(id);
  }
}
