import { ApiProperty } from '@nestjs/swagger';

export class CreateKeywordDto {
  @ApiProperty({ type: 'string' })
  readonly user: string;

  @ApiProperty({ type: 'string' })
  readonly keyword: string;
}
