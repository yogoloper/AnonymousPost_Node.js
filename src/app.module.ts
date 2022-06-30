import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './common/configs/typeorm.config';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { NoticesModule } from './notices/notices.module';
import { KeywordsModule } from './keywords/keywords.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeORMConfig),
    PostsModule,
    CommentsModule,
    NoticesModule,
    KeywordsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
