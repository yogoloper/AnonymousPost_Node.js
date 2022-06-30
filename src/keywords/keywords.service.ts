import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateKeywordDto } from './dto/request/create-keyword.dto';
import { Keyword } from 'src/keywords/entities/keyword.entity';
import { Repository } from 'typeorm';

@Injectable()
export class KeywordsService {
  constructor(
    @InjectRepository(Keyword)
    private readonly keywordsRepository: Repository<Keyword>,
  ) {}

  async createOne(keyword: CreateKeywordDto): Promise<void> {
    const newKeyword = this.keywordsRepository.create(keyword);
    await this.keywordsRepository.save(newKeyword);
    return;
  }

  async deleteOne(keyword: CreateKeywordDto): Promise<void> {
    await this.keywordsRepository.delete({ ...keyword });
    return;
  }
}
