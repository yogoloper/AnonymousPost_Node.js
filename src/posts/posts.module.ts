import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keyword } from 'src/keywords/entities/keyword.entity';
import { Notice } from 'src/notices/entities/notice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Keyword, Notice])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
