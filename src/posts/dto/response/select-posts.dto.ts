import { ApiResponseProperty } from '@nestjs/swagger';
import { SelectPostDto } from './select-post.dto';
import { Post } from '../../entities/post.entity';

export class SelectPostsDto {
  @ApiResponseProperty({ type: SelectPostsDto })
  posts: SelectPostDto[];

  constructor(posts: Post[]) {
    this.posts = posts.map((post) => new SelectPostDto(post));
  }
}
