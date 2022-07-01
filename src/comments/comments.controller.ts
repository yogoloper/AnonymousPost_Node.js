import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/request/create-comment.dto';
import { CommentsService } from './comments.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommentsSwagger } from './comments.swagger';

@ApiTags(CommentsSwagger.tag)
@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/')
  @ApiOperation(CommentsSwagger.getAll.operation)
  @ApiParam(CommentsSwagger.getAll.param.postId)
  @ApiQuery(CommentsSwagger.getAll.query.page)
  @ApiQuery(CommentsSwagger.getAll.query.size)
  @ApiOkResponse(CommentsSwagger.getAll.response[200])
  getAll(
    @Param('postId', ParseIntPipe) postId: number,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    return this.commentsService.getAll(postId, page, size);
  }

  @Post('/')
  @ApiOperation(CommentsSwagger.createOne.operation)
  @ApiParam(CommentsSwagger.createOne.param.postId)
  @ApiBody(CommentsSwagger.createOne.body.post)
  @ApiCreatedResponse(CommentsSwagger.createOne.response[201])
  @ApiResponse(CommentsSwagger.createOne.response[404])
  createOne(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() comment: CreateCommentDto,
  ) {
    return this.commentsService.createOne(postId, comment);
  }

  @Post('/:id')
  @ApiOperation(CommentsSwagger.createOneWithId.operation)
  @ApiParam(CommentsSwagger.createOneWithId.param.postId)
  @ApiParam(CommentsSwagger.createOneWithId.param.id)
  @ApiBody(CommentsSwagger.createOneWithId.body.post)
  @ApiCreatedResponse(CommentsSwagger.createOneWithId.response[201])
  @ApiResponse(CommentsSwagger.createOneWithId.response[404])
  createOneWithId(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() comment: CreateCommentDto,
  ) {
    return this.commentsService.createOneWithId(postId, id, comment);
  }
}
