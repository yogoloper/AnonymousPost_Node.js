import { Controller, Get, Param, Query } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { SelectNoticesDto } from './dto/response/select-notices.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Notice API')
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Get('/:user')
  getAllOfUser(
    @Param('user') user: string,
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<SelectNoticesDto> {
    return this.noticesService.getAllOfUser(user, page, size);
  }
}
