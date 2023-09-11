import { IResponse } from 'src/types/response';
import {
  Controller,
  Get,
  ParseIntPipe,
  Param,
  ValidationPipe,
  UsePipes,
  Post,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<IResponse<PostEntity[], undefined>> {
    const posts = await this.postService.findAll();
    return { message: 'Find Posts success', data: posts };
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<PostEntity, undefined>> {
    const post = await this.postService.findOne(id);
    return { message: 'Find Post success', data: post };
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createPost(
    @Body() rqData: CreatePostInput,
  ): Promise<IResponse<PostEntity, undefined>> {
    const post = await this.postService.create(rqData);
    return { message: 'Create Post success', data: post };
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() rqData: UpdatePostInput,
  ): Promise<IResponse<PostEntity, undefined>> {
    const post = await this.postService.update(id, rqData);
    return { message: 'Update Post success', data: post };
  }

  @Delete(':id')
  async removePost(
    @Param('id') id: number,
  ): Promise<IResponse<PostEntity, undefined>> {
    const post = await this.postService.remove(id);
    return { message: 'Delete Post success', data: post };
  }
}
