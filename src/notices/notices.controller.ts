import { Controller, Get, Param, Query } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { SelectNoticesDto } from './dto/response/select-notices.dto';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NoticesSwagger } from './notices.swagger';

@ApiTags(NoticesSwagger.tag)
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Get('/:user')
  @ApiOperation(NoticesSwagger.getAllOfUser.operation)
  @ApiParam(NoticesSwagger.getAllOfUser.param.user)
  @ApiQuery(NoticesSwagger.getAllOfUser.query.page)
  @ApiQuery(NoticesSwagger.getAllOfUser.query.size)
  @ApiOkResponse(NoticesSwagger.getAllOfUser.response[200])
  getAllOfUser(
    @Param('user') user: string,
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<SelectNoticesDto> {
    return this.noticesService.getAllOfUser(user, page, size);
  }
}
