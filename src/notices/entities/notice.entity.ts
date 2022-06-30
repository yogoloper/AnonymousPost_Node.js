import { Post } from '../../posts/entities/post.entity';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { Keyword } from 'src/keywords/entities/keyword.entity';

@Entity()
export class Notice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: string;

  @Column()
  refId: number; // 참조 아이디(post.id, comment.id)

  @Column()
  type: number; // 0: 게시글, 1: 댓글

  @Column()
  keyword: string;

  @Column({
    default: 0, // 0: 미확인, 1: 확인
  })
  status: number;

  @CreateDateColumn()
  createdAt: Date;
}
