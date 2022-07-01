import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/request/create-comment.dto';
import { CreatedCommentDto } from './dto/response/created-comment.dto';
import { Post } from '../posts/entities/post.entity';
import { SelectCommentsDto } from './dto/response/select-comments.dto';
import { Keyword } from 'src/keywords/entities/keyword.entity';
import { Notice } from '../notices/entities/notice.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Keyword)
    private readonly keywordsRepository: Repository<Keyword>,
    @InjectRepository(Notice)
    private readonly notiecesRepository: Repository<Notice>,
  ) {}

  // 특정 게시물의 모든 댓글 조회
  async getAll(
    postId: number,
    page: number = 1,
    size: number = 5,
  ): Promise<SelectCommentsDto> {
    // 게시물 조회
    const post = await this.postsRepository.findOneByOrFail({
      id: postId,
      status: 0,
    });

    // 게시물이 없을 경우 예외처리
    if (!post) {
      throw new NotFoundException({
        errorNo: 'C0001',
        message: '해당 게시물이 존재하지 않습니다.',
      });
    }

    // 모든 댓글 조회
    // 그룹 내림차순, 그룹내 순서 오름차순으로 댓글 정렬
    const comments = await this.commentsRepository.find({
      where: {
        postId,
      },
      order: {
        group: 'DESC',
        groupOrder: 'ASC',
      },
      take: size,
      skip: size * (page - 1),
    });

    return new SelectCommentsDto(comments);
  }

  // 게시물의 댓글 생성
  async createOne(
    postId: number,
    comment: CreateCommentDto,
  ): Promise<CreatedCommentDto> {
    let newComment = null;

    // 게시물 조회
    const post = await this.postsRepository.findOneByOrFail({ id: postId });
    // 게시물 없을 경우 예외처리
    if (!post) {
      throw new NotFoundException({
        errorNo: 'C0002',
        message: '해당 게시물이 존재하지 않습니다.',
      });
    }

    // 댓글 그룹의 마지막 값 조회
    const query = await this.commentsRepository.createQueryBuilder('comment');
    query.select('MAX(comment.group)', 'maxGroup');
    const { maxGroup } = await query.getRawOne();

    try {
      // 댓글 생성
      newComment = this.commentsRepository.create({
        ...comment,
        postId: post.id,
        parent: null,
        group: maxGroup + 1,
      });
      await this.commentsRepository.save(newComment);

      // 알림 목록 저장
      const keywords = await this.keywordsRepository.find();
      keywords.forEach((element) => {
        if (newComment.content.indexOf(element.keyword) != -1) {
          const notice = this.notiecesRepository.create({
            ...element,
            refId: newComment.id,
            type: 1,
          });
          this.notiecesRepository.save(notice);
        }
      });
    } catch (err) {
      throw new InternalServerErrorException({
        errorNo: 'C0002',
        message: '처리 중에 예기치 않은 오류가 발생하였습니다.',
      });
    }

    return new CreatedCommentDto(newComment.id);
  }

  // 대댓글 생성
  async createOneWithId(
    postId: number,
    id: number,
    comment: CreateCommentDto,
  ): Promise<CreatedCommentDto> {
    let newComment = null;

    // 게시물 조회
    const post = await this.postsRepository.findOneByOrFail({ id: postId });
    // 게시물 없을 경우 예외처리
    if (!post) {
      throw new NotFoundException({
        errorNo: 'C0003',
        message: '해당 게시물이 존재하지 않습니다.',
      });
    }

    // 부모 댓글 조회
    const parentComment = await this.commentsRepository.findOne({
      where: { id, postId },
    });

    if (!parentComment) {
      throw new NotFoundException({
        errorNo: 'C0004',
        message: '상위 댓글이 존재하지 않습니다.',
      });
    }

    try {
      // 자식 댓글이 생성된 후 정렬 순서를 찾기 위한 쿼리
      let { maxOrder } = await this.commentsRepository
        .createQueryBuilder('comment')
        .select('MAX(comment.groupOrder)', 'maxOrder')
        .where({ group: parentComment.group })
        .andWhere({ step: parentComment.step + 1 })
        .andWhere({ parent: parentComment })
        .getRawOne();

      // 하위 댓글이 처음이면(null) 상위 댓글의 마지막 순서를 가져오고,
      // 아닐 경우 하위 댓글의 마지막 순서를 가져온다.
      maxOrder = maxOrder == null ? parentComment.groupOrder : maxOrder;

      // 마지막 순서보다 큰 댓글들의 순서를 1씩 증가
      this.commentsRepository
        .createQueryBuilder()
        .update(Comment)
        .set({ groupOrder: () => 'groupOrder + 1' })
        .where({ group: parentComment.group })
        .andWhere('groupOrder > :maxOrder', { maxOrder })
        .execute();

      // 하위 댓글 생성
      newComment = this.commentsRepository.create({
        ...comment,
        post: post,
        parent: parentComment,
        group: parentComment.group,
        step: parentComment.step + 1,
        groupOrder: maxOrder + 1,
      });
      await this.commentsRepository.save(newComment);

      // 알림 목록 저장
      const keywords = await this.keywordsRepository.find();
      keywords.forEach((element) => {
        if (newComment.content.indexOf(element.keyword) != -1) {
          const notice = this.notiecesRepository.create({
            ...element,
            refId: newComment.id,
            type: 1,
          });
          this.notiecesRepository.save(notice);
        }
      });
    } catch (err) {
      throw new InternalServerErrorException({
        errorNo: 'C0005',
        message: '처리 중에 예기치 않은 오류가 발생하였습니다.',
      });
    }

    return new CreatedCommentDto(newComment.id);
  }
}
