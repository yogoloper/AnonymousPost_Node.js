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
import { query } from 'express';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/')
  getAll(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() comment: CreateCommentDto,
    @Query('page') page: number,
    @Query('size') size: number,
  ) {
    return this.commentsService.getAll(postId, page, size);
  }

  @Post('/')
  createOne(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() comment: CreateCommentDto,
  ) {
    return this.commentsService.createOne(postId, comment);
  }

  @Post('/:id')
  createOneWithId(
    @Param('postId', ParseIntPipe) postId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() comment: CreateCommentDto,
  ) {
    return this.commentsService.createOneWithId(postId, id, comment);
  }
}
