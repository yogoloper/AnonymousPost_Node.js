import { ApiResponseProperty } from '@nestjs/swagger';
import { Comment } from 'src/comments/comment.entity';
import { SelectCommentDto } from './select-comment.dto';

export class SelectCommentsDto {
  @ApiResponseProperty()
  comments: SelectCommentDto[];

  constructor(comments: Comment[]) {
    this.comments = comments.map((commnet) => new SelectCommentDto(commnet));
  }
}
