import { Injectable } from '@nestjs/common';
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

  async getAll(
    postId: number,
    page: number = 1,
    size: number = 5,
  ): Promise<SelectCommentsDto> {
    const post = await this.postsRepository.findOneByOrFail({
      id: postId,
      status: 0,
    });
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

  async createOne(
    postId: number,
    comment: CreateCommentDto,
  ): Promise<CreatedCommentDto> {
    const post = await this.postsRepository.findOneByOrFail({ id: postId });
    const keywords = await this.keywordsRepository.find();

    // 댓글의 그룹
    const query = await this.commentsRepository.createQueryBuilder('comment');
    query.select('MAX(comment.group)', 'maxGroup');

    const { maxGroup } = await query.getRawOne();

    const newComment = this.commentsRepository.create({
      ...comment,
      post: post,
      parent: null,
      group: maxGroup + 1,
    });
    await this.commentsRepository.save(newComment);

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

    return new CreatedCommentDto(newComment.id);
  }

  async createOneWithId(
    postId: number,
    id: number,
    comment: CreateCommentDto,
  ): Promise<CreatedCommentDto> {
    const post = await this.postsRepository.findOneByOrFail({ id: postId });
    const parentComment = await this.commentsRepository.findOneByOrFail({ id });
    const keywords = await this.keywordsRepository.find();

    const query = await this.commentsRepository.createQueryBuilder('comment');
    query
      .select('MAX(comment.groupOrder)', 'maxOrder')
      .where({ group: parentComment.group })
      .andWhere({ step: parentComment.step + 1 })
      .andWhere({ parent: parentComment });

    let { maxOrder } = await query.getRawOne();

    maxOrder = maxOrder == null ? parentComment.groupOrder : maxOrder;

    this.commentsRepository
      .createQueryBuilder()
      .update(Comment)
      .set({ groupOrder: () => 'groupOrder + 1' })
      .where({ group: parentComment.group })
      .andWhere('groupOrder > :maxOrder', { maxOrder })
      .execute();

    const newComment = this.commentsRepository.create({
      ...comment,
      post: post,
      parent: parentComment,
      group: parentComment.group,
      step: parentComment.step + 1,
      groupOrder: maxOrder + 1,
    });
    await this.commentsRepository.save(newComment);

    keywords.forEach((element) => {
      if (
        newComment.content.indexOf(element.keyword) != -1
      ) {
        const notice = this.notiecesRepository.create({
          ...element,
          refId: newComment.id,
          type: 1,
        });
        this.notiecesRepository.save(notice);
      }
    });
    return new CreatedCommentDto(newComment.id);
  }
}
