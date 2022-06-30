import { ApiResponseProperty } from '@nestjs/swagger';
import { Notice } from '../../entities/notice.entity';

export class SelectNoticeDto {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  keyword: string;

  @ApiResponseProperty()
  refId: number;

  @ApiResponseProperty()
  type: number;

  constructor(notice: Notice) {
    const { id, keyword, refId, type } = notice;

    this.id = id;
    this.keyword = keyword;
    this.refId = refId;
    this.type = type;
  }
}
