import { ApiResponseProperty } from '@nestjs/swagger';
import { SelectNoticeDto } from './select-notice.dto';
import { Notice } from '../../entities/notice.entity';

export class SelectNoticesDto {
  @ApiResponseProperty()
  notices: SelectNoticeDto[];

  constructor(notices: Notice[]) {
    this.notices = notices.map((notice) => new SelectNoticeDto(notice));
  }
}
