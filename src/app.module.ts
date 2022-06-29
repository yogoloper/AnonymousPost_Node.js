import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './common/typeorm.config';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { NoticesModule } from './notices/notices.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot(typeORMConfig),
    PostsModule,
    CommentsModule,
    NoticesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
