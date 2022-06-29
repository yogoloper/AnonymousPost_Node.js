import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatedPostDto } from './dto/response/created-post.dto';
import { CreatePostDto } from './dto/request/create-post.dto';
import { SelectPostDto } from './dto/response/select-post.dto';
import { SelectPostsDto } from './dto/response/select-posts.dto';
import { UpdatePostDto } from './dto/request/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/')
  getAll(): Promise<SelectPostsDto> {
    return this.postsService.getAll();
  }

  @Get('/:id')
  getOneById(@Param('id', ParseIntPipe) id: number): Promise<SelectPostDto> {
    return this.postsService.getOneById(id);
  }

  @Post('/')
  createOne(@Body() post: CreatePostDto): Promise<CreatedPostDto> {
    return this.postsService.createOne(post);
  }

  @Put('/:id')
  updateOneById(
    @Param('id', ParseIntPipe) id: number,
    @Body() post: UpdatePostDto,
  ) {
    return this.postsService.updateOneById(id, post);
  }

  @Delete('/:id')
  deleteOneById(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deleteOneById(id);
  }
}
