import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ type: 'string', example: '내용' })
  readonly content: string;

  @ApiProperty({ type: 'string', example: '작성자' })
  readonly author: string;
}
