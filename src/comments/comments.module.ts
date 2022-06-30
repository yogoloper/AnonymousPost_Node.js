import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Post } from '../posts/entities/post.entity';
import { Keyword } from 'src/keywords/entities/keyword.entity';
import { Notice } from 'src/notices/entities/notice.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Comment, Post, Keyword, Notice])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
