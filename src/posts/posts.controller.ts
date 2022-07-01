import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatedPostDto } from './dto/response/created-post.dto';
import { CreatePostDto } from './dto/request/create-post.dto';
import { SelectPostDto } from './dto/response/select-post.dto';
import { SelectPostsDto } from './dto/response/select-posts.dto';
import { UpdatePostDto } from './dto/request/update-post.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostsSwagger } from './posts.swagger';

@ApiTags(PostsSwagger.tag)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/')
  @ApiOperation(PostsSwagger.getAll.operation)
  @ApiQuery(PostsSwagger.getAll.query.page)
  @ApiQuery(PostsSwagger.getAll.query.size)
  @ApiQuery(PostsSwagger.getAll.query.search)
  @ApiOkResponse(PostsSwagger.getAll.response[200])
  getAll(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('search') search: string,
  ): Promise<SelectPostsDto> {
    return this.postsService.getAll(page, size, search);
  }

  @Get('/:id')
  @ApiOperation(PostsSwagger.getOneById.operation)
  @ApiParam(PostsSwagger.getOneById.param.id)
  @ApiOkResponse(PostsSwagger.getOneById.response[200])
  @ApiResponse(PostsSwagger.getOneById.response[404])
  getOneById(@Param('id', ParseIntPipe) id: number): Promise<SelectPostDto> {
    return this.postsService.getOneById(id);
  }

  @Post('/')
  @ApiOperation(PostsSwagger.createOne.operation)
  @ApiBody(PostsSwagger.createOne.body.post)
  @ApiOkResponse(PostsSwagger.createOne.response[201])
  createOne(@Body() post: CreatePostDto): Promise<CreatedPostDto> {
    return this.postsService.createOne(post);
  }

  @Put('/:id')
  @ApiOperation(PostsSwagger.updateOneById.operation)
  @ApiParam(PostsSwagger.updateOneById.param.id)
  @ApiBody(PostsSwagger.updateOneById.body.post)
  @ApiOkResponse(PostsSwagger.updateOneById.response[200])
  @ApiResponse(PostsSwagger.updateOneById.response[403])
  @ApiResponse(PostsSwagger.updateOneById.response[404])
  updateOneById(
    @Param('id', ParseIntPipe) id: number,
    @Body() post: UpdatePostDto,
  ) {
    return this.postsService.updateOneById(id, post);
  }

  @Delete('/:id')
  @ApiOperation(PostsSwagger.deleteOneById.operation)
  @ApiParam(PostsSwagger.deleteOneById.param.id)
  @ApiBody(PostsSwagger.deleteOneById.body.post)
  @ApiOkResponse(PostsSwagger.deleteOneById.response[200])
  @ApiResponse(PostsSwagger.deleteOneById.response[403])
  @ApiResponse(PostsSwagger.deleteOneById.response[404])
  deleteOneById(
    @Param('id', ParseIntPipe) id: number,
    @Body() post: UpdatePostDto,
  ) {
    return this.postsService.deleteOneById(id, post);
  }
}
