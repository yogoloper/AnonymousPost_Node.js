import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  // 키워드 저장
  async createOne(keyword: CreateKeywordDto): Promise<void> {
    try {
      const newKeyword = this.keywordsRepository.create(keyword);
      await this.keywordsRepository.save(newKeyword);
    } catch (err) {
      throw new InternalServerErrorException({
        errorNo: 'K0001',
        message: '처리 중에 예기치 않은 오류가 발생하였습니다.',
      });
    }
    return;
  }

  // 키워드 삭제
  async deleteOne(keyword: CreateKeywordDto): Promise<void> {
    try {
      await this.keywordsRepository.delete({ ...keyword });
    } catch (err) {
      throw new InternalServerErrorException({
        errorNo: 'K0002',
        message: '처리 중에 예기치 않은 오류가 발생하였습니다.',
      });
    }
    return;
  }
}
