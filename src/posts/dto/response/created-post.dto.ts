import { ApiResponseProperty } from '@nestjs/swagger';

export class CreatedPostDto {
  @ApiResponseProperty()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}