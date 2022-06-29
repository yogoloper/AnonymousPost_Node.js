import { Post } from 'src/posts/post.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  author: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  group: number;

  @Column({ default: 0})
  step: number;

  @Column({ default:0})
  groupOrder: number;

  @Column()
  postId: number;

  @ManyToOne(() => Comment, (comment) => comment.id)
  parent: Comment;

  @ManyToOne(() => Post, (post) => post.id)
  post: Post;
}
