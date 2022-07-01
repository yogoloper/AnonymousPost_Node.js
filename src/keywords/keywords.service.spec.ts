import { Test, TestingModule } from '@nestjs/testing';
import { KeywordsService } from './keywords.service';
import { Repository } from 'typeorm';
import { Keyword } from 'src/keywords/entities/keyword.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import Connection from 'mysql2/typings/mysql/lib/Connection';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const mockKeywordsRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

describe('KeywordsService', () => {
  let service: KeywordsService;
  let keywordsRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KeywordsService,
        {
          provide: getRepositoryToken(Keyword),
          useValue: mockKeywordsRepository(),
        },
      ],
    }).compile();

    service = module.get<KeywordsService>(KeywordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOne()', () => {
    it('201 반환', () => {
      const keyword = service.createOne({
        user: 'user1',
        keyword: 'keyword1',
      });
      expect(keyword).toBeInstanceOf(Promise);
    });
  });
});
