import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';
import { Repository } from 'typeorm';
import { SelectNoticesDto } from './dto/response/select-notices.dto';

@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(Notice)
    private readonly notiecesRepository: Repository<Notice>,
  ) {}

  async getAllOfUser(
    user: string,
    page: number = 1,
    size: number = 5,
  ): Promise<SelectNoticesDto> {
    const notices = await this.notiecesRepository.find({
      where: {
        user,
        status: 0,
      },
      order: {
        id: 'DESC',
      },
      take: size,
      skip: size * (page - 1),
    });

    return new SelectNoticesDto(notices);
  }
}
