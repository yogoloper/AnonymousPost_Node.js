import { ApiResponseProperty } from '@nestjs/swagger';
import { Post } from 'src/posts/entities/post.entity';

export class SelectPostDto {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  title: string;

  @ApiResponseProperty()
  content: string;

  @ApiResponseProperty()
  author: string;

  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  updatedAt: Date;

  // @ApiResponseProperty()
  // commtens: Comment[];

  constructor(post: Post) {
    const { id, title, content, author, createdAt, updatedAt } = post;

    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    // this.commtens = post.comments;
  }
}
