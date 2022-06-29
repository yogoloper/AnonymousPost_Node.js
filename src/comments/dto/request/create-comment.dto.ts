import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ type: 'string' })
  readonly content: string;

  @ApiProperty({ type: 'string' })
  readonly author: string;
}
