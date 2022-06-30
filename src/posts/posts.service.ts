import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Brackets,
  Repository,
} from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/request/create-post.dto';
import { CreatedPostDto } from './dto/response/created-post.dto';
import { SelectPostDto } from './dto/response/select-post.dto';
import { SelectPostsDto } from './dto/response/select-posts.dto';
import { UpdatePostDto } from './dto/request/update-post.dto';
import { Keyword } from 'src/keywords/entities/keyword.entity';
import { Notice } from 'src/notices/entities/notice.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    @InjectRepository(Keyword)
    private readonly keywordsRepository: Repository<Keyword>,
    @InjectRepository(Notice)
    private readonly notiecesRepository: Repository<Notice>,
  ) {}

  // 모든 게시물 조회
  async getAll(
    page: number = 1,
    size: number = 5,
    search?: string,
  ): Promise<SelectPostsDto> {
    const query = this.postsRepository
      .createQueryBuilder()
      .take(size)
      .skip(size * (page - 1))
      .where('status = 0');

    // 검색어가 있을경우 where 쿼리 추가
    if (search != null) {
      query.andWhere(
        new Brackets((posts) => {
          posts
            .andWhere('title like :search', { search: `%${search}%` })
            .orWhere('author like :search', { search: `%${search}%` });
        }),
      );
    }

    const posts = await query.getMany();

    return new SelectPostsDto(posts);
  }

  // 특정 게시물 조회
  async getOneById(id: number): Promise<SelectPostDto> {
    const post = await this.postsRepository.findOneByOrFail({ id, status: 0 });

    return new SelectPostDto(post);
  }

  // 게시물 생성
  async createOne(post: CreatePostDto): Promise<CreatedPostDto> {
    let newPost = null;
    let keywords = null;

    try {
      // 게시물 생성
      newPost = this.postsRepository.create(post);
      await this.postsRepository.save(newPost);

      // 알림 목록 저장
      keywords = await this.keywordsRepository.find();
      keywords.forEach((element) => {
        if (
          newPost.title.indexOf(element.keyword) != -1 ||
          newPost.content.indexOf(element.keyword) != -1
        ) {
          const notice = this.notiecesRepository.create({
            ...element,
            refId: newPost.id,
            type: 0,
          });
          this.notiecesRepository.save(notice);
        }
      });
    } catch (err) {
      throw new InternalServerErrorException({
        errorNo: 'P0001',
        message: '처리 중에 예기치 않은 오류가 발생하였습니다.',
      });
    }

    return new CreatedPostDto(newPost.id);
  }

  // 게시물 수정
  async updateOneById(id: number, post: UpdatePostDto): Promise<void> {
    // 기존 게시물 조회
    let orgPost = await this.postsRepository.findOne({
      where: {
        id,
        status: 0,
      },
    });

    // 게시물 없을 경우 예외처리
    if (!orgPost) {
      throw new NotFoundException({
        errorNo: 'P0002',
        message: '해당 게시물이 존재하지 않습니다.',
      });
    }

    // 비밀번호 불일치 예외처리
    if (orgPost.password != post.password) {
      throw new UnauthorizedException({
        errorNo: 'P0003',
        message: '해당 게시물에 대한 수정 권한이 없습니다.',
      });
    }

    try {
      // 게시물 수정
      await this.postsRepository.update({ id }, post);
    } catch (err) {
      throw new InternalServerErrorException({
        errorNo: 'P0004',
        message: '처리 중에 예기치 않은 오류가 발생하였습니다.',
      });
    }
    return;
  }

  // 게시물 삭제
  async deleteOneById(
    id: number,
    post: UpdatePostDto,
  ): Promise<{ deleted: boolean; message?: string }> {
    // 기존 게시물 조회
    let orgPost = await this.postsRepository.findOne({
      where: {
        id,
        status: 0,
      },
    });

    // 게시물이 없을 경우 예외처리
    if (!orgPost) {
      throw new NotFoundException({
        errorNo: 'P0005',
        message: '해당 게시물이 존재하지 않습니다.',
      });
    }

    // 비밀번호 불일치 예외처리
    if (orgPost.password != post.password) {
      throw new UnauthorizedException({
        errorNo: 'P0006',
        message: '해당 게시물에 대한 삭제 권한이 없습니다.',
      });
    }
    try {
      await this.postsRepository.update(
        { id },
        {
          status: 1,
        },
      );
    } catch (err) {
      throw new InternalServerErrorException({
        errorNo: 'P0007',
        message: '처리 중에 예기치 않은 오류가 발생하였습니다.',
      });
    }

    return;
  }
}
