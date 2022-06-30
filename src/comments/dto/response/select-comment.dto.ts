import { ApiResponseProperty } from '@nestjs/swagger';
import { Comment } from 'src/comments/entities/comment.entity';

export class SelectCommentDto {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  content: string;

  @ApiResponseProperty()
  author: string;

  @ApiResponseProperty()
  createdAt: Date;

  constructor(comment: Comment) {
    const { id, content, author, createdAt } = comment;

    this.id = id;
    this.content = content;
    this.author = author;
    this.createdAt = createdAt;
  }
}
