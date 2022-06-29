import { ApiResponseProperty } from '@nestjs/swagger';

export class CreatedCommentDto {
  @ApiResponseProperty()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}
