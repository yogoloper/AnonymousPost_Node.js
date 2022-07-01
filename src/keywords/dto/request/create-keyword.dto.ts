import { ApiProperty } from '@nestjs/swagger';

export class CreateKeywordDto {
  @ApiProperty({ type: 'string', example: '사용자' })
  readonly user: string;

  @ApiProperty({ type: 'string', example: '키워드' })
  readonly keyword: string;
}
