import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({ type: 'string', example: '제목' })
  readonly title: string;

  @ApiProperty({ type: 'string', example: '내용' })
  readonly content: string;

  @ApiProperty({ type: 'string', example: '사용자' })
  readonly author: string;

  @ApiProperty({ type: 'string', example: '1234' })
  readonly password: string;
}
