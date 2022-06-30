import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/request/create-post.dto';
import { CreatedPostDto } from './dto/response/created-post.dto';
import { SelectPostDto } from './dto/response/select-post.dto';
import { SelectPostsDto } from './dto/response/select-posts.dto';
import { UpdatePostDto } from './dto/request/update-post.dto';
import { query } from 'express';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
  ) {}

  async getAll(
    page: number = 1,
    size: number = 5,
    search?,
  ): Promise<SelectPostsDto> {
    const query = this.postsRepository
      .createQueryBuilder()
      .take(size)
      .skip(size * (page - 1))
      .where('status = 0');

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

  async getOneById(id: number): Promise<SelectPostDto> {
    const post = await this.postsRepository.findOneByOrFail({ id, status: 0 });

    return new SelectPostDto(post);
  }

  async createOne(post: CreatePostDto): Promise<CreatedPostDto> {
    const newPost = this.postsRepository.create(post);
    await this.postsRepository.save(newPost);
    return new CreatedPostDto(newPost.id);
  }

  async updateOneById(id: number, post: UpdatePostDto): Promise<void> {
    await this.postsRepository.update({ id }, post);
    return;
  }

  async deleteOneById(
    id: number,
  ): Promise<{ deleted: boolean; message?: string }> {
    await this.postsRepository.update(
      { id },
      {
        status: 1,
      },
    );
    return;
  }
}
