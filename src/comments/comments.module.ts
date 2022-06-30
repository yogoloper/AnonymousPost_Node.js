import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Post } from '../posts/entities/post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Comment, Post])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
