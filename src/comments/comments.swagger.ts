import { SelectCommentsDto } from './dto/response/select-comments.dto';
import { CreateCommentDto } from './dto/request/create-comment.dto';
import { CreatedCommentDto } from './dto/response/created-comment.dto';

export const CommentsSwagger = {
  tag: '댓글 API',
  getAll: {
    operation: {
      summary: '현재 게시물 댓글 조회 API',
      description: '현재 게시물의 모든 댓글을 조회합니다.',
    },
    param: {
      postId: {
        name: 'postId',
        description: '게시물 아이디',
        type: 'number',
        required: true,
        example: 1,
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
        type: SelectCommentsDto,
      },
    },
  },
  createOne: {
    operation: {
      summary: '댓글 생성 API',
      description: '새로운 댓글을 생성합니다.',
    },
    param: {
      postId: {
        name: 'postId',
        description: '게시물 아이디',
        type: 'number',
        required: true,
        example: 1,
      },
    },
    body: {
      post: {
        type: CreateCommentDto,
      },
    },
    response: {
      201: {
        status: 201,
        description: '성공',
        type: CreatedCommentDto,
      },
      404: {
        status: 404,
        description: '존재하지 않는 게시물',
      },
    },
  },
  createOneWithId: {
    operation: {
      summary: '대댓글 생성 API',
      description: '새로운 대댓글을 생성합니다.',
    },
    param: {
      postId: {
        name: 'postId',
        description: '게시물 아이디',
        type: 'number',
        required: true,
        example: 1,
      },
      id: {
        name: 'id',
        description: '상위 댓글 아이디',
        type: 'number',
        required: true,
        example: 1,
      },
    },
    body: {
      post: {
        type: CreateCommentDto,
      },
    },
    response: {
      201: {
        status: 201,
        description: '성공',
        type: CreatedCommentDto,
      },
      404: {
        status: 404,
        description: '존재하지 않는 게시물/상위 댓글',
      },
    },
  },
};
