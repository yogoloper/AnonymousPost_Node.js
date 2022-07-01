import { SelectNoticeDto } from './dto/response/select-notice.dto';
export const NoticesSwagger = {
  tag: '알림 API',
  getAllOfUser: {
    operation: {
      summary: '현재 유저의 알림 조회 API',
      description: '현재 게시물의 모든 댓글을 조회합니다.',
    },
    param: {
      user: {
        name: 'user',
        description: '사용자 정보',
        type: 'string',
        required: true,
        example: '작성자',
      },
    },
    query: {
      page: {
        name: 'page',
        description: '페이징 번호',
        type: 'number',
        example: 1,
        required: false,
      },
      size: {
        name: 'size',
        description: '페이징 크기',
        type: 'number',
        example: 5,
        required: false,
      },
    },
    response: {
      200: {
        status: 200,
        description: '성공',
        type: SelectNoticeDto,
      },
    },
  },
};
