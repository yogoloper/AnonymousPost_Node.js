import { CreateKeywordDto } from './dto/request/create-keyword.dto';
export const KeywordsSwagger = {
  tag: '키워드 API',
  createOne: {
    operation: {
      summary: '키워드 등록 API',
      description: '유저의 새로운 키워드를 등록합니다.',
    },
    body: {
      post: {
        type: CreateKeywordDto,
      },
    },
    response: {
      201: {
        status: 201,
        description: '성공',
      },
    },
  },
  deleteOne: {
    operation: {
      summary: '키워드 삭제 API',
      description: '유저의 새로운 키워드를 등록합니다.',
    },
    body: {
      post: {
        type: CreateKeywordDto,
      },
    },
    response: {
      200: {
        status: 200,
        description: '성공',
      },
    },
  },
};
