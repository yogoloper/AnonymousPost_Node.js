import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ type: 'string' })
  readonly title: string;

  @ApiProperty({ type: 'string' })
  readonly content: string;

  @ApiProperty({ type: 'string' })
  readonly author: string;
  
  @ApiProperty({ type: 'string' })
  readonly password: string;
}
