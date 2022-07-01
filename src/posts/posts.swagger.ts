import { SelectPostsDto } from './dto/response/select-posts.dto';
import { SelectPostDto } from './dto/response/select-post.dto';
import { CreatePostDto } from './dto/request/create-post.dto';
import { CreatedPostDto } from './dto/response/created-post.dto';
import { UpdatePostDto } from './dto/request/update-post.dto';
export const PostsSwagger = {
  tag: '게시판 API',
  getAll: {
    operation: {
      summary: '모든 게시물 조회 API',
      description:
        '모든 게시물을 조회하며, 쿼리스트링을 통해 제목 또는 작성자 검색이 가능합니다.',
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
      search: {
        name: 'search',
        description: '검색어(제목/작성자)',
        example:'제목',
        type: 'string',
        required: false,
      },
    },
    response: {
      200: {
        status: 200,
        description: '성공',
        type: SelectPostDto,
      },
    },
  },
  getOneById: {
    operation: {
      summary: '특정 게시물 조회 API',
      description: '특정 게시물을 조회합니다.',
    },
    param: {
      id: {
        name: 'id',
        description: '게시물 아이디',
        type: 'number',
        required: true,
        example: 1,
      },
    },
    response: {
      200: {
        status: 200,
        description: '성공',
        type: SelectPostDto,
      },
      404: {
        status: 404,
        description: '존재하지 않는 게시물',
      },
    },
  },
  createOne: {
    operation: {
      summary: '게시물 생성 API',
      description: '새로운 게시물을 생성합니다.',
    },
    body: {
      post: {
        type: CreatePostDto,
      },
    },
    response: {
      201: {
        status: 201,
        description: '성공',
        type: CreatedPostDto,
      },
    },
  },
  updateOneById: {
    operation: {
      summary: '게시물 수정 API',
      description: '한 게시물을 수정합니다.',
    },
    param: {
      id: {
        name: 'id',
        description: '게시물 아이디',
        type: 'number',
        required: true,
        example: 1,
      },
    },
    body: {
      post: {
        type: UpdatePostDto,
      },
    },
    response: {
      200: {
        status: 200,
        description: '성공',
      },
      403: {
        status: 403,
        description: '권한 없는 게시물',
      },
      404: {
        status: 404,
        description: '존재하지 않는 게시물',
      },
    },
  },
  deleteOneById: {
    operation: {
      summary: '게시물 삭제 API',
      description: '한 게시물을 삭제합니다.',
    },
    param: {
      id: {
        name: 'id',
        description: '게시물 아이디',
        type: 'number',
        required: true,
        example: 1,
      },
    },
    body: {
      post: {
        type: UpdatePostDto,
      },
    },
    response: {
      200: {
        status: 200,
        description: '성공',
      },
      403: {
        status: 403,
        description: '권한 없는 게시물',
      },
      404: {
        status: 404,
        description: '존재하지 않는 게시물',
      },
    },
  },
};
