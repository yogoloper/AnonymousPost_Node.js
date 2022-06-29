import { ApiResponseProperty } from '@nestjs/swagger';
import { SelectPostDto } from './select-post.dto';
import { Post } from '../../post.entity';

export class SelectPostsDto {
  @ApiResponseProperty()
  posts: SelectPostDto[];

  constructor(posts: Post[]) {
    this.posts = posts.map((post) => new SelectPostDto(post));
  }
}